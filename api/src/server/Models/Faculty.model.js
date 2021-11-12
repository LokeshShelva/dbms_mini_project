const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');
const RoleModel = require('./Role.model');
const AddressModel = require('./Address.model');

class FacultyModel extends Model {
    static get tableName() {
        return tableNames.faculty
    }

    static get relationMappings() {
        return {
            address: {
                relation: Model.HasOneRelation,
                modelClass: AddressModel,
                join: {
                    from: `${tableNames.faculty}.address_id`,
                    to: `${tableNames.address}.id`
                }
            },
            role: {
                relation: Model.HasOneRelation,
                modelClass: RoleModel,
                join: {
                    from: `${tableNames.faculty}.role_id`,
                    to: `${tableNames.role}.id`
                }
            }
        }
    }
}

module.exports = FacultyModel;