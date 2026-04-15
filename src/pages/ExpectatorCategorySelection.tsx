import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import Avatar from '../components/shared/Avatar';

const ExpectatorCategorySelection: React.FC = () => {
  const game = useContext(GameContext);

  if (!game) return null;

  const { players } = game;
  const playerList = Object.values(players);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4 gap-6">
      {playerList.map((p, i) => (
        <div
          key={p.name}
          className={[
            'bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6 w-full max-w-sm text-center',
            i === 0 ? 'animate-scale-in' : 'animate-scale-in-delay',
          ].join(' ')}
        >
          <Avatar src={p.avatar} alt={p.name} size="large" />
          <h2 className="text-3xl font-extrabold text-gray-800">{p.name}</h2>
          <p className="text-lg text-gray-500 font-medium animate-pulse-soft">Está escolhendo uma categoria...</p>
        </div>
      ))}
    </div>
  );
};

export default ExpectatorCategorySelection;
