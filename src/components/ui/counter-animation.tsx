
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface CounterProps {
  end: number;
  duration?: number;
  className?: string;
}

export const Counter = ({ end, duration = 2000, className = "" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const startTime = Date.now();
      const counter = setInterval(() => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        countRef.current = Math.floor(progress * end);
        setCount(countRef.current);

        if (progress === 1) {
          clearInterval(counter);
        }
      }, 50);

      return () => clearInterval(counter);
    }
  }, [end, duration, inView]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
    </span>
  );
};
