import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SaveAnswersDto {
	@IsInt()
	idQuestion: number;

	@IsString()
	answer: string;
}

export class SaveAnswersFromUserDto {
	@IsInt()
	idUser: number;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => SaveAnswersDto)
	answers: SaveAnswersDto[];
}