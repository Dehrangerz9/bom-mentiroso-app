export interface Player {
  name: string;
  avatar: string;
  score: number;
  selectedAnswer?: string | null;
  /** Total rounds this player participated as a voter (not berlinda) */
  totalVotes: number;
  /** Total rounds this player guessed correctly (lying/truth) */
  correctVotes: number;
}

export interface Question {
  id: string;
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
