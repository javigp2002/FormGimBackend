import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GetNewFormsUsecase } from '../../../domain/use_cases/form/get-new-forms-usecase.service';
import { GetUserFormsDto } from './dto/get-user-forms.dto';
import { ResponseDto } from './dto/form-response.dto';
import { GetDoneFormsUsecase } from '../../../domain/use_cases/form/get-done-forms-usecase.service';
import { GetAuthorFormsUsecase } from '../../../domain/use_cases/form/get-author-forms-usecase.service';
import { SurveyDto } from './dto/save-form.dto';
import { SaveFormModel } from '../../../domain/model/save-form.model';
import { SaveFormsUsecaseService } from '../../../domain/use_cases/form/save-forms-usecase.service';

type newForms = {
	forms: ResponseDto[];
};

@Controller()
export class FormEntrypoint {
	constructor(
		private getNewFormsForUser: GetNewFormsUsecase,
		private getAuthorFormsForUser: GetAuthorFormsUsecase,
		private getDoneFormsForUser: GetDoneFormsUsecase,
		private saveFormsUsecaseService: SaveFormsUsecaseService,
	) {
	}

	@HttpCode(HttpStatus.OK)
	@Post('new_forms')
	async newForms(@Body() userFormsDto: GetUserFormsDto): Promise<ResponseDto[]> {
		const result = await this.getNewFormsForUser.run(userFormsDto.userId);
		if (!result) {
			throw new Error('No forms found for the user');
		}

		return result.map(form => ResponseDto.fromModel(form)).filter((dto): dto is ResponseDto => dto !== null);
	}

	@HttpCode(HttpStatus.OK)
	@Post('done_forms')
	async doneForms(@Body() userFormsDto: GetUserFormsDto): Promise<ResponseDto[]> {
		const result = await this.getDoneFormsForUser.run(userFormsDto.userId);
		if (!result) {
			throw new Error('No forms found for the user');
		}

		return result.map(form => ResponseDto.fromModel(form)).filter((dto): dto is ResponseDto => dto !== null);
	}

	@HttpCode(HttpStatus.OK)
	@Post('author_forms')
	async authorForms(@Body() userFormsDto: GetUserFormsDto): Promise<ResponseDto[]> {
		const result = await this.getAuthorFormsForUser.run(userFormsDto.userId);
		if (!result) {
			throw new Error('No forms found for the user');
		}

		return result.map(form => ResponseDto.fromModel(form)).filter((dto): dto is ResponseDto => dto !== null);
	}

	@HttpCode(HttpStatus.OK)
	@Post('form/save')
	async saveNewForm(@Body() userFormsDto: SurveyDto): Promise<any> {
		const model = SaveFormModel.fromDto(userFormsDto);
		const result = await this.saveFormsUsecaseService.run(model);
		if (!result) {
			throw new Error('No forms found for the user');
		}
		return result;
	}
}
