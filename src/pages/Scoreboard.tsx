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

  // % of lie-detections: voters who correctly identified berlinda was lying
  // Only meaningful when berlinda was lying; show 0% when berlinda was honest
  const lieVoters = voterEntries.filter(([, v]) => v === 'lying').length;
  const totalVoters = voterEntries.length;
  const lieDetectionPct = totalVoters > 0
    ? Math.round((lieVoters / totalVoters) * 100)
    : 0;

  // Non-berlinda players sorted by score
  const nonBerlindaPlayers = Object.entries(players)
    .filter(([id]) => id !== berlindaId)
    .sort(([, a], [, b]) => b.score - a.score);

  const content = (
    <div className={`flex flex-col items-center gap-6 w-full ${compact ? '' : 'max-w-sm'} text-center`}>

      {/* Berlinda result */}
      <div className="animate-fade-in-down flex flex-col items-center gap-3 w-full">
        <div
          className={[
            'w-full rounded-2xl p-5 flex flex-col items-center gap-2',
            wasCorrect
              ? 'bg-green-100 border-2 border-green-400'
              : 'bg-red-100 border-2 border-red-400',
          ].join(' ')}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Berlinda</p>
          <Avatar src={berlinda.avatar} alt={berlinda.name} size="medium" />
          <h2 className="text-xl font-extrabold text-gray-800">{berlinda.name}</h2>
          <p className="text-4xl">{wasCorrect ? '✅' : '❌'}</p>
          <p className={`text-lg font-extrabold ${wasCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {wasCorrect ? 'Acertou!' : 'Errou!'}
          </p>
          {berlindaWasLying && (
            <p className="text-sm font-semibold text-red-600 animate-fade-in">
              😈 Estava mentindo na explicação!
            </p>
          )}

          {/* Answers comparison */}
          <div className="w-full flex flex-col gap-2 mt-2">
            <div className="rounded-xl p-3 bg-white border border-gray-200 text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Respondeu</p>
              <p className={`font-bold text-sm ${wasCorrect ? 'text-green-700' : 'text-red-600'}`}>
                {playerAnswer || '—'}
              </p>
            </div>
            <div className="rounded-xl p-3 bg-green-50 border border-green-300 text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-1">Resposta correta</p>
              <p className="font-bold text-sm text-green-700">{correctAnswer}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lie detection meter */}
      <div className="animate-scale-in-bounce w-full bg-white rounded-2xl shadow p-5 border border-gray-100">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
          Detecção de Mentira
        </p>
        <p className="text-5xl font-extrabold text-red-500 mb-1">{lieDetectionPct}%</p>
        <p className="text-sm text-gray-500">
          {lieVoters}/{totalVoters} jogador{totalVoters !== 1 ? 'es' : ''} votaram "mentindo"
        </p>
        {/* Bar */}
        <div className="w-full bg-gray-100 rounded-full h-3 mt-3 overflow-hidden">
          <div
            className="h-3 rounded-full bg-red-400 transition-all duration-700"
            style={{ width: `${lieDetectionPct}%` }}
          />
        </div>
        {berlindaWasLying && correctVoters.length > 0 && (
          <p className="text-xs text-green-600 font-semibold mt-2">
            {correctVoters.length} acertou{correctVoters.length !== 1 ? 'ram' : ''} que era mentira!
          </p>
        )}
        {!berlindaWasLying && (
          <p className="text-xs text-blue-500 font-semibold mt-2">
            A berlinda disse a verdade desta vez!
          </p>
        )}
      </div>

      {/* Voters breakdown */}
      {voterEntries.length > 0 && (
        <div className="animate-fade-in-up-delay w-full">
          <div className="flex gap-3 w-full mb-3">
            <div className="flex-1 rounded-xl p-3 bg-red-50 border border-red-200 text-center">
              <p className="text-2xl font-extrabold text-red-600">{lieVoters}</p>
              <p className="text-xs text-red-500 font-semibold mt-0.5">Mentindo 🤥</p>
            </div>
            <div className="flex-1 rounded-xl p-3 bg-green-50 border border-green-200 text-center">
              <p className="text-2xl font-extrabold text-green-600">
                {voterEntries.filter(([, v]) => v === 'truth').length}
              </p>
              <p className="text-xs text-green-500 font-semibold mt-0.5">Verdade ✅</p>
            </div>
          </div>
          {correctVoters.length > 0 && (
            <div className="rounded-xl p-3 bg-green-50 border border-green-200 text-left mb-2">
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
            <div className="rounded-xl p-3 bg-red-50 border border-red-200 text-left">
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

      {/* Placar — apenas jogadores não-berlinda */}
      {nonBerlindaPlayers.length > 0 && (
        <div className="animate-fade-in-up-delay2 w-full">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Placar dos Detetives</p>
          <div className="flex flex-col gap-2">
            {nonBerlindaPlayers.map(([id, p], i) => (
              <div
                key={id}
                className="flex items-center justify-between rounded-xl px-4 py-3 bg-gray-100"
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
      )}
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
