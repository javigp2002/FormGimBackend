import { SurveytableDto } from '../../datasource/tables/surveytable/dto/surveytable.dto';
import { QuestionModel } from './question.model';

export class FormModel {
	constructor(
		readonly id: number,
		readonly title: string,
		readonly description: string,
		readonly author_name: string,
		readonly questions: QuestionModel[],
	) {
	}

	static fromDtos(dto: SurveytableDto, questionModels: QuestionModel[]): FormModel | null {
		try {
			return new FormModel(dto.id, dto.title, dto.description, dto.author_name ?? 'Desconocido', questionModels);
		} catch (error) {
			return null;
		}
	}
}
