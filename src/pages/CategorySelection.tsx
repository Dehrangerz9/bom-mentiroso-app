import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import Card from '../components/shared/Card';

interface CategorySelectionProps {
  readOnly?: boolean;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ readOnly = false }) => {
  const game = useContext(GameContext);

  if (!game) {
    return null;
  }

  const { categories, selectCategory } = game;

  return (
    <>
      <h1 className="animate-fade-in-down text-3xl font-bold mb-8 text-white drop-shadow">Escolha uma Categoria</h1>
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        {categories.map((category, i) => (
          <Card
            key={category.id}
            className={[
              i === 0 ? 'animate-fade-in-up' : '',
              i === 1 ? 'animate-fade-in-up-delay' : '',
              i === 2 ? 'animate-fade-in-up-delay' : '',
              i >= 3 ? 'animate-fade-in-up-delay2' : '',
              readOnly ? 'cursor-default' : 'cursor-pointer hover:bg-gray-100 transition-colors',
            ].join(' ')}
            onClick={readOnly ? undefined : () => selectCategory(category.id)}
          >
            <div className="flex flex-col items-center gap-2 py-1">
              <span className="text-4xl">{category.icon}</span>
              <h2 className="text-base font-bold text-center leading-tight">{category.name}</h2>
            </div>
          </Card>
        ))}
      </div>
      {readOnly && (
        <p className="animate-fade-in mt-6 text-sm text-white opacity-80 italic">Aguardando participante escolher uma categoria...</p>
      )}
    </>
  );
};

export default CategorySelection;
