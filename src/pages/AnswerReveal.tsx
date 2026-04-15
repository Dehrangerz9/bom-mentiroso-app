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
      <div className="animate-fade-in-up w-full max-w-lg flex flex-col gap-4">

        {/* Berlinda header */}
        {berlinda && (
          <div className="flex items-center gap-4 bg-white rounded-2xl shadow-xl px-6 py-4">
            <Avatar src={berlinda.avatar} alt={berlinda.name} size="medium" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Respondeu</p>
              <h2 className="text-2xl font-extrabold text-gray-800">{berlinda.name}</h2>
            </div>
          </div>
        )}

        {/* Question card with highlighted chosen answer */}
        <Card className="w-full">
          <h1 className="text-xl font-bold mb-5 text-center text-gray-800">
            {currentQuestion.question}
          </h1>

          {/* Difficulty badge */}
          {currentQuestion.difficulty && (
            <div className="flex justify-center mb-4">
              <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                Dificuldade: {currentQuestion.difficulty}/10
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options.map((option: string, index: number) => {
              const isChosen = option === chosenAnswer;
              return (
                <div
                  key={index}
                  className={[
                    'p-4 border-2 rounded-xl text-left transition-all',
                    isChosen
                      ? 'bg-yellow-400 border-yellow-500 shadow-lg scale-105'
                      : 'bg-gray-50 border-gray-200 opacity-50',
                  ].join(' ')}
                >
                  <span className={`font-bold mr-2 ${isChosen ? 'text-yellow-900' : 'text-gray-500'}`}>
                    {String.fromCharCode(65 + index)}:
                  </span>
                  <span className={isChosen ? 'font-extrabold text-yellow-900' : 'text-gray-600'}>
                    {option}
                  </span>
                  {isChosen && (
                    <span className="block text-xs font-bold text-yellow-800 mt-1 uppercase tracking-widest">
                      Escolhida ★
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        <p className="text-center text-xs text-white opacity-70 animate-pulse-soft">
          Aguardando o apresentador iniciar a explicação...
        </p>
      </div>
    </div>
  );
};

export default AnswerReveal;
