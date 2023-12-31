import { useEffect, useState } from "react";
import { ReactComponent as Fingerprint } from "../assets/fingerprint.svg";
import { History } from "../history/History";
import { IMeasurement } from "../model/IMeasurement";
import { timerToString } from "../utils/timerToString";
import { ILaunchControlProps } from "./ILaunchControlProps";
import styles from "./LaunchControl.module.css";

enum State {
  ACTIVATED,
  DEACTIVATED,
  PREPARATION,
}

export const LaunchControl: React.FC<ILaunchControlProps> = (props) => {
  const [state, setState] = useState<State>(State.DEACTIVATED);
  const [measurements, setMeasurements] = useState<IMeasurement[]>([]);
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
    const newStopTime = new Date();
    setStopTime(newStopTime);
    setRunning(false);
    clearInterval(interval);
    setMeasurements((previous) => {
      const difference = newStopTime.getTime() - startTime.getTime();
      return [{ value: difference }, ...previous];
    });
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

  const getColor = () => {
    switch (state) {
      case State.ACTIVATED:
        return "green";
      case State.DEACTIVATED:
        return "white";
      case State.PREPARATION:
        return "yellow";
      default:
        throw new Error("Invalid state");
    }
  };

  const calcAverage = () => {
    if (measurements.length === 0) {
      return 0;
    }

    let sum: number = 0;
    measurements.forEach((measurement) => (sum += measurement.value));
    return sum / measurements.length;
  };

  return (
    <div className={styles.launchControl}>
      {running && (
        <div
          className={styles.overlay}
          onClick={() => {
            setState((previous) => {
              if (previous === State.ACTIVATED) {
                console.log("Deactivated");
                onStop();
              } else {
                console.log("Reset");
                onReset();
              }
              return State.DEACTIVATED;
            });
          }}
        />
      )}
      <div className={styles.fingerPrints}>
        <button
          className={styles.button}
          onTouchStart={() => {
            console.log("Mouse down");
            setState(State.PREPARATION);
            onBeforeStart();
          }}
          onMouseDown={() => {
            console.log("Mouse down");
            setState(State.PREPARATION);
            onBeforeStart();
          }}
          onTouchEnd={() => {
            console.log("Mouse up");
            setState((previous) => {
              if (previous === State.PREPARATION) {
                console.log("Activated");
                onStart();
                return State.ACTIVATED;
              }
              return State.DEACTIVATED;
            });
          }}
          onMouseUp={() => {
            console.log("Mouse up");
            setState((previous) => {
              if (previous === State.PREPARATION) {
                console.log("Activated");
                onStart();
                return State.ACTIVATED;
              }
              return State.DEACTIVATED;
            });
          }}
        >
          <Fingerprint fill={getColor()} />
        </button>

        <div className={styles.center}>
          <div className={styles.history}>
            <History measurements={measurements} />
          </div>
          <div className={styles.difference}>{timerToString(timer)}</div>
          <div className={styles.average}>
            <span
              className="material-symbols-outlined"
              style={{ color: "white", marginRight: "0.25rem" }}
            >
              avg_time
            </span>
            {timerToString(calcAverage())}
          </div>
        </div>
        <button
          className={styles.button}
          onTouchStart={() => {
            console.log("Mouse down");
            setState(State.PREPARATION);
            onBeforeStart();
          }}
          onMouseDown={() => {
            console.log("Mouse down");
            setState(State.PREPARATION);
            onBeforeStart();
          }}
          onTouchEnd={() => {
            console.log("Mouse up");
            setState((previous) => {
              if (previous === State.PREPARATION) {
                console.log("Activated");
                onStart();
                return State.ACTIVATED;
              }
              return State.DEACTIVATED;
            });
          }}
          onMouseUp={() => {
            console.log("Mouse up");
            setState((previous) => {
              if (previous === State.PREPARATION) {
                console.log("Activated");
                onStart();
                return State.ACTIVATED;
              }
              return State.DEACTIVATED;
            });
          }}
        >
          <Fingerprint fill={getColor()} />
        </button>
      </div>
    </div>
  );
};
