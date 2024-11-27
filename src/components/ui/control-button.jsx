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

  export default ControlButton;