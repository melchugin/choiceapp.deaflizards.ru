import logging
from argparse import ArgumentParser, Namespace

from aiogram import Dispatcher
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.dispatcher.filters import IsReplyFilter, Text
from aiogram.utils.executor import start_polling

from .bot import AskHrState, AskState, ChatBot, CVState, StatState
from .config import BotConfig

logging.basicConfig(
    level=logging.DEBUG,
    format="[%(asctime)s.%(msecs)03d] %(name)-32s %(levelname)8s %(message)s",
    datefmt="%Y.%m.%d %H:%M:%S",
)


TIMEOUT = 120


def parse_args() -> Namespace:
    parser = ArgumentParser(description="Telegram bot for ChoiceAPP (by Deaf Lizards)")
    parser.add_argument("-t", "--token", dest="token", required=True, help="Telegram API Bot token")

    return parser.parse_args()


def main() -> None:
    args = parse_args()
    bot_config = BotConfig(args.token)

    bot = ChatBot(bot_config)
    storage = MemoryStorage()
    disp = Dispatcher(bot=bot, storage=storage)
    bot.set_dispatcher(disp)

    # /help command
    disp.register_message_handler(bot.help_handler, commands=["help"], state="*")

    # /cancel command
    disp.register_message_handler(bot.cancel_handler, commands=["cancel"], state="*")
    disp.register_message_handler(bot.cancel_handler, Text(equals="cancel", ignore_case=True), state="*")

    # /start command
    # /restart command
    disp.register_message_handler(bot.start_handler, commands=["start", "restart"])

    # /cv command
    disp.register_message_handler(bot.cv_handler, commands=["cv"])
    disp.register_message_handler(bot.cv_process, state=CVState.process)

    # /status command
    disp.register_message_handler(bot.status_handler, commands=["status"])

    # /ask_stop command
    disp.register_message_handler(bot.ask_stop, commands=["ask_stop"], state="*")

    # /ask command
    disp.register_message_handler(bot.ask_handler, commands=["ask"])
    disp.register_message_handler(bot.ask_stop_info_message, state=AskState.start)
    disp.register_message_handler(bot.ask_continue, state=AskState.discussion)
    disp.register_message_handler(bot.ask_hr_response, IsReplyFilter(True), state=AskHrState.discussion)

    # /stat command
    disp.register_message_handler(bot.stat_handler, commands=["stat"])
    disp.register_message_handler(bot.stat_process, state=StatState.choice)

    # run
    start_polling(disp, reset_webhook=False, timeout=TIMEOUT)


if __name__ == "__main__":
    main()
