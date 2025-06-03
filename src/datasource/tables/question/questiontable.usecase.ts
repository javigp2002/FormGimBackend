import { Injectable } from '@nestjs/common';
import { DbConnection } from '../../db.connection';
import { QuestiontableDto } from './dto/questiontable.dto';
import { QuestionType } from '../../../domain/model/question-type.enum';

@Injectable()
export class QuestionTable {
	constructor(private dbConnection: DbConnection) {
	}

	tableName = 'question';

	async getById(id: number): Promise<QuestiontableDto | null> {
		const query = `
            SELECT *
            FROM ${this.tableName}
            WHERE id = ?
		`;
		const result = await this.dbConnection.runQuery(query, [id]);

		return result.length > 0 ? QuestiontableDto.fromSQL(result[0]) : null;
	}

	async insertOne(dto: QuestiontableDto): Promise<number> {
		const result = await this.dbConnection.insertOne(this.tableName, {
			id_survey: dto.id_survey,
			title: dto.title,
			question_type: dto.question_type || QuestionType.TEXTBOX,
		});
		return result.insertId;
	}
}
