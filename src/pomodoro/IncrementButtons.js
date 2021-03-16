import React from "react";

function Button({ selector, dataTest, times, setTimes, isTimerRunning, oioi }) {
  const {
    focusDefault,
    focusDisplay,
    focusMin,
    focusMax,
    breakDefault,
    breakDisplay,
    breakMin,
    breakMax,
  } = times;
  const incrementHandler = () => {
    if (!isTimerRunning) {
      if (selector === 1) {
        let currentNum = focusDefault;
        let displayNum = focusDisplay;
        displayNum -= focusMin;
        currentNum -= focusMin;
        displayNum =
          displayNum < focusMin ? (displayNum = focusMin) : displayNum;
        currentNum =
          currentNum < focusMin ? (currentNum = focusMin) : currentNum;
        setTimes({
          ...times,
          focusDisplay: displayNum,
          focusDefault: currentNum,
          focusClock: currentNum,
        });
      } else if (selector === 2) {
        let currentNum = focusDefault;
        let displayNum = focusDisplay;
        displayNum += focusMin;
        currentNum += focusMin;
        displayNum =
          displayNum > focusMax ? (displayNum = focusMax) : displayNum;
        currentNum =
          currentNum > focusMax ? (currentNum = focusMax) : currentNum;
        setTimes({
          ...times,
          focusDisplay: displayNum,
          focusDefault: currentNum,
          focusClock: currentNum,
        });
      } else if (selector === 3) {
        let currentNum = breakDefault;
        let displayNum = breakDisplay;
        displayNum -= breakMin;
        currentNum -= breakMin;
        displayNum =
          displayNum < breakMin ? (displayNum = breakMin) : displayNum;
        currentNum =
          currentNum < breakMin ? (currentNum = breakMin) : currentNum;
        setTimes({
          ...times,
          breakDisplay: displayNum,
          breakDefault: currentNum,
          breakClock: currentNum,
        });
      } else if (selector === 4) {
        let currentNum = breakDefault;
        let displayNum = breakDisplay;
        displayNum += breakMin;
        currentNum += breakMin;
        displayNum =
          displayNum > breakMax ? (displayNum = breakMax) : displayNum;
        currentNum =
          currentNum > breakMax ? (currentNum = breakMax) : currentNum;
        setTimes({
          ...times,
          breakDisplay: displayNum,
          breakDefault: currentNum,
          breakClock: currentNum,
        });
      }
    }
  };
  return (
    <button
      type="button"
      className="btn btn-secondary"
      data-testid={dataTest}
      onClick={incrementHandler}
    >
      <span className={oioi} />
    </button>
  );
}

export default Button;
