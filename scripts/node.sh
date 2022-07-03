#!/usr/bin/env bash

CWD="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"

PROJECT_ROOT="${CWD}/.."
PACKAGE_JSON_PATH="${PROJECT_ROOT}"

DOCKER_NODE_IMAGE='node:16.10.0-alpine3.11'
DOCKER_NODE_ROOT='/var/npm'

docker run -it --rm -w ${DOCKER_NODE_ROOT} -p 35729:35729 -u=$(id -u ${USER}):$(id -g ${USER}) -v ${PACKAGE_JSON_PATH}:${DOCKER_NODE_ROOT}/ $DOCKER_NODE_IMAGE "$@"
