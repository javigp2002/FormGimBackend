import { UserTableDto } from '../../datasource/tables/usertable/dto/usertable.dto';
import { DateTime } from 'luxon';

export class UserModel {
	constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly createdAt: DateTime,
		public readonly updatedAt: DateTime,
		public readonly deleted: boolean,
	) {
	}

	static fromDto(json: UserTableDto): UserModel {
		return new UserModel(json.id, json.name, json.createdAt, json.updatedAt, json.deleted);
	}
}
