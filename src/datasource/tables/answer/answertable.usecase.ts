import { Injectable } from '@nestjs/common';
import { DbConnection } from '../../db.connection';
import { AnswertableDto } from './dto/answertable.dto';
import { QuestionType } from '../../../domain/model/question-type.enum';

@Injectable()
export class AnswerTable {
	constructor(private dbConnection: DbConnection) {
	}

	tableName = 'answer';

	async getById(id: number): Promise<AnswertableDto | null> {
		const query = `
            SELECT *
            FROM ${this.tableName}
            WHERE id = ?
		`;
		const result = await this.dbConnection.runQuery(query, [id]);

		return result.length > 0 ? AnswertableDto.fromSQL(result[0]) : null;
	}

	async insertOne(dto: AnswertableDto): Promise<number> {
		const result = await this.dbConnection.insertOne(this.tableName, {
			id_question: dto.id_question,
			id_user: dto.id_user,
			answer: dto.answer || QuestionType.TEXTBOX,
		});
		return result.insertId;
	}
}
