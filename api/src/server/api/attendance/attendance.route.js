const express = require('express');
const { tableNames } = require('../../../constants/tableNames');
const knex = require('../../db');

const router = express.Router();

router.get('/:class/section/:section_id', async (req, res) => {

    // let date =    req.query.date ? req.query.date.split('/').reverse() : undefined;

    const sub = knex(`${tableNames.attendance}`).column(['Student.id', 'name', 'date']).where('student_id', 'in', function () {
        this.select().column('id').from(`${tableNames.student}`).where('class_id', function () {
            this.select().column('id').from(`${tableNames.class}`).where({
                class: req.params.class,
                section_id: req.params.section_id
            })
        })
    }).leftJoin('Student', 'Student.id', 'Attendance.student_id');

    let result;

    // console.log(Date.UTC(..."31/10/2021".split("/").reverse()))
    if (req.query.date) {
        let d = req.query.date.split("/").reverse()
        result = await sub.where('date', Date.UTC(...d).toString());
    } else {
        result = await sub;
    }

    res.json(result)
})

module.exports = router;