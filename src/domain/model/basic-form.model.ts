import { SurveyviewDto } from '../../datasource/tables/surveytable/dto/surveyview.dto';

export class BasicFormModel {
	constructor(
		readonly id: number,
		readonly title: string,
		readonly description: string,
		readonly author_name: string,
	) {
	}

	static fromDto(dto: SurveyviewDto): BasicFormModel | null {
		try {
			return new BasicFormModel(dto.id_survey, dto.title, dto.description, dto.author_name);
		} catch (error) {
			return null;
		}
	}
}
