export class SurveytableDto {
	constructor(
		readonly id: number,
		readonly id_user: number,
		readonly title: string,
		readonly description: string,
	) {
	}

	static fromSQL(json: any) {
		try {
			return new SurveytableDto(json.id, json.id_user, json.title, json.description);
		} catch (error) {
			return null;
		}
	}
}
