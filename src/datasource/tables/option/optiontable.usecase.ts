import { Injectable } from '@nestjs/common';
import { DbConnection } from '../../db.connection';
import { OptiontableDto } from './dto/optiontable.dto';
import { SaveOptionModel } from '../../../domain/model/save-form.model';

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
		return await this.dbConnection.insertOne(this.tableName, {
			id_question: dto.id_question,
			title: dto.title,
		});
	}

	async saveOption(answer: SaveOptionModel, idQuestion: number) {
		return await this.insertOne(new OptiontableDto(-1, idQuestion, answer.title));
	}

	async getOptionsByQuestionId(idQuestion: number): Promise<string[]> {
		const query = `
            SELECT title
            FROM ${this.tableName}
            WHERE id_question = ?
		`;
		const result = await this.dbConnection.runQuery(query, [idQuestion]);

		if (result.length <= 0) return [];

		return result.map((option: { title: string }) => option.title);
	}
}
