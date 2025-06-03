import { Injectable, Scope } from '@nestjs/common';
import * as db from 'mariadb';

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
}
