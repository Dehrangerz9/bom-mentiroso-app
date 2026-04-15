import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import Avatar from '../components/shared/Avatar';

const ExpectatorCategorySelection: React.FC = () => {
  const game = useContext(GameContext);

  if (!game) return null;

  const { players, hotSeatPlayerId } = game;
  const playerEntries = Object.entries(players);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4 gap-4">
      {playerEntries.map(([id, p], i) => {
        const isHotSeat = id === hotSeatPlayerId;
        return (
          <div
            key={id}
            className={[
              'bg-white rounded-2xl shadow-xl p-6 flex items-center gap-5 w-full max-w-sm',
              i === 0 ? 'animate-scale-in' : 'animate-scale-in-delay',
            ].join(' ')}
          >
            <Avatar src={p.avatar} alt={p.name} size="medium" />
            <div className="flex flex-col">
              <h2 className="text-xl font-extrabold text-gray-800">{p.name}</h2>
              {isHotSeat ? (
                <p className="text-sm font-semibold text-red-500 mt-1 animate-pulse-soft">
                  Escolhendo uma categoria...
                </p>
              ) : (
                <p className="text-sm font-medium text-gray-400 mt-1">Aguardando...</p>
              )}
            </div>
            {isHotSeat && (
              <span className="ml-auto text-2xl">🎯</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExpectatorCategorySelection;
