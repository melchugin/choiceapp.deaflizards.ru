create table public.positions
(
    id          serial  not null
        constraint positions_pk
            primary key,
    name        varchar not null,
    icon        varchar not null,
    description text
);

alter table public.positions
    owner to postgres;

create unique index positions_id_uindex
    on public.positions (id);

create table public.vacancies
(
    id              serial  not null,
    position_id     integer not null,
    description     text,
    work_experience smallint[],
    duties          character varying(150)[],
    demands         character varying(150)[],
    conditions      character varying(150)[]
);

alter table public.vacancies
    owner to postgres;

