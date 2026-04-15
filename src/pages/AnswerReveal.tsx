import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import Avatar from '../components/shared/Avatar';
import Card from '../components/shared/Card';

const AnswerReveal: React.FC = () => {
  const game = useContext(GameContext);

  if (!game || !game.currentQuestion) return null;

  const { players, hotSeatPlayerId, explanationPlayerAnswer, currentQuestion } = game;
  const berlinda = hotSeatPlayerId ? players[hotSeatPlayerId] : null;

  const chosenAnswer = explanationPlayerAnswer;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4">
      <div className="animate-fade-in-up bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center flex flex-col items-center gap-6">

        {/* Title */}
        <h2 className="animate-fade-in-down text-xl font-extrabold text-gray-800 uppercase tracking-widest">
          A berlinda respondeu...
        </h2>

        {/* Berlinda player */}
        {berlinda && (
          <div className="flex flex-col items-center gap-2">
            <Avatar src={berlinda.avatar} alt={berlinda.name} size="large" />
            <p className="text-lg font-bold text-gray-700">{berlinda.name}</p>
          </div>
        )}

        {/* The chosen answer */}
        <Card className="animate-scale-in-bounce w-full bg-yellow-50 border-2 border-yellow-400">
          <div className="flex flex-col items-center gap-2 py-1">
            <p className="text-xs font-bold uppercase tracking-widest text-yellow-600">
              Escolheu a opção
            </p>
            <p className="text-2xl font-extrabold text-yellow-800">
              {chosenAnswer ?? '—'}
            </p>
          </div>
        </Card>

        {/* Question for context */}
        <p className="text-sm text-gray-500 italic text-center">
          "{currentQuestion.question}"
        </p>

        <p className="text-xs text-gray-400 animate-pulse-soft">
          Aguardando o apresentador iniciar a explicação...
        </p>
      </div>
    </div>
  );
};

export default AnswerReveal;
