# AWS CDK S3 Cross-Region Replication Example

This repository contains a simple example of how to set up Amazon S3 cross-region replication using the AWS Cloud Development Kit (AWS CDK). Cross-region replication enables you to automatically replicate your S3 objects to a destination bucket in a different AWS region, providing redundancy and faster access to your data.

## Prerequisites

1. [Node.js](https://nodejs.org/en/) 14.x or later
2. [AWS CLI](https://aws.amazon.com/cli/) configured with your AWS account
3. [AWS CDK Toolkit](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html) installed globally (`npm install -g aws-cdk`)

## Repository Structure

.
├── bin
│ ├── bucket-replication-cdk.ts
├── lib
│ ├── destination-bucket-stack.ts
│ ├── source-bucket-stack.ts
└── README.md


- `bin/bucket-replication-cdk.ts`: Contains the AWS CDK stack definition.
- `lib/destination-bucket-stack.ts`: Contains the destination bucket.
- `lib/source-bucket-stack.ts`: Main TypeScript file that contains the source bucket and repolication rule.
- `README.md`: This file.

## Getting Started

1. Clone the repository:

```sh
git clone git@github.com:harufumiy/aws-cdk-s3-cross-region-replication-example.git
cd aws-cdk-s3-cross-region-replication-example
```


2. Install dependencies:

```sh
npm install
```


3. Configure the following variables in `bin/bucket-replication-cdk.ts`:

- `sourceBucketName`: The name of the source S3 bucket.
- `destinationBucketName`: The name of the destination S3 bucket.

4. Deploy the stack:

```sh
cdk deploy --all
```

After the stack is deployed, an S3 bucket will be created in the Tokyo region (ap-northeast-1), and another S3 bucket will be created in the Osaka region (ap-northeast-3). Cross-region replication will be set up between the two buckets.

## Cleaning Up

To delete the resources created by this example, run:

```sh
cdk destroy --all
```

This will remove the S3 buckets and any other resources created by the stack.
