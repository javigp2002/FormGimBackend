import { DateTime } from 'luxon';
import { UserTableDto } from '../../datasource/tables/usertable/dto/usertable.dto';

export class UserModel {
	constructor(
		public readonly id: number,
		public readonly id_google: string,
		public readonly name: string,
		public readonly surname: string,
		public readonly pictureUrl: string,
		public readonly email: string,
		public readonly isAdmin: boolean,
	) {
	}

	static fromUserTableDTO(userTable: UserTableDto): UserModel{
		return new UserModel(userTable.id, userTable.id_google, userTable.name, userTable.surname, "", userTable.email, userTable.is_admin);
	}
}
