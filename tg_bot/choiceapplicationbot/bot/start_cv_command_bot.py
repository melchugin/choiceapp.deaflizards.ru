import logging

from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.types import Message

from .base_bot import BaseBot


class CVState(StatesGroup):
    process = State()


log = logging.getLogger(__name__)


class StartCommandBot(BaseBot):
    async def start_handler(self, message: Message) -> None:
        if await self.db.is_user_hr(message.from_user.id):
            # hr
            await message.reply("Добро пожаловать в систему поддержки подбора персонала!")
            return
        if await self.db.check_user(message.from_user.username):
            # known user
            await self.db.update_user_id(message.from_user.id, message.from_user.username)
            status = await self.db.get_user_status(message.from_user.id)
            await message.reply(f"Привет! Твой текущий статус: {status}")
        else:
            # new user
            await self.db.add_user(message.from_user.id, message.from_user.username)
            await message.answer(
                "Рады что ты к нам присоединился! Не хочешь отправить резюме? Если да, выполни команду /cv"
            )

    async def cv_handler(self, message: Message) -> None:
        await CVState.process.set()
        await message.reply("Пришли мне своё резюме.\nФИО\nОпыт работы\nЖелаемая вакансия\nНавыки\n")

    async def cv_process(self, message: Message, state: FSMContext) -> None:
        if len(message.text.splitlines()) != 4:
            await message.answer("Пожалуйста, укажи резюме в указанном формате")
            return
        name, expiriens, vacancy, skills = message.text.splitlines()
        cv_id = await self.db.upload_cv(name, expiriens, vacancy, skills, message.from_user.id)
        # send cv_id to bbf
        await message.answer(
            f"Ваше резюме успешно добавлено (идентификатор {cv_id}! "
            "Вскоре с вами свяжется HR-менеджер. Оставайтесь на связи с Choice!"
        )
        await state.finish()
