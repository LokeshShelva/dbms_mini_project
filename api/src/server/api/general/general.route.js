const express = require('express');
const { tableNames } = require('../../../constants/tableNames');
const RoleModel = require('../../Models/Role.model');
const knex = require("../../db");

const router = express.Router();

router.get("/roles", async (req, res) => {
    const roles = await RoleModel.query().orderBy('id');
    res.json(roles);
})

router.get("/class/:class/section/:section_id", async (req, res) => {
    const result = await knex(`${tableNames.class}`)
        .orderBy(`${tableNames.class}.id`)
        .where({ class: req.params.class, section_id: req.params.section_id })
    res.json(result)
})

router.get("/class", async (req, res) => {
    const result = await knex(`${tableNames.class}`).select().distinct('class');
    res.json(result)
})

router.get("/section/:class", async (req, res) => {
    const result =
        await knex(`${tableNames.class}`).column(['class', 'section', 'section_id']).where('class', req.params.class)
            .orderBy(`${tableNames.class}.id`)
            .leftJoin(`${tableNames.section}`, `${tableNames.section}.id`, `${tableNames.class}.section_id`);
    res.json(result)
})

router.get("/exam", async (req, res) => {
    const result = await knex(`${tableNames.exam}`).orderBy('id');
    res.json(result)
})

router.get("/academic_year", async (req, res) => {
    const result = await knex(`${tableNames.academicYear}`).orderBy('id');
    res.json(result);
})

router.get('/result/:class_id/:subject_id', async (req, res) => {
    const result = await knex(tableNames.result)
        .column([`${tableNames.result}.id`, 'academic_year', 'score', 'exam', 'subject', 'grade', 'name', 'name'])
        .where('student_id', 'in', function () {
            this.select().column('id').from(tableNames.student).where('class_id', req.params.class_id)
        })
        .where({
            subject_id: req.params.subject_id
        })
        .leftJoin(tableNames.student, `${tableNames.student}.id`, `${tableNames.result}.student_id`)
        .leftJoin('Academic_year', `${tableNames.academicYear}.id`, `${tableNames.result}.academic_year_id`)
        .leftJoin('Subject', `${tableNames.subject}.id`, `${tableNames.result}.subject_id`)
        .leftJoin('Grade', `${tableNames.grade}.id`, `${tableNames.result}.grade_id`)
        .leftJoin('Exam', `${tableNames.exam}.id`, `${tableNames.result}.exam_id`)
        .where(req.query)


    res.json(result);
})

router.post('/result', async (req, res) => {
    const g = await knex(tableNames.grade);
    let grades = {}
    g.forEach((val) => {
        grades[val.grade] = parseInt(val.id)
    })
    let newResults = []

    for (let result of Object.keys(req.body.data)) {
        newResults.push({
            score: parseInt(req.body.data[result].score),
            academic_year_id: parseInt(req.body.academic_year_id),
            exam_id: parseInt(req.body.exam_id),
            student_id: parseInt(result),
            subject_id: parseInt(req.body.subject_id),
            grade_id: grades[req.body.data[result].grade]
        })
    }
    await knex(tableNames.result).insert(newResults)
    res.json("Success")
})

module.exports = router;