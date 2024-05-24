export interface Pregunta {
  response_code: number;
  results: Result[];
}

export interface Result {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: {
    answer_a: string;
    answer_b: string;
    answer_c: string;
  };
  feedback: string;
}
