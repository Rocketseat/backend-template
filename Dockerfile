FROM node:16-alpine AS migration
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
ENV NODE_ENV production
ENV npm_config_yes true
WORKDIR /var/app
RUN mkdir src
COPY prisma prisma/
CMD npx prisma migrate deploy

FROM node:16-alpine AS dependencies
WORKDIR /var/app
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine AS build
ENV NODE_ENV production
WORKDIR /var/app
COPY --from=dependencies /var/app/node_modules node_modules/
COPY . .
RUN yarn build

FROM node:16-alpine AS prodDependencies
WORKDIR /var/app
COPY package.json yarn.lock ./
RUN yarn install --production=true --frozen-lockfile

FROM node:16-alpine AS package
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
ENV NODE_ENV production
WORKDIR /var/app
RUN mkdir src
COPY --from=prodDependencies /var/app/package.json package.json
COPY --from=prodDependencies /var/app/node_modules node_modules/
COPY --from=build /var/app/build build/
COPY --from=build /var/app/prisma prisma/
RUN wget -O /var/app/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64 && \
  chmod -v +x /var/app/dumb-init
RUN npx prisma generate
RUN npx pkg@5.5.2 . -o $SERVICE_NAME
RUN chmod -v +x /var/app/$SERVICE_NAME

FROM node:16-alpine AS runtime
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
ARG VERSION="0.0.1"
ENV VERSION $VERSION
ARG COMMIT
ENV COMMIT $COMMIT
ENV NODE_ENV production
WORKDIR /var/app
USER node
# Do not remove the next two lines, if you do, an EACCES (permission denied) error will occur
COPY --chown=node:node --from=package /var/app/src /src/
COPY --chown=node:node --from=package /var/app/src src/
# :)
COPY --chown=node:node --from=package /var/app/dumb-init dumb-init
COPY --chown=node:node --from=package /var/app/$SERVICE_NAME $SERVICE_NAME
ENTRYPOINT ["/var/app/dumb-init", "--"]
CMD ["/var/app/$SERVICE_NAME"]
