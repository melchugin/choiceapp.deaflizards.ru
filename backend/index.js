const express = require('express');
const PORT = process.env.PORT || 3000;
const CORE = process.env.CORE || "http://choiceapp-core:9191";
const axios = require('axios');
const bodyParser = require('body-parser'); //connects bodyParsing middleware

const app = express();
app.use(bodyParser({ defer: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));

app.post(`/api/v1/test_get`, (req, res) => {
    try {
        // console.log(444, req);
        console.log('Incomming request')

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
