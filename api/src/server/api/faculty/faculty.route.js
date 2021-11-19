const express = require('express');
const AddressModel = require('../../Models/Address.model');
const FacultyModel = require('../../Models/Faculty.model');
const RoleModel = require('../../Models/Role.model');
const knex = require('../../db');
const { tableNames } = require('../../../constants/tableNames');

const router = express.Router();

router.get('/user_id/:id/class', async (req, res) => {

    const results = await knex
        .column(['class_id', 'section_id', 'class', 'subject', 'subject_id', 'section'])
        .from(`${tableNames.faculty}`)
        .distinct()
        .where('user_id', req.params.id)
        .leftJoin(`${tableNames.teachingClassSubject}`, `${tableNames.teachingClassSubject}.faculty_id`, `${tableNames.faculty}.id`)
        .leftJoin(`${tableNames.class}`, `${tableNames.class}.id`, `${tableNames.teachingClassSubject}.class_id`)
        .leftJoin(tableNames.section, `${tableNames.section}.id`, `${tableNames.class}.section_id`)
        .leftJoin(tableNames.subject, `${tableNames.subject}.id`, `${tableNames.teachingClassSubject}.subject_id`);

    res.json(results)
})

router.get('/user_id/:id', async (req, res) => {

    const result =
        await knex.select().from(`${tableNames.faculty}`).where(`${tableNames.faculty}.user_id  `, req.params.id)
            .leftJoin(`${tableNames.address}`, `${tableNames.address}.id`, `${tableNames.faculty}.address_id`)
            .leftJoin(`${tableNames.role}`, `${tableNames.role}.id`, `${tableNames.faculty}.role_id`);

    res.json(result);
})

router.get('/role/:role', async (req, res) => {
    const subQuery = knex.column('id').select().from(`${tableNames.role}`).where('role', req.params.role);
    const faculty = await knex.select().from(`${tableNames.faculty}`).where('role_id', 'in', subQuery)
    res.json(faculty);
})

router.get('/:id', async (req, res) => {

    const result =
        await knex.select().from(`${tableNames.faculty}`).where(`${tableNames.faculty}.id`, req.params.id)
            .leftJoin(`${tableNames.address}`, `${tableNames.address}.id`, `${tableNames.faculty}.address_id`)
            .leftJoin(`${tableNames.role}`, `${tableNames.role}.id`, `${tableNames.faculty}.role_id`);

    res.json(result);
})

router.get('/', async (req, res) => {
    const faculty = await FacultyModel.query().select(
        req.query.small && ['id', 'name', 'dob', 'salary']
    ).orderBy('id');
    res.json(faculty)
})

router.post('/', async (req, res) => {
    const { house_no, street_name, city, state, ...faculty } = req.body;
    const address = { house_no, street_name, city, state };
    try {
        const result = await AddressModel.query().insert(address);
        await FacultyModel.query().insert({ ...faculty, "address_id": result.id });
        res.status(200);
        res.json("Successful");
    } catch (e) {
        console.error(e);
        res.status(500);
        res.json(e);
    }
})

module.exports = router;