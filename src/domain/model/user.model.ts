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
}
