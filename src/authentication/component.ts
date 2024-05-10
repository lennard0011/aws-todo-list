import { Construct } from "constructs";
import { AuthRepository } from "./user-pool/infrastructure";
import { Environment, Stack } from "aws-cdk-lib";

type Props = {
  env: Environment;
  rootDomain: string;
  domainCertificateArn: string;
  authenticationDomainName: string;
};

export class Authentication extends Stack {
  readonly authRepository: AuthRepository;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { rootDomain, authenticationDomainName, domainCertificateArn } =
      props;

    const authRepositoryProps = {
      rootDomain,
      authenticationDomainName,
      domainCertificateArn,
    };

    this.authRepository = new AuthRepository(
      this,
      "auth-repository",
      authRepositoryProps,
    );
  }
}
