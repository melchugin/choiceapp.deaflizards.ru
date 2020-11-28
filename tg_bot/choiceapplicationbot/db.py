import logging
import os
from typing import Optional

import asyncpg
import attr

log = logging.getLogger(__name__)


@attr.s(auto_attribs=True)
class TestData:
    data: str


class DBBroker:
    DB_NAME = "deaflizards"

    class DBConnection:
        def __init__(self) -> None:
            self.connect_data = dict(
                host=os.environ["DB_HOST"],
                port=os.environ["DB_PORT"],
                user=os.environ["DB_USER"],
                password=os.environ["DB_PASSWORD"],
                database=DBBroker.DB_NAME,
            )

        async def __aenter__(self) -> asyncpg.Connection:
            self.connection = await asyncpg.connect(**self.connect_data)
            return self.connection

        async def __aexit__(self, ex_type, exp, traceback) -> bool:  # type: ignore
            await self.connection.close()
            return ex_type is None

    async def check_user(self, tg_user_name: str) -> bool:
        async with DBBroker.DBConnection() as connection:
            return (
                await connection.fetchval(
                    """
                    SELECT id
                    FROM users_table
                    WHERE telegram_user_name=$1
                """,
                    tg_user_name,
                )
                is not None
            )
        return False

    async def add_user(self, tg_user_id: int, tg_user_name: str) -> None:
        async with DBBroker.DBConnection() as connection:
            await connection.execute(
                """
                    INSERT INTO users_table
                    (telegram_user_name, telegram_user_id)
                    VALUES ($1, $2)
                """,
                tg_user_name,
                tg_user_id,
            )

    async def update_user_id(self, tg_user_id: int, tg_user_name: str) -> bool:
        async with DBBroker.DBConnection() as connection:
            if await connection.fetchval(
                """
                    SELECT id
                    FROM users_table
                    WHERE telegram_user_id=$1
                """,
                tg_user_id,
            ):
                return False
            return (
                await connection.execute(
                    """
                    UPDATE users_table
                    SET telegram_user_id=$1
                    WHERE telegram_user_name=$2
                """,
                    tg_user_id,
                    tg_user_name,
                )
                is not None
            )
        return False

    async def get_user_status(self, tg_user_id: int) -> Optional[str]:
        async with DBBroker.DBConnection() as connection:
            status: str = await connection.fetchval(
                """
                    SELECT status
                    FROM users_table
                    WHERE telegram_user_id=$1
                """,
                tg_user_id,
            )
            log.debug("Status for tg user %s is: %s", tg_user_id, status)
        return status

    async def is_user_hr(self, tg_user_id: str) -> bool:
        async with DBBroker.DBConnection() as connection:
            result = await connection.fetchval(
                """
                    SELECT id
                    FROM hr_table
                    WHERE telegram_user_id=$1
                """,
                tg_user_id,
            )
            log.debug("tg user id %s is HR: %s", tg_user_id, result)
        return result is not None

    async def get_hr_for_user(self, tg_user_id: str) -> Optional[int]:
        async with DBBroker.DBConnection() as connection:
            hr_user_id: int = await connection.fetchval(
                """
                    SELECT hr.telegram_user_id
                    FROM hr_table as hr
                    JOIN users_table as u ON u.hr_id = hr.id
                    WHERE u.telegram_user_id=$1
                """,
                tg_user_id,
            )
            if not hr_user_id:
                hr_user_id = await connection.fetchval(
                    """
                        SELECT telegram_user_id
                        FROM hr_table
                        WHERE supervicer='t'
                    """
                )
        return hr_user_id

    async def upload_cv(self, name: str, expirience: int, vacancy: str, skills: str, tg_user_id: int) -> Optional[int]:
        async with DBBroker.DBConnection() as connection:
            if not await connection.execute(
                """
                    INSERT INTO cv_table
                    (user_id, name, expirience, vacancy, skills)
                    VALUES ((SELECT id FROM users_table WHERE telegram_user_id=$1), $2, $3, $4, $5)
                """,
                tg_user_id,
                name,
                expirience,
                vacancy,
                skills,
            ):
                return None
            cv_id: int = await connection.fetchval(
                """
                    SELECT id
                    FROM cv_table
                    WHERE user_id = (
                        SELECT id
                        FROM users_table
                        WHERE id=$1
                    )
                """,
                tg_user_id,
            )
            return cv_id
        return None
