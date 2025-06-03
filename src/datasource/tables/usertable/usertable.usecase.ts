import { Injectable } from '@nestjs/common';
import { DbConnection } from '../../db.connection';
import { UserTableDto } from './dto/usertable.dto';

@Injectable()
export class UserTable {
	constructor(private dbConnection: DbConnection) {
	}

	async getUser(userId: number): Promise<UserTableDto | null> {
		const query = `
      SELECT 
      WHERE u.id = ?
      `;
		const user = await this.dbConnection.runQuery(query, [userId]);

		return user.length > 0 ? new UserTableDto(user[0]) : null;
	}
}
