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
  export default TimerButton;