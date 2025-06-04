import { Injectable } from '@nestjs/common';
import { SurveyTable } from '../../../datasource/tables/surveytable/surveytable.usecase';
import { QuestionTable } from '../../../datasource/tables/question/questiontable.usecase';
import { SaveFormModel } from '../../model/save-form.model';
import { OptionTable } from '../../../datasource/tables/option/optiontable.usecase';

@Injectable()
export class SaveFormsUsecaseService {
	constructor(
		private surveyTable: SurveyTable,
		private questionTable: QuestionTable,
		private optionTable: OptionTable,
	) {
	}

	async run(model: SaveFormModel): Promise<boolean> {
		const idSurvey = await this.surveyTable.saveSurvey(model);
		if (idSurvey <= 0) return false;

		for (const question of model.questions) {
			const idQuestion = await this.questionTable.saveQuestion(question, idSurvey);
			if (idQuestion <= 0) {
				await this.surveyTable.deleteById(idSurvey);
				return false;
			}

			if (question.options && question.options.length > 0) {
				for (const answer of question.options) {
					const idAnswer = await this.optionTable.saveOption(answer, idQuestion);
					if (idAnswer <= 0) {
						await this.surveyTable.deleteById(idSurvey);
						return false;
					}
				}
			}
		}

		return true;
	}
}
