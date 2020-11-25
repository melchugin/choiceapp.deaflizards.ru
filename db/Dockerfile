FROM postgres:13.1

COPY *.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_DB=deaflizards

HEALTHCHECK --interval=5m --timeout=5s --start-period=1m --retries=2 CMD psql -h localhost -U postgres deaflizards || exit 1
