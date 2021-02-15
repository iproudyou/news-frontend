FROM node:alpine as builder

RUN mkdir   /app
WORKDIR     /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install --silent
RUN yarn add react-scripts -g --silent

COPY . /app
RUN yarn build

FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

CMD ["nginx","-g","daemon off;"]

