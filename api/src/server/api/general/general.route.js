const express = require('express');
const tableNames = require('../../../constants/tableNames');
const RoleModel = require('../../Models/Role.model');

const router = express.Router();

router.get("/roles", async (req, res) => {
    const roles = await RoleModel.query().orderBy('id');
    res.json(roles);
})

module.exports = router;