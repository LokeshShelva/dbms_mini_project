const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');
const ClassModel = require('./Class.model');

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
            }
        };
    }

}

module.exports = StudentModel;