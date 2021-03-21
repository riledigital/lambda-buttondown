# Simple Lambda Proxy

An AWS Lambda function for setting up an AWS API Gateway proxy API for
[Buttondown](https://buttondown.email/settings/programming). Use case is to set
up custom subscription forms without revealing your private Buttondown API key.

Uses ZIP file deployment to use Axios/other NPM dependencies.

[Deploy Lambda function from CLI](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-awscli.html)

Requires installing [the AWS-CLI](https://aws.amazon.com/cli/)

 # Setup
 
- Setup your .env file with your Buttondown API key in `BUTTONDOWN_SECRET`

- Setup your .env file with your AWS User ID as `AWS_USER_ID`

- Log into AWS CLI with `aws configure`

- Run `./setup.sh` to setup the AWS services + install dependencies.

- `make deploy` to build and deploy to AWS Lambda
