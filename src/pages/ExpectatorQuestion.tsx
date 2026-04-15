import React, { useContext, useState, useEffect } from 'react';
import { GameContext } from '../contexts/GameContext';
import Card from '../components/shared/Card';
import Avatar from '../components/shared/Avatar';
import Timer from '../components/shared/Timer';

const TRANSITION_DURATION_MS = 2200;

const ExpectatorQuestion: React.FC = () => {
  const game = useContext(GameContext);
  const [showTransition, setShowTransition] = useState(true);
  const [questionKey, setQuestionKey] = useState<number | null>(null);

  // When a new question arrives, show the category transition first
  useEffect(() => {
    if (!game?.currentQuestion) return;

    const id = game.currentQuestion.id;
    if (id === questionKey) return; // same question, no re-trigger

    setShowTransition(true);
    setQuestionKey(id);

    const timer = setTimeout(() => {
      setShowTransition(false);
    }, TRANSITION_DURATION_MS);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game?.currentQuestion?.id]);

  if (!game || !game.currentQuestion) return null;

  const { currentQuestion, players, isAnswerEnabled, timer } = game;
  const playerList = Object.values(players);

  // Map category id to a display name from the categories list
  const categoryName =
    game.categories.find((c) => c.id === currentQuestion.category)?.name ??
    currentQuestion.category;

  // ── Transition screen ────────────────────────────────────────────────────────
  if (showTransition) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4 text-center">
        <p className="animate-fade-in text-white text-2xl font-semibold mb-4 opacity-90">
          A categoria escolhida foi...
        </p>
        <h1 className="animate-scale-in-delay text-white text-6xl font-extrabold drop-shadow-lg">
          {categoryName}
        </h1>
      </div>
    );
  }

  // ── Question screen (with entrance animation) ────────────────────────────────
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4 animate-fade-in-up">
      {/* Status banner */}
      {!isAnswerEnabled && (
        <div className="text-center animate-fade-in">
          <span className="inline-block bg-white text-gray-800 font-bold text-base px-5 py-2 rounded-full shadow-lg">
            Respostas ainda não liberadas
          </span>
        </div>
      )}

      {/* Player status cards — shown when answers are enabled */}
      {isAnswerEnabled && playerList.length > 0 && (
        <div className="flex flex-col gap-3">
          {playerList.map((p) => {
            const hasAnswered = !!p.selectedAnswer;
            return (
              <div
                key={p.name}
                className="flex items-center justify-between bg-white rounded-2xl shadow px-5 py-4"
              >
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-800">{p.name}</span>
                  <span className={`text-sm font-medium mt-1 ${hasAnswered ? 'text-green-600' : 'text-yellow-600'}`}>
                    {hasAnswered ? `${p.name} já escolheu` : 'Escolhendo uma resposta...'}
                  </span>
                </div>
                <Avatar src={p.avatar} alt={p.name} size="small" />
              </div>
            );
          })}
        </div>
      )}

      {/* Question card */}
      <Card className="w-full animate-fade-in-up-delay">
        <div className="mb-4 flex justify-center">
          <Timer time={timer} />
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">{currentQuestion.question}</h1>

        <div className={`grid grid-cols-2 gap-4 ${!isAnswerEnabled ? 'opacity-40' : 'opacity-100'}`}>
          {currentQuestion.options.map((option: string, index: number) => (
            <button
              key={index}
              disabled
              className="p-4 border rounded-lg text-left bg-white cursor-default"
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + index)}:</span>
              {option}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ExpectatorQuestion;
