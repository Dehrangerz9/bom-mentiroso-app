import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import Avatar from '../components/shared/Avatar';

// ─── Question deck data (static) ─────────────────────────────────────────────
// Imported inline to avoid an extra fetch; matches backend questions.json exactly.
interface DeckQuestion {
  id: string;
  category: string;
  difficulty: number;
  question: string;
  correctAnswer: string;
  options: string[];
}

const CATEGORIES_LABEL: Record<string, string> = {
  'thoughtworks': 'Thoughtworks',
  'cultura-pop': 'Cultura Pop',
  'geografia': 'Geografia',
  'historia-geral': 'História',
  'ciencia-natureza': 'Ciência',
  'esportes': 'Esportes',
  'literatura': 'Literatura',
  'gastronomia': 'Gastronomia',
  'artes': 'Artes',
  'astronomia': 'Astronomia',
  'linguas': 'Línguas',
  'jogos': 'Jogos',
  'economia': 'Economia',
  'ecologia': 'Ecologia',
};

// ─── Small helpers ────────────────────────────────────────────────────────────

function StateLabel({ state }: { state: string }) {
  const labels: Record<string, { text: string; color: string }> = {
    'lobby':              { text: 'Lobby',            color: 'bg-gray-600 text-gray-200' },
    'category-selection': { text: 'Categoria',        color: 'bg-blue-700 text-blue-200' },
    'question':           { text: 'Respondendo',      color: 'bg-yellow-700 text-yellow-200' },
    'answer-reveal':      { text: 'Revelação',        color: 'bg-orange-700 text-orange-200' },
    'explanation':        { text: 'Explicação',       color: 'bg-amber-700 text-amber-200' },
    'voting':             { text: 'Votação',          color: 'bg-purple-700 text-purple-200' },
    'reveal':             { text: 'Resultado',        color: 'bg-pink-700 text-pink-200' },
    'scoreboard':         { text: 'Placar',           color: 'bg-indigo-700 text-indigo-200' },
  };
  const { text, color } = labels[state] ?? { text: state, color: 'bg-gray-600 text-gray-200' };
  return (
    <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded ${color}`}>
      {text}
    </span>
  );
}

// ─── Question Deck Modal ──────────────────────────────────────────────────────

function QuestionDeckModal({
  questions,
  usedQuestionIds,
  onClose,
}: {
  questions: DeckQuestion[];
  usedQuestionIds: number[];
  onClose: () => void;
}) {
  const [filter, setFilter] = useState('');
  const [showUsed, setShowUsed] = useState(true);
  const lower = filter.toLowerCase();
  const filtered = questions.filter(
    (q) =>
      (showUsed || !usedQuestionIds.includes(q.id)) &&
      (!lower ||
        q.question.toLowerCase().includes(lower) ||
        q.correctAnswer.toLowerCase().includes(lower) ||
        (CATEGORIES_LABEL[q.category] ?? q.category).toLowerCase().includes(lower)),
  );

  const usedCount = questions.filter((q) => usedQuestionIds.includes(q.id)).length;

  // Difficulty color scale
  function diffColor(d: number): string {
    if (d <= 2) return 'bg-green-700 text-green-200';
    if (d <= 4) return 'bg-lime-700 text-lime-200';
    if (d <= 6) return 'bg-yellow-700 text-yellow-200';
    if (d <= 8) return 'bg-orange-700 text-orange-200';
    return 'bg-red-700 text-red-200';
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 overflow-y-auto p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-xl w-full max-w-5xl my-4 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-white font-bold text-lg leading-none">
              Deck de Questões
            </h2>
            <p className="text-gray-500 text-xs mt-1">
              {questions.length} questões · <span className="text-red-400">{usedCount} usadas</span> · <span className="text-green-400">{questions.length - usedCount} disponíveis</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl font-bold leading-none px-2"
          >
            ✕
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Filtrar por pergunta, resposta ou categoria..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-gray-100 text-sm border border-gray-700 focus:outline-none focus:border-gray-500 placeholder-gray-500"
          />
          <button
            onClick={() => setShowUsed((v) => !v)}
            className={[
              'px-3 py-2 rounded-lg text-xs font-semibold border transition-colors shrink-0',
              showUsed
                ? 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'
                : 'bg-red-900/40 border-red-700 text-red-300',
            ].join(' ')}
          >
            {showUsed ? 'Ocultar usadas' : 'Mostrar usadas'}
          </button>
        </div>

        {/* Two-column grid — vestibular layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((q, i) => {
            const isUsed = usedQuestionIds.includes(q.id);
            return (
              <div
                key={q.id}
                className={[
                  'rounded-lg p-3 border transition-opacity',
                  isUsed
                    ? 'bg-gray-800/40 border-gray-700/50 opacity-40'
                    : 'bg-gray-800 border-gray-700',
                ].join(' ')}
              >
                {/* Header row: number + category + difficulty badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-600 text-xs font-mono shrink-0">
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest truncate flex-1">
                    {CATEGORIES_LABEL[q.category] ?? q.category}
                  </span>
                  {/* Difficulty badge — prominent */}
                  <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded ${diffColor(q.difficulty)}`}>
                    Nível {q.difficulty}
                  </span>
                  {isUsed && (
                    <span className="shrink-0 text-xs text-gray-600 font-semibold">usada</span>
                  )}
                </div>

                {/* Question text */}
                <p className={`text-sm leading-snug mb-2 ${isUsed ? 'text-gray-500' : 'text-gray-100'}`}>
                  {q.question}
                </p>

                {/* Options */}
                <div className="flex flex-wrap gap-1">
                  {q.options.map((opt) => {
                    const isCorrect = opt === q.correctAnswer;
                    return (
                      <span
                        key={opt}
                        className={[
                          'text-xs px-2 py-0.5 rounded font-medium',
                          isCorrect
                            ? 'bg-green-800 text-green-200 border border-green-600'
                            : 'bg-gray-700 text-gray-500',
                        ].join(' ')}
                      >
                        {opt}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-8">Nenhuma questão encontrada.</p>
        )}
      </div>
    </div>
  );
}

// ─── Confirm dialog ───────────────────────────────────────────────────────────

function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-800 rounded-xl p-6 w-72 shadow-2xl border border-gray-700">
        <p className="text-white text-sm mb-5 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-gray-300 text-sm hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-3 py-2 rounded-lg bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const PresenterDashboard: React.FC = () => {
  const game = useContext(GameContext);

  const [pendingHotSeatId, setPendingHotSeatId] = useState<string | null>(null);
  const [showDeck, setShowDeck] = useState(false);
  const [deckQuestions, setDeckQuestions] = useState<DeckQuestion[]>([]);
  const [confirmReset, setConfirmReset] = useState(false);
  const [kickTarget, setKickTarget] = useState<string | null>(null);

  // Load question deck on mount — fetch all per-category-per-level files in parallel
  useEffect(() => {
    const categoryIds = [
      'thoughtworks', 'cultura-pop', 'geografia', 'historia-geral',
      'ciencia-natureza', 'esportes', 'literatura', 'gastronomia',
      'artes', 'astronomia', 'linguas', 'jogos', 'economia', 'ecologia',
    ];
    const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const fetches = categoryIds.flatMap((id) =>
      levels.map((level) =>
        fetch(`/questions-${id}-${level}.json`)
          .then((r) => r.json())
          .catch(() => ({ questions: [] }))
      )
    );
    Promise.all(fetches).then((results) => {
      const all = results.flatMap((d) => d?.questions ?? []);
      if (all.length > 0) setDeckQuestions(all);
    });
  }, []);

  useEffect(() => {
    if (game && game.connected && !game.roomCode) {
      game.createRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game?.connected]);

  useEffect(() => {
    if (game?.hotSeatPlayerId) setPendingHotSeatId(game.hotSeatPlayerId);
  }, [game?.hotSeatPlayerId]);

  if (!game) return <div className="text-white p-8">Carregando...</div>;

  const {
    gameState,
    roomCode,
    players,
    timer,
    enableAnswerSelection,
    revealBerlindaAnswer,
    startExplanation,
    startVoting,
    revealAnswer,
    showScoreboard,
    nextQuestion,
    resetGame,
    startGame,
    setHotSeat,
    kickPlayer,
    connected,
    hotSeatPlayerId,
    hotSeatVotes,
    expectatorCount,
    currentQuestion,
    isAnswerEnabled,
    usedCategories,
    usedQuestionIds,
  } = game;

  const playerList = Object.entries(players);
  const voterCount = Object.keys(hotSeatVotes).length;
  const eligibleVoters = playerList.filter(([id]) => id !== hotSeatPlayerId).length;
  const berlinda = hotSeatPlayerId ? players[hotSeatPlayerId] : null;

  const commitHotSeat = () => {
    if (pendingHotSeatId) setHotSeat(pendingHotSeatId);
  };

  // ── Action button for each game state ──────────────────────────────────────
  const renderAction = () => {
    switch (gameState) {
      case 'lobby':
        return (
          <div className="flex flex-col gap-2">
            {pendingHotSeatId !== hotSeatPlayerId && pendingHotSeatId && (
              <ActionBtn onClick={commitHotSeat} color="yellow">
                Confirmar Berlinda
              </ActionBtn>
            )}
            {!hotSeatPlayerId && (
              <p className="text-xs text-yellow-500 italic">
                Selecione um jogador como berlinda.
              </p>
            )}
            <ActionBtn
              onClick={startGame}
              color="green"
              disabled={playerList.length === 0 || !hotSeatPlayerId}
            >
              Iniciar Jogo ({playerList.length})
            </ActionBtn>
          </div>
        );
      case 'question':
        if (!isAnswerEnabled) {
          return (
            <ActionBtn onClick={enableAnswerSelection} color="blue">
              Liberar Resposta
            </ActionBtn>
          );
        }
        return (
          <div className="flex flex-col gap-2">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-0.5">Tempo restante</p>
              <p className="text-3xl font-extrabold text-yellow-400">{timer}s</p>
            </div>
            <ActionBtn onClick={revealBerlindaAnswer} color="yellow">
              Revelar Resposta da Berlinda
            </ActionBtn>
          </div>
        );
      case 'answer-reveal':
        return (
          <ActionBtn onClick={startExplanation} color="orange">
            Iniciar Explicação (45s)
          </ActionBtn>
        );
      case 'explanation':
        return (
          <div className="flex flex-col gap-2">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-0.5">Tempo restante</p>
              <p className="text-3xl font-extrabold text-yellow-400">{timer}s</p>
            </div>
            <ActionBtn onClick={startVoting} color="purple">
              Abrir Votação
            </ActionBtn>
          </div>
        );
      case 'voting':
        return (
          <div className="flex flex-col gap-2">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-0.5">Votos recebidos</p>
              <p className="text-3xl font-extrabold text-yellow-400">{voterCount}/{eligibleVoters}</p>
            </div>
            <ActionBtn onClick={revealAnswer} color="orange">
              Revelar Resultado
            </ActionBtn>
          </div>
        );
      case 'reveal':
        return (
          <ActionBtn onClick={showScoreboard} color="purple">
            Ver Placar
          </ActionBtn>
        );
      case 'scoreboard':
        return (
          <ActionBtn onClick={nextQuestion} color="blue">
            Próxima Pergunta
          </ActionBtn>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Question deck modal */}
      {showDeck && (
        <QuestionDeckModal questions={deckQuestions} usedQuestionIds={usedQuestionIds} onClose={() => setShowDeck(false)} />
      )}

      {/* Reset confirm dialog */}
      {confirmReset && (
        <ConfirmDialog
          message="Reiniciar o jogo vai zerar todos os pontos e voltar ao lobby. Os jogadores continuarão conectados. Confirmar?"
          onConfirm={() => {
            resetGame();
            setConfirmReset(false);
          }}
          onCancel={() => setConfirmReset(false)}
        />
      )}

      {/* Kick confirm dialog */}
      {kickTarget && (
        <ConfirmDialog
          message={`Remover ${players[kickTarget]?.name ?? 'jogador'} da sala?`}
          onConfirm={() => {
            kickPlayer(kickTarget);
            setKickTarget(null);
          }}
          onCancel={() => setKickTarget(null)}
        />
      )}

      <div className="min-h-screen bg-bg text-white flex flex-col font-sans">

        {/* ── Top bar ── */}
        <header className="bg-bg-deep border-b border-border px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-300 text-sm tracking-wide">Bom Mentiroso</span>
            <span className="text-gray-600">·</span>
            <StateLabel state={gameState} />
            {usedCategories.length > 0 && (
              <span className="text-xs text-gray-500">{usedCategories.length}/10 rodadas</span>
            )}
          </div>
          <div className="flex items-center gap-5">
            <span className="text-xs text-gray-500">
              <span className="text-blue-400 font-bold">{expectatorCount}</span> espectadores
            </span>
            {roomCode ? (
              <span className="text-xl font-extrabold tracking-[0.2em] text-yellow-400">{roomCode}</span>
            ) : (
              <span className="text-gray-500 text-xs">{connected ? 'Criando sala...' : 'Conectando...'}</span>
            )}
          </div>
        </header>

        {/* ── Body ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── Left sidebar: controls ── */}
          <aside className="w-64 shrink-0 border-r border-border flex flex-col p-4 gap-4 overflow-y-auto">

            {/* Current question */}
            {currentQuestion && gameState !== 'lobby' && gameState !== 'category-selection' && (
              <section>
                <SectionLabel>Pergunta</SectionLabel>
                <p className="text-gray-200 text-sm leading-snug mb-1">{currentQuestion.question}</p>
                <p className="text-green-400 text-xs font-semibold">✓ {currentQuestion.correctAnswer}</p>
              </section>
            )}

            {/* Berlinda */}
            {berlinda && gameState !== 'lobby' && (
              <section>
                <SectionLabel>Berlinda</SectionLabel>
                <div className="flex items-center gap-2">
                  <Avatar src={berlinda.avatar} alt={berlinda.name} size="small" />
                  <span className="text-sm font-semibold text-yellow-300">{berlinda.name}</span>
                </div>
              </section>
            )}

            {/* State action */}
            <section>
              <SectionLabel>Próxima ação</SectionLabel>
              {renderAction()}
            </section>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Utilities */}
            <section className="flex flex-col gap-2">
              <button
                onClick={() => setShowDeck(true)}
                className="w-full text-left px-3 py-2 rounded-lg bg-surface-overlay hover:bg-surface-raised text-gray-300 text-xs font-semibold transition-colors border border-border"
              >
                Ver deck de questões
              </button>
              <button
                onClick={() => setConfirmReset(true)}
                className="w-full text-left px-3 py-2 rounded-lg bg-red-900/40 hover:bg-red-800/60 text-red-400 text-xs font-semibold transition-colors border border-red-900"
              >
                Reiniciar jogo
              </button>
            </section>
          </aside>

          {/* ── Main area: players ── */}
          <main className="flex-1 p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Jogadores ({playerList.length})
              </h2>
              {gameState === 'lobby' && playerList.length > 0 && (
                <p className="text-xs text-yellow-500 italic">Clique para escolher berlinda</p>
              )}
            </div>

            {playerList.length === 0 ? (
              <p className="text-gray-600 text-sm animate-pulse">
                {gameState === 'lobby'
                  ? 'Aguardando jogadores entrarem...'
                  : 'Nenhum jogador na sala.'}
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {playerList.map(([id, p]) => {
                  const isHotSeat = hotSeatPlayerId === id;
                  const isPending = pendingHotSeatId === id && gameState === 'lobby';
                  const myVote = hotSeatVotes[id];
                  const pct = p.totalVotes > 0
                    ? Math.round((p.correctVotes / p.totalVotes) * 100)
                    : null;

                  // Status line below name
                  let status: React.ReactNode = null;
                  if (gameState === 'lobby') {
                    if (isHotSeat) status = <Tag color="yellow">Berlinda ⭐</Tag>;
                    else if (isPending) status = <Tag color="yellow">Selecionado</Tag>;
                    else status = <Tag color="gray">No lobby</Tag>;
                  } else if (gameState === 'category-selection' && isHotSeat) {
                    status = <Tag color="blue">Escolhendo...</Tag>;
                  } else if (gameState === 'question') {
                    if (isHotSeat) status = <Tag color={p.selectedAnswer ? 'green' : 'gray'}>{p.selectedAnswer ? 'Respondeu' : 'Aguardando...'}</Tag>;
                    else status = <Tag color="gray">Assistindo</Tag>;
                  } else if (gameState === 'explanation' && isHotSeat) {
                    status = <Tag color="green">Explicando...</Tag>;
                  } else if (gameState === 'voting') {
                    if (isHotSeat) status = <Tag color="yellow">Berlinda ⭐</Tag>;
                    else if (myVote === 'lying') status = <Tag color="red">Mentindo 🤥</Tag>;
                    else if (myVote === 'truth') status = <Tag color="green">Verdade ✅</Tag>;
                    else status = <Tag color="gray">Votando...</Tag>;
                  }

                  return (
                    <div
                      key={id}
                      onClick={() => {
                        if (gameState === 'lobby') setPendingHotSeatId(id);
                      }}
                      className={[
                        'relative rounded-xl p-3 border-2 transition-all group',
                        gameState === 'lobby' ? 'cursor-pointer' : 'cursor-default',
                        isPending
                          ? 'border-yellow-400 bg-yellow-900/20'
                          : isHotSeat
                          ? 'border-yellow-600 bg-yellow-900/10'
                           : 'border-border bg-surface',
                      ].join(' ')}
                    >
                      {/* Kick button — only in lobby, top-right corner, on hover */}
                      {gameState === 'lobby' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setKickTarget(id);
                          }}
                          title="Remover jogador"
                          className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded text-gray-600 hover:text-red-400 hover:bg-red-900/30 transition-colors opacity-0 group-hover:opacity-100 text-xs"
                        >
                          ✕
                        </button>
                      )}

                      <div className="flex items-center gap-2 mb-1.5">
                        <Avatar src={p.avatar} alt={p.name} size="small" />
                        <span className="font-semibold text-white text-sm truncate">{p.name}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-yellow-500 font-bold">{p.score} pts</span>
                        {pct !== null && (
                          <span className="text-xs text-gray-400">{pct}% acertos</span>
                        )}
                      </div>

                      {status && <div className="mt-1.5">{status}</div>}
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

// ─── Tiny reusable sub-components ────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{children}</p>
  );
}

const ACTION_COLORS: Record<string, string> = {
  green:  'bg-green-700 hover:bg-green-600 text-white',
  yellow: 'bg-yellow-600 hover:bg-yellow-500 text-gray-900',
  blue:   'bg-blue-700 hover:bg-blue-600 text-white',
  orange: 'bg-orange-700 hover:bg-orange-600 text-white',
  purple: 'bg-purple-700 hover:bg-purple-600 text-white',
  red:    'bg-red-700 hover:bg-red-600 text-white',
};

function ActionBtn({
  children,
  onClick,
  color = 'blue',
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'w-full px-3 py-2 rounded-lg text-sm font-semibold transition-colors',
        disabled ? 'opacity-40 cursor-not-allowed bg-gray-700 text-gray-400' : ACTION_COLORS[color] ?? ACTION_COLORS.blue,
      ].join(' ')}
    >
      {children}
    </button>
  );
}

const TAG_COLORS: Record<string, string> = {
  yellow: 'bg-yellow-900/60 text-yellow-300',
  green:  'bg-green-900/60 text-green-300',
  red:    'bg-red-900/60 text-red-300',
  blue:   'bg-blue-900/60 text-blue-300',
  gray:   'bg-gray-700/60 text-gray-400',
};

function Tag({ children, color = 'gray' }: { children: React.ReactNode; color?: string }) {
  return (
    <span className={`inline-block text-xs px-1.5 py-0.5 rounded font-medium ${TAG_COLORS[color] ?? TAG_COLORS.gray}`}>
      {children}
    </span>
  );
}

export default PresenterDashboard;
