import attr


@attr.s(auto_attribs=True)
class BotConfig:
    telegram_token: str = attr.ib(converter=str)
