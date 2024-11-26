// src/components/PomodoroTimer.jsx
import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const TIMER_TYPES = {
  TASK: { name: 'Focus', duration: 25 * 60 },
  SHORT_BREAK: { name: 'Short Break', duration: 5 * 60 },
  LONG_BREAK: { name: 'Long Break', duration: 15 * 60 }
};

// Previous TimerButton component remains the same

const ControlButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="p-3 rounded-full hover:bg-red-100 transition-colors"
  >
    {children}
  </button>
);

const PomodoroTimer = () => {
  const [timerType, setTimerType] = useState(TIMER_TYPES.TASK);
  const [timeLeft, setTimeLeft] = useState(TIMER_TYPES.TASK.duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Previous formatTime function remains the same

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Previous timer type buttons remain the same */}
        
        <div className="text-8xl font-bold text-center mb-8 font-mono">
          {formatTime(timeLeft)}
        </div>

        <div className="flex justify-center gap-4">
          <ControlButton onClick={toggleTimer}>
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </ControlButton>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;