export class QuestionDto {
	title: string;
	type: number;
	options?: string[]; // Opcional, ya que no todas las preguntas tienen opciones
}

export class SurveyDto {
	title: string;
	description: string;
	questions: QuestionDto[];
}