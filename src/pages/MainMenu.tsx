import React, { useState } from 'react';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import RulesModal from '../components/RulesModal';

interface MainMenuProps {
  onSelectRole: (role: 'participant' | 'presenter' | 'expectator') => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onSelectRole }) => {
  const [showRules, setShowRules] = useState(false);

  return (
    <>
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}

      <div className="flex items-center justify-center min-h-screen bg-bg p-4">
        <Card className="w-full max-w-sm animate-scale-in">
          <div className="flex justify-center mb-6">
            <img
              src="/assets/Gemini_Generated_Image_8ro61c8ro61c8ro6.png"
              alt="Logo"
              className="w-28 h-28 animate-fade-in-down"
            />
          </div>

          <div className="flex flex-col gap-3">
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

            <div className="animate-fade-in-up-delay2 pt-1">
              <Button variant="ghost" onClick={() => setShowRules(true)}>
                Mostrar Regras
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default MainMenu;
