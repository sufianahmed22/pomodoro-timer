// src/components/PomodoroTimer.jsx
import React from 'react';

const TIMER_TYPES = {
  TASK: { name: 'Focus', duration: 25 * 60 },
  SHORT_BREAK: { name: 'Short Break', duration: 5 * 60 },
  LONG_BREAK: { name: 'Long Break', duration: 15 * 60 }
};

const PomodoroTimer = () => {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Pomodoro Timer</h1>
      </div>
    </div>
  );
};

export default PomodoroTimer;