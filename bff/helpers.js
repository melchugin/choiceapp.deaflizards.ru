const Pool = require('pg-pool');

const DB_NAME = process.env.DB_NAME || `choiceapp`;
const DB_USER = process.env.DB_USER || `postgres`;
const DB_HOST = process.env.DB_HOST || `choiceapp-db-dev`;
const DB_PORT = process.env.DB_PORT || 5432;
const DB_PASSWORD = process.env.DB_PASSWORD || 'ajsj-dY&%-ghHG-SDW!-@#ED';

const pool = new Pool({
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
});

const pgQuery = (query, values, params) => new Promise((res, rej) =>
    pool.connect()
        .then(client => {
            return client.query(query, values)
                .then(rows => {
                    client.release()
                    res(rows);
                })
                .catch(e => {
                    client.release();
                    console.error(e);
                    rej(e);
                });
        })
        .catch(e => {
            rej(e);
            console.error(e);
        })
);

module.exports = pgQuery;
