export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: number; // 1–10
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
