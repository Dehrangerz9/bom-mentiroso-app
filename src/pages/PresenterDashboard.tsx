import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import Avatar from '../components/shared/Avatar';
import Scoreboard from './Scoreboard';

const PresenterDashboard: React.FC = () => {
  const game = useContext(GameContext);
  // Temporarily selected berlinda during lobby
  const [pendingHotSeatId, setPendingHotSeatId] = useState<string | null>(null);

  useEffect(() => {
    if (game && game.connected && !game.roomCode) {
      game.createRoom();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game?.connected]);

  // Sync pendingHotSeatId with the committed value on state changes
  useEffect(() => {
    if (game?.hotSeatPlayerId) setPendingHotSeatId(game.hotSeatPlayerId);
  }, [game?.hotSeatPlayerId]);

  if (!game) return <div>Carregando...</div>;

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
    connected,
    hotSeatPlayerId,
    hotSeatVotes,
    expectatorCount,
    currentQuestion,
  } = game;

  const playerList = Object.entries(players);
  const voterCount = Object.keys(hotSeatVotes).length;
  const eligibleVoters = playerList.filter(([id]) => id !== hotSeatPlayerId).length;

  const commitHotSeat = () => {
    if (pendingHotSeatId) setHotSeat(pendingHotSeatId);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col">
      {/* Top bar */}
      <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Painel do Apresentador</h1>
        <div className="flex items-center gap-6">
          {/* Spectator counter */}
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Espectadores</p>
            <p className="text-2xl font-extrabold text-blue-400">{expectatorCount}</p>
          </div>
          {roomCode ? (
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase tracking-widest">Código da Sala</p>
              <p className="text-3xl font-extrabold tracking-widest text-yellow-400">{roomCode}</p>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">{connected ? 'Criando sala...' : 'Conectando...'}</p>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 gap-6 p-6">

        {/* Left column: game flow controls */}
        <div className="flex flex-col gap-4 w-72 shrink-0">
          <Card className="bg-gray-700">
            <h3 className="text-lg font-bold mb-4">Fluxo do Jogo</h3>

            {/* Current question info (visible from question state onwards) */}
            {currentQuestion && gameState !== 'lobby' && gameState !== 'category-selection' && (
              <div className="mb-4 bg-gray-600 rounded-lg p-3">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Pergunta atual</p>
                <p className="text-sm font-semibold text-white leading-tight">{currentQuestion.question}</p>
                {currentQuestion.correctAnswer && (
                  <p className="text-xs text-green-400 mt-1 font-medium">
                    ✓ {currentQuestion.correctAnswer}
                  </p>
                )}
              </div>
            )}

            {/* Berlinda badge (visible when set) */}
            {hotSeatPlayerId && players[hotSeatPlayerId] && gameState !== 'lobby' && (
              <div className="mb-4 flex items-center gap-2 bg-yellow-900/40 border border-yellow-500 rounded-lg p-2">
                <Avatar src={players[hotSeatPlayerId].avatar} alt={players[hotSeatPlayerId].name} size="small" />
                <div>
                  <p className="text-xs text-yellow-400 uppercase tracking-widest">Berlinda</p>
                  <p className="text-sm font-bold text-white">{players[hotSeatPlayerId].name}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {/* 1. lobby → choose berlinda + start */}
              {gameState === 'lobby' && (
                <>
                  {pendingHotSeatId !== hotSeatPlayerId && pendingHotSeatId && (
                    <Button onClick={commitHotSeat} className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                      Confirmar Berlinda
                    </Button>
                  )}
                  {!hotSeatPlayerId && (
                    <p className="text-xs text-yellow-300 italic">
                      Selecione um jogador como berlinda antes de iniciar.
                    </p>
                  )}
                  <Button
                    onClick={startGame}
                    className="w-full"
                    disabled={playerList.length === 0 || !hotSeatPlayerId}
                  >
                    Iniciar Jogo ({playerList.length} jogador{playerList.length !== 1 ? 'es' : ''})
                  </Button>
                </>
              )}

              {/* 2. question, answers locked → enable answers */}
              {gameState === 'question' && !game.isAnswerEnabled && (
                <Button onClick={enableAnswerSelection} className="w-full">
                  Liberar Resposta da Berlinda
                </Button>
              )}

              {/* 3. question, answers enabled → timer + reveal berlinda answer */}
              {gameState === 'question' && game.isAnswerEnabled && (
                <>
                  <div className="text-center bg-gray-600 rounded-lg p-3">
                    <p className="text-sm text-gray-300 mb-1">Tempo restante</p>
                    <p className="text-4xl font-extrabold text-yellow-400">{timer}s</p>
                  </div>
                  <Button
                    onClick={revealBerlindaAnswer}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                  >
                    Revelar Resposta da Berlinda
                  </Button>
                </>
              )}

              {/* 4. answer-reveal → start explanation */}
              {gameState === 'answer-reveal' && (
                <Button onClick={startExplanation} className="w-full bg-orange-500 hover:bg-orange-600">
                  Iniciar Explicação (45s)
                </Button>
              )}

              {/* 5. explanation → open voting */}
              {gameState === 'explanation' && (
                <>
                  <div className="text-center bg-gray-600 rounded-lg p-3">
                    <p className="text-sm text-gray-300 mb-1">Tempo restante</p>
                    <p className="text-4xl font-extrabold text-yellow-400">{timer}s</p>
                  </div>
                  <Button onClick={startVoting} className="w-full bg-purple-500 hover:bg-purple-600">
                    Abrir Votação
                  </Button>
                </>
              )}

              {/* 6. voting → reveal correct answer */}
              {gameState === 'voting' && (
                <>
                  <div className="text-center bg-gray-600 rounded-lg p-3">
                    <p className="text-sm text-gray-300 mb-1">Votos recebidos</p>
                    <p className="text-4xl font-extrabold text-yellow-400">
                      {voterCount}/{eligibleVoters}
                    </p>
                  </div>
                  <Button onClick={revealAnswer} className="w-full bg-orange-500 hover:bg-orange-600">
                    Revelar Resposta Correta
                  </Button>
                </>
              )}

              {/* 7. reveal → scoreboard */}
              {gameState === 'reveal' && (
                <Button onClick={showScoreboard} className="w-full bg-purple-600 hover:bg-purple-700">
                  Ver Placar
                </Button>
              )}

              {/* 8. scoreboard → next question */}
              {gameState === 'scoreboard' && (
                <Button onClick={nextQuestion} className="w-full bg-blue-600 hover:bg-blue-700">
                  Próxima Pergunta
                </Button>
              )}

              <Button onClick={resetGame} className="w-full bg-red-600 hover:bg-red-700">
                Reiniciar Jogo
              </Button>
            </div>
          </Card>
        </div>

        {/* Right column: players / scoreboard */}
        <div className="flex-1">
          {gameState === 'scoreboard' ? (
            <Card className="bg-white h-full overflow-y-auto">
              <Scoreboard compact />
            </Card>
          ) : (
          <Card className="bg-gray-700 h-full">
            <h3 className="text-lg font-bold mb-4">
              Jogadores ({playerList.length})
            </h3>

            {playerList.length === 0 ? (
              <p className="text-gray-400 text-sm animate-pulse-soft">
                {gameState === 'lobby'
                  ? 'Aguardando participantes entrarem na sala...'
                  : 'Nenhum jogador na sala.'}
              </p>
            ) : (
              <>
                {gameState === 'lobby' && (
                  <p className="text-xs text-yellow-300 mb-3 italic">
                    Clique em um jogador para escolhê-lo como berlinda.
                  </p>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {playerList.map(([id, p], idx) => {
                    const isHotSeat = hotSeatPlayerId === id;
                    const isPending = pendingHotSeatId === id && gameState === 'lobby';
                    const isExplaining = gameState === 'explanation' && hotSeatPlayerId === id;
                    const hasAnswered = !!p.selectedAnswer;
                    const myVote = hotSeatVotes[id];

                    return (
                      <button
                        key={id}
                        onClick={() => {
                          if (gameState === 'lobby') setPendingHotSeatId(id);
                        }}
                        className={[
                          'flex items-center gap-3 rounded-xl p-3 text-left transition-all border-2',
                          idx < 2 ? 'animate-fade-in-up' : 'animate-fade-in-up-delay',
                          gameState === 'lobby' ? 'cursor-pointer' : 'cursor-default',
                          isPending
                            ? 'border-yellow-300 bg-yellow-900/30'
                            : isHotSeat
                            ? 'border-yellow-500 bg-yellow-900/20'
                            : isExplaining
                            ? 'border-green-400 bg-gray-600'
                            : 'border-transparent bg-gray-600 hover:bg-gray-500',
                        ].join(' ')}
                      >
                        <Avatar src={p.avatar} alt={p.name} size="small" />
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-white truncate">{p.name}</span>
                          <span className="text-sm text-yellow-400 font-semibold">{p.score} pts</span>
                          {gameState === 'lobby' && isHotSeat && (
                            <span className="text-xs mt-0.5 text-yellow-400">Berlinda ⭐</span>
                          )}
                          {gameState === 'lobby' && isPending && !isHotSeat && (
                            <span className="text-xs mt-0.5 text-yellow-300">Selecionado</span>
                          )}
                          {gameState === 'lobby' && !isHotSeat && !isPending && (
                            <span className="text-xs mt-0.5 text-green-400">No lobby</span>
                          )}
                          {gameState === 'category-selection' && isHotSeat && (
                            <span className="text-xs mt-0.5 text-yellow-400">Escolhendo categoria...</span>
                          )}
                          {gameState === 'question' && isHotSeat && (
                            <span className={`text-xs mt-0.5 ${hasAnswered ? 'text-green-400' : 'text-gray-400'}`}>
                              {hasAnswered ? 'Respondeu' : 'Aguardando...'}
                            </span>
                          )}
                          {gameState === 'question' && !isHotSeat && (
                            <span className="text-xs mt-0.5 text-gray-400">Assistindo</span>
                          )}
                          {isExplaining && (
                            <span className="text-xs mt-0.5 text-green-400">Explicando...</span>
                          )}
                          {gameState === 'voting' && id !== hotSeatPlayerId && (
                            <span className={`text-xs mt-0.5 ${myVote ? 'text-green-400' : 'text-gray-400'}`}>
                              {myVote === 'lying' ? 'Votou: Mentindo 🤥' : myVote === 'truth' ? 'Votou: Verdade ✅' : 'Aguardando voto...'}
                            </span>
                          )}
                          {gameState === 'voting' && id === hotSeatPlayerId && (
                            <span className="text-xs mt-0.5 text-yellow-400">Berlinda ⭐</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PresenterDashboard;
