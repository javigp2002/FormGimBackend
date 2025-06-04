import { Module } from '@nestjs/common';
import { GetNewFormsUsecase } from './get-new-forms-usecase.service';
import { DbModule } from '../../../datasource/db.module';
import { GetAuthorFormsUsecase } from './get-author-forms-usecase.service';
import { GetDoneFormsUsecase } from './get-done-forms-usecase.service';

const usecases = [
	GetNewFormsUsecase,
	GetAuthorFormsUsecase,
	GetDoneFormsUsecase,
];

@Module({
	imports: [DbModule],
	controllers: [],
	providers: [...usecases],
	exports: [...usecases],
})
export class FormUsecaseModule {
}
