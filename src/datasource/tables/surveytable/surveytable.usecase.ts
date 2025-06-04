import { Injectable } from '@nestjs/common';
import { DbConnection } from '../../db.connection';
import { SurveytableDto } from './dto/surveytable.dto';
import { SurveyviewDto } from './dto/surveyview.dto';
import { BasicFormModel } from '../../../domain/model/basic-form.model';
import { SaveFormModel } from '../../../domain/model/save-form.model';

@Injectable()
export class SurveyTable {
	constructor(private dbConnection: DbConnection) {
	}

	private tableName = 'survey';
	private viewName = 'view_survey';

	async getById(id: number): Promise<SurveytableDto | null> {
		const query = `
            SELECT *
            FROM ${this.tableName}
            WHERE id = ?
		`;
		const result = await this.dbConnection.runQuery(query, [id]);

		return result.length > 0 ? SurveytableDto.fromSQL(result[0]) : null;
	}

	async insertOne(dto: SurveytableDto): Promise<number> {
		return await this.dbConnection.insertOne(this.tableName, {
			id_user: dto.id_user,
			title: dto.title,
			description: dto.description,
		});
	}

	async getSurveysByUser(userId: number, isAnsweredByHim: boolean, isAuthor: boolean): Promise<BasicFormModel[]> {
		const authorCondition = isAuthor ? 'id_author = ?' : 'id_user_answer = ?';

		let isAnsweredCondition = '1=1';
		if (!isAuthor)
			isAnsweredCondition = isAnsweredByHim ? 'is_answered = 1' : 'is_answered = 0';

		const query = `
            SELECT *
            FROM ${this.viewName}
            WHERE ${authorCondition}
              and ${isAnsweredCondition}
            GROUP BY id_survey
            ORDER BY updated_at DESC
		`;
		const result = await this.dbConnection.runQuery(query, [userId]);

		if (result.length <= 0) return [];
		return result
			.map((item: any) => SurveyviewDto.fromSQL(item))
			.filter((dto): dto is SurveyviewDto => dto !== null)
			.map(dto => BasicFormModel.fromDto(dto));
	}

	async saveSurvey(model: SaveFormModel): Promise<number> {
		try {
			return await this.insertOne(new SurveytableDto(-1, model.idAuthor, model.title, model.description));
		} catch (error) {
			console.error('Error saving survey:', error);
			return -1;
		}

	}

	async deleteById(idSurvey: number) {
		const query = `
            DELETE
            FROM ${this.tableName}
            WHERE id = ?
		`;
		try {
			await this.dbConnection.runQuery(query, [idSurvey]);
		} catch (error) {
			console.error('Error deleting survey:', error);
			throw error;
		}

	}
}
