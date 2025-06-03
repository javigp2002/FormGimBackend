import { Injectable, Scope } from '@nestjs/common';
import * as db from 'mariadb';
import { isObject } from 'class-validator';
import { DateTime } from 'luxon';

@Injectable({ scope: Scope.DEFAULT })
export class DbConnection {
	private pool: db.Pool;

	constructor() {
		this.pool = db.createPool({
			connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10'),
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			port: parseInt(process.env.DB_PORT || '3306'),
			timezone: process.env.DB_TIMEZONE,
		});
	}

	async runQuery(query: string, params?: any[]): Promise<any> {
		let conn: db.PoolConnection | undefined;
		try {
			conn = await this.pool.getConnection();
			return await conn.query(query, params);
		} catch (err) {
			console.error('Database query error: ' + err);
			return;
		} finally {
			if (conn) await conn.release();
		}
	}

	async insertBulk(table: string, models: object[], keyUpdate?: string[]): Promise<any> {
		if (models.length === 0) {
			return;
		}

		const values: any[] = [];
		const columns = Object.keys(models[0]);
		const questions = columns.map(() => '?').join(',');
		const valuesQuestions = models.map(() => `(${questions})`).join(',');
		models.forEach(model => {
			const sanitized = this.sanitizeModel(model);
			columns.forEach(c => {
				values.push(sanitized[c]);
			});
		});

		let keyUpdateValue;
		if (keyUpdate) {
			keyUpdateValue = keyUpdate.map(it => `${it}=VALUES(${it})`).join(',');
		}

		const sql = `INSERT INTO ${table} (${columns.join(',')}) VALUES ${valuesQuestions} ${
                keyUpdate ? ' ON DUPLICATE KEY UPDATE ' + keyUpdateValue : ''
        }`;

		try {
			return await this.runQuery(sql, values);
		} catch (err) {
		}
	}

	async insertOne(table: string, model: any, keyUpdate?: string[]): Promise<any> {
		let keyUpdateValue;
		if (keyUpdate) {
			keyUpdateValue = keyUpdate.map(it => `${it}=VALUES(${it})`).join(',');
		}

		const sql = `INSERT INTO ${table}
                     SET ? ${keyUpdate ? 'ON DUPLICATE KEY UPDATE ' + keyUpdateValue : ''}`;

		const valueCopy = this.sanitizeModel(model);

		const result = await this.runQuery(sql, [valueCopy]);
		if (result.length === 0) throw new Error('No result from insertOne');

		return result;
	}

	private sanitizeModel(model: any): object {
		const valueCopy = {};
		Object.keys(model).forEach(key => {
			valueCopy[key] = this.sanitizeValue(model[key]);
		});
		return valueCopy;
	}

	private sanitizeValue(value: any): any {
		if (value instanceof DateTime && value.isValid) {
			return value.toUTC().toFormat('yyyy-MM-dd HH:mm:ss');
		} else if (isObject(value) && !Array.isArray(value)) {
			return JSON.stringify(value);
		}

		return value;
	}
}
