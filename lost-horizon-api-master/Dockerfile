# Part 1: Build
ARG BASE_REGISTRY=registry1.dso.mil
ARG BASE_IMAGE=ironbank/opensource/nodejs/nodejs16
ARG BASE_TAG=16.15.0

FROM ${BASE_REGISTRY}/${BASE_IMAGE}:${BASE_TAG}

WORKDIR /app

ENV APP_HOME=/app

COPY controllers ${APP_HOME}/controllers/
COPY models ${APP_HOME}/models
COPY routes ${APP_HOME}/routes
COPY utils ${APP_HOME}/utils
COPY app.js ${APP_HOME}/
COPY scratchpad.js ${APP_HOME}/
COPY server.js ${APP_HOME}/
COPY package.json ${APP_HOME}/
# COPY package-lock.json ${APP_HOME}/
COPY processes.json ${APP_HOME}/
# COPY yarn.lock ${APP_HOME}/

# Copy Certs
COPY lost-horizon-mongo.pem ${APP_HOME}/
COPY us-gov-west-1-bundle.pem ${APP_HOME}/

# RUN chmod 777 ${APP_HOME}/lost-horizon-mongo.pem
# RUN chmod 777 ${APP_HOME}/us-gov-west-1-bundle.pem

# Install Dependencies
RUN yarn install --production
EXPOSE 4000

CMD ["npm", "run", "pm2-prod-aws"]