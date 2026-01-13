"use client";
import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date(`02/22/2026 00:00:00`) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = Object.entries(timeLeft).map(([interval, value], index) => (
    <div key={interval} className="flex flex-col items-center">
      <span suppressHydrationWarning className="font-anton text-[2rem] sm:text-[3rem] md:text-[5rem] lg:text-[7rem] font-black leading-none text-white">
        {value < 10 ? `0${value}` : value}
      </span>
      <small className="font-outfit text-[0.6rem] sm:text-xs md:text-sm lg:text-base text-lime-400 uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] mt-1 md:mt-2">
        {interval}
      </small>
    </div>
  ));

  return (
    <div className="flex flex-nowrap gap-2 sm:gap-4 md:gap-12 lg:gap-16 justify-center">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="font-anton text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase">
          EVENT STARTED!
        </span>
      )}
    </div>
  );
};

export default CountdownTimer;
