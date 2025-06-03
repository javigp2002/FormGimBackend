import { Injectable } from '@nestjs/common';
import { DbConnection } from '../../db.connection';
import { OptiontableDto } from './dto/optiontable.dto';

@Injectable()
export class OptionTable {
	constructor(private dbConnection: DbConnection) {
	}

	tableName = 'option';

	async getById(id: number): Promise<OptiontableDto | null> {
		const query = `
            SELECT *
            FROM ${this.tableName}
            WHERE id = ?
		`;
		const result = await this.dbConnection.runQuery(query, [id]);

		return result.length > 0 ? OptiontableDto.fromSQL(result[0]) : null;
	}

	async insertOne(dto: OptiontableDto): Promise<number> {
		const result = await this.dbConnection.insertOne(this.tableName, {
			id_question: dto.id_question,
			title: dto.title,
		});
		return result.insertId;
	}
}
