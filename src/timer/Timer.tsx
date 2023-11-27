import { useEffect, useState } from "react";
import { LaunchControl } from "../launchControl/LaunchControl";
import styles from "./Timer.module.css";

export const Timer: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date>(new Date(0));
  const [stopTime, setStopTime] = useState<Date>(new Date(0));
  const [timer, setTimer] = useState(stopTime.getTime() - startTime.getTime());
  const [interval, setInterval] = useState<NodeJS.Timeout>();

  useEffect(() => {
    console.log("useEffect");
    if (running === true) {
      const currentTime = new Date();
      const difference = currentTime.getTime() - startTime.getTime();
      setTimer(difference);
    } else {
      const difference = stopTime.getTime() - startTime.getTime();
      setTimer(difference);
    }
  }, [running, startTime, stopTime, timer]);

  const onBeforeStart = () => {
    if (!running) {
      onReset();
    }
  };

  const onReset = () => {
    setStartTime(new Date(0));
    setStopTime(new Date(0));
  };

  const onStart = () => {
    clearInterval(interval);
    setRunning(true);
    const newStartTime = new Date();
    setStartTime(newStartTime);
    setStopTime(newStartTime);
    onUpdate();
  };

  const onStop = () => {
    setStopTime(new Date());
    setRunning(false);
    clearInterval(interval);
  };

  const onUpdate = () => {
    const newInterval = setTimeout(() => {
      const currentTime = new Date();
      const difference = currentTime.getTime() - startTime.getTime();
      setTimer(difference);
      onUpdate();
    });
    setInterval(newInterval);
  };

  const timerToString = () => {
    return new Date(timer).toISOString().substr(11, 12);
  };

  return (
    <div className={styles.timer}>
      <LaunchControl
        onBeforeStart={onBeforeStart}
        onReset={onReset}
        onStart={onStart}
        onStop={onStop}
      />
      <div className={styles.difference}>{timerToString()}</div>
    </div>
  );
};
