# Pomodoro Timer

A modern, responsive Pomodoro Timer application built with React, Vite, and Tailwind CSS. This application helps users implement the Pomodoro Technique, a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.


## 🌟 Features

- **Three Timer Modes:**
  - Focus (25 minutes)
  - Short Break (5 minutes)
  - Long Break (15 minutes)

- **Timer Controls:**
  - Play/Pause - Start or pause the current timer
  - Reset - Reset the current timer to its initial value
  - Skip - Skip to the next timer type

- **User Experience:**
  - Clean, minimalist interface
  - Responsive design for all screen sizes
  - Visual feedback for active states
  - Browser tab title updates with current timer
  - Sound notification when timer completes
  - Keyboard shortcuts for basic controls

## 🚀 Technical Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Hooks (useState, useEffect)
- **Code Quality:** ESLint, Prettier

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14.0 or higher)
- npm (version 6.0 or higher)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/pomodoro-timer.git
cd pomodoro-timer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🏗️ Project Structure

```
pomodoro-timer/
├── src/
│   ├── components/
│   │   └── PomodoroTimer.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── notification.mp3
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 💻 Technical Implementation Details

### Component Architecture

The application is built using a single main component (`PomodoroTimer.jsx`) with two sub-components:

1. **TimerButton:** Handles the timer type selection buttons
   - Props: `active`, `onClick`, `children`
   - Styled conditionally based on active state

2. **ControlButton:** Handles the control buttons (play, reset, skip)
   - Props: `onClick`, `children`, `disabled`
   - Includes hover and active states

### State Management

The application uses React's useState hook to manage three main pieces of state:

```javascript
const [timerType, setTimerType] = useState(TIMER_TYPES.TASK);
const [timeLeft, setTimeLeft] = useState(TIMER_TYPES.TASK.duration);
const [isRunning, setIsRunning] = useState(false);
```

### Timer Logic

The timer functionality is implemented using `useEffect` with `setInterval`:

```javascript
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
```

### Styling

The application uses Tailwind CSS for styling with a focus on:
- Responsive design using Tailwind's breakpoint system
- Custom color scheme using Tailwind's color palette
- Transition effects for interactive elements
- Flex layout for component positioning

## 🔄 Git Commit Structure

The project was developed with the following commit structure:

1. **Initial Setup:**
   - Project initialization with Vite
   - Dependencies installation
   - Basic component structure

2. **Timer UI Implementation:**
   - Basic layout and styling
   - Timer type buttons
   - Timer display

3. **Timer Logic Implementation:**
   - Timer state management
   - useEffect for countdown
   - Play/Pause functionality

4. **Additional Features:**
   - Reset functionality
   - Skip to next timer
   - Timer completion handling

5. **Polish and Refinements:**
   - Responsive design
   - Visual feedback
   - Code optimization
   - Documentation

## 🎯 Future Improvements

- [ ] Add customizable timer durations
- [ ] Implement task tracking
- [ ] Add statistics and analytics
- [ ] Include dark mode support
- [ ] Add progressive web app (PWA) support
- [ ] Implement custom themes
- [ ] Add session history
- [ ] Include accessibility improvements

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 👏 Acknowledgments

- Inspired by [Pomofocus.io](https://pomofocus.io/)
- Icons provided by [Lucide Icons](https://lucide.dev/)
- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)

## 📧 Contact

Sufian Ahmed - sufianahmedch22@gmail.com
Project Link: [https://github.com/sufianahmed22/pomodoro-timer](https://github.com/sufianahmed22/pomodoro-timer)