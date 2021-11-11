const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class StudentModel extends Model {
    static get tableName() {
        return tableNames.student;
    }

    static get relationMappings() {
        const ClassModel = require('./Class.model');
        const ParentModel = require('./Parent.model');
        const AddressModel = require('./Address.model');

        return {
            belongs: {
                relation: Model.BelongsToOneRelation,
                modelClass: ClassModel,
                join: {
                    from: `${tableNames.student}.class_id`,
                    to: `${tableNames.class}.id`
                }
            },

            father: {
                relation: Model.HasManyRelation,
                modelClass: ParentModel,
                join: {
                    from: `${tableNames.student}.father_id`,
                    to: `${tableNames.parent}.id`
                }
            },

            mother: {
                relation: Model.HasManyRelation,
                modelClass: ParentModel,
                join: {
                    from: `${tableNames.student}.mother_id`,
                    to: `${tableNames.parent}.id`
                }
            },

            address: {
                relation: Model.HasOneRelation,
                modelClass: AddressModel,
                join: {
                    from: `${tableNames.student}.address_id`,
                    to: `${tableNames.address}.id`
                }
            }
        };
    }

}

module.exports = StudentModel;