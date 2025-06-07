import { Injectable } from '@nestjs/common';
import { DbConnection } from '../../db.connection';
import { UserTableDto } from './dto/usertable.dto';
import { UserModel } from '../../../domain/model/user.model';

@Injectable()
export class UserTable {
	constructor(private dbConnection: DbConnection) {
	}

	async getUserByUserId(userId: number): Promise<UserTableDto | null> {
		const query = `
            SELECT *
            FROM user
            WHERE id = ?
      `;
		const user = await this.dbConnection.runQuery(query, [userId]);

		return user.length > 0 ? UserTableDto.fromSQL(user[0]) : null;
	}

	async getUserByGoogleId(idGoogle: string): Promise<UserTableDto | null> {
		const query = `
            SELECT *
            FROM user
            WHERE id_google = ?
		`;
		const userJson = await this.dbConnection.runQuery(query, [idGoogle]);

		return userJson.length > 0 ? UserTableDto.fromSQL(userJson[0]) : null;
	}

	async insertUser(userModel: UserModel): Promise<number> {
		const user = UserTableDto.fromUserModel(userModel);

		return await this.dbConnection.insertOne('user', {
			id_google: user.id_google,
			name: user.name,
			surname: user.surname,
			email: user.email,
			is_admin: user.is_admin ? 1 : 0,
		});
	}
}
