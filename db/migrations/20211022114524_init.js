const Knex = require('knex');
const { tableNames, dropOrder } = require('../../src/constants/tableNames');

/** 
 * @param {Knex} knex 
*/

function addRef(table, tableName, notNullable = true, columnName = '') {
    const definition = table
        .integer(`${columnName.toLowerCase() || tableName.toLowerCase()}_id`)
        .unsigned()
        .references('id')
        .inTable(tableName)
        .onDelete('cascade');

    if (notNullable) {
        definition.notNullable();
    }
    return definition;
}


exports.up = async (knex) => {
    await Promise.all([
        knex.schema.createTable(tableNames.user, (table) => {
            table.increments().notNullable();
            table.string('email', 128).notNullable().unique();
            table.string('password').notNullable();
            table.string('role', 50).notNullable();
        }),
        knex.schema.createTable(tableNames.grade, (table) => {
            table.increments().notNullable();
            table.string('grade', 2).notNullable().unique();
        }),
        knex.schema.createTable(tableNames.address, (table) => {
            table.increments().notNullable();
            table.string('house_no', 10).notNullable();
            table.string('street_name', 50).notNullable();
            table.string('city', 20).notNullable();
            table.string('state', 20).notNullable();
        }),
        knex.schema.createTable(tableNames.section, (table) => {
            table.increments().notNullable();
            table.string('section', 2).notNullable();
        }),
        knex.schema.createTable(tableNames.role, (table) => {
            table.increments().notNullable();
            table.string('role', 20).notNullable();
        }),
        knex.schema.createTable(tableNames.subject, (table) => {
            table.increments().notNullable();
            table.string('subject', 10).notNullable();
        }),
        knex.schema.createTable(tableNames.parent, (table) => {
            table.increments().notNullable();
            table.string('name', 128).notNullable();
            table.date('dob').notNullable();
            table.string('phone', 10).notNullable();
            table.string('email', 128);
            table.string('occupation', 35);
        })
    ]);

    await knex.schema.createTable(tableNames.faculty, (table) => {
        table.increments().notNullable();
        table.string('name', 128).notNullable();
        table.date('dob').notNullable();
        table.string('blood_group', 3).notNullable().default('O+');
        table.integer('salary').notNullable();
        table.date('joining_date').notNullable();
        addRef(table, tableNames.role);
        addRef(table, tableNames.address);
    });

    await knex.schema.createTable(tableNames.salaryPaidDetail, (table) => {
        table.increments().notNullable();
        table.integer('year').notNullable();
        table.integer('month').notNullable();
        addRef(table, tableNames.faculty);
    });

    await knex.schema.createTable(tableNames.class, (table) => {
        table.increments().notNullable();
        addRef(table, tableNames.section);
        addRef(table, tableNames.faculty, true, 'class_teacher');
    });

    await knex.schema.createTable(tableNames.teachingClassSubject, (table) => {
        table.increments().notNullable();
        addRef(table, tableNames.faculty);
        addRef(table, tableNames.class);
        addRef(table, tableNames.subject);
    });

    await knex.schema.createTable(tableNames.student, (table) => {
        table.increments().notNullable();
        table.string('name', 128).notNullable();
        table.date('dob').notNullable();
        table.string('blood_group', 3).notNullable().default('O+');
        table.integer('fee').notNullable();
        table.integer('scholarship').notNullable().default(0);
        table.date('admission_date').notNullable();
        addRef(table, tableNames.parent, true, 'father');
        addRef(table, tableNames.parent, true, 'mother');
        addRef(table, tableNames.class);
        addRef(table, tableNames.address);
    });

    await knex.schema.createTable(tableNames.feePaidDetail, (table) => {
        table.increments().notNullable();
        table.integer('academic_year').notNullable();
        table.integer('term').notNullable();
        addRef(table, tableNames.student);
    });

    await knex.schema.createTable(tableNames.attendance, (table) => {
        table.increments().notNullable();
        table.date('date').notNullable();
        addRef(table, tableNames.student);
        addRef(table, tableNames.class);
    });

    await knex.schema.createTable(tableNames.result, (table) => {
        table.increments().notNullable();
        table.integer('academic_year').notNullable();
        table.integer('score').notNullable();
        addRef(table, tableNames.student);
        addRef(table, tableNames.class);
        addRef(table, tableNames.subject);
        addRef(table, tableNames.grade);
    });
};

exports.down = async (knex) => {
    for (table of dropOrder) {
        await knex.schema.dropTable(table);
    }
};
