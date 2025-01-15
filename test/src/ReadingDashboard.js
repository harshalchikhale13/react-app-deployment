import React, { useState, useEffect, useRef } from "react";

const ReadingDashboard = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [speed, setSpeed] = useState(500);
  const [intervalId, setIntervalId] = useState(null);
  const textInputRef = useRef(null);
  const speedInputRef = useRef(null);
  const readingDashboardRef = useRef(null);

  const startReading = () => {
    const textInput = textInputRef.current.value.trim();
    if (!textInput) {
      alert("Please enter some text to start reading.");
      return;
    }

    const speedInput = parseFloat(speedInputRef.current.value);
    if (isNaN(speedInput) || speedInput <= 0) {
      alert("Please enter a valid speed greater than 0.");
      return;
    }

    const newSpeed = 1000 / speedInput;
    setSpeed(newSpeed);
    setWords(textInput.split(/\s+/));
    setCurrentWordIndex(0);

    if (intervalId) {
      clearInterval(intervalId);
    }

    const newIntervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => {
        if (prevIndex < words.length - 1) {
          readingDashboardRef.current.textContent = words[prevIndex + 1];
          return prevIndex + 1;
        } else {
          clearInterval(newIntervalId);
          return prevIndex;
        }
      });
    }, newSpeed);
    setIntervalId(newIntervalId);
  };

  const stopReading = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const reset = () => {
    stopReading();
    readingDashboardRef.current.textContent = "";
    setCurrentWordIndex(0);
    setWords([]);
    textInputRef.current.value = "";
    speedInputRef.current.value = 1;
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div>
      <h1>Speed Reader</h1>
      <div id="readerContainer">
        <textarea
          id="textInput"
          ref={textInputRef}
          placeholder="Paste or type your text here.."
        ></textarea>
        <div id="controls">
          <div>
            <label htmlFor="speedInput">Speed (words per second): </label>
            <input
              type="number"
              id="speedInput"
              ref={speedInputRef}
              defaultValue={1}
              min="0.5"
              max="10"
              step="0.5"
            />
          </div>
          <div>
            <button onClick={startReading}>Start</button>
            <button onClick={stopReading}>Stop</button>
            <button onClick={reset}>Reset</button>
          </div>
        </div>
        <div id="readingDashboard" ref={readingDashboardRef}></div>
      </div>
    </div>
  );
};

export default ReadingDashboard;
