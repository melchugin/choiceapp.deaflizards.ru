FROM ubuntu:20.04

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
            libatlas-base-dev \
            libglib2.0-0 \
            liblapack-dev \
            libopenblas-dev \
            libpq-dev \
            python3 \
            python3-dev \
            python3-pip \
            python3-venv \
        && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8 \
        && rm -rf /var/lib/apt/lists/*

# Set language
ENV LANG=en_US.UTF-8

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
COPY core2 ./core2
EXPOSE 9090/tcp
CMD ["python3", "-m", "core2"]

HEALTHCHECK --interval=5m --timeout=90s --start-period=60s --retries=1 CMD \
    && curl -s -X POST --data '{"command": "check", "data_id": 2}' http://localhost:9090/ | jq .status | grep -P ^true$
