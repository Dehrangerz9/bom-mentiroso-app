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
        <Card className="w-full max-w-sm md:max-w-xs animate-scale-in md:p-5">
          <div className="flex justify-center mb-5 md:mb-4">
            <img
              src="/assets/Gemini_Generated_Image_8ro61c8ro61c8ro6.png"
              alt="Logo"
              className="w-28 h-28 md:w-16 md:h-16 animate-fade-in-down"
            />
          </div>

          <div className="flex flex-col gap-2.5 md:gap-2">
            <div className="animate-fade-in-up">
              <Button className="md:py-2 md:text-xs" onClick={() => onSelectRole('participant')}>
                Entrar como Participante
              </Button>
            </div>
            <div className="animate-fade-in-up-delay">
              <Button className="md:py-2 md:text-xs" onClick={() => onSelectRole('expectator')}>
                Entrar como Expectador
              </Button>
            </div>
            <div className="animate-fade-in-up-delay2">
              <Button className="md:py-2 md:text-xs" onClick={() => onSelectRole('presenter')}>
                Entrar como Apresentador
              </Button>
            </div>

            <div className="animate-fade-in-up-delay2 pt-1">
              <Button variant="ghost" className="md:py-2 md:text-xs" onClick={() => setShowRules(true)}>
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
