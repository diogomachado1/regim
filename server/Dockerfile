
FROM node:alpine

LABEL version="0.1.0"

COPY ./ /regim

WORKDIR /regim

RUN yarn && yarn build

CMD yarn migrations && yarn start
