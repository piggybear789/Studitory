'use client';
import React, { useState, useEffect } from 'react';

interface TimerProps {
  startTimestamp: number;
}

const Timer: React.FC<TimerProps> = ({ startTimestamp }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const calculateElapsedTime = () => {
      const now = new Date().getTime();
      return Math.floor((now - startTimestamp) / 1000);
    };

    setElapsedTime(calculateElapsedTime());

    const interval = setInterval(() => {
      setElapsedTime(calculateElapsedTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [startTimestamp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div>
      Time Elapsed: {formatTime(elapsedTime)}
    </div>
  );
};

export default Timer;
