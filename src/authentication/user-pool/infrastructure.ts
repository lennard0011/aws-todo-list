import { RemovalPolicy, aws_route53_targets } from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  AccountRecovery,
  AdvancedSecurityMode,
  UserPool,
  VerificationEmailStyle,
} from "aws-cdk-lib/aws-cognito";
import { RecordTarget } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { addARecord } from "../../utils/addARecord";

type Props = {
  rootDomain: string;
  domainCertificateArn: string;
  authenticationDomainName: string;
};

export class AuthRepository extends Construct {
  readonly userPool: UserPool;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const { rootDomain, authenticationDomainName, domainCertificateArn } =
      props;

    this.userPool = new UserPool(this, "user-pool", {
      userPoolName: "user-pool",
      signInAliases: {
        email: true,
      },
      selfSignUpEnabled: true,
      autoVerify: {
        email: true,
      },
      userVerification: {
        emailSubject: "You need to verify your email",
        emailBody: "Thanks for signing up Your verification code is {####}",
        emailStyle: VerificationEmailStyle.CODE,
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      removalPolicy: RemovalPolicy.DESTROY,
      advancedSecurityMode: AdvancedSecurityMode.ENFORCED,
    });

    //needs to be certificate from us-east-1
    const certificate = Certificate.fromCertificateArn(
      this,
      "DomainCertificate",
      domainCertificateArn,
    );

    const domain = this.userPool.addDomain("userPoolDomain", {
      customDomain: {
        domainName: authenticationDomainName,
        certificate,
      },
    });

    addARecord(
      this,
      "authAliasRecord",
      rootDomain,
      authenticationDomainName,
      RecordTarget.fromAlias(
        new aws_route53_targets.UserPoolDomainTarget(domain),
      ),
    );
  }
}