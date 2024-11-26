// src/components/PomodoroTimer.jsx
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

// Previous constants and component definitions remain the same

const PomodoroTimer = () => {
  const [timerType, setTimerType] = useState(TIMER_TYPES.TASK);
  const [timeLeft, setTimeLeft] = useState(TIMER_TYPES.TASK.duration);
  const [isRunning, setIsRunning] = useState(false);

  // Previous useEffect and formatTime remain the same

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
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Previous timer type buttons and display remain the same */}

        <div className="flex justify-center gap-4">
          <ControlButton onClick={toggleTimer}>
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </ControlButton>
          <ControlButton onClick={resetTimer}>
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