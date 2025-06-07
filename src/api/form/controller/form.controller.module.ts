import { Module } from '@nestjs/common';
import { FormEntrypoint } from './form.entrypoint';
import { FormUsecaseModule } from '../../../domain/use_cases/form/form.usecase.module';
import { AuthGuardModule } from '../../auth/guards/auth.guard.module';

@Module({
	imports: [FormUsecaseModule, AuthGuardModule],
	controllers: [FormEntrypoint],
	providers: [],
	exports: [],
})
export class FormControllerModule {
}
