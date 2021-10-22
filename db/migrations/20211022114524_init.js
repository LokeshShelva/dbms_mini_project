const Knex = require('knex');

/** 
 * @param {Knex} knex 
*/

exports.up = async (knex) => {
    await knex.schema.createTable('Student', (table) => {
        table.increments().notNullable();
        table.string('name', 100).notNullable();
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable('Student')
};
