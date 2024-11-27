import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { TIMER_TYPES } from '../constants/timer';
import ControlButton from '../components/ui/control-button';
import TimerButton from '../components/ui/timer-button';
import { StopwatchBackground } from '../components/ui/background';


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
          {isRunning}
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