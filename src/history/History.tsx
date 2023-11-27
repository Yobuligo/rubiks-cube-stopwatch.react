import { IMeasurement } from "../model/IMeasurement";
import { timerToString } from "../utils/timerToString";
import styles from "./History.module.css";
import { IHistoryProps } from "./IHistoryProps";

export const History: React.FC<IHistoryProps> = (props) => {
  const getItems = () => {
    const measurements: IMeasurement[] = [];
    for (let i = 0; i < 10; i++) {
      const measurement = props.measurements.at(i);
      if (measurement) {
        measurements.push(measurement);
      }
    }

    let length = measurements.length + 1;
    const items = measurements.map((measurement) => {
      length = length - 1;
      return (
        <div>
          {length < 10 && 0}
          {length}. {timerToString(measurement.value)}
        </div>
      );
    });
    return items;
  };

  return <div className={styles.history}>{getItems()}</div>;
};
