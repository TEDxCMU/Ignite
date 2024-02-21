import { useState, useEffect } from "react";
import GameCard from "components/gameCard";
import cn from "classnames";
import styles from "./dashboard.module.css";

export function DashBoard(props) {
    const [displayName, setDisplayName] = useState("");
    const [andrewid, setAnddrewid] = useState("");

    const handleDisplayNameChange = (event) => {
        setDisplayName(event.target.value);
    };

    const handleAndrewidChange = (event) => {
        setAnddrewid(event.target.value);
    };

    const submitScore = () => {
        addScore(displayName, andrewid, props.score);
        router.push("/countdown");
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.left}>
                <h1 className={styles.title}>
                    {props.title}
                </h1>
                <div className={styles.insWrapper}>
                    <h2 className={styles.ins}>Instructions</h2>
                    <p className={styles.text}>
                        {props.instructions}
                    </p>
                    <p className={cn(styles.text, styles.mobile)}>
                        <i>Unfortunately, these games are not supported on mobile. Please use a desktop or laptop to play.</i>
                    </p>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.gameWrapper}>
                    <div className={styles.game}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}