FROM postgres:13.1

LABEL org.opencontainers.image.source https://github.com/melchugin/choiceapp.deaflizards.ru

COPY *.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_DB=deaflizards

HEALTHCHECK --interval=5m --timeout=5s --start-period=1m --retries=2 CMD psql -h localhost -U postgres deaflizards || exit 1
