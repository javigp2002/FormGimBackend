import { Injectable } from '@nestjs/common';
import { BasicFormModel } from '../../model/basic-form.model';
import { SurveyTable } from '../../../datasource/tables/surveytable/surveytable.usecase';

@Injectable()
export class GetAuthorFormsUsecase {
	constructor(private surveyTable: SurveyTable) {
	}

	async run(userId: number): Promise<BasicFormModel[]> {
		const isAnsweredByHim = false; //nvm
		const isAuthor = true;
		return await this.surveyTable.getSurveysByUser(userId, isAnsweredByHim, isAuthor);
	}
}
