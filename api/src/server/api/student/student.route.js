const express = require('express');
const StudentModel = require('../../Models/Student.model');
const ClassModel = require('../../Models/Class.model');
const ParentModel = require('../../Models/Parent.model');

const router = express.Router()

router.get('/:class', async (req, res) => {
    const cls = await ClassModel.query().where('id', req.params.class).limit(1);
    const std = await StudentModel.query().where('class_id', cls[0].id);
    console.log(std)
    res.json({ msg: "hi" })
})

router.get('/userId/:id', async (req, res) => {
    const student = await StudentModel.query().where('user_id', req.params.id);
    const subQuery = StudentModel.query().where('user_id', req.params.id);
    const father = await StudentModel.relatedQuery('father').for(subQuery);
    const mother = await StudentModel.relatedQuery('mother').for(subQuery);

    res.json({ ...student[0], father: father[0], mother: mother[0] })
})

module.exports = router;