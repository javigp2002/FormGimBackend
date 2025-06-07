import { Injectable } from '@nestjs/common';
import { SurveyTable } from '../../../datasource/tables/surveytable/surveytable.usecase';
import { QuestionTable } from '../../../datasource/tables/question/questiontable.usecase';
import { OptionTable } from '../../../datasource/tables/option/optiontable.usecase';
import { QuestionModel } from '../../model/question.model';
import { FormModel } from '../../model/form.model';
import { AnswerTable } from '../../../datasource/tables/answer/answertable.usecase';

@Injectable()
export class GetFormAnswersService {
	constructor(
		private surveyTable: SurveyTable,
		private questionTable: QuestionTable,
		private optionTable: OptionTable,
		private answerTable: AnswerTable,
	) {
	}

	async run(surveyId: number): Promise<FormModel | null> {
		const [survey, questions] = await Promise.all([
			this.surveyTable.getById(surveyId),
			this.questionTable.getQuestionsBySurveyId(surveyId),
		]);

		if (!survey || questions.length <= 0) return null;

		const questionOptions: QuestionModel[] = [];
		let timesFormHasBeenDone = 0;
		for (const question of questions) {
			const [options, answers, timesAnswerQuestion] = await Promise.all([
				this.optionTable.getOptionsByQuestionId(question.id),
				this.answerTable.getAnswersByQuestion(question.id),
				this.answerTable.getTimesFormHasBeenDone(question.id),
			]);
			const questionModel = QuestionModel.fromDtos(question, options, answers);
			if (questionModel) {
				questionOptions.push(questionModel);
				if (timesAnswerQuestion > timesFormHasBeenDone) {
					timesFormHasBeenDone = timesAnswerQuestion;
				}
			}
		}

		const formModel = FormModel.fromDtos(survey, questionOptions, timesFormHasBeenDone);
		if (!formModel) return null;
		return formModel;
	}
}
