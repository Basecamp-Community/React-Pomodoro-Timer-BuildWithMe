import { useState, useRef } from "react";
import "./App.css";

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
  const startTimer = () => {
    if (intervalRef.current !== null) return;

    setTitle("You are doing great!");
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft > 0) return timeLeft - 1;

        resetTimer()

        return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current === null) return;

    setTitle("Keep it going!");
    setIsRunning(false);

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetTimer = () => {
    setTitle("Ready for another round!");
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  // Computing
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

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
