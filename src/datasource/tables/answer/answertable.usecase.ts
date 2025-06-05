import { Injectable } from '@nestjs/common';
import { DbConnection } from '../../db.connection';
import { AnswertableDto } from './dto/answertable.dto';
import { QuestionType } from '../../../domain/model/question-type.enum';
import { SaveAnswersFromUserModel } from '../../../domain/model/save-answers.model';

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
		return await this.dbConnection.insertOne(this.tableName, {
			id_question: dto.id_question,
			id_user: dto.id_user,
			answer: dto.answer || QuestionType.TEXTBOX,
		});
	}

	async insertBulk(answersModel: SaveAnswersFromUserModel): Promise<number> {
		const idUser = answersModel.idUser;
		const answers = answersModel.answers.map(answer => ({
			id_question: answer.idQuestion,
			id_user: idUser,
			answer: answer.answer,
		}));

		const result = await this.dbConnection.insertBulk(this.tableName, answers);
		if (result) {
			return result.affectedRows;
		}
		return 0;

	}

	async getAnswersByQuestionAndUserId(idQuestion: number, userId: number): Promise<string[]> {
		const query = `
            SELECT *
            FROM ${this.tableName}
            WHERE id_question = ?
              and id_user = ?
		`;
		const result = await this.dbConnection.runQuery(query, [idQuestion, userId]);

		return result.length > 0 ? result.map((row: any) => row.answer) : [];
	}

	async getAnswersByQuestion(idQuestion: number): Promise<string[]> {
		const query = `
            SELECT *
            FROM ${this.tableName}
            WHERE id_question = ?
		`;
		const result = await this.dbConnection.runQuery(query, [idQuestion]);

		return result.length > 0 ? result.map((row: any) => row.answer) : [];
	}

	async getTimesFormHasBeenDone(idQuestion: number): Promise<number> {
		const query = `
            select COUNT(*) as "Total"
            FROM ${this.tableName}
            WHERE id_question = ?
            GROUP BY id_user
		`;
		const result = await this.dbConnection.runQuery(query, [idQuestion]);

		return result.length > 0 ? Number(result[0].Total) : 0;
	}
}
