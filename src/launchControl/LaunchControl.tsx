import { useState } from "react";
import { ILaunchControlProps } from "./ILaunchControlProps";
import styles from "./LaunchControl.module.css";

enum State {
  ACTIVATED,
  DEACTIVATED,
  PREPARATION,
}

export const LaunchControl: React.FC<ILaunchControlProps> = (props) => {
  const [state, setState] = useState<State>(State.DEACTIVATED);
  const [running, setRunning] = useState(false);

  const getStyle = () => {
    switch (state) {
      case State.ACTIVATED:
        return styles.activated;
      case State.DEACTIVATED:
        return styles.deactivated;
      case State.PREPARATION:
        return styles.preparation;
      default:
        throw new Error("Invalid state");
    }
  };

  return (
    <div className={styles.launchControl}>
      <button
        className={`${getStyle()} ${styles.startButton}`}
        onMouseDown={() => {
          console.log("Mouse down");
          setState(State.PREPARATION);
        }}
        onMouseUp={() => {
          console.log("Mouse up");
          setState((previous) => {
            if (previous === State.PREPARATION) {
              setRunning(true);
              return State.ACTIVATED;
            }
            return State.DEACTIVATED;
          });
        }}
      >
        Start
      </button>
      <button
        className={styles.stopButton}
        onClick={() => {
          setRunning(false);
          setState(State.DEACTIVATED);
          console.log("Deactivated");
        }}
      >
        Stop
      </button>
    </div>
  );
};
