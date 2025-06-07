import { SurveytableDto } from '../../datasource/tables/surveytable/dto/surveytable.dto';
import { QuestionModel } from './question.model';

export class FormModel {
	constructor(
		readonly id: number,
		readonly title: string,
		readonly description: string,
		readonly author_name: string,
		readonly questions: QuestionModel[],
		readonly timesFormHasBeenDone: number = 0,
	) {
	}

	static fromDtos(dto: SurveytableDto, questionModels: QuestionModel[], timesFormHasBeenDone: number = 0): FormModel | null {
		try {
			return new FormModel(dto.id, dto.title, dto.description, dto.author_name ?? 'Desconocido', questionModels, timesFormHasBeenDone);
		} catch (error) {
			return null;
		}
	}
}
