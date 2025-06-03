import { Injectable } from '@nestjs/common';
import { DbConnection } from '../../db.connection';
import { SurveytableDto } from './dto/surveytable.dto';
import { SurveyviewDto } from './dto/surveyview.dto';
import { BasicFormModel } from '../../../domain/model/basic-form.model';

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
		const result = await this.dbConnection.insertOne(this.tableName, {
			id_user: dto.id_user,
			title: dto.title,
			description: dto.description,
		});
		return result.insertId;
	}

	async getSurveysNOTDoneByUser(userId: number): Promise<BasicFormModel[]> {
		const query = `
            SELECT *
            FROM ${this.viewName}
            WHERE id_user_answer = ?
              and is_answered = 0
		`;
		const result = await this.dbConnection.runQuery(query, [userId]);

		if (result.length <= 0) return [];
		return result
			.map((item: any) => SurveyviewDto.fromSQL(item))
			.filter((dto): dto is SurveyviewDto => dto !== null)
			.map(dto => BasicFormModel.fromDto(dto));
	}
}
