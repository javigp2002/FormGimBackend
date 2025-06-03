import { Injectable } from '@nestjs/common';
import { UserModel } from '../../model/user.model';
import { DateTime } from 'luxon';

@Injectable()
export class LoginUsecase {
	constructor() {
	}

	async run(user_name: string, pass: string): Promise<UserModel> {
		return new UserModel(1, user_name, DateTime.now(), DateTime.now(), false);
	}
}
