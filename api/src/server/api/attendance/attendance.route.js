const express = require('express');
const { tableNames } = require('../../../constants/tableNames');
const knex = require('../../db');

const router = express.Router();

router.get('/:class_id', async (req, res) => {
    const result = await knex(`${tableNames.attendance}`)
        .where('class_id', req.params.class_id)
        .where(req.query.date ? knex.raw('date = ?', new Date(req.query.date)) : []);
    res.json(result)
})

module.exports = router;