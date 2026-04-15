export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
