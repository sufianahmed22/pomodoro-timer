import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

// Background SVG Component
const StopwatchBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden opacity-5">
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Clock markers */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = 50 + 38 * Math.cos(angle);
        const y1 = 50 + 38 * Math.sin(angle);
        const x2 = 50 + 45 * Math.cos(angle);
        const y2 = 50 + 45 * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth={i % 3 === 0 ? "3" : "1"}
          />
        );
      })}
    </svg>
  </div>
);

// Timer Types Constants
const TIMER_TYPES = {
  TASK: { name: 'Focus', duration: 25 * 60 },
  SHORT_BREAK: { name: 'Short Break', duration: 5 * 60 },
  LONG_BREAK: { name: 'Long Break', duration: 15 * 60 }
};

const TimerButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-lg font-medium transition-colors relative
      ${active 
        ? 'bg-red-500 text-white shadow-lg' 
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
    className={`p-3 rounded-full transition-all transform
      ${disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'hover:bg-red-100 active:bg-red-200 hover:scale-110'}
      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50`
    }
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

  // Calculate progress percentage
  const progress = ((timerType.duration - timeLeft) / timerType.duration) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <StopwatchBackground />
      
      {/* Circular Progress */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-32px)] max-w-[500px] aspect-square">
        <svg className="w-full h-full -rotate-90 opacity-20">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="#ef4444"
            strokeWidth="1"
            strokeDasharray={`${progress} ${100 - progress}`}
            className="transition-all duration-1000"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md relative z-10">
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

        <div className="text-7xl md:text-8xl font-bold text-center mb-8 font-mono relative">
          {formatTime(timeLeft)}
          {isRunning && (
            <div className="absolute -right-4 top-0 text-red-500 animate-pulse">●</div>
          )}
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