import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { addScore } from "utils/content";
import Modal from "./modal";


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
        addScore(displayName, andrewid, props.score);
        router.push("/countdown");
    }

    return (
        <Modal active={true} setActive={() => false}>
            <div>Game Over</div>
            <div>Score: {props.score}</div>
            
            <label htmlFor="displayName">Display Name:</label>
            <input type="text" id="displayName" value={displayName} onChange={handleDisplayNameChange} placeholder="Name" />
            <label htmlFor="andrewid">Andrew ID (to be entered in the giveaway):</label>
            <input type="text" id="andrewid" value={andrewid} onChange={handleAndrewidChange} placeholder="Andrew ID" />
            <button onClick={submitScore}>Submit to Leaderboard</button>
            <Link href="/countdown">Return Home</Link>
        </Modal>
    )
}