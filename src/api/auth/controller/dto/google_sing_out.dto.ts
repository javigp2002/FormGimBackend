import { UserModel } from '../../../../domain/model/user.model';

export class GoogleSingOutDto {
	constructor(
		readonly id: number,
		readonly name: string,
		readonly surname: string,
		readonly pictureUrl: string,
		readonly email: string,
		readonly isAdmin: boolean,
	) {
	}

	static fromUserModel(userModel: UserModel): GoogleSingOutDto {
		return new GoogleSingOutDto(
			userModel.id,
			userModel.name,
			userModel.surname,
			userModel.pictureUrl,
			userModel.email,
			userModel.isAdmin,
		);
	}
}
