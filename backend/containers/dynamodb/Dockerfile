FROM node:14
WORKDIR /app

RUN apt update && apt install -y default-jre

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --check-files

COPY serverless.yml serverless.yml
RUN yarn run serverless dynamodb install
