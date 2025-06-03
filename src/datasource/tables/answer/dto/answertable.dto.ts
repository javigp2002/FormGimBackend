export class AnswertableDto {
	constructor(
		readonly id: number,
		readonly id_question: number,
		readonly id_user: string,
		readonly answer: string,
	) {
	}

	static fromSQL(json: any) {
		try {
			return new AnswertableDto(json.id, json.id_survey, json.title, json.answer);
		} catch (error) {
			return null;
		}
	}
}
