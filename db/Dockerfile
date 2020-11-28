FROM postgres:13.1
# Set timezone
RUN ln -sf /usr/share/zoneinfo/Europe/Moscow /etc/localtime

COPY *.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_DB=choiceapp

HEALTHCHECK --interval=5m --timeout=5s --start-period=1m --retries=2 CMD psql -h localhost -U postgres choiceapp || exit 1
