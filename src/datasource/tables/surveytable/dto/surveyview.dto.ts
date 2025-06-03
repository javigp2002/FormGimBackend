export class SurveyviewDto {
	constructor(
		readonly id_survey: number,
		readonly id_author: number,
		readonly id_user_answer: number,
		readonly title: string,
		readonly description: string,
		readonly author_name: string,
		readonly is_answered: boolean,
	) {
	}

	static fromSQL(json: any) {
		try {
			return new SurveyviewDto(
				json.id_survey,
				json.id_author,
				json.id_user_answer,
				json.title,
				json.description,
				json.author_name,
				json.is_answered === 1,
			);
		} catch (error) {
			return null;
		}
	}
}
