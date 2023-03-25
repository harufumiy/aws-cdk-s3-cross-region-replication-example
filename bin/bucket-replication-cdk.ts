#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DestinationBucketStack } from '../lib/destination-bucket-stack';
import { SourceBucketStack } from '../lib/source-bucket-stack';

const app = new cdk.App();

const sourceBucketName = `SET YOUR BUCKET NAME`;
const destinationBucketName = `SET YOUR BUCKET NAME`;

const destinationBucketStack = new DestinationBucketStack(app, 'DestinationBucketStack', {
  stackName: `destination-bucket-stack`,
  destinationBucketName,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'ap-northeast-3' },
});

const sourceBucketStack = new SourceBucketStack(app, 'SourceBucketStack', {
  stackName: `source-bucket-stack`,
  sourceBucketName,
  destinationBucketName,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'ap-northeast-1' },
});
sourceBucketStack.addDependency(destinationBucketStack);
