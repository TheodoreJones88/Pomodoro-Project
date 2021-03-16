import React from "react";

function Loading({
  focus,
  focusDisplay,
  focusClock,
  breakDisplay,
  breakClock,
  started,
}) {
  //Calculate the percent.
  let focusRevClock = focusDisplay - focusClock;
  let focusPercent = focusRevClock / (focusDisplay / 100);
  let breakRevClock = breakDisplay - breakClock;
  let breakPercent = breakRevClock / (breakDisplay / 100);
  let percent = focus ? focusPercent : breakPercent;

  return started > 0 ? (
    <div className="progress" style={{ height: "20px" }}>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={percent} // TODO: Increase aria-valuenow as elapsed time increases
        style={{ width: `${percent}%` }} // TODO: Increase width % as elapsed time increases
      />
    </div>
  ) : null;
}

export default Loading;
