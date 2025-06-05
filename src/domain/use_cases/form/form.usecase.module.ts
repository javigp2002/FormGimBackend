import { Module } from '@nestjs/common';
import { GetNewFormsUsecase } from './get-new-forms-usecase.service';
import { DbModule } from '../../../datasource/db.module';
import { GetAuthorFormsUsecase } from './get-author-forms-usecase.service';
import { GetDoneFormsUsecase } from './get-done-forms-usecase.service';
import { SaveFormsUsecaseService } from './save-forms-usecase.service';
import { GetFormService } from './get-form.service';
import { SaveAnswersUsecaseService } from './save-answers-usecase.service';
import { GetFormAnsweredService } from './get-form-answered.service';
import { GetFormAnswersService } from './get-form-answers.service';

const usecases = [
	GetNewFormsUsecase,
	GetAuthorFormsUsecase,
	GetDoneFormsUsecase,
	SaveFormsUsecaseService,
	GetFormService,
	SaveAnswersUsecaseService,
	GetFormAnsweredService,
	GetFormAnswersService,
];

@Module({
	imports: [DbModule],
	controllers: [],
	providers: [...usecases],
	exports: [...usecases],
})
export class FormUsecaseModule {
}
