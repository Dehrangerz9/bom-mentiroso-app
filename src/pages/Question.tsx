import React, { useContext, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import Card from '../components/shared/Card';
import Timer from '../components/shared/Timer';

interface QuestionProps {
  readOnly?: boolean;
}

const Question: React.FC<QuestionProps> = ({ readOnly = false }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const game = useContext(GameContext);

  if (!game || !game.currentQuestion) {
    return null;
  }

  const {
    currentQuestion,
    submitAnswer,
    isAnswerEnabled,
    timer,
    selectedAnswer,
    isAnswerCorrect,
  } = game;

  const locked = !isAnswerEnabled;
  const hasSubmitted = selectedAnswer !== null;

  const handleOptionClick = (option: string) => {
    if (!readOnly && isAnswerEnabled && !hasSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (!readOnly && selectedOption && !hasSubmitted) {
      submitAnswer(selectedOption);
    }
  };

  // After submitting: show private result screen while waiting for presenter to reveal
  if (!readOnly && hasSubmitted) {
    const correct = isAnswerCorrect === true;
    const wrong = isAnswerCorrect === false;

    return (
      <div className="w-full max-w-2xl animate-fade-in-up">
        {/* Private result banner */}
        <div
          className={[
            'rounded-2xl shadow-xl p-8 text-center w-full',
            correct ? 'bg-green-50 border-2 border-green-400' : 'bg-red-50 border-2 border-red-400',
          ].join(' ')}
        >
          <p className="text-5xl mb-3">{correct ? '🎉' : '😈'}</p>
          <h2 className={`text-2xl font-extrabold mb-2 ${correct ? 'text-green-700' : 'text-red-700'}`}>
            {correct ? 'Você acertou!' : 'Você errou!'}
          </h2>
          {wrong && (
            <p className="text-red-600 font-semibold mb-1">
              Prepare-se para mentir e convencer as pessoas!
            </p>
          )}
          <p className="text-sm text-gray-500 mt-4 italic">
            Aguardando o apresentador iniciar a explicação...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl animate-fade-in-up">
      {/* Status banners */}
      {!readOnly && locked && (
        <div className="relative z-10 mb-3 text-center animate-fade-in-down">
          <span className="inline-block bg-white text-gray-800 font-bold text-base px-5 py-2 rounded-full shadow-lg">
            Aguarde o apresentador liberar as respostas...
          </span>
        </div>
      )}

      {readOnly && locked && (
        <div className="relative z-10 mb-3 text-center animate-fade-in-down">
          <span className="inline-block bg-white text-gray-800 font-bold text-base px-5 py-2 rounded-full shadow-lg">
            Respostas ainda não liberadas
          </span>
        </div>
      )}

      {readOnly && !locked && (
        <div className="mb-3 text-center bg-green-100 border border-green-400 text-green-800 rounded-full px-5 py-2 text-sm font-semibold animate-fade-in-down">
          Respostas liberadas
        </div>
      )}

      <Card className="w-full">
        <div className="mb-4 flex justify-center">
          <Timer time={timer} />
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">{currentQuestion.question}</h1>

        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={readOnly || locked || hasSubmitted}
              className={[
                'p-4 border rounded-lg text-left transition-all',
                locked ? 'opacity-40' : 'opacity-100',
                selectedOption === option
                  ? 'bg-blue-500 text-white border-blue-600'
                  : 'bg-white hover:bg-gray-100',
                readOnly || locked || hasSubmitted ? 'cursor-default' : 'cursor-pointer',
              ].join(' ')}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + index)}:</span>
              {option}
            </button>
          ))}
        </div>

        {!readOnly && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              disabled={!selectedOption || locked || hasSubmitted}
              className={[
                'px-8 py-3 rounded-xl font-black text-base tracking-wide transition-all',
                (!selectedOption || locked || hasSubmitted)
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 text-white shadow-md active:scale-95',
              ].join(' ')}
            >
              Enviar Resposta
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Question;
