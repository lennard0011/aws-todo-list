import { Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { DOMAIN_CERTIFICATE_ARN, DOMAIN_NAME } from "../../../constants";
import { Authentication } from "../../../authentication/component";
import { Webapp } from "../../../webapp/component";
import { Backend } from "../../../backend/component";
import { Environment } from "../../../app";

type Props = {
  env: Environment;
};

export class ApplicationDeployment extends Stage {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { env } = props;

    const authenticationProps = {
      env,
      rootDomain: DOMAIN_NAME,
      domainCertificateArn: DOMAIN_CERTIFICATE_ARN,
      authenticationDomainName: `auth.${DOMAIN_NAME}`,
    };
    const authentication = new Authentication(
      this,
      "ToDoListAuthentication",
      authenticationProps,
    );
    const { userPool } = authentication.authRepository;

    const webappProps = {
      env: env,
      domainName: DOMAIN_NAME,
      domainCertificateArn: DOMAIN_CERTIFICATE_ARN,
    };
    new Webapp(this, "ToDoListWebapp", webappProps);

    const backendProps = {
      env: env,
      rootDomain: DOMAIN_NAME,
      domainName: `api.${DOMAIN_NAME}`,
      userPool,
    };
    new Backend(this, "ToDoListBackend", backendProps);
  }
}
