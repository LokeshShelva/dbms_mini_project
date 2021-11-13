const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class ExamModel extends Model {
    static get tableName() {
        return tableNames.exam;
    }
}

module.exports = ExamModel;