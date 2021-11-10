const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class ClassModel extends Model {
    static get tableName() {
        return tableNames.class;
    }
}

module.exports = ClassModel;