import { QuestionType } from '../../../../domain/model/question-type.enum';

export class QuestiontableDto {
	constructor(
		readonly id: number,
		readonly id_survey: number,
		readonly title: string,
		readonly question_type: QuestionType,
	) {
	}

	static fromSQL(json: any) {
		try {
			return new QuestiontableDto(
				json.id,
				json.id_survey,
				json.title,
				(QuestionType[json.question_type as keyof typeof QuestionType] as QuestionType) ?? QuestionType.TEXTBOX,
			);
		} catch (error) {
			return null;
		}
	}
}
