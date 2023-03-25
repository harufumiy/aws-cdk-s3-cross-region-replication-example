import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

interface StackProps extends cdk.StackProps {
  readonly destinationBucketName: string;
}

export class DestinationBucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const { destinationBucketName } = props;

    new s3.Bucket(this, 'DestinationBucket', {
      bucketName: destinationBucketName,
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

  }
}
