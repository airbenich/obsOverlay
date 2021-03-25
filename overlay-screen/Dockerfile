FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
WORKDIR /overlay-screen
COPY . /overlay-screen
EXPOSE 3000 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]