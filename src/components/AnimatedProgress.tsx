import { useEffect, useState } from "react";

interface AnimatedProgressProps {
  startNumber: number;
  endNumber: number;
  duration: number;
}

const AnimatedProgress = ({
  startNumber,
  endNumber,
  duration,
}: AnimatedProgressProps) => {
  const [progressNumber, setProgressNumber] = useState<number | null>(null);

  const animateValue = (start: number, end: number, duration: number) => {
    if (start === end) return;
    const range = end - start;
    let current = start;
    const increment = 1;
    const stepTime = Math.abs(Math.floor(duration / range));

    const timer = setInterval(() => {
      current += increment;
      setProgressNumber(current);
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  useEffect(() => {
    animateValue(startNumber, endNumber, duration);
  }, [startNumber, endNumber, duration]);

  return <p>Upload is {progressNumber}% done</p>;
};

export default AnimatedProgress;
