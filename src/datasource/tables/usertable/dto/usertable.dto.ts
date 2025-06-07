export class UserTableDto {
	constructor(
		readonly id: number,
		readonly id_google: string,
		readonly email: string,
		readonly name: string,
		readonly surname: string,
		readonly is_admin: boolean,
	) {
	}

	static fromSQL(json: any) {
		try {
			return new UserTableDto(json.id, json.google_id, json.email, json.name, json.surname, json.is_admin);
		} catch (error) {
			return null;
		}
	}

	static fromUserModel(userModel: any): UserTableDto {
		return new UserTableDto(
			userModel.id,
			userModel.id_google,
			userModel.email,
			userModel.name,
			userModel.surname,
			userModel.isAdmin
		);
	}
}
