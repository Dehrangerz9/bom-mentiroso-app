import React, { createContext, useState, ReactNode, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Category, Player, Question } from '../data/mockData';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:2999';

type GameState = 'lobby' | 'category-selection' | 'question' | 'answer-reveal' | 'explanation' | 'voting' | 'reveal' | 'scoreboard' | 'finished';

interface GameContextProps {
  gameState: GameState;
  player: Player | null;
  players: Record<string, Player>;
  roomCode: string | null;
  roomError: string | null;
  categories: Category[];
  currentQuestion: Question | null;
  selectedAnswer: string | null;
  /** Whether the local player's submitted answer is correct (known privately, before public reveal) */
  isAnswerCorrect: boolean | null;
  isAnswerEnabled: boolean;
  timer: number;
  connected: boolean;
  /** Socket ID of the berlinda (hot seat) player for this round */
  hotSeatPlayerId: string | null;
  /** Socket ID of the player currently explaining (same as hotSeatPlayerId in new flow) */
  explanationPlayerId: string | null;
  /** The answer the explanation player submitted (shown in answer-reveal + scoreboard) */
  explanationPlayerAnswer: string | null;
  /** Votes from non-berlinda players: playerId → 'lying' | 'truth' */
  hotSeatVotes: Record<string, 'lying' | 'truth'>;
  /** Number of expectators currently in the room */
  expectatorCount: number;
  /** This client's socket ID (used to check if local player is the hot-seat) */
  socketId: string | null;
  /** Categories already used in this game (berlinda cannot repeat) */
  usedCategories: string[];
  /** IDs of questions already used — persists across resets */
  usedQuestionIds: string[];
  // Participant actions
  joinRoom: (code: string, name: string, avatar: string) => void;
  joinAsExpectator: (code: string) => void;
  selectCategory: (categoryId: string) => void;
  submitAnswer: (answer: string) => void;
  submitVote: (vote: 'lying' | 'truth') => void;
  /** Kick a player from the room (presenter only) */
  kickPlayer: (playerId: string) => void;
  // Presenter actions
  createRoom: () => void;
  startGame: () => void;
  setHotSeat: (playerId: string) => void;
  enableAnswerSelection: () => void;
  revealBerlindaAnswer: () => void;
  startExplanation: () => void;
  startVoting: () => void;
  revealAnswer: () => void;
  showScoreboard: () => void;
  nextQuestion: () => void;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);

  const [connected, setConnected] = useState(false);
  const [gameState, setGameState] = useState<GameState>('lobby');
  const [player, setPlayerState] = useState<Player | null>(null);
  const [players, setPlayers] = useState<Record<string, Player>>({});
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [roomError, setRoomError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isAnswerEnabled, setIsAnswerEnabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [hotSeatPlayerId, setHotSeatPlayerId] = useState<string | null>(null);
  const [explanationPlayerId, setExplanationPlayerId] = useState<string | null>(null);
  const [explanationPlayerAnswer, setExplanationPlayerAnswer] = useState<string | null>(null);
  const [hotSeatVotes, setHotSeatVotes] = useState<Record<string, 'lying' | 'truth'>>({});
  const [expectatorCount, setExpectatorCount] = useState(0);
  const [socketId, setSocketId] = useState<string | null>(null);
  const [usedCategories, setUsedCategories] = useState<string[]>([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);

  useEffect(() => {
    const socket = io(BACKEND_URL, { transports: ['websocket', 'polling'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to backend:', BACKEND_URL);
      setConnected(true);
      setSocketId(socket.id ?? null);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from backend');
      setConnected(false);
    });

    socket.on('room:created', (data: { code: string }) => {
      setRoomCode(data.code);
    });

    socket.on('room:joined', (data: { code: string }) => {
      setRoomCode(data.code);
      setRoomError(null);
    });

    socket.on('room:error', (data: { message: string }) => {
      setRoomError(data.message);
    });

    socket.on('room:closed', (data: { message: string }) => {
      setRoomError(data.message);
      setRoomCode(null);
      setGameState('lobby');
    });

    socket.on('room:kicked', (data: { message: string }) => {
      setRoomError(data.message);
      setRoomCode(null);
      setGameState('lobby');
    });

    socket.on('game:state', (state: any) => {
      setGameState(state.gameState);
      setCurrentQuestion(state.currentQuestion);
      setIsAnswerEnabled(state.isAnswerEnabled);
      setTimer(state.timer);
      if (state.categories) setCategories(state.categories);
      if (state.players) setPlayers(state.players);
      if (state.hotSeatPlayerId !== undefined) setHotSeatPlayerId(state.hotSeatPlayerId);
      if (state.explanationPlayerId !== undefined) setExplanationPlayerId(state.explanationPlayerId);
      if (state.explanationPlayerAnswer !== undefined) setExplanationPlayerAnswer(state.explanationPlayerAnswer);
      if (state.hotSeatVotes !== undefined) setHotSeatVotes(state.hotSeatVotes);
      if (state.expectatorCount !== undefined) setExpectatorCount(state.expectatorCount);
      if (state.usedCategories !== undefined) setUsedCategories(state.usedCategories);
      if (state.usedQuestionIds !== undefined) setUsedQuestionIds(state.usedQuestionIds);
      // When the presenter advances (next question / reset), clear all answer/vote state
      if (state.gameState === 'category-selection' || state.gameState === 'lobby') {
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        setHotSeatVotes({});
      }
      if (state.gameState === 'lobby') {
        setUsedCategories([]);
      }
    });

    socket.on('game:players_update', (updatedPlayers: Record<string, Player>) => {
      setPlayers(updatedPlayers);
    });

    socket.on('game:votes_update', (updatedVotes: Record<string, 'lying' | 'truth'>) => {
      setHotSeatVotes(updatedVotes);
    });

    socket.on('timer:tick', (t: number) => {
      setTimer(t);
    });

    // Received only by the participant who submitted
    // isCorrect tells the player if they got it right — correct answer is NOT sent
    socket.on('player:answer_received', (payload: { answer: string; isCorrect: boolean }) => {
      setSelectedAnswer(payload.answer);
      setIsAnswerCorrect(payload.isCorrect);
      setIsAnswerEnabled(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // ── PRESENTER ──────────────────────────────────────────────────────────────

  const createRoom = () => {
    socketRef.current?.emit('presenter:create_room');
  };

  const startGame = () => {
    if (!roomCode) return;
    socketRef.current?.emit('presenter:start_game', { code: roomCode });
  };

  const setHotSeat = (playerId: string) => {
    if (!roomCode) return;
    socketRef.current?.emit('presenter:set_hot_seat', { code: roomCode, playerId });
  };

  const enableAnswerSelection = () => {
    if (!roomCode) return;
    socketRef.current?.emit('presenter:enable_answers', { code: roomCode });
  };

  const revealBerlindaAnswer = () => {
    if (!roomCode) return;
    socketRef.current?.emit('presenter:reveal_berlinda_answer', { code: roomCode });
  };

  const startExplanation = () => {
    if (!roomCode) return;
    socketRef.current?.emit('presenter:start_explanation', { code: roomCode });
  };

  const startVoting = () => {
    if (!roomCode) return;
    socketRef.current?.emit('presenter:start_voting', { code: roomCode });
  };

  const revealAnswer = () => {
    if (!roomCode) return;
    socketRef.current?.emit('presenter:reveal_answer', { code: roomCode });
  };

  const showScoreboard = () => {
    if (!roomCode) return;
    socketRef.current?.emit('presenter:show_scoreboard', { code: roomCode });
  };

  const nextQuestion = () => {
    if (!roomCode) return;
    socketRef.current?.emit('presenter:next_question', { code: roomCode });
  };

  const resetGame = () => {
    if (!roomCode) return;
    socketRef.current?.emit('presenter:reset_game', { code: roomCode });
  };

  const kickPlayer = (playerId: string) => {
    if (!roomCode) return;
    socketRef.current?.emit('presenter:kick_player', { code: roomCode, playerId });
  };

  // ── PARTICIPANT ────────────────────────────────────────────────────────────

  const joinRoom = (code: string, name: string, avatar: string) => {
    setRoomError(null);
    setPlayerState({ name, avatar, score: 0, totalVotes: 0, correctVotes: 0 });
    socketRef.current?.emit('player:join_room', { code: code.toUpperCase(), name, avatar });
  };

  const joinAsExpectator = (code: string) => {
    setRoomError(null);
    socketRef.current?.emit('expectator:join_room', { code: code.toUpperCase() });
  };

  const selectCategory = (categoryId: string) => {
    if (!roomCode) return;
    socketRef.current?.emit('player:select_category', { code: roomCode, categoryId });
  };

  const submitAnswer = (answer: string) => {
    if (!isAnswerEnabled || !roomCode) return;
    socketRef.current?.emit('player:submit_answer', { code: roomCode, answer });
  };

  const submitVote = (vote: 'lying' | 'truth') => {
    if (!roomCode) return;
    socketRef.current?.emit('player:submit_vote', { code: roomCode, vote });
  };

  const contextValue: GameContextProps = {
    gameState,
    player,
    players,
    roomCode,
    roomError,
    categories,
    currentQuestion,
    selectedAnswer,
    isAnswerCorrect,
    isAnswerEnabled,
    timer,
    connected,
    hotSeatPlayerId,
    explanationPlayerId,
    explanationPlayerAnswer,
    hotSeatVotes,
    expectatorCount,
    socketId,
    usedCategories,
    usedQuestionIds,
    joinRoom,
    joinAsExpectator,
    selectCategory,
    submitAnswer,
    submitVote,
    kickPlayer,
    createRoom,
    startGame,
    setHotSeat,
    enableAnswerSelection,
    revealBerlindaAnswer,
    startExplanation,
    startVoting,
    revealAnswer,
    showScoreboard,
    nextQuestion,
    resetGame,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};
