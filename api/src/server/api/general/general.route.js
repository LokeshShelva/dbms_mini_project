const express = require('express');
const { tableNames } = require('../../../constants/tableNames');
const RoleModel = require('../../Models/Role.model');
const knex = require("../../db");

const router = express.Router();

router.get("/roles", async (req, res) => {
    const roles = await RoleModel.query().orderBy('id');
    res.json(roles);
})

router.get("/class", async (req, res) => {
    const result = await knex(`${tableNames.class}`).select().distinct('class');
    res.json(result)
})

router.get("/section/:class", async (req, res) => {
    const result =
        await knex(`${tableNames.class}`).column(['class', 'section', 'section_id']).where('class', req.params.class)
            .leftJoin(`${tableNames.section}`, `${tableNames.section}.id`, `${tableNames.class}.section_id`);
    res.json(result)
})

module.exports = router;