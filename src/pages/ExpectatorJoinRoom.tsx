import React, { useState, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';

const ExpectatorJoinRoom: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const game = useContext(GameContext);
  const [code, setCode] = useState('');

  if (!game) return null;

  const { joinAsExpectator, roomError, connected } = game;

  const handleJoin = () => {
    if (code.trim()) {
      joinAsExpectator(code.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg p-4">
      <Card className="w-full max-w-md animate-fade-in-up">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-surface-overlay active:scale-95"
            title="Voltar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-100">Entrar como Expectador</h1>
        </div>
        <p className="text-sm text-gray-500 text-center mb-6">Você assistirá ao jogo sem participar.</p>

        {!connected && (
          <p className="text-yellow-500 text-center mb-4 text-sm">Conectando ao servidor...</p>
        )}

        {roomError && (
          <p className="text-red-400 text-center mb-4 font-semibold text-sm">{roomError}</p>
        )}

        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
          Código da Sala
        </label>
        <input
          type="text"
          placeholder="Ex: AB3X7K"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          maxLength={6}
          className="w-full px-4 py-3 bg-surface-overlay border border-border rounded-xl mb-6 uppercase tracking-widest text-center text-xl font-bold text-gray-100 placeholder-gray-600 focus:border-accent focus:outline-none transition-colors"
        />

        <Button onClick={handleJoin} disabled={!code.trim() || !connected}>
          Assistir ao Jogo
        </Button>
      </Card>
    </div>
  );
};

export default ExpectatorJoinRoom;
