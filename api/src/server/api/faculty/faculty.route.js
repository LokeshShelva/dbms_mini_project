const express = require('express');
const FacultyModel = require('../../Models/Faculty.model');
const RoleModel = require('../../Models/Role.model');

const router = express.Router();

router.get('/:role?', async (req, res) => {
    const role = await RoleModel.query().where('role', req.params.role).select('id');
    const faculty = await FacultyModel.query().where('role_id', role[0].id).select(
        req.query['small'] == 'true' ? ['id', 'name', 'dob', 'salary'] : []
    );

    res.status(200);
    res.json(faculty);
})

module.exports = router;