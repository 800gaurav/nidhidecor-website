import { useEffect, useState } from "react";

const useLiveCountdown = (createdAt, durationDays = 7) => {
  const [formattedTime, setFormattedTime] = useState("Calculating...");

  useEffect(() => {
    if (!createdAt) {
      setFormattedTime("No start time");
      return;
    }

    const updateTimer = () => {
      const now = new Date();
      const start = new Date(createdAt);
      const target = new Date(start.getTime() + durationDays * 24 * 60 * 60 * 1000); // add durationDays

      const diff = target - now; // remaining time in ms

      if (diff <= 0) {
        setFormattedTime("Time's up!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setFormattedTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer(); // run immediately once
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [createdAt, durationDays]);

  return formattedTime;
};

export default useLiveCountdown;
