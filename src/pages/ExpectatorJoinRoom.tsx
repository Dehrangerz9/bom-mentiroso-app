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
    <div className="flex items-center justify-center min-h-screen bg-red-500">
      <Card className="w-full max-w-md animate-fade-in-up">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100 active:scale-95"
            title="Voltar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Entrar como Expectador</h1>
        </div>
        <p className="text-sm text-gray-500 text-center mb-6">Você assistirá ao jogo sem participar.</p>

        {!connected && (
          <p className="text-yellow-600 text-center mb-4 text-sm">Conectando ao servidor...</p>
        )}

        {roomError && (
          <p className="text-red-600 text-center mb-4 font-semibold">{roomError}</p>
        )}

        <label className="block text-sm font-semibold mb-1">Código da Sala</label>
        <input
          type="text"
          placeholder="Ex: AB3X7K"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          maxLength={6}
          className="w-full px-4 py-2 border rounded-lg mb-6 uppercase tracking-widest text-center text-xl font-bold"
        />

        <Button onClick={handleJoin} disabled={!code.trim() || !connected}>
          Assistir ao Jogo
        </Button>
      </Card>
    </div>
  );
};

export default ExpectatorJoinRoom;
