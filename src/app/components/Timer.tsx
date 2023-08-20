import React, { useEffect, useState } from "react";

interface TimerProps {
  duration: number;
  onTimeout: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      onTimeout();
    }
  }, [timeLeft, onTimeout]);

  return (
    <div className="text-xl font-semibold">
      Time Left: {timeLeft} seconds
    </div>
  );
};

export default Timer;
