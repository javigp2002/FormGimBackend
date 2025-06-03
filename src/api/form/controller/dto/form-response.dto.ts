import { BasicFormModel } from '../../../../domain/model/basic-form.model';

export class ResponseDto {
	constructor(
		readonly id: number,
		readonly title: string,
		readonly description: string,
		readonly author_name: string,
	) {
	}

	static fromModel(model: BasicFormModel) {
		try {
			return new ResponseDto(model.id, model.title, model.description, model.author_name);
		} catch (error) {
			return null;
		}
	}
}
