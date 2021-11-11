const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class AddressModel extends Model {
    static get tableName() {
        return tableNames.address;
    }
}

module.exports = AddressModel;