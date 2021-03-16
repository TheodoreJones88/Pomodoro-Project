import React from "react";

function Stop({ isTimerRunning, setIsTimerRunning, reset, setTimes }) {
  const clickHandler = () => {
    if (isTimerRunning) {
      setIsTimerRunning((previous) => !previous);
      setTimes({ ...reset });
    }
  };

  return (
    <button
      type="button"
      className="btn btn-secondary"
      title="Stop the session"
      onClick={clickHandler}
    >
      <span className="oi oi-media-stop" />
    </button>
  );
}

export default Stop;
