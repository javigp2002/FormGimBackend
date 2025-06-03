export class OptiontableDto {
	constructor(
		readonly id: number,
		readonly id_question: number,
		readonly title: string,
	) {
	}

	static fromSQL(json: any) {
		try {
			return new OptiontableDto(json.id, json.id_question, json.title);
		} catch (error) {
			return null;
		}
	}
}
