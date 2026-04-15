import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import Avatar from '../components/shared/Avatar';
import Timer from '../components/shared/Timer';

const ExplanationView: React.FC = () => {
  const game = useContext(GameContext);

  if (!game) return null;

  const { explanationPlayerId, players, timer } = game;

  const player = explanationPlayerId ? players[explanationPlayerId] : null;

  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-gray-500">Aguardando explicação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4">
      <div className="animate-scale-in bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6 w-full max-w-sm text-center">
        {/* Timer */}
        <Timer time={timer} />

        {/* Avatar */}
        <Avatar src={player.avatar} alt={player.name} size="large" />

        {/* Name */}
        <h2 className="text-3xl font-extrabold text-gray-800 animate-fade-in-up">{player.name}</h2>

        {/* Status */}
        <p className="text-lg text-gray-500 font-medium animate-fade-in-up-delay">Está explicando...</p>
      </div>
    </div>
  );
};

export default ExplanationView;
