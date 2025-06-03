import { IsBoolean, IsDate, IsEmail, IsNotEmpty } from 'class-validator';
import { DateTime } from 'luxon';

export class UserTableDto {
	@IsNotEmpty()
	id: number;

	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	surname: string;

	@IsEmail()
	user_name: string;

	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	user_type: string;

	rol: string;

	@IsNotEmpty()
	register_code: number;

	forgottenPassword: string;

	@IsDate()
	createdAt: DateTime;

	@IsDate()
	updatedAt: DateTime;

	@IsBoolean()
	deleted: boolean;

	constructor(json: any) {
		this.id = json.id;
		this.name = json.name;
		this.surname = json.surname;
		this.user_name = json.user_name;
		this.password = json.password;
		this.user_type = json.teacherId != null ? 'teacher' : 'student';
		this.rol = json.rol != null ? json.rol : json.teacherGroupCount > 0 ? 'responsable' : null;
		this.forgottenPassword = json.forgotten_password;
		this.register_code = json.register_code;
		this.createdAt = DateTime.fromSQL(json.created);
		this.updatedAt = DateTime.fromSQL(json.last_update);
		this.deleted = json.deleted == 1;
	}
}
