
FROM node

LABEL version="0.1.0"

COPY ./ /regim

WORKDIR /regim

RUN yarn install --production --silent

CMD yarn migrations && yarn start
