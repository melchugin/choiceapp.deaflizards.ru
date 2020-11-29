FROM node:15.3-stretch

# Set timezone
RUN ln -sf /usr/share/zoneinfo/Europe/Moscow /etc/localtime

#Set label for docker-registry
LABEL org.opencontainers.image.source https://github.com/melchugin/choiceapp.deaflizards.ru

# Set language
ENV LANG=en_US.UTF-8

#Prepare application files
WORKDIR /app
COPY . .

#Install and build application
RUN npm install --production && npm run build

#Run application
CMD ["npm", "start"]
