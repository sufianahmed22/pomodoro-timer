// src/components/PomodoroTimer.jsx
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

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

const ControlButton = ({ onClick, children, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-3 rounded-full transition-colors ${
      disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'hover:bg-red-100 active:bg-red-200'
    }`}
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
    document.title = `${formatTime(timeLeft)} - ${timerType.name}`;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      new Audio('/notification.mp3').play().catch(() => {});
    }

    return () => {
      clearInterval(interval);
      document.title = 'Pomodoro Timer';
    };
  }, [isRunning, timeLeft, timerType.name]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimerTypeChange = (newType) => {
    setTimerType(newType);
    setTimeLeft(newType.duration);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(timerType.duration);
    setIsRunning(false);
  };

  const skipToNext = () => {
    const types = Object.values(TIMER_TYPES);
    const currentIndex = types.findIndex(type => type.name === timerType.name);
    const nextIndex = (currentIndex + 1) % types.length;
    handleTimerTypeChange(types[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {Object.values(TIMER_TYPES).map((type) => (
            <TimerButton
              key={type.name}
              active={timerType.name === type.name}
              onClick={() => handleTimerTypeChange(type)}
            >
              {type.name}
            </TimerButton>
          ))}
        </div>

        <div className="text-7xl md:text-8xl font-bold text-center mb-8 font-mono">
          {formatTime(timeLeft)}
        </div>

        <div className="flex justify-center gap-4">
          <ControlButton onClick={toggleTimer}>
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </ControlButton>
          <ControlButton onClick={resetTimer} disabled={timeLeft === timerType.duration}>
            <RotateCcw size={24} />
          </ControlButton>
          <ControlButton onClick={skipToNext}>
            <SkipForward size={24} />
          </ControlButton>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;