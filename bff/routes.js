const express = require('express');
const pg = require('./helpers');

const Router = express.Router();

Router.get('/positions', (req, res) => {
    pg('Select distinct a.id, a.name from public.positions a inner join vacancies b on a.id = b.position_id', [])
        .then(rows => {
            res.json({...rows});
        })
        .catch(console.error);
});

Router.get('/position/:id', (req, res) => {
    const {id} = req.params;
    pg( 'Select salary, description, work_experience, education from public.vacancies where position_id = $1 limit 1', [ id ])
        .then(rows => {
            res.json({...rows});
        })
        .catch(console.error);
});

//

Router.get('/vacancies', (req, res) => {
    pg(`
        Select a.id, a.name, count(*) responses from public.positions a
        inner join resume b
            on a.id = b.position_id
        group by a.id, a.name
        having count(*) < 100
        order by count(*) desc
    `, [])
        .then(rows => {
            res.json({...rows});
        })
        .catch(console.error);
});

Router.get('/vacancy/:id', (req, res) => {
    const {id} = req.params;
    pg(`
        Select a.id, a.name, b.percent, b.id resume_id
        from public.positions a
        inner join resume b
            on a.id = b.position_id
        where a.id = $1
    `,[ id ])
        .then(rows => {
            res.json({...rows});
        })
        .catch(console.error);
});

Router.get('/response/:id', (req, res) => {
    const {id} = req.params;
    pg(`
        Select b.id, a.name, percent, education, qualification, additional_education, experience, salary, skills, additional_skills, literacy, toxicity, horizon
        from public.positions a
        inner join resume b
            on a.id = b.position_id
        where b.id = $1
        limit 1
    `,[ id ])
        .then(rows => {
            res.json({...rows});
        })
        .catch(console.error);
});

module.exports = Router;
