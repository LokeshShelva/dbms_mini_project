const express = require('express');
const StudentModel = require('../../Models/Student.model');
const ClassModel = require('../../Models/Class.model')

const router = express.Router()

router.get('/:class', async (req, res) => {
    const cls = await ClassModel.query().where('id', req.params.class).limit(1);
    const std = await StudentModel.query().where('class_id', cls[0].id);
    console.log(std)
    res.json({ msg: "hi" })
})

module.exports = router;