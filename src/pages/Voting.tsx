import React, { useContext, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import Avatar from '../components/shared/Avatar';
import Card from '../components/shared/Card';

const Voting: React.FC = () => {
  const game = useContext(GameContext);
  const [voted, setVoted] = useState(false);

  if (!game) return null;

  const {
    players,
    hotSeatPlayerId,
    explanationPlayerAnswer,
    currentQuestion,
    hotSeatVotes,
    submitVote,
    socketId,
  } = game;

  const berlinda = hotSeatPlayerId ? players[hotSeatPlayerId] : null;
  const isBerlinda = socketId !== null && socketId === hotSeatPlayerId;
  const myVote = socketId ? hotSeatVotes[socketId] : undefined;
  const hasVoted = voted || !!myVote;

  const playerList = Object.entries(players).filter(([id]) => id !== hotSeatPlayerId);
  const totalVoters = playerList.length;
  const voteCount = Object.keys(hotSeatVotes).length;

  const handleVote = (vote: 'lying' | 'truth') => {
    if (hasVoted || isBerlinda) return;
    submitVote(vote);
    setVoted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg p-4">
      <div className="animate-fade-in-up bg-surface border border-border rounded-2xl shadow-xl p-8 w-full max-w-sm text-center flex flex-col items-center gap-6">

        {/* Title */}
        <h2 className="animate-fade-in-down text-xl font-extrabold text-gray-100 uppercase tracking-widest">
          A berlinda estava mentindo?
        </h2>

        {/* Berlinda recap */}
        {berlinda && (
          <div className="flex flex-col items-center gap-2">
            <Avatar src={berlinda.avatar} alt={berlinda.name} size="large" />
            <p className="text-base font-bold text-gray-300">{berlinda.name}</p>
            {currentQuestion && (
              <Card className="w-full bg-accent/10 border-accent/30 text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-accent/70 mb-1">
                  Respondeu
                </p>
                <p className="font-bold text-accent text-base">{explanationPlayerAnswer ?? '—'}</p>
              </Card>
            )}
          </div>
        )}

        {/* Berlinda sees a waiting message */}
        {isBerlinda ? (
          <div className="animate-fade-in w-full rounded-2xl bg-surface-overlay border border-border p-5 text-center">
            <p className="text-3xl mb-2">😶</p>
            <p className="text-lg font-bold text-gray-300">Os outros jogadores estão votando...</p>
          </div>
        ) : hasVoted ? (
          <div className="animate-scale-in-bounce w-full rounded-2xl bg-green-900/30 border-2 border-green-700 p-5 text-center">
            <p className="text-3xl mb-2">✅</p>
            <p className="text-lg font-bold text-green-400">Voto registrado!</p>
            <p className="text-sm text-gray-400 mt-1">
              {myVote === 'lying' ? 'Você votou: Mentindo 🤥' : 'Você votou: Dizendo a Verdade ✅'}
            </p>
            <p className="text-xs text-gray-600 mt-3 animate-pulse-soft">
              Aguardando os outros votarem...
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-3">
            <button
              onClick={() => handleVote('lying')}
              className="w-full py-4 rounded-xl font-extrabold text-lg bg-red-900/60 hover:bg-red-800/80 border border-red-700 text-red-300 shadow-md active:scale-95 transition-all"
            >
              Mentindo 🤥
            </button>
            <button
              onClick={() => handleVote('truth')}
              className="w-full py-4 rounded-xl font-extrabold text-lg bg-green-900/60 hover:bg-green-800/80 border border-green-700 text-green-300 shadow-md active:scale-95 transition-all"
            >
              Dizendo a Verdade ✅
            </button>
          </div>
        )}

        {/* Vote progress */}
        <p className="text-xs text-gray-600">
          {voteCount} de {totalVoters} voto{totalVoters !== 1 ? 's' : ''} recebido{totalVoters !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

export default Voting;
