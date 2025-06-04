export class SurveytableDto {
	constructor(
		readonly id: number,
		readonly id_user: number,
		readonly title: string,
		readonly description: string,
		readonly author_name?: string,
	) {
	}

	static fromSQL(json: any) {
		try {
			return new SurveytableDto(json.id, json.id_user, json.title, json.description, json.author_name);
		} catch (error) {
			return null;
		}
	}
}
