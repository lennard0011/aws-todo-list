# aws-todo-list
A simple fullstack to-do list application using the AWS stack (S3, Cloudfront, Lambda, ApiGateway, DynamoDB, Cognito).

The purpose of the project, a to-do list, is very simple. I picked this simple purpose as the goal of this project is to become more familiar with AWS and CDK. The stack stays almost within the free tier of AWS. The custom domain costs money, the routes in Route53 and the github access token in the Secrets Manager. 

# How to use the stack?

Remember that the user themself needs to do the following things:

* Get the domain from route 53.
* Create a certificate for the domain in the Virginia (us-east-1) region. Put the ARN of the certificate in the cdk.context.json
* Create a Secret with name `github-token` in Secrets Manager. Populate it with the Github personal access token.
* Now you can deploy the pipeline to AWS with `npm run all:deploy`. This will build the assets and deploy the stack to AWS.
* Go into ACM and add the required entries to Route53 for the certificate.

# TODO
- [x] Make sure the CDK pipeline has the possibility to take on the right role and do the correct actions.
- [x] Make sure CDK Pipeline actually deploys the application instead of only the pipeline Construct.
- [x] Fix the env variables for the webapp build.
- [x] Implement react router.
- [x] Add blog.
- [x] Look into uses of matcha [https://matcha.mizu.sh/#article]
- [x] Configure automated fix of linting and formatting.
- [x] Add selected navigation.
- [x] Protect Github branch creation.
- [x] Add tests to check if the application is working.
- [x] Add tests to check if the formatting and linting is correct.
- [x] Add blog post about effort.

# Notes
* Currently the CDK pipeline is turned off to reduce costs. Deploying is being done locally.