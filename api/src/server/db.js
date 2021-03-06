const knex = require('knex');
const { Model } = require('objection');

const knexConfig = require('../../knexfile');

// const environment = process.env.NODE_ENV || 'development';
// const connectionConfig = knexConfig[environment];

const connection = knex(knexConfig);

Model.knex(connection);

module.exports = connection;
