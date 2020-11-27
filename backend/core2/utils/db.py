import json
import os
from typing import Optional

import attr
import psycopg2
from psycopg2.extras import RealDictCursor

from . import log

logger = log.get(__name__)


@attr.s(auto_attribs=True)
class DbTestInfo:
    data: str

    def serialize(self) -> str:
        data = self.__dict__
        return json.dumps(data, ensure_ascii=False, sort_keys=True)


class DBBroker:
    DB_NAME = "deaflizards"

    class DBConnection:
        def __init__(self):
            connect_data = dict(
                host=os.environ["DB_HOST"],
                port=os.environ["DB_PORT"],
                user=os.environ["DB_USER"],
                password=os.environ["DB_PASSWORD"],
                dbname=DBBroker.DB_NAME,
            )
            self.connection = psycopg2.connect(**connect_data)
            self.cursor = self.connection.cursor(cursor_factory=RealDictCursor)
            logger.info("Connected to DB")

        def __enter__(self):
            return self.connection, self.cursor

        def __exit__(self, ex_type, exp, traceback):
            self.cursor.close()
            self.connection.close()
            return ex_type is None

    def get_data(self, data_id: int) -> Optional[DbTestInfo]:
        with DBBroker.DBConnection() as (_, cursor):
            cursor.execute(
                """
                    SELECT data
                    FROM test_table
                    WHERE data_id=%(data_id)s
                    """,
                dict(data_id=data_id),
            )
            logger.debug("Query executed with data_id: %d", data_id)
            if data := cursor.fetchone():
                logger.debug("Got result for query with data_id: %d", data_id)
                return DbTestInfo(**data)
            return None

    def test(self, data_id: int) -> bool:
        with DBBroker.DBConnection() as (_, cursor):
            cursor.execute("SELECT %(data_id)s", dict(data_id=data_id))
            logger.debug("Test query executed")
            if result := cursor.fetchone():
                logger.debug("Test query executed sucessfully")
                return result['?column?'] == data_id
            return False
