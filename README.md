# aws-todo-list
A simple fullstack to-do list application using the AWS stack (S3, Cloudfront, Lambda, ApiGateway, DynamoDB, Cognito).

The purpose of the project, a to-do list, is very simple. I picked this simple purpose as the goal of this project is to become more familiar with AWS and CDK.

# Note

Remember that the user themself needs to do the following things:

* Get the domain from route 53.
* Create a certificate for the domain in the Virginia (us-east-1) region. Put the ARN of the certificate in the cdk.context.json
* Create a Secret with name `github-token` in Secrets Manager. Populate it with the Github personal access token.
* Go into ACM and add the required entries to Route53 for the certificate.

# TODO:
- [x] Make sure the CDK pipeline has the possibility to take on the right role and do the correct actions.
- [ ] Make sure CDK Pipeline actually deploys the application instead of only the pipeline Construct.