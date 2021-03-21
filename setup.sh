#!/bin/bash
set -e
# nvm use
npm install
echo "Run aws configure if you are not logged into the AWS cli"
echo "Creating execution role"
FUNCTION_NAME=buttondown-proxy
aws iam create-role --role-name ${FUNCTION_NAME} --assume-role-policy-document file://trust-policy.json
aws iam attach-role-policy --role-name ${FUNCTION_NAME} --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws lambda create-function --function-name ${FUNCTION_NAME} \
    --zip-file fileb://function.zip --handler index.handler --runtime nodejs14.x \
    --role arn:aws:iam::${AWS_USER_ID}:role/lambda-ex