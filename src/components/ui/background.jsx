export const StopwatchBackground = () => (
    <div className="fixed inset-0 z-0 overflow-hidden opacity-5">
      <div className="w-full h-full relative">
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          width="min(100vw, 100vh)"
          height="min(100vw, 100vh)"
          viewBox="0 0 100 100"
        >
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
    </div>
  );
  
  export default StopwatchBackground;