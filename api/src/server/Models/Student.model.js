const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');
const ClassModel = require('./Class.model');
const ParentModel = require('./Parent.model');

class StudentModel extends Model {
    static get tableName() {
        return tableNames.student;
    }

    static get relationMappings() {
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
            }
        };
    }

}

module.exports = StudentModel;