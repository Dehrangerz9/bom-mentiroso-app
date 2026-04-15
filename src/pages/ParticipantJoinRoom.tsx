import React, { useState, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { AVATAR_POOL, DEFAULT_AVATAR } from '../data/avatars';

const ParticipantJoinRoom: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const game = useContext(GameContext);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(DEFAULT_AVATAR);

  if (!game) return null;

  const { joinRoom, roomError, connected } = game;

  const handleJoin = () => {
    if (code.trim() && name.trim()) {
      joinRoom(code.trim(), name.trim(), selectedAvatar);
    }
  };

  return (
    <div className="h-screen w-screen bg-red-500 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-4 pt-4 pb-2 flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 active:scale-95"
          title="Voltar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-black text-white tracking-tight">Entrar na Sala</h1>
        {!connected && (
          <p className="text-red-200 text-xs ml-auto">Conectando...</p>
        )}
        {roomError && (
          <p className="text-yellow-200 text-xs font-semibold ml-auto">{roomError}</p>
        )}
      </div>

      {/* Main body: form + avatar picker */}
      <div className="flex-1 min-h-0 flex flex-col sm:flex-row gap-3 px-3 pb-3">

        {/* Left panel: fields + button */}
        <div className="shrink-0 sm:w-52 flex flex-col gap-3 bg-white rounded-2xl shadow-lg p-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
              Código da Sala
            </label>
            <input
              type="text"
              placeholder="Ex: AB3X7K"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl uppercase tracking-widest text-center text-lg font-black focus:border-red-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
              Apelido
            </label>
            <input
              type="text"
              placeholder="Digite seu apelido"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm font-semibold focus:border-red-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Selected avatar preview */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Avatar</p>
            <img
              src={selectedAvatar}
              alt="Avatar selecionado"
              className="w-20 h-20 rounded-full object-cover border-4 border-red-400 shadow"
            />
          </div>

          <div className="mt-auto">
            <button
              onClick={handleJoin}
              disabled={!code.trim() || !name.trim() || !connected}
              className={[
                'w-full py-2.5 rounded-xl font-black text-sm tracking-wide transition-all',
                (!code.trim() || !name.trim() || !connected)
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 text-white shadow-md active:scale-95',
              ].join(' ')}
            >
              Entrar na Sala
            </button>
          </div>
        </div>

        {/* Right panel: avatar grid picker */}
        <div className="flex-1 min-h-0 bg-white rounded-2xl shadow-lg p-4 flex flex-col overflow-hidden">
          <p className="shrink-0 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
            Escolha seu Avatar
          </p>
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-4 gap-3">
              {AVATAR_POOL.map((avatar, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={[
                    'rounded-full overflow-hidden border-4 transition-all active:scale-95 focus:outline-none',
                    selectedAvatar === avatar
                      ? 'border-red-500 shadow-lg scale-105'
                      : 'border-transparent hover:border-red-300',
                  ].join(' ')}
                  aria-label={`Avatar ${i + 1}`}
                >
                  <img
                    src={avatar}
                    alt={`Avatar ${i + 1}`}
                    className="w-full h-full object-cover aspect-square"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ParticipantJoinRoom;
