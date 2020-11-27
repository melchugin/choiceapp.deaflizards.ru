# “Цифровой Прорыв” 2020 Финал

## Команда Deaf Lizards

## Кейс Газпромбанк

[![github workflow stage build img]][github workflow stage build]
[![github workflow prod deploy img]][github workflow prod deploy build]

[github workflow stage build img]: https://github.com/melchugin/choiceapp.deaflizards.ru/workflows/Docker%20image%20stage%20CI/badge.svg?branch=stage
[github workflow stage build]: https://github.com/melchugin/choiceapp.deaflizards.ru/actions?query=workflow%3A%22Docker+image+stage+CI%22

[github workflow prod deploy img]: https://github.com/melchugin/choiceapp.deaflizards.ru/workflows/Production%20deploy/badge.svg?branch=master
[github workflow prod deploy]: https://github.com/melchugin/choiceapp.deaflizards.ru/actions?query=workflow%3A%Production+deploy%22

[ChoiceApp](https://choiceapp.deaflizards.ru) — сервис, который поможет кандидату и рекрутеру найти друг друга!

Requirenments
Docker, Docker-Compose

Installation

```sh
git clone it@github.com:melchugin/choiceapp.deaflizards.ru.git
cd choiceapp.deaflizards.ru
docker-compose build --compress --force-rm --parallel --pull
docker-compose up
```

## Containers info
