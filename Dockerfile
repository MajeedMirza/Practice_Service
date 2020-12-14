FROM node:15.3.0-alpine3.12

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

RUN apk --update --no-cache add ca-certificates && \
    apk --update --no-cache upgrade
ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt

COPY --chown=node:node package*.json ./

USER node

RUN npm ci --production && \
    rm package-lock.json
    
COPY --chown=node:node . ./

# RUN rm -rf /usr/local/lib/node_modules/npm/ /usr/local/bin/npm

EXPOSE 9091

CMD ["node", "--use-openssl-ca", "server.js"]