import { Injectable } from '@nestjs/common';
import { UserModel } from '../../model/user.model';
import { DateTime } from 'luxon';
import { UserTable } from '../../../datasource/tables/usertable/usertable.usecase';

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

@Injectable()
export class GoogleLoginUsecase {
	constructor(private userTable : UserTable ) {
	}

	async run(googleToken: String): Promise<UserModel> {
		const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.CLIENT_ID,  // CLIENT_ID of the app that accesses the backend
		});
		const payload = ticket.getPayload();

		const googleId = payload['sub'];
		const given_name = payload['given_name'];
		const family_name = payload['family_name'];
		const picture = payload['picture'];
		const email = payload['email'];
		
		const result = await this.userTable.getUserByGoogleId(googleId);
		
		if(!result) {
			const newUser = new UserModel(
				-1,
				googleId,
				given_name,
				family_name,
				picture,
				email,
				false
			);

			const userId = await this.userTable.insertUser(newUser);

			if(userId === -1) {
				throw new Error('Error inserting user into the database');
			}

			return new UserModel(userId, googleId,  given_name, family_name, picture, email, false);
		}

		return UserModel.fromUserTableDTO(result);
	}
}
