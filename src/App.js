import { useState, useRef } from "react";
import "./App.css";

// Helper function to prepend "0" on minutes & seconds
const padTime = (time) => {
  return time.toString().padStart(2, "0");
};

const App = () => {
  // State Variables
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [title, setTitle] = useState("Let the countdown begin!");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Functions

  // Strat Timer Function
  const startTimer = () => {
    if (intervalRef.current !== null) return;

    setTitle("You are doing great!");
    setIsRunning(true);

    // Creating a interval to update the time in every 1 second
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft > 0) return timeLeft - 1;

        resetTimer();

        return 0;
      });
    }, 1000);
  };

  // Stop Timer Function
  const stopTimer = () => {
    if (intervalRef.current === null) return;

    setTitle("Keep it going!");
    setIsRunning(false);

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Reset Timer Function (almost same as Stop Timer Function)
  const resetTimer = () => {
    setTitle("Ready for another round!");
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  // Computing - calculating minutes & seconds from 'timeLeft'
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  // This returns React Element which acts as the virtual DOM
  return (
    <div className="app">
      <h1>{title}</h1>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default App;
