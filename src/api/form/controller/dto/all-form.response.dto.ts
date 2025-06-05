import { FormModel } from '../../../../domain/model/form.model';
import { QuestionModel } from '../../../../domain/model/question.model';

export class AllFormResponseDto {
	constructor(
		readonly id: number,
		readonly title: string,
		readonly description: string,
		readonly authorName: string,
		readonly questions: QuestionResponse[],
	) {
	}

	static fromModel(model: FormModel): AllFormResponseDto {
		return new AllFormResponseDto(
			model.id,
			model.title,
			model.description,
			model.author_name,
			model.questions.map(question => {
				return QuestionResponse.fromModel(question);
			}),
		);
	}
}


class QuestionResponse {
	constructor(
		readonly id: number,
		readonly title: string,
		readonly questionType: number,
		readonly options: string[] = [],
		readonly answers: string[] = [],
	) {
	}

	static fromModel(model: QuestionModel): QuestionResponse {
		return new QuestionResponse(
			model.id,
			model.title,
			model.questionType,
			model.options,
			model.answers,
		);
	}
}