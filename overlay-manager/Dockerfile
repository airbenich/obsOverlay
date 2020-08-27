FROM node:12 as overlay-manager-builder

# copy the package.json to install dependencies
WORKDIR /usr/src/overlay-manager
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run ng build --prod

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=overlay-manager-builder /usr/src/overlay-manager/dist/overlay-manager /overlay-manager
EXPOSE 4200 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]