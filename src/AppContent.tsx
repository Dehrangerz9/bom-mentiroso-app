import React, { useContext, useState, useEffect } from 'react';
import { GameContext } from './contexts/GameContext';
import ParticipantJoinRoom from './pages/ParticipantJoinRoom';
import ExpectatorJoinRoom from './pages/ExpectatorJoinRoom';
import CategorySelection from './pages/CategorySelection';
import ExpectatorCategorySelection from './pages/ExpectatorCategorySelection';
import Question from './pages/Question';
import ExpectatorQuestion from './pages/ExpectatorQuestion';
import AnswerReveal from './pages/AnswerReveal';
import Voting from './pages/Voting';
import Reveal from './pages/Reveal';
import ExplanationView from './pages/ExplanationView';
import Scoreboard from './pages/Scoreboard';

const TRANSITION_MS = 2200;

interface AppContentProps {
  role: 'participant' | 'expectator';
  onBack: () => void;
}

const AppContent: React.FC<AppContentProps> = ({ role, onBack }) => {
  const game = useContext(GameContext);
  // Track category transition for participant
  const [showCategoryTransition, setShowCategoryTransition] = useState(false);
  const [transitionQuestionId, setTransitionQuestionId] = useState<number | null>(null);
  const [transitionCategoryName, setTransitionCategoryName] = useState('');

  // Trigger category transition when a new question arrives (participant only)
  useEffect(() => {
    if (!game?.currentQuestion || role !== 'participant') return;
    const id = game.currentQuestion.id;
    if (id === transitionQuestionId) return;

    const catName =
      game.categories.find((c) => c.id === game.currentQuestion!.category)?.name ??
      game.currentQuestion.category;

    setTransitionCategoryName(catName);
    setTransitionQuestionId(id);
    setShowCategoryTransition(true);

    const t = setTimeout(() => setShowCategoryTransition(false), TRANSITION_MS);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game?.currentQuestion?.id]);

  if (!game) return <div>Carregando...</div>;

  const { gameState, roomCode, hotSeatPlayerId, socketId } = game;
  const isExpectator = role === 'expectator';
  const isBerlinda = !isExpectator && socketId !== null && socketId === hotSeatPlayerId;

  // Not in a room yet — show appropriate join screen
  if (!roomCode) {
    return isExpectator ? <ExpectatorJoinRoom onBack={onBack} /> : <ParticipantJoinRoom onBack={onBack} />;
  }

  // Category transition overlay for participant
  if (!isExpectator && showCategoryTransition) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4 text-center">
        <p className="animate-fade-in text-white text-2xl font-semibold mb-4 opacity-90">
          A categoria escolhida foi...
        </p>
        <h1 className="animate-scale-in-delay text-white text-6xl font-extrabold drop-shadow-lg">
          {transitionCategoryName}
        </h1>
      </div>
    );
  }

  const renderContent = () => {
    switch (gameState) {
      case 'lobby':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-red-500">
            <div className="animate-scale-in bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-xl font-semibold text-gray-700">
                {isExpectator
                  ? 'Aguardando o jogo iniciar...'
                  : 'Aguardando o apresentador iniciar o jogo...'}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Sala: <span className="font-bold tracking-widest">{roomCode}</span>
              </p>
            </div>
          </div>
        );

      case 'category-selection':
        if (isExpectator) {
          return <ExpectatorCategorySelection />;
        }
        // Non-berlinda participant sees a waiting screen
        if (!isBerlinda) {
          return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4">
              <div className="animate-scale-in bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-xl font-semibold text-gray-700">
                  A berlinda está escolhendo a categoria...
                </p>
                <p className="text-3xl mt-4 animate-pulse-soft">🎯</p>
              </div>
            </div>
          );
        }
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4">
            <CategorySelection />
          </div>
        );

      case 'question':
        if (isExpectator) {
          return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4">
              <ExpectatorQuestion />
            </div>
          );
        }
        // Non-berlinda sees a watching screen
        if (!isBerlinda) {
          return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4">
              <div className="animate-scale-in bg-white rounded-xl shadow-lg p-8 text-center max-w-sm">
                <p className="text-xl font-semibold text-gray-700">
                  A berlinda está respondendo a pergunta...
                </p>
                <p className="text-3xl mt-4 animate-pulse-soft">🤔</p>
              </div>
            </div>
          );
        }
        // Berlinda answers
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4">
            <Question />
          </div>
        );

      case 'answer-reveal':
        return <AnswerReveal />;

      case 'explanation':
        return <ExplanationView />;

      case 'voting':
        if (isExpectator) {
          return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4">
              <div className="animate-scale-in bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-xl font-semibold text-gray-700">Jogadores estão votando...</p>
                <p className="text-3xl mt-4 animate-pulse-soft">🗳️</p>
              </div>
            </div>
          );
        }
        return <Voting />;

      case 'reveal':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4">
            <Reveal readOnly={isExpectator} />
          </div>
        );

      case 'scoreboard':
        return <Scoreboard />;

      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default AppContent;
