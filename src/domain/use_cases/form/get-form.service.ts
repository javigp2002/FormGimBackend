import { Injectable } from '@nestjs/common';
import { SurveyTable } from '../../../datasource/tables/surveytable/surveytable.usecase';
import { QuestionTable } from '../../../datasource/tables/question/questiontable.usecase';
import { OptionTable } from '../../../datasource/tables/option/optiontable.usecase';
import { QuestionModel } from '../../model/question.model';
import { FormModel } from '../../model/form.model';

@Injectable()
export class GetFormService {
	constructor(
		private surveyTable: SurveyTable,
		private questionTable: QuestionTable,
		private optionTable: OptionTable,
	) {
	}

	async run(surveyId: number): Promise<FormModel | null> {
		const [survey, questions] = await Promise.all([
			this.surveyTable.getById(surveyId),
			this.questionTable.getQuestionsBySurveyId(surveyId),
		]);

		if (!survey || questions.length <= 0) return null;

		const questionOptions: QuestionModel[] = [];
		for (const question of questions) {
			const options = await this.optionTable.getOptionsByQuestionId(question.id);
			const questionModel = QuestionModel.fromDtos(question, options);
			if (questionModel) {
				questionOptions.push(questionModel);
			}
		}
		const formModel = FormModel.fromDtos(survey, questionOptions);
		if (!formModel) return null;
		return formModel;
	}
}
