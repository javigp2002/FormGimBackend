import { Injectable } from '@nestjs/common';
import { AnswerTable } from '../../../datasource/tables/answer/answertable.usecase';
import { SaveAnswersFromUserModel } from '../../model/save-answers.model';

@Injectable()
export class SaveAnswersUsecaseService {
	constructor(
		private answersTable: AnswerTable,
	) {
	}

	async run(model: SaveAnswersFromUserModel): Promise<boolean> {
		return (await this.answersTable.insertBulk(model)) > 0;
	}
}
