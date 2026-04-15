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

  const berlindaId = hotSeatPlayerId ?? explanationPlayerId;
  const berlinda = berlindaId ? players[berlindaId] : null;

  if (!berlinda || !currentQuestion) return null;

  const correctAnswer = currentQuestion.correctAnswer;
  const playerAnswer = explanationPlayerAnswer ?? '';
  const wasCorrect = playerAnswer === correctAnswer;
  const berlindaWasLying = !wasCorrect;

  // Vote results
  const voterEntries = Object.entries(hotSeatVotes);
  const correctVote: 'lying' | 'truth' = wasCorrect ? 'truth' : 'lying';
  const correctVoters = voterEntries.filter(([, v]) => v === correctVote);
  const wrongVoters = voterEntries.filter(([, v]) => v !== correctVote);
  const lieVoters = voterEntries.filter(([, v]) => v === 'lying').length;
  const totalVoters = voterEntries.length;

  // Non-berlinda players sorted by cumulative % accuracy (correctVotes / totalVotes)
  const nonBerlindaPlayers = Object.entries(players)
    .filter(([id]) => id !== berlindaId)
    .sort(([, a], [, b]) => {
      const pctA = a.totalVotes > 0 ? a.correctVotes / a.totalVotes : 0;
      const pctB = b.totalVotes > 0 ? b.correctVotes / b.totalVotes : 0;
      return pctB - pctA;
    });

  const content = (
    <div className={`flex flex-col items-center gap-6 w-full ${compact ? '' : 'max-w-sm'} text-center`}>

      {/* Berlinda result */}
      <div className="animate-fade-in-down w-full">
        <div
          className={[
            'w-full rounded-2xl p-5 flex flex-col items-center gap-2 border-2',
            wasCorrect
              ? 'bg-green-900/20 border-green-700'
              : 'bg-red-900/20 border-red-800',
          ].join(' ')}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Berlinda</p>
          <Avatar src={berlinda.avatar} alt={berlinda.name} size="medium" />
          <h2 className="text-xl font-extrabold text-gray-100">{berlinda.name}</h2>
          <p className="text-4xl">{wasCorrect ? '✅' : '❌'}</p>
          <p className={`text-lg font-extrabold ${wasCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {berlindaWasLying ? 'Estava mentindo!' : 'Disse a verdade!'}
          </p>

          {/* Answers comparison */}
          <div className="w-full flex flex-col gap-2 mt-2">
            <div className="rounded-xl p-3 bg-surface border border-border text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-1">Respondeu</p>
              <p className={`font-bold text-sm ${wasCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {playerAnswer || '—'}
              </p>
            </div>
            <div className="rounded-xl p-3 bg-green-900/20 border border-green-800 text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-1">Resposta correta</p>
              <p className="font-bold text-sm text-green-400">{correctAnswer}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vote breakdown */}
      {voterEntries.length > 0 && (
        <div className="animate-scale-in-bounce w-full bg-surface border border-border rounded-2xl shadow p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-3">
            Votos desta rodada
          </p>
          <div className="flex gap-3 w-full mb-3">
            <div className="flex-1 rounded-xl p-3 bg-red-900/20 border border-red-800 text-center">
              <p className="text-2xl font-extrabold text-red-400">{lieVoters}</p>
              <p className="text-xs text-red-500 font-semibold mt-0.5">Mentindo</p>
            </div>
            <div className="flex-1 rounded-xl p-3 bg-green-900/20 border border-green-800 text-center">
              <p className="text-2xl font-extrabold text-green-400">
                {totalVoters - lieVoters}
              </p>
              <p className="text-xs text-green-600 font-semibold mt-0.5">Verdade</p>
            </div>
          </div>
          {correctVoters.length > 0 && (
            <div className="rounded-xl p-3 bg-green-900/20 border border-green-800 text-left mb-2">
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
                      <span className="text-sm font-semibold text-green-400">{p.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {wrongVoters.length > 0 && (
            <div className="rounded-xl p-3 bg-red-900/20 border border-red-800 text-left">
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
                      <span className="text-sm font-semibold text-red-400">{p.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Placar dos Detetives — % de acertos acumulado */}
      {nonBerlindaPlayers.length > 0 && (
        <div className="animate-fade-in-up-delay w-full">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-3">
            Placar dos Detetives
          </p>
          <div className="flex flex-col gap-2">
            {nonBerlindaPlayers.map(([id, p], i) => {
              const pct = p.totalVotes > 0
                ? Math.round((p.correctVotes / p.totalVotes) * 100)
                : 0;
              return (
                <div
                  key={id}
                  className="flex items-center justify-between rounded-xl px-4 py-3 bg-surface-overlay border border-border"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-600 w-5">{i + 1}.</span>
                    <Avatar src={p.avatar} alt={p.name} size="small" />
                    <span className="font-bold text-gray-200">{p.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-extrabold text-accent text-lg leading-none">{pct}%</span>
                    <span className="text-xs text-gray-600">{p.correctVotes}/{p.totalVotes} acertos</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  if (compact) return content;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg p-4 overflow-y-auto">
      <div className="animate-fade-in-up w-full max-w-sm py-6">
        {content}
      </div>
    </div>
  );
};

export default Scoreboard;
