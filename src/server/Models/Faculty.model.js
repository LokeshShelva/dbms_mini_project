const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class FacultyModel extends Model {
    static get tableName() {
        return tableNames.faculty
    }
}

module.exports = FacultyModel;