const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class SubjectModel extends Model {
    static get tableName() {
        return tableNames.subject;
    }
}

module.exports = SubjectModel;