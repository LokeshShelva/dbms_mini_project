const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class UserModel extends Model {
    static get tableName() {
        return tableNames.user;
    }
}

module.exports = UserModel;