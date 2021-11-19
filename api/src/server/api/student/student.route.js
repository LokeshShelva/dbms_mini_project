const express = require('express');
const StudentModel = require('../../Models/Student.model');
const ClassModel = require('../../Models/Class.model');
const knex = require('../../db');
const { tableNames } = require("../../../constants/tableNames");

const router = express.Router()

router.get('/', async (req, res) => {
    const students = await knex.select().from(`${tableNames.student}`)
    res.json(students);
})

/**
 *  Route to return the parents of a given student id
 * @param {int} student_id
 * @returns {Array} Parents array (father and mother)
 */

router.get('/:id/parents', async (req, res) => {
    const result =
        await knex.select().from(`${tableNames.student}`).where(`${tableNames.student}.id`, req.params.id)
            .orderBy(`${tableNames.student}.id`)
            .leftJoin(`${tableNames.parent}`, function () {
                this.on(`${tableNames.parent}.id`, '=', `${tableNames.student}.father_id`).orOn(`${tableNames.parent}.id`, '=', `${tableNames.student}.mother_id`)
            })

    res.json(result)
})

router.get('/:id/result', async (req, res) => {
    const results =
        await knex
            .column([`${tableNames.result}.id`, 'academic_year', 'score', 'exam', 'subject', 'grade'])
            .select()
            .orderBy(`${tableNames.result}.id`)
            .from(`${tableNames.result}`)
            .where('student_id', req.params.id)
            .leftJoin('Academic_year', `${tableNames.academicYear}.id`, `${tableNames.result}.academic_year_id`)
            .leftJoin('Subject', `${tableNames.subject}.id`, `${tableNames.result}.subject_id`)
            .leftJoin('Grade', `${tableNames.grade}.id`, `${tableNames.result}.grade_id`)
            .leftJoin('Exam', `${tableNames.exam}.id`, `${tableNames.result}.exam_id`)
            .where(req.query)

    res.json(results)
})

/**
 * Route to get the details of a student.
 * @param {int} student_id
 * @param {boolean} [small=false] - Quary param: If true returns minimal information. eg: ?small=true
 * @returns {Object} the student details
 */

router.get('/:id', async (req, res) => {
    const result =
        await knex.column(req.query.small && [`${tableNames.student}.id`, 'name', 'dob', 'fee', 'scholarship', 'admission_date'])
            .select().from(`${tableNames.student}`)
            .orderBy(`${tableNames.student}.id`)
            .where(`${tableNames.student}.id`, req.params.id)
            .leftJoin(`${tableNames.address}`, `${tableNames.address}.id`, `${tableNames.student}.address_id`);

    res.json(result);
})

router.get('/class/:class', async (req, res) => {
    const result = await
        knex(`${tableNames.student}`).where('class_id', function () {
            this.select().from(`${tableNames.class}`).column('id').where({
                class: req.params.class,
            }).where(req.query).limit(1);
        })
    res.json(result);
})

router.get('/class_id/:class_id', async (req, res) => {
    const result = await knex(tableNames.student).where('class_id', req.params.class_id)
    res.json(result);
})

/**
 * Route to get the result of a user.
 * @param {int} id
 * @param {Array} [filter] - Query params: The filter who wish to apply. eg: ?exam_id=1&academic_year=2020
 * @returns {Array} array of results.
 */

router.get('/user_id/:user_id/result', async (req, res) => {
    const student_id = await knex.column('id').select().from(`${tableNames.student}`).where({ user_id: req.params.user_id });
    const results =
        await knex
            .column([`${tableNames.result}.id`, 'academic_year', 'score', 'exam', 'subject', 'grade'])
            .select()
            .from(`${tableNames.result}`)
            .where('student_id', student_id[0].id)
            .leftJoin('Subject', `${tableNames.subject}.id`, `${tableNames.result}.subject_id`)
            .leftJoin('Grade', `${tableNames.grade}.id`, `${tableNames.result}.grade_id`)
            .leftJoin('Exam', `${tableNames.exam}.id`, `${tableNames.result}.exam_id`)
            .where(req.query)

    res.json(results)
})

/**
 * Route to get the detail of the user
 * @param {int} id
 * @param {boolean} [small=false] Quary params: If true returns minimal value
 * @returns {Object} the user information
 */

router.get('/user_id/:id', async (req, res) => {
    const result =
        await knex.column(req.query.small && [`${tableNames.student}.id`, 'name', 'dob', 'fee', 'scholarship', 'admission_date'])
            .select().from(`${tableNames.student}`)
            .where(`${tableNames.student}.user_id`, req.params.id)
            .leftJoin(`${tableNames.address}`, `${tableNames.address}.id`, `${tableNames.student}.address_id`);

    res.json(result);
})

module.exports = router;