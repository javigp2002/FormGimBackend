import { QuestionType } from './question-type.enum';
import { QuestionDto, SurveyDto } from '../../api/form/controller/dto/save-form.dto';

export class SaveOptionModel {
	title: string;
}

export class SaveQuestionModel {
	title: string;
	type: QuestionType;
	options?: SaveOptionModel[];

	constructor(dto: QuestionDto) {
		this.title = dto.title;
		this.type = dto.type as QuestionType;
		this.options = dto.options?.map(option => ({ title: option })) || [];
	}
}

export class SaveFormModel {
	constructor(
		readonly idAuthor: number,
		readonly title: string,
		readonly description: string,
		readonly questions: SaveQuestionModel[],
	) {
	}

	static fromDto(dto: SurveyDto, idAuthor: number = 1) {
		return new SaveFormModel(
			idAuthor,
			dto.title,
			dto.description,
			dto.questions.map(question => new SaveQuestionModel(question)),
		);
	}
}
