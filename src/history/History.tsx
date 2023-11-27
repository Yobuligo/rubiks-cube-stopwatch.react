import { timerToString } from "../utils/timerToString";
import styles from "./History.module.css";
import { IHistoryProps } from "./IHistoryProps";

export const History: React.FC<IHistoryProps> = (props) => {
  const items = props.measurements.map((measurement) => (
    <div>{timerToString(measurement.value)}</div>
  ));
  return <div className={styles.history}>{items}</div>;
};
