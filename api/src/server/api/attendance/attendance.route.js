const express = require('express');
const { tableNames } = require('../../../constants/tableNames');
const knex = require('../../db');

const router = express.Router();

router.get('/:class/section/:section_id', async (req, res) => {
    const sub = await knex(`${tableNames.attendance}`).column(['Student.id', 'name', 'date']).where('student_id', 'in', function () {
        this.select().column('id').from(`${tableNames.student}`).where('class_id', function () {
            this.select().column('id').from(`${tableNames.class}`).where({
                class: req.params.class,
                section_id: req.params.section_id
            })
        })
    }).leftJoin('Student', 'Student.id', 'Attendance.student_id').where(req.query);
    res.json(sub)
})

router.post('/attendance', async (req, res) => {
    const result = await knex(tableNames.attendance).insert(req.body)
    res.json(result)
})

module.exports = router;