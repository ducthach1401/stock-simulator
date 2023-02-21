FROM node:16-alpine

WORKDIR /var/www

# Fix 'not get uid/gid'
RUN npm config set unsafe-perm true

# PM2
ENV PM2_EXEC_MODE="fork" \
    PM2_INSTANCES="1"
RUN npm install pm2 -g
COPY pm2-ecosystem.config.js /var/pm2-ecosystem.config.js

# Copy source
COPY . /var/www

# Install dependencies
RUN npm install --production

#
CMD ["pm2-runtime", "start", "/var/pm2-ecosystem.config.js"]
