FROM ubuntu:20.04

LABEL org.opencontainers.image.source https://github.com/melchugin/choiceapp.deaflizards.ru

# Install system packages
RUN apt-get update \
        && DEBIAN_FRONTEND=noninteractive apt-get install -y \
            apt-utils \
        && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
            cmake \
            curl \
            gcc \
            g++ \
            jq \
            locales \
            make \
            python3 \
            python3-dev \
            python3-pip \
            python3-venv \
        && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8 \
        && rm -rf /var/lib/apt/lists/*

# Set language
ENV LANG=en_US.UTF-8

# Set timezone
RUN ln -sf /usr/share/zoneinfo/Europe/Moscow /etc/localtime

# Create and activate python venv
ENV VIRTUAL_ENV=/app/env
RUN python3 -m venv ${VIRTUAL_ENV}
ENV PATH="${VIRTUAL_ENV}/bin:$PATH"

# Install dependencies
WORKDIR /app
COPY requirements.txt .
RUN python3 -m pip install --upgrade pip \
    && python3 -m pip install --upgrade wheel setuptools \
    && python3 -m pip install --no-cache-dir -r requirements.txt

# Run the application
#ENV BOT_TOKEN
COPY choiceapplicationbot ./choiceapplicationbot
CMD ["python3", "-m", "choiceapplicationbot", "--token", "$BOT_TOKEN"]
