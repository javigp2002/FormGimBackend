export class SingInResponseDto {
	constructor(
		public readonly userId: number,
		public readonly userName: string,
	) {
	}
}
