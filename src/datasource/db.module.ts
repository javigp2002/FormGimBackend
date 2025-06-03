import { Module } from '@nestjs/common';
import { DbConnection } from './db.connection';
import { UserTable } from './tables/usertable/usertable.usecase';
import { SurveyTable } from './tables/surveytable/surveytable.usecase';

const tables = [UserTable, SurveyTable];

@Module({
	providers: [DbConnection, ...tables],
	exports: [DbConnection, ...tables],
})
export class DbModule {
}
