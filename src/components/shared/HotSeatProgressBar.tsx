import React from 'react';

interface HotSeatProgressBarProps {
  avatar: string;
  name: string;
  /** How many rounds have been completed (categories used) */
  completedRounds: number;
  /** Total number of rounds in the game (default 10) */
  totalRounds?: number;
}

const HotSeatProgressBar: React.FC<HotSeatProgressBarProps> = ({
  avatar,
  name,
  completedRounds,
  totalRounds = 10,
}) => {
  // Pin sits at the completed position (0 = start, totalRounds = end)
  const pinPercent = Math.min((completedRounds / totalRounds) * 100, 100);

  return (
    <div className="w-full bg-gray-900 px-4 pt-3 pb-4 z-50 shadow-md">
      {/* Label */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            alt={name}
            className="w-8 h-8 rounded-full object-cover border-2 border-yellow-400 shrink-0"
          />
          <span className="text-white font-bold text-sm truncate max-w-[120px]">{name}</span>
        </div>
        <span className="text-yellow-400 font-extrabold text-sm">
          {completedRounds}/{totalRounds}
        </span>
      </div>

      {/* Segmented bar with pin */}
      <div className="relative">
        {/* Segments */}
        <div className="flex gap-1 h-4">
          {Array.from({ length: totalRounds }).map((_, i) => {
            const filled = i < completedRounds;
            return (
              <div
                key={i}
                className={[
                  'flex-1 rounded-sm transition-all duration-300',
                  filled ? 'bg-yellow-400' : 'bg-gray-600',
                ].join(' ')}
              />
            );
          })}
        </div>

        {/* Pin (avatar + triangle) positioned along the bar */}
        <div
          className="absolute -top-8 transition-all duration-500"
          style={{ left: `calc(${pinPercent}% - 14px)` }}
        >
          {/* Triangle pointer */}
          <div className="flex flex-col items-center">
            <img
              src={avatar}
              alt={name}
              className="w-7 h-7 rounded-full object-cover border-2 border-yellow-400 shadow-lg"
            />
            <div
              className="w-0 h-0"
              style={{
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '6px solid #facc15',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotSeatProgressBar;
