import { useState, useEffect } from 'react';
import { getScores } from 'utils/content';
import Modal from './modal';
import styles from './leaderboard.module.css';

export default function Leaderboard() {
    const [scores, setScores] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        getScores().then(data => setScores(data));
    }, []);

    const addScore = async () => {
        const name = prompt("Enter your name");
        const score = parseInt(prompt("Enter your score"), 10);

        addScore(name, score);
        getScores().then(data => setScores(data));
    };

    return (
        <>
            <div className={styles.leaderboardButton} onClick={() => setOpenModal(true)}>
                Leaderboard
            </div>
            <Modal large active={openModal} setActive={setOpenModal}>
                <div>
                    <h1>Leaderboard</h1>
                    <button onClick={addScore}>Add Score</button>
                    <ul>
                        {scores.map(score => (
                            <li key={score._id}>{score.name}: {score.score}</li>
                        ))}
                    </ul>
                </div>
            </Modal>
        </>
    );
}
