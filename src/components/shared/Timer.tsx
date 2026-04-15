import React from 'react';

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  const urgent = time <= 10;
  return (
    <div
      className={[
        'w-14 h-14 rounded-full flex items-center justify-center border-2 font-extrabold text-xl tabular-nums transition-colors',
        urgent
          ? 'border-red-500 text-red-400 animate-pulse'
          : 'border-border text-accent',
      ].join(' ')}
    >
      {time}
    </div>
  );
};

export default Timer;
