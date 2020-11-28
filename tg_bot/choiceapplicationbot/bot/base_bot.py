import logging

import aiogram.utils.markdown as md
from aiogram import Bot, Dispatcher
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.types import Message, ParseMode, ReplyKeyboardMarkup, ReplyKeyboardRemove

from ..config import BotConfig
from ..db import DBBroker


class StatState(StatesGroup):
    choice = State()


log = logging.getLogger(__name__)


class BaseBot(Bot):
    ASK_HISTORY = "ask_history"

    def __init__(self, config: BotConfig):
        self.db = DBBroker()
        self.disp: Dispatcher = None
        super().__init__(token=config.telegram_token)

    def set_dispatcher(self, disp: Dispatcher) -> None:
        self.disp = disp

    async def cancel_handler(self, message: Message, state: FSMContext) -> None:
        current_state = await state.get_state()
        if current_state is None:
            return

        log.info("Cancel state %r", current_state)
        await state.finish()
        await message.reply("Cancelled.", reply_markup=ReplyKeyboardRemove())

    async def help_handler(self, message: Message) -> None:
        await message.answer(
            md.text(
                md.bold("Help"),
                md.escape_md("/help - Отобразить справку о командах бота"),
                md.escape_md("/cancel - Отменить текущую команду"),
                md.escape_md("/status - Получить текущий статус рассмотрения резюме"),
                md.escape_md("/ask - Задать вопрос HR-менеджеру"),
                md.escape_md("/stat - Получить статистику о пользователе (доступно только HR-менеджерам)"),
                sep="\n",
            ),
            parse_mode=ParseMode.MARKDOWN_V2,
        )

    async def status_handler(self, message: Message) -> None:
        if await self.db.is_user_hr(message.from_user.id):
            await message.answer("Это команда только для соискателей.")
            return
        tg_user_id = message.from_user.id
        status = await self.db.get_user_status(tg_user_id)
        await message.reply(f"Ваш текущий статус: {status}")

    async def stat_handler(self, message: Message, state: FSMContext) -> None:
        is_hr = await self.db.is_user_hr(message.from_user.id)
        if not is_hr:
            await message.reply("Эта команда доступна только HR-менеджерам. :)")
            return

        await message.answer("Not yet implemented")

        # async with state.proxy() as data:
        #     markup = ReplyKeyboardMarkup(resize_keyboard=True, one_time_keyboard=True, selective=True)
        #     markup.add(*data[self.ASK_HISTORY].keys())

        #     await message.answer(
        #         "Выберите соискателя для которого хотите получить эмоциональную оценку текста", reply_markup=markup
        #     )

    async def stat_process(self, message: Message, state: FSMContext) -> None:
        async with state.proxy() as data:
            text = data[self.ASK_HISTORY][message.text]
            # send text to backend
            # get response
            response = "Настроение положительное"
            await message.reply(f"ML оценка характера беседы (MOKE): {response}")
