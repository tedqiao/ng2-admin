FROM node:latest

RUN git clone https://github.com/tedqiao/ng2-admin.git /var/www \
    && cd /var/www \
    && npm install --global rimraf \
    && npm run clean \
    && npm install --global webpack webpack-dev-server typescript@beta \
    && npm install

EXPOSE 3000

WORKDIR /var/www
ENTRYPOINT ["npm", "run", "build:project"]
