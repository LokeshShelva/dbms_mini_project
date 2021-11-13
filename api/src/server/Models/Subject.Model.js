const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');
const ResultModel = require('./Result.model');

class SubjectModel extends Model {
    static get tableName() {
        return tableNames.subject;
    }

    static get relationMappings() {
        return {
            subject: {
                relation: Model.HasOneRelation,
                modelClass: ResultModel,
                join: {
                    from: `${tableNames.result}.subject_id`,
                    to: `${tableNames.subject}.id`
                }
            }
        }
    }
}

module.exports = SubjectModel;