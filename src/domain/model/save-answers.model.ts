import { SaveAnswersDto, SaveAnswersFromUserDto } from '../../api/form/controller/dto/answer-list.dto';

export class SaveAnswerModel {
	idQuestion: number;
	answer: string;

	constructor(dto: SaveAnswersDto) {
		this.idQuestion = dto.idQuestion;
		this.answer = dto.answer;
	}
}

export class SaveAnswersFromUserModel {
	idUser: number;
	answers: SaveAnswerModel[];

	constructor(dto: SaveAnswersFromUserDto) {
		this.idUser = dto.idUser;
		this.answers = dto.answers.map(answer => new SaveAnswerModel(answer));
	}
}