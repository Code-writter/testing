{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "secretsmanager:DescribeSecret",
                "secretsmanager:GetSecretValue",
                "secretsmanager:PutSecretValue",
                "secretsmanager:UpdateSecretVersionStage"
            ],
            "Resource": [
                "arn:aws:secretsmanager:REGION:ACCOUNT_ID:secret:DatabaseSecret-*",
                "arn:aws:secretsmanager:REGION:ACCOUNT_ID:secret:ApiSecret-*"
            ]
        }
    ]
}