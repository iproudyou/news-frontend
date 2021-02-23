FROM alpine:3.10 as builder

ENV NODE_VERSION 15.9.0

RUN mkdir   /app
WORKDIR     /app

ENV YARN_VERSION 1.22.5
COPY package.json yarn.lock /app/

RUN yarn install && yarn build

FROM alpine:3.13
ENV NGINX_VERSION 1.19.7

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

ENTRYPOINT ["nginx","-g","daemon off;"]

CMD [ "npm", "start" ]