# Simple Lambda Proxy

An AWS Lambda function for setting up an AWS API Gateway proxy API for
[Buttondown](https://buttondown.email/settings/programming). Use case is to set
up custom subscription forms without revealing your private Buttondown API key.

Uses ZIP file deployment to use Axios/other NPM dependencies.

[Deploy Lambda function from CLI](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-awscli.html)

Requires installing [the AWS-CLI](https://aws.amazon.com/cli/)
