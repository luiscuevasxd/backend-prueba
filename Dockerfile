FROM node:21.1.0 as project-build
WORKDIR /app

## Copy files
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY tsup.config.ts ./
COPY tsconfig.paths.json ./

## Install
RUN ls -a
RUN yarn install
RUN yarn build

FROM node:21.1.0 as project
WORKDIR /app
COPY package.json ./

## ARGS
ARG STOCK_SYNCHRONIZER_SERVICES_PORT

RUN yarn install --only=production
COPY --from=0 /app/build .
RUN npm install pm2 -g

EXPOSE 6001
CMD ["pm2-runtime", "project-services/app.js"]