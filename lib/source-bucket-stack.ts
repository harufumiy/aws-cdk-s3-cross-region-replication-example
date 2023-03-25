import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

interface StackProps extends cdk.StackProps {
  readonly sourceBucketName: string;
  readonly destinationBucketName: string;
}
export class SourceBucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const { sourceBucketName, destinationBucketName } = props;
    const destinationBucket = s3.Bucket.fromBucketArn(this, 'DestinationBucket', `arn:aws:s3:::${destinationBucketName}`)

    const sourceBucket = new s3.Bucket(this, 'SourceBucket', {
      bucketName: sourceBucketName,
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const replicationRole = new iam.Role(this, 'ReplicationRole', {
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('s3.amazonaws.com'),
        new iam.ServicePrincipal('batchoperations.s3.amazonaws.com'),
      ),
    });
    replicationRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "s3:List*",
          "s3:Get*",
        ],
        resources: [
          sourceBucket.bucketArn,
          `${sourceBucket.bucketArn}/*`,
        ],
      }),
    );
    replicationRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "s3:Replicate*",
        ],
        resources: [
          `${destinationBucket.bucketArn}/*`,
        ],
      }),
    );

    (sourceBucket.node.defaultChild as s3.CfnBucket).replicationConfiguration = {
      role: replicationRole.roleArn,
      rules: [
        {
          id: 'ReplicationRule',
          status: 'Enabled',
          priority: 1,
          filter: { prefix: '' },
          deleteMarkerReplication: { status: 'Disabled' },
          destination: {
            bucket: destinationBucket.bucketArn,
            // RTC configuration
            // metrics: { status: 'Enabled', eventThreshold: { minutes: 15 }},
            // replicationTime: { status: 'Enabled', time: { minutes: 15}}
          },
        },
      ],
    };
  }
}
