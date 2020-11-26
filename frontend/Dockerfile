FROM node:15.3-stretch

LABEL org.opencontainers.image.source https://github.com/melchugin/choiceapp.deaflizards.ru

# Enable russian locale
RUN apt-get update \
        && DEBIAN_FRONTEND=noninteractive apt-get install -y \
            apt-utils \
        && DEBIAN_FRONTEND=noninteractive apt-get install -y \
            locales \
        && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8 \
        && rm -rf /var/lib/apt/lists/*

# Set language
ENV LANG=en_US.UTF-8

# Set timezone
RUN ln -sf /usr/share/zoneinfo/Europe/Moscow /etc/localtime

WORKDIR /app
COPY . .
RUN npm install --production \
        && npm run build

CMD ["npm", "start"]
