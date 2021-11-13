const { Model } = require('objection');
const { tableNames } = require('../../constants/tableNames');

class ResultModel extends Model {
    static get tableName() {
        return tableNames.result;
    }

    static get relationMappings() {
        const SubjectModel = require('./Subject.Model');

        return {
            subject: {
                relation: Model.HasOneRelation,
                modelClass: SubjectModel,
                join: {
                    from: `${tableNames.result}.subject_id`,
                    to: `${tableNames.subject}.id`
                }
            }
        }
    }
}

module.exports = ResultModel;