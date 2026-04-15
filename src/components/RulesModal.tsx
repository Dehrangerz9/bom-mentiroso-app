import React, { useState } from 'react';

interface Step {
  icon: string;
  title: string;
  body: React.ReactNode;
}

const STEPS: Step[] = [
  {
    icon: '🎭',
    title: 'O que é Bom Mentiroso?',
    body: (
      <>
        <p>
          Bom Mentiroso é um jogo de blefe inspirado no programa de TV{' '}
          <span className="text-accent font-semibold">Mentira ou Verdade</span>.
        </p>
        <p className="mt-3">
          A cada rodada, um jogador vai para a <span className="text-accent font-semibold">berlinda</span> e
          precisa responder uma pergunta de múltipla escolha — e depois convencer os outros de que acertou,
          mesmo que tenha errado.
        </p>
        <p className="mt-3 text-gray-400 text-sm">Use 7 passos para entender como funciona.</p>
      </>
    ),
  },
  {
    icon: '💺',
    title: 'A Berlinda',
    body: (
      <>
        <p>
          O apresentador escolhe quem vai para a{' '}
          <span className="text-accent font-semibold">berlinda</span> — o banco dos réus.
        </p>
        <p className="mt-3">
          Quem está na berlinda é o foco da rodada. Todos os outros jogadores serão os <span className="font-semibold text-gray-200">detetives</span>.
        </p>
        <p className="mt-3 text-gray-400 text-sm">
          O objetivo da berlinda é fazer os detetives errarem o voto.
        </p>
      </>
    ),
  },
  {
    icon: '❓',
    title: 'A Pergunta',
    body: (
      <>
        <p>
          A berlinda escolhe uma categoria e recebe uma{' '}
          <span className="text-accent font-semibold">pergunta de múltipla escolha</span>.
        </p>
        <p className="mt-3">
          A resposta é <span className="font-semibold text-gray-200">secreta</span> — os outros jogadores não
          veem o que a berlinda escolheu.
        </p>
        <p className="mt-3 text-gray-400 text-sm">
          O apresentador revela a resposta escolhida apenas após o prazo.
        </p>
      </>
    ),
  },
  {
    icon: '🗣️',
    title: 'A Explicação',
    body: (
      <>
        <p>
          Depois de responder, a berlinda tem{' '}
          <span className="text-accent font-semibold">45 segundos</span> para explicar sua resposta
          em voz alta para todos.
        </p>
        <p className="mt-3">
          Se <span className="text-green-400 font-semibold">acertou</span>: explique com confiança.
        </p>
        <p className="mt-2">
          Se <span className="text-red-400 font-semibold">errou</span>: tente parecer convincente.
          Blefe, invente detalhes — faça os detetives duvidarem!
        </p>
      </>
    ),
  },
  {
    icon: '🗳️',
    title: 'A Votação',
    body: (
      <>
        <p>
          Após a explicação, todos os detetives votam:
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-red-900/30 border border-red-800 rounded-xl px-4 py-3">
            <span className="text-2xl">🤥</span>
            <div>
              <p className="font-bold text-red-300">Mentindo</p>
              <p className="text-xs text-gray-400">Acho que a berlinda errou a pergunta</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-green-900/30 border border-green-800 rounded-xl px-4 py-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-bold text-green-300">Dizendo a Verdade</p>
              <p className="text-xs text-gray-400">Acho que a berlinda acertou a pergunta</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    icon: '🔍',
    title: 'A Revelação',
    body: (
      <>
        <p>
          O apresentador revela a{' '}
          <span className="text-accent font-semibold">resposta correta</span>. Todos descobrem se a
          berlinda estava mentindo ou dizendo a verdade.
        </p>
        <p className="mt-3">
          Os votos são apurados: quem votou certo marcou ponto, quem errou ficou sem.
        </p>
        <p className="mt-3 text-gray-400 text-sm">
          Um bom blefe pode fazer a berlinda ganhar — e os detetives perderem!
        </p>
      </>
    ),
  },
  {
    icon: '🏆',
    title: 'Pontuação',
    body: (
      <>
        <p className="font-semibold text-gray-200 mb-3">Como os pontos funcionam:</p>
        <div className="flex flex-col gap-3">
          <div className="bg-surface-raised rounded-xl px-4 py-3 border border-border">
            <p className="font-bold text-accent text-sm uppercase tracking-wider mb-1">Detetives</p>
            <p className="text-sm text-gray-300">
              +1 ponto por <span className="text-green-400">acertar o voto</span> (acertou se a berlinda mentiu ou disse a verdade).
            </p>
          </div>
          <div className="bg-surface-raised rounded-xl px-4 py-3 border border-border">
            <p className="font-bold text-accent text-sm uppercase tracking-wider mb-1">Berlinda</p>
            <p className="text-sm text-gray-300">
              +1 ponto por cada detetive que <span className="text-red-400">errou o voto</span> (foi enganado com sucesso!).
            </p>
          </div>
        </div>
        <p className="mt-4 text-center text-gray-400 text-sm">
          O jogo dura 10 rodadas. Vence quem acumular mais pontos!
        </p>
      </>
    ),
  },
];

interface RulesModalProps {
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isFirst = step === 0;
  const isLast = step === STEPS.length - 1;

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-deep/80 backdrop-blur-sm p-4 animate-fade-in"
      onClick={handleBackdrop}
    >
      <div className="relative w-full max-w-sm bg-surface rounded-2xl border border-border shadow-2xl animate-scale-in flex flex-col overflow-hidden">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-surface-overlay"
          aria-label="Fechar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Step indicator */}
        <div className="flex justify-center gap-1.5 pt-5 pb-2 px-6">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={[
                'h-1.5 rounded-full transition-all',
                i === step ? 'bg-accent w-6' : 'bg-border w-3 hover:bg-border-strong',
              ].join(' ')}
              aria-label={`Passo ${i + 1}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-4 min-h-[260px]">
          <div className="text-center mb-4 animate-fade-in-down" key={`icon-${step}`}>
            <span className="text-5xl">{current.icon}</span>
          </div>
          <h2 className="text-xl font-extrabold text-center text-gray-100 mb-4 animate-fade-in" key={`title-${step}`}>
            {current.title}
          </h2>
          <div className="text-gray-300 text-sm leading-relaxed animate-fade-in-up" key={`body-${step}`}>
            {current.body}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3 px-6 pb-5 pt-3 border-t border-border">
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={isFirst}
            className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all border border-border text-gray-400 hover:text-gray-200 hover:bg-surface-overlay disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          {isLast ? (
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-accent text-gray-900 hover:bg-accent-dim transition-all active:scale-95 shadow-md"
            >
              Entendido!
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-accent text-gray-900 hover:bg-accent-dim transition-all active:scale-95 shadow-md"
            >
              Próximo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
