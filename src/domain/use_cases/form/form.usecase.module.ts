import { Module } from '@nestjs/common';
import { GetNewFormsUsecase } from './get-new-forms-usecase.service';
import { DbModule } from '../../../datasource/db.module';

@Module({
	imports: [DbModule],
	controllers: [],
	providers: [GetNewFormsUsecase],
	exports: [GetNewFormsUsecase],
})
export class FormUsecaseModule {
}
