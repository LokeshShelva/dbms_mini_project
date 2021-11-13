const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class GradeModel extends Model {
    static get tableName() {
        return tableNames.grade;
    }
}

module.exports = GradeModel;