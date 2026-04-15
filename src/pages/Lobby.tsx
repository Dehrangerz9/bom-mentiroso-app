import React, { useState, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import Avatar from '../components/shared/Avatar';
import { AVATAR_POOL, DEFAULT_AVATAR } from '../data/avatars';

// NOTE: This component is not currently used in the main app flow.
// ParticipantJoinRoom is used instead for participants.
const Lobby: React.FC = () => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATAR);
  const game = useContext(GameContext);

  const handleJoin = () => {
    if (name.trim() && game) {
      game.joinRoom('', name, selectedAvatar);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Entre no Jogo</h1>
      <div className="flex justify-center mb-6">
        <Avatar src={selectedAvatar} alt="Avatar selecionado" size="large" />
      </div>
      <div className="flex justify-center gap-3 flex-wrap mb-6">
        {AVATAR_POOL.map((avatar, index) => (
          <button
            key={index}
            onClick={() => setSelectedAvatar(avatar)}
            className={`rounded-full border-4 transition-all ${selectedAvatar === avatar ? 'border-red-500' : 'border-transparent'}`}
          >
            <Avatar src={avatar} alt={`Avatar ${index + 1}`} size="small" />
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Digite seu apelido"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-6"
      />
      <Button onClick={handleJoin} disabled={!name.trim()}>
        Entrar no Lobby
      </Button>
    </Card>
  );
};

export default Lobby;
