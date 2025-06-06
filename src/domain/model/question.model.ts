import { QuestiontableDto } from '../../datasource/tables/question/dto/questiontable.dto';
import { QuestionType } from './question-type.enum';

export class QuestionModel {
	constructor(
		readonly id: number,
		readonly id_survey: number,
		readonly title: string,
		readonly questionType: QuestionType,
		readonly options?: string[],
		readonly answers?: string[],
	) {
	}

	static fromDtos(dto: QuestiontableDto, options?: string[], answers?: string[]): QuestionModel | null {
		try {
			return new QuestionModel(dto.id, dto.id_survey, dto.title, dto.question_type, options, answers);
		} catch {
			return null;
		}
	}
}
