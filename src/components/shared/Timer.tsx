import React from 'react';

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  return (
    <div className="text-2xl font-bold">
      {time}
    </div>
  );
};

export default Timer;
