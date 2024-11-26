// src/components/PomodoroTimer.jsx
import React, { useState } from 'react';

const TIMER_TYPES = {
  TASK: { name: 'Focus', duration: 25 * 60 },
  SHORT_BREAK: { name: 'Short Break', duration: 5 * 60 },
  LONG_BREAK: { name: 'Long Break', duration: 15 * 60 }
};

const TimerButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-lg font-medium transition-colors
      ${active 
        ? 'bg-red-500 text-white' 
        : 'bg-red-100 text-red-600 hover:bg-red-200'}`
    }
  >
    {children}
  </button>
);

const PomodoroTimer = () => {
  const [timerType, setTimerType] = useState(TIMER_TYPES.TASK);
  const [timeLeft, setTimeLeft] = useState(TIMER_TYPES.TASK.duration);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex gap-4 mb-8 justify-center">
          {Object.values(TIMER_TYPES).map((type) => (
            <TimerButton
              key={type.name}
              active={timerType.name === type.name}
              onClick={() => {
                setTimerType(type);
                setTimeLeft(type.duration);
              }}
            >
              {type.name}
            </TimerButton>
          ))}
        </div>

        <div className="text-8xl font-bold text-center mb-8 font-mono">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;