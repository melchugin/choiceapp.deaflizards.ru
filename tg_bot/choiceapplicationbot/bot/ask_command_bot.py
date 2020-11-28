import logging
from enum import Enum, auto, unique
from typing import List

from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.types import Message

from .start_cv_command_bot import StartCommandBot


@unique
class StorageKey(Enum):
    ASK_HR = auto()


class AskState(StatesGroup):
    start = State()
    discussion = State()
    end = State()


class AskHrState(StatesGroup):
    discussion = State()


log = logging.getLogger(__name__)


class AskBot(StartCommandBot):
    async def ask_handler(self, message: Message) -> None:
        await AskState.start.set()
        await message.reply("Напиши свой вопрос! Я передам его HR-менеджеру и жди ответа!")

    async def ask_stop_info_message(self, message: Message, state: FSMContext) -> None:
        await AskState.discussion.set()
        async with state.proxy() as data:
            if not data.get(StorageKey.ASK_HR):
                data[StorageKey.ASK_HR] = await self.db.get_hr_for_user(message.from_user.id)
            hr_user_id = data[StorageKey.ASK_HR]
            hr_state = self.disp.current_state(chat=hr_user_id, user=hr_user_id)
            await hr_state.set_state(AskHrState.discussion)
            await self.forward_message(hr_user_id, message.chat.id, message.message_id)
            await self._init_ask_storage(hr_state, message.from_user.full_name)
            await self._add_ask_message(hr_state, message)
            await message.answer("Для завершения общения с HR-менеджером выполните команду /ask_stop")

    async def ask_continue(self, message: Message, state: FSMContext) -> None:
        async with state.proxy() as data:
            hr_user_id = data[StorageKey.ASK_HR]
            hr_state = self.disp.current_state(chat=hr_user_id, user=hr_user_id)
            await self._add_ask_message(hr_state, message)
            await self.forward_message(hr_user_id, message.chat.id, message.message_id)

    async def ask_hr_response(self, message: Message) -> None:
        user_chat_id = message.reply_to_message.forward_from.id
        await self.send_message(user_chat_id, message.text)

    async def ask_stop(self, message: Message, state: FSMContext) -> None:
        async with state.proxy() as data:
            hr_user_id = data.get(StorageKey.ASK_HR, await self.db.get_hr_for_user(message.from_user.id))
            await self.send_message(hr_user_id, "Беседа завершена")
            current_state = self.disp.current_state(chat=hr_user_id, user=hr_user_id)
            await current_state.finish()
            await state.finish()
            await message.answer("Надеюсь я помог решить вашу проблему. Оставайтесь на связи с Choice!")

    async def _init_ask_storage(self, hr_state: FSMContext, user_name: str) -> None:
        async with hr_state.proxy() as data:
            if not data.get(self.ASK_HISTORY):
                data[self.ASK_HISTORY] = {}
            if not data[self.ASK_HISTORY].get(user_name):
                data[self.ASK_HISTORY][user_name] = []

    async def _add_ask_message(self, hr_state: FSMContext, message: Message) -> None:
        async with hr_state.proxy() as data:
            data[self.ASK_HISTORY][message.from_user.full_name].append(message.text)
