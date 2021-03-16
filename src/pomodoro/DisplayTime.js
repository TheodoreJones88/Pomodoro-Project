import React from "react";
import { secondsToDuration } from "../utils/duration";

function TimeDisplay({ isTimerRunning, times }) {
  return times.started > 0 ? (
    <h2 data-testid="session-title">
      {times.focus ? "Focusing" : "On Break"} for{" "}
      {times.focus
        ? secondsToDuration(times.focusDisplay)
        : secondsToDuration(times.breakDisplay)}{" "}
      minutes
    </h2>
  ) : null;
}

export default TimeDisplay;
