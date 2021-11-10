const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class RoleModel extends Model {
    static get tableName() {
        return tableNames.role;
    }
}

module.exports = RoleModel;