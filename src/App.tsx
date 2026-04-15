import React, { useState } from 'react';
import { GameProvider } from './contexts/GameContext';
import PresenterDashboard from './pages/PresenterDashboard';
import AppContent from './AppContent';
import MainMenu from './pages/MainMenu';
import './styles/index.css';

type Role = 'participant' | 'presenter' | 'expectator';

const App: React.FC = () => {
  const [role, setRole] = useState<Role | null>(null);

  if (!role) {
    return <MainMenu onSelectRole={setRole} />;
  }

  const handleBack = () => setRole(null);

  return (
    <GameProvider>
      <div className="w-screen h-screen">
        {role === 'participant' && <AppContent role="participant" onBack={handleBack} />}
        {role === 'expectator' && <AppContent role="expectator" onBack={handleBack} />}
        {role === 'presenter' && <PresenterDashboard />}
      </div>
    </GameProvider>
  );
};

export default App;
