import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { addScore } from "utils/content";
import Modal from "./modal";
import styles from "./gameover.module.css"


export function GameOver(props) {
    const [displayName, setDisplayName] = useState("");
    const [andrewid, setAnddrewid] = useState("");
    const router = useRouter();

    const handleDisplayNameChange = (event) => {
        setDisplayName(event.target.value);
    };

    const handleAndrewidChange = (event) => {
        setAnddrewid(event.target.value);
    };

    const submitScore = () => {
        addScore(displayName, andrewid, props.score, props.gameName);
        router.push("/countdown");
    }

    return (
        <Modal active={true} setActive={() => false}>
            <div className={styles.wrapper}>
                <div><h1 className={styles.gameOver}>Game Over</h1></div>
                <div><h2 className={styles.stats}>Score: {props.score}</h2></div>
                
                <div className={styles.inputWrapper}>
                    <div className={styles.type}>
                        <label htmlFor="displayName">Display Name:</label>
                        <input className={styles.inputs} type="text" id="displayName" value={displayName} onChange={handleDisplayNameChange} placeholder="Name" />
                    </div>

                    <div className={styles.type}>
                        <label htmlFor="andrewid">Andrew ID (to be entered in the giveaway):</label>
                        <input className={styles.inputs} type="text" id="andrewid" value={andrewid} onChange={handleAndrewidChange} placeholder="Andrew ID" />
                    </div>
                </div>
                <div>
                    <button className={styles.buttons} onClick={submitScore}><a>Submit to Leaderboard</a></button>
                    <button className={styles.buttons}> <Link href="/countdown">Return Home</Link></button>
                </div>
            </div>
        </Modal>
    )
}