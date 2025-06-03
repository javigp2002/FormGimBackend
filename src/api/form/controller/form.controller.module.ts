import { Module } from '@nestjs/common';
import { FormEntrypoint } from './form.entrypoint';
import { FormUsecaseModule } from '../../../domain/use_cases/form/form.usecase.module';

@Module({
	imports: [FormUsecaseModule],
	controllers: [FormEntrypoint],
	providers: [],
	exports: [],
})
export class FormControllerModule {
}
