import { Module } from '@nestjs/common';
import { DbConnection } from './db.connection';
import { UserTable } from './tables/usertable/usertable.usecase';
import { SurveyTable } from './tables/surveytable/surveytable.usecase';
import { QuestionTable } from './tables/question/questiontable.usecase';
import { OptionTable } from './tables/option/optiontable.usecase';
import { AnswerTable } from './tables/answer/answertable.usecase';

const tables = [UserTable, SurveyTable, QuestionTable, AnswerTable, OptionTable];

@Module({
	providers: [DbConnection, ...tables],
	exports: [DbConnection, ...tables],
})
export class DbModule {
}
