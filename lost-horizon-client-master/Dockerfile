ARG BASE_REGISTRY=registry1.dso.mil
ARG BASE_IMAGE=ironbank/opensource/nodejs/nodejs16
ARG BASE_TAG=16.15.0

FROM ${BASE_REGISTRY}/${BASE_IMAGE}:${BASE_TAG} AS build

WORKDIR /app

ENV APP_HOME=/app

COPY public ${APP_HOME}/public
COPY src ${APP_HOME}/src
COPY nginx ${APP_HOME}/nginx
COPY package.json ${APP_HOME}/package.json
COPY postcss.config.js ${APP_HOME}/postcss.config.js
COPY tailwind.config.js ${APP_HOME}/tailwind.config.js
# COPY yarn.lock ${APP_HOME}/yarn.lock
COPY env.sh ${APP_HOME}/
COPY entrypoint_build_env.sh ${APP_HOME}/

RUN touch ${APP_HOME}/.env
RUN touch ${APP_HOME}/env-config.js

RUN chmod 777 ${APP_HOME}/.env
RUN chmod 777 ${APP_HOME}/env-config.js

RUN yarn install
RUN yarn build

# Stage 2 - NGINX
FROM registry1.dso.mil/ironbank/opensource/nginx/nginx:1.21.6

WORKDIR /usr/share/nginx/html

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/default.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/nginx/gzip.conf /etc/nginx/conf.d/gzip.conf
COPY --from=build /app/env.sh .
COPY --from=build /app/entrypoint_build_env.sh /
COPY --from=build /app/env-config.js /usr/share/nginx/html
COPY --from=build /app/.env /usr/share/nginx/html/

ENTRYPOINT ["/entrypoint_build_env.sh"]

CMD ["nginx", "-g", "daemon off;"]