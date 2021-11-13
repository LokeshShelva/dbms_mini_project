const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');
const SubjectModel = require('./Subject.Model');

class StudentModel extends Model {
    static get tableName() {
        return tableNames.student;
    }

    static get relationMappings() {
        const ClassModel = require('./Class.model');
        const ParentModel = require('./Parent.model');
        const AddressModel = require('./Address.model');
        const ResultModel = require('./Result.model');

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
                relation: Model.HasOneRelation,
                modelClass: ParentModel,
                join: {
                    from: `${tableNames.student}.father_id`,
                    to: `${tableNames.parent}.id`
                }
            },

            mother: {
                relation: Model.HasOneRelation,
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
            },

            result: {
                relation: Model.HasManyRelation,
                modelClass: ResultModel,
                join: {
                    from: `${tableNames.student}.id`,
                    to: `${tableNames.result}.student_id`
                }

            },

            subject: {
                relation: Model.HasOneRelation,
                modelClass: SubjectModel,
                join: {
                    from: `${tableNames.result}.subject_id`,
                    to: `${tableNames.subject}.id`
                }
            }
        };
    }

}

module.exports = StudentModel;