FROM node:alpine as builder

WORKDIR /app
COPY package.json yarn.lock ./
ENV CI=1
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build -- --output-path=/dist

# Deploy our Angular app to NGINX
FROM nginx:alpine

## Replace the default nginx index page with our Angular app
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder app/dist/browser /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/gzip.conf /etc/nginx/gzip.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]