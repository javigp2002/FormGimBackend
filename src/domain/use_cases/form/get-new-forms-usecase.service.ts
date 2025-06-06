import { Injectable } from '@nestjs/common';
import { BasicFormModel } from '../../model/basic-form.model';
import { SurveyTable } from '../../../datasource/tables/surveytable/surveytable.usecase';

@Injectable()
export class GetNewFormsUsecase {
	constructor(private surveyTable: SurveyTable) {
	}

	async run(userId: number): Promise<BasicFormModel[]> {
		const isAnsweredByHim = false;
		const isAuthor = false;
		return await this.surveyTable.getSurveysByUser(userId, isAnsweredByHim, isAuthor);
	}
}
