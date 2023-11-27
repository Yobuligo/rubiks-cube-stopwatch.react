import { useState } from "react";
import { ReactComponent as Fingerprint } from "../assets/fingerprint.svg";
import { ILaunchControlProps } from "./ILaunchControlProps";
import styles from "./LaunchControl.module.css";

enum State {
  ACTIVATED,
  DEACTIVATED,
  PREPARATION,
}

export const LaunchControl: React.FC<ILaunchControlProps> = (props) => {
  const [state, setState] = useState<State>(State.DEACTIVATED);

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

  return (
    <>
      <div className={styles.launchControl}>
        <Fingerprint
          fill={getColor()}
          onMouseDown={() => {
            console.log("Mouse down");
            setState(State.PREPARATION);
            props.onBeforeStart();
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
        />

        <Fingerprint
          fill={getColor()}
          onMouseDown={() => {
            console.log("Mouse down");
            setState(State.PREPARATION);
            props.onBeforeStart();
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
        />
      </div>
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
