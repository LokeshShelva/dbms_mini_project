const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class ParentModel extends Model {
    static get tableName() {
        return tableNames.parent
    }
}

module.exports = ParentModel;