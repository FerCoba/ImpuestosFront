#!/bin/bash -xe
export AMBIENTE=$(echo $RUNTIME_ENVIRONMENT | tr '[:upper:]' '[:lower:]')
export AMBIENTE_TAG=${PIPELINE_VERSION}
export REGISTRY=634937925704.dkr.ecr.us-east-1.amazonaws.com
export APP=rentascordoba-impuestosfront
export TASK_FAMILY="rentascba-$AMBIENTE-prf-imp-fe"
export SERVICE_NAME="rentascba-$AMBIENTE-prf-imp-fe"
export NEW_DOCKER_IMAGE="$REGISTRY/$APP:$AMBIENTE_TAG"
export CLUSTER_NAME="rentascordoba-prod"



DOCKER_LOGIN=`aws ecr get-login --no-include-email --region us-east-1`
time ${DOCKER_LOGIN}


OLD_TASK_DEF=$(aws ecs describe-task-definition --task-definition $TASK_FAMILY --output json)
NEW_TASK_DEF=$(echo $OLD_TASK_DEF | jq --arg NDI $NEW_DOCKER_IMAGE '.taskDefinition.containerDefinitions[0].image=$NDI')
FINAL_TASK=$(echo $NEW_TASK_DEF | jq '.taskDefinition|{family: .family, volumes: .volumes, containerDefinitions: .containerDefinitions , requiresCompatibilities: .requiresCompatibilities, networkMode: .networkMode, cpu: .cpu, memory: .memory, executionRoleArn: .executionRoleArn}')


PREVIOUS_TASK_DEF_ARN=$(aws ecs describe-services --services $SERVICE_NAME --cluster $CLUSTER_NAME | jq -r '.services[0].taskDefinition')
echo "Deregistering previous task definition"
time aws ecs deregister-task-definition --task-definition $PREVIOUS_TASK_DEF_ARN


time aws ecs register-task-definition --family $TASK_FAMILY --cli-input-json "$(echo $FINAL_TASK)"
time aws ecs update-service --service $SERVICE_NAME --task-definition $TASK_FAMILY --cluster $CLUSTER_NAME
