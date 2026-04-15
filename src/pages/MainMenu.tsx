import React from 'react';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';

interface MainMenuProps {
  onSelectRole: (role: 'participant' | 'presenter' | 'expectator') => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onSelectRole }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-500">
      <Card className="w-full max-w-md animate-scale-in">
        <div className="flex justify-center mb-6">
          <img src="/assets/Gemini_Generated_Image_8ro61c8ro61c8ro6.png" alt="Logo" className="w-32 h-32 animate-fade-in-down" />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="animate-fade-in-up">
            <Button onClick={() => onSelectRole('participant')}>
              Entrar como Participante
            </Button>
          </div>
          <div className="animate-fade-in-up-delay">
            <Button onClick={() => onSelectRole('expectator')}>
              Entrar como Expectador
            </Button>
          </div>
          <div className="animate-fade-in-up-delay2">
            <Button onClick={() => onSelectRole('presenter')}>
              Entrar como Apresentador
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MainMenu;
