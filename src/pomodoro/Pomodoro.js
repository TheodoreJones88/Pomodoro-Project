import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import IncrementButtons from "./IncrementButtons";
import StopButton from "./StopButton";
import DisplayTime from "./DisplayTime";
import LoadingBar from "./LoadingBar";
import { secondsToDuration } from "../utils/duration";

function Pomodoro() {
  // Timer starts out paused
  const settings = {
    focus: true,
    focusMin: 5 * 60,
    focusMax: 60 * 60,
    focusDisplay: 25 * 60,
    focusDefault: 25 * 60,
    breakMin: 1 * 60,
    breakMax: 15 * 60,
    breakDisplay: 5 * 60,
    breakDefault: 5 * 60,
    focusClock: 25 * 60,
    breakClock: 5 * 60,
    started: 0,
    paused: 1,
    blank: 0,
  };

  const [times, setTimes] = useState({ ...settings });
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // isTimerRunning will be used to disable increment buttons
  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      // This needs to subtract from current time until it gets to zero
      if (times.focus && times.focusClock <= 0) {
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        setTimes({
          ...times,
          focusClock: times.focusDefault,
          focus: false,
          breakClock: times.breakDefault,
        });
      } else if (!times.focus && times.breakClock <= 0) {
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        setTimes({
          ...times,
          breakClock: times.breakDefault,
          focus: true,
          focusClock: times.focusDefault,
        });
      } else if (times.focus) {
        setTimes({ ...times, focusClock: times.focusClock - 1 });
      } else if (!times.focus) {
        setTimes({ ...times, breakClock: times.breakClock - 1 });
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    if (times.blank <= 1) {
      setTimes((cur) => ({
        ...cur,
        started: times.started + 1,
        paused: times.paused + times.blank,
      }));
      setIsTimerRunning((prevState) => !prevState);
      setTimes((cur) => ({ ...cur, blank: times.blank + 1 }));
    } else if (times.blank >= 2) {
      setTimes((cur) => ({ ...cur, paused: times.paused + 1 }));
      setIsTimerRunning((prevState) => !prevState);
    }
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {secondsToDuration(times.focusDisplay)}
            </span>
            <div className="input-group-append">
              <IncrementButtons
                selector={1}
                dataTest={"decrease-focus"}
                times={times}
                setTimes={setTimes}
                isTimerRunning={isTimerRunning}
                oioi={"oi oi-minus"}
              />
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <IncrementButtons
                selector={2}
                dataTest={"increase-focus"}
                times={times}
                setTimes={setTimes}
                isTimerRunning={isTimerRunning}
                oioi={"oi oi-plus"}
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {secondsToDuration(times.breakDisplay)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <IncrementButtons
                  selector={3}
                  dataTest={"decrease-break"}
                  times={times}
                  setTimes={setTimes}
                  isTimerRunning={isTimerRunning}
                  oioi={"oi oi-minus"}
                />
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <IncrementButtons
                  selector={4}
                  dataTest={"increase-break"}
                  times={times}
                  setTimes={setTimes}
                  isTimerRunning={isTimerRunning}
                  oioi={"oi oi-plus"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <StopButton
              reset={settings}
              isTimerRunning={isTimerRunning}
              setIsTimerRunning={setIsTimerRunning}
              setTimes={setTimes}
            />
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <DisplayTime isTimerRunning={isTimerRunning} times={times} />
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {times.started > 0 && times.focus
                ? secondsToDuration(times.focusClock)
                : times.started > 0 && !times.focus
                ? secondsToDuration(times.breakClock)
                : null}{" "}
              {times.started > 0 ? "remaining" : null}
            </p>
            {times.paused % 2 === 0 ? <h2>PAUSED</h2> : null}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <LoadingBar
              focus={times.focus}
              focusDisplay={times.focusDisplay}
              focusClock={times.focusClock}
              breakDisplay={times.breakDisplay}
              breakClock={times.breakClock}
              started={times.started}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
