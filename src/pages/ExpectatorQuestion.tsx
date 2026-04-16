import React, { useContext, useState, useEffect } from 'react';
import { GameContext } from '../contexts/GameContext';
import Card from '../components/shared/Card';
import Avatar from '../components/shared/Avatar';
import Timer from '../components/shared/Timer';

const TRANSITION_DURATION_MS = 2200;

const ExpectatorQuestion: React.FC = () => {
  const game = useContext(GameContext);
  const [showTransition, setShowTransition] = useState(true);
  const [questionKey, setQuestionKey] = useState<string | null>(null);

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

  const { currentQuestion, players, hotSeatPlayerId, isAnswerEnabled, timer } = game;
  const playerEntries = Object.entries(players);

  // Map category id to a display name from the categories list
  const categoryName =
    game.categories.find((c) => c.id === currentQuestion.category)?.name ??
    currentQuestion.category;

  // ── Transition screen ────────────────────────────────────────────────────────
  if (showTransition) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg p-4 text-center">
        <p className="animate-fade-in text-gray-400 text-2xl font-semibold mb-4">
          A categoria escolhida foi...
        </p>
        <h1 className="animate-scale-in-delay text-accent text-6xl font-extrabold drop-shadow-lg">
          {categoryName}
        </h1>
      </div>
    );
  }

  // ── Question screen ──────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4 animate-fade-in-up">

      {/* Player status cards — always visible */}
      {playerEntries.length > 0 && (
        <div className="flex flex-col gap-2">
          {playerEntries.map(([id, p]) => {
            const isHotSeat = id === hotSeatPlayerId;
            return (
              <div
                key={id}
                className={[
                  'flex items-center justify-between bg-surface border rounded-2xl shadow px-5 py-3',
                  isHotSeat ? 'border-accent/40' : 'border-border',
                ].join(' ')}
              >
                <div className="flex items-center gap-3">
                  <Avatar src={p.avatar} alt={p.name} size="small" />
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-gray-100">{p.name}</span>
                    {isHotSeat ? (
                      <span className="text-xs font-semibold text-accent animate-pulse-soft">
                        Respondendo...
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-gray-500">Aguardando...</span>
                    )}
                  </div>
                </div>
                {isHotSeat && <span className="text-lg">🤔</span>}
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
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-100">{currentQuestion.question}</h1>

        {/* Difficulty badge */}
        {currentQuestion.difficulty && (
          <div className="flex justify-center mb-4">
            <span className="inline-block bg-surface-overlay border border-border text-gray-400 text-xs font-bold px-3 py-1 rounded-full">
              Dificuldade: {currentQuestion.difficulty}/10
            </span>
          </div>
        )}

        <div className={`grid grid-cols-2 gap-4 ${!isAnswerEnabled ? 'opacity-40' : 'opacity-100'}`}>
          {currentQuestion.options.map((option: string, index: number) => (
            <button
              key={index}
              disabled
              className="p-4 border border-border rounded-xl text-left bg-surface-overlay text-gray-400 cursor-default text-sm"
            >
              <span className="font-bold mr-2 text-gray-600">{String.fromCharCode(65 + index)}:</span>
              {option}
            </button>
          ))}
        </div>

        {!isAnswerEnabled && (
          <p className="text-center text-xs text-gray-600 mt-4 italic">
            Aguardando o apresentador liberar a resposta...
          </p>
        )}
      </Card>
    </div>
  );
};

export default ExpectatorQuestion;
