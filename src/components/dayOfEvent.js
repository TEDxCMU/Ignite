import styles from "components/dayOfEvent.module.css";


export default function DayOfEvent(props) {

    return (
        <div className={styles.card}>
          <div className={styles.dayof}>DAY OF EVENT</div>
          <div className={styles.month}>February</div>
          <div className={styles.date}>24</div>
        </div>
    );
}