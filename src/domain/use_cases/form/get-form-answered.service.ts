import { Injectable } from '@nestjs/common';
import { SurveyTable } from '../../../datasource/tables/surveytable/surveytable.usecase';
import { QuestionTable } from '../../../datasource/tables/question/questiontable.usecase';
import { OptionTable } from '../../../datasource/tables/option/optiontable.usecase';
import { QuestionModel } from '../../model/question.model';
import { FormModel } from '../../model/form.model';
import { AnswerTable } from '../../../datasource/tables/answer/answertable.usecase';

@Injectable()
export class GetFormAnsweredService {
	constructor(
		private surveyTable: SurveyTable,
		private questionTable: QuestionTable,
		private optionTable: OptionTable,
		private answerTable: AnswerTable,
	) {
	}

	async run(surveyId: number, userId: number): Promise<FormModel | null> {
		const [survey, questions] = await Promise.all([
			this.surveyTable.getById(surveyId),
			this.questionTable.getQuestionsBySurveyId(surveyId),
		]);

		if (!survey || questions.length <= 0) return null;

		const questionOptions: QuestionModel[] = [];
		for (const question of questions) {
			const [options, answers] = await Promise.all([
				this.optionTable.getOptionsByQuestionId(question.id),
				this.answerTable.getQuestionsByQuestionAndUserId(question.id, userId),
			]);
			const questionModel = QuestionModel.fromDtos(question, options, answers);
			if (questionModel) {
				questionOptions.push(questionModel);
			}
		}
		const formModel = FormModel.fromDtos(survey, questionOptions);
		if (!formModel) return null;
		return formModel;
	}
}
