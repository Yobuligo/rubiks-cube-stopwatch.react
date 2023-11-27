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
    <>
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
              console.log("Activated");
              props.onStart();
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
          setState((previous) => {
            if (previous === State.ACTIVATED) {
              console.log("Deactivated");
              props.onStop();
            } else {
              console.log("Reset");
              props.onReset();
            }
            return State.DEACTIVATED;
          });
        }}
      >
        Stop
      </button>
    </>
  );
};
