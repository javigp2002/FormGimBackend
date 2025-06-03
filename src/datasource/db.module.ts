import { Module } from '@nestjs/common';
import { DbConnection } from './db.connection';
import { UserTable } from './tables/usertable/usertable.usecase';

const tables = [UserTable];

@Module({
	providers: [DbConnection, ...tables],
	exports: [DbConnection, ...tables],
})
export class DbModule {
}
