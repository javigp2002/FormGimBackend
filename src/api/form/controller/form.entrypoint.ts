import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GetNewFormsUsecase } from '../../../domain/use_cases/form/get-new-forms-usecase.service';
import { GetUserFormsDto } from './dto/get-user-forms.dto';
import { ResponseDto } from './dto/form-response.dto';

type newForms = {
	forms: ResponseDto[];
};

@Controller()
export class FormEntrypoint {
	constructor(private getNewFormsForUser: GetNewFormsUsecase) {
	}

	@HttpCode(HttpStatus.OK)
	@Post('new_forms')
	async newForms(@Body() userFormsDto: GetUserFormsDto): Promise<newForms> {
		const result = await this.getNewFormsForUser.run(userFormsDto.userId);
		if (!result) {
			throw new Error('No forms found for the user');
		}

		const forms = result.map(form => ResponseDto.fromModel(form)).filter((dto): dto is ResponseDto => dto !== null);

		return {
			forms: forms,
		};
	}
}
