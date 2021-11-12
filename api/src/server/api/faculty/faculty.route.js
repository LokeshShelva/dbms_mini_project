const express = require('express');
const AddressModel = require('../../Models/Address.model');
const FacultyModel = require('../../Models/Faculty.model');
const RoleModel = require('../../Models/Role.model');

const router = express.Router();

router.get('/id/:id', async (req, res) => {
    const subQ = FacultyModel.query().where('id', req.params.id)
    const faculty = await FacultyModel.query().where('id', req.params.id);
    const address = await FacultyModel.relatedQuery('address').for(subQ);
    const role = await FacultyModel.relatedQuery('role').for(subQ);
    res.json({ ...faculty[0], address: address[0], role: role[0].role });
})

router.get('/all', async (req, res) => {
    const faculty = await FacultyModel.query().select(
        req.query['small'] == 'true' ? ['id', 'name', 'dob', 'salary'] : []
    ).orderBy('id');
    res.json(faculty)
})

router.get('/:role?', async (req, res) => {
    const role = await RoleModel.query().where('role', req.params.role).select('id');
    const faculty = await FacultyModel.query().where('role_id', role[0].id).select(
        req.query['small'] == 'true' ? ['id', 'name', 'dob', 'salary'] : []
    ).orderBy('id');

    res.status(200);
    res.json(faculty);
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