import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import Card from '../components/shared/Card';

interface RevealProps {
  /** When true: spectator view — no personal result banner */
  readOnly?: boolean;
  /** When true: this is the active presenter (controls are in the sidebar) */
  isPresenter?: boolean;
}

const Reveal: React.FC<RevealProps> = ({ readOnly = false, isPresenter = false }) => {
  const game = useContext(GameContext);

  if (!game) return null;

  const { currentQuestion, selectedAnswer, isAnswerCorrect } = game;

  // Everyone sees the correct answer from currentQuestion (sent publicly in reveal state)
  if (!currentQuestion) return null;

  const { correctAnswer, options, question, explanation } = currentQuestion;
  const answer = selectedAnswer ?? '';
  const answeredWrong = isAnswerCorrect === false;
  const answeredCorrect = isAnswerCorrect === true;

  const getOptionStyle = (option: string): string => {
    const base = 'text-left px-4 py-3 rounded-xl font-semibold text-sm transition-colors border-2 ';
    if (option === correctAnswer) {
      return base + 'bg-green-900/40 border-green-600 text-green-300';
    }
    if (option === answer && option !== correctAnswer) {
      return base + 'bg-red-900/40 border-red-700 text-red-400';
    }
    return base + 'bg-surface-overlay border-border text-gray-500 opacity-50';
  };

  return (
    <Card className="w-full max-w-2xl text-center animate-fade-in-up">
      {/* Participant: reminder of their personal result */}
      {!readOnly && answeredWrong && (
        <div className="mb-6 bg-red-900/30 border border-red-700 rounded-xl p-4 animate-scale-in-bounce">
          <p className="text-4xl mb-1">😈</p>
          <p className="text-red-400 font-bold text-lg">
            Você errou! Hora de convencer as pessoas com sua mentira.
          </p>
        </div>
      )}

      {!readOnly && answeredCorrect && (
        <div className="mb-6 bg-green-900/30 border border-green-700 rounded-xl p-4 animate-scale-in-bounce">
          <p className="text-4xl mb-1">🎉</p>
          <p className="text-green-400 font-bold text-lg">
            Você acertou!
          </p>
        </div>
      )}

      {/* Spectator: correct answer is now revealed after explanation */}
      {readOnly && (
        <div className="mb-6 bg-accent/10 border border-accent/30 rounded-xl p-4 animate-scale-in-bounce">
          <p className="text-3xl mb-1">🔍</p>
          <p className="text-accent font-bold text-lg">
            Resposta revelada!
          </p>
        </div>
      )}

      <h2 className="text-xl font-bold text-gray-100 mb-4">{question}</h2>

      {/* Color-coded answer options — 2x2 grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {options.map((option) => (
          <button
            key={option}
            disabled
            className={getOptionStyle(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {explanation && (
        <p className="text-sm text-gray-500 italic mb-4">
          {explanation}
        </p>
      )}

      {!readOnly && !isPresenter && (
        <p className="text-sm text-gray-600 italic">
          Aguardando o apresentador avançar para o placar...
        </p>
      )}

      {readOnly && (
        <p className="text-sm text-gray-600 italic">
          Aguardando o apresentador avançar para o placar...
        </p>
      )}
    </Card>
  );
};

export default Reveal;
