const pgQuery = require(`./helpers`);

const express = require('express');
const apiRoutes = require('./routes');
const axios = require('axios');
const PORT = process.env.PORT || 3000;
const CORE = process.env.CORE || `http://choiceapp-backend-dev:9191`;

const app = express();

app.use('/api/v1/', apiRoutes);

app.get(`/api/v1/time`, (req, res) => {
    try {
        res.json({time: pgQuery(`SELECT localtime;`)});
    } catch (e) {
        res.status(500).json({error: e})
    }

});


app.post(`/api/v1/test_get`, (req, res) => {
    try {
        axios({
                method: `post`,
                url: CORE,
                data: {
                    "command": "do",
                    "data_id": req.body.data_id,
                }
            }
        ).then((response) => {
            res.status(200)
                .json({
                    data_id: req.body.data_id,
                    data: response.data.data,
                });
        }).catch((error, r) => {
            res.status(500)
                .json({
                    error: `Всё очень плохо`
                });
            console.log(2, error, r);
        });
    } catch (e) {
        console.log(e);
    }
});

app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}!`);
});
