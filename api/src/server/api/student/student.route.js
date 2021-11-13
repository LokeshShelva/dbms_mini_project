const express = require('express');
const StudentModel = require('../../Models/Student.model');
const ClassModel = require('../../Models/Class.model');
const ParentModel = require('../../Models/Parent.model');
const ResultModel = require('../../Models/Result.model');
const SubjectModel = require('../../Models/Subject.Model');
const GradeModel = require('../../Models/Grade.model');
const ExamModel = require('../../Models/Exam.model');
const knex = require('../../db');

const router = express.Router()

const getAllDetailsOfStudent = async (fun) => {
    const father = await StudentModel.relatedQuery('father').for(fun)
    const mother = await StudentModel.relatedQuery('mother').for(fun)
    const address = await StudentModel.relatedQuery('address').for(fun)

    return { father: father[0], mother: mother[0], address: address[0] };
}

router.get('/', async (req, res) => {
    const student = await StudentModel.query();
    let result = [];
    for (stu of student) {
        let detail = await getAllDetailsOfStudent(stu.id)
        result.push({ ...stu, ...detail })
    }
    res.json(result);
})

router.get('/:id/result', async (req, res) => {
    const results =
        await knex
            .column(['Result.id', 'academic_year', 'score', 'exam', 'subject', 'grade'])
            .select()
            .from('Result')
            .where('student_id', req.params.id)
            .leftJoin('Subject', 'Subject.id', 'Result.subject_id')
            .leftJoin('Grade', 'Grade.id', 'Result.grade_id')
            .leftJoin('Exam', 'Exam.id', "Result.exam_id")
            .where(req.query)

    res.json(results)
})

router.get('/:id', async (req, res) => {
    const student = await StudentModel.query().findById(req.params.id);
    const subQuery = StudentModel.query().findById(req.params.id);
    const details = await getAllDetailsOfStudent(subQuery);
    console.log(student)
    res.json({ ...student, ...details });
})

router.get('/class_id/:class', async (req, res) => {
    const cls = await ClassModel.query().where('id', req.params.class).limit(1);
    const std = await StudentModel.query().where('class_id', cls[0].id).orderBy('id');
    console.log(std)
    res.json({ msg: "hi" })
})

router.get('/user_id/:id', async (req, res) => {
    const student = await StudentModel.query().where('user_id', req.params.id);
    const subQuery = StudentModel.query().where('user_id', req.params.id);
    const details = await getAllDetailsOfStudent(subQuery);

    res.json({ ...student[0], ...details })
})

module.exports = router;