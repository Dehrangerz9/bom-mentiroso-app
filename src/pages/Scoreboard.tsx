import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import Avatar from '../components/shared/Avatar';

interface ScoreboardProps {
  /** When true: show inside the presenter dashboard (no full-screen wrapper) */
  compact?: boolean;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ compact = false }) => {
  const game = useContext(GameContext);

  if (!game) return null;

  const {
    hotSeatPlayerId,
    explanationPlayerId,
    explanationPlayerAnswer,
    currentQuestion,
    players,
    hotSeatVotes,
  } = game;

  // Prefer hotSeatPlayerId; fall back to explanationPlayerId for backwards compat
  const berlindaId = hotSeatPlayerId ?? explanationPlayerId;
  const player = berlindaId ? players[berlindaId] : null;

  if (!player || !currentQuestion) return null;

  const correctAnswer = currentQuestion.correctAnswer;
  const playerAnswer = explanationPlayerAnswer ?? '';
  const wasCorrect = playerAnswer === correctAnswer;
  const wasLying = !wasCorrect; // answered wrong → had to lie during explanation

  // Vote results
  const voterEntries = Object.entries(hotSeatVotes);
  const correctVote: 'lying' | 'truth' = wasCorrect ? 'truth' : 'lying';
  const correctVoters = voterEntries.filter(([, v]) => v === correctVote);
  const wrongVoters = voterEntries.filter(([, v]) => v !== correctVote);

  const content = (
    <div className={`flex flex-col items-center gap-6 w-full ${compact ? '' : 'max-w-sm'} text-center`}>
      {/* Player avatar + name */}
      <div className="animate-fade-in-down flex flex-col items-center gap-3">
        <Avatar src={player.avatar} alt={player.name} size="large" />
        <h2 className="text-3xl font-extrabold text-gray-800">{player.name}</h2>
      </div>

      {/* Result badge */}
      <div
        className={[
          'animate-scale-in-bounce w-full rounded-2xl p-5',
          wasCorrect
            ? 'bg-green-100 border-2 border-green-400'
            : 'bg-red-100 border-2 border-red-400',
        ].join(' ')}
      >
        <p className="text-5xl mb-2">{wasCorrect ? '✅' : '❌'}</p>
        <p className={`text-2xl font-extrabold ${wasCorrect ? 'text-green-700' : 'text-red-700'}`}>
          {wasCorrect ? 'Acertou!' : 'Errou!'}
        </p>
        {wasLying && (
          <p className="text-sm font-semibold text-red-600 mt-1 animate-fade-in">
            😈 Estava mentindo!
          </p>
        )}
      </div>

      {/* Answers comparison */}
      <div className="animate-fade-in-up-delay w-full flex flex-col gap-3">
        <div className="rounded-xl p-4 bg-gray-100 border border-gray-200 text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
            Respondeu
          </p>
          <p className={`font-bold text-base ${wasCorrect ? 'text-green-700' : 'text-red-600'}`}>
            {playerAnswer || '—'}
          </p>
        </div>

        <div className="rounded-xl p-4 bg-green-50 border border-green-300 text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-1">
            Resposta correta
          </p>
          <p className="font-bold text-base text-green-700">{correctAnswer}</p>
        </div>
      </div>

      {/* Voting results */}
      {voterEntries.length > 0 && (
        <div className="animate-fade-in-up-delay w-full">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Resultado da Votação</p>
          <div className="flex gap-3 w-full mb-3">
            <div className="flex-1 rounded-xl p-3 bg-red-50 border border-red-200 text-center">
              <p className="text-2xl font-extrabold text-red-600">
                {voterEntries.filter(([, v]) => v === 'lying').length}
              </p>
              <p className="text-xs text-red-500 font-semibold mt-0.5">Mentindo 🤥</p>
            </div>
            <div className="flex-1 rounded-xl p-3 bg-green-50 border border-green-200 text-center">
              <p className="text-2xl font-extrabold text-green-600">
                {voterEntries.filter(([, v]) => v === 'truth').length}
              </p>
              <p className="text-xs text-green-500 font-semibold mt-0.5">Verdade ✅</p>
            </div>
          </div>
          {/* Who got it right */}
          {correctVoters.length > 0 && (
            <div className="rounded-xl p-3 bg-green-50 border border-green-200 text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">
                Acertaram o voto (+1 pt)
              </p>
              <div className="flex flex-col gap-1">
                {correctVoters.map(([id]) => {
                  const p = players[id];
                  if (!p) return null;
                  return (
                    <div key={id} className="flex items-center gap-2">
                      <Avatar src={p.avatar} alt={p.name} size="small" />
                      <span className="text-sm font-semibold text-green-800">{p.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {wrongVoters.length > 0 && (
            <div className="rounded-xl p-3 bg-red-50 border border-red-200 text-left mt-2">
              <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
                Erraram o voto
              </p>
              <div className="flex flex-col gap-1">
                {wrongVoters.map(([id]) => {
                  const p = players[id];
                  if (!p) return null;
                  return (
                    <div key={id} className="flex items-center gap-2">
                      <Avatar src={p.avatar} alt={p.name} size="small" />
                      <span className="text-sm font-semibold text-red-700">{p.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Scoreboard — all players */}
      <div className="animate-fade-in-up-delay2 w-full">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Placar</p>
        <div className="flex flex-col gap-2">
          {Object.values(players)
            .sort((a, b) => b.score - a.score)
            .map((p, i) => (
              <div
                key={p.name}
                className={[
                  'flex items-center justify-between rounded-xl px-4 py-3',
                  p.name === player.name ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-100',
                ].join(' ')}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-400 w-5">{i + 1}.</span>
                  <Avatar src={p.avatar} alt={p.name} size="small" />
                  <span className="font-bold text-gray-800">{p.name}</span>
                </div>
                <span className="font-extrabold text-yellow-600">{p.score} pts</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  if (compact) return content;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 p-4 overflow-y-auto">
      <div className="animate-fade-in-up bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        {content}
      </div>
    </div>
  );
};

export default Scoreboard;
