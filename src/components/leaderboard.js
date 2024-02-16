import { useState, useEffect } from 'react';
import { getScores, addScore } from 'utils/content';
import Modal from './modal';
import styles from './leaderboard.module.css';

export default function Leaderboard() {
    const [scores, setScores] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        getScores().then(data => setScores(data));
    }, []);

    const addLeaderboardScore = async () => {
        const name = prompt("Enter your name");
        const score = parseInt(prompt("Enter your score"), 10);

        addScore(name, "andrewid", score);
        getScores().then(data => setScores(data));
    };

    return (
        <>
            <div className={styles.leaderboardButton} onClick={() => setOpenModal(true)}>
                Leaderboard
            </div>
            <Modal large active={openModal} setActive={setOpenModal}>
                <div className={styles.container}>
                    <div className={styles.header}>Leaderboard</div>
                    {/* <button onClick={addLeaderboardScore}>Add Score</button> */}
                    <table className={styles.table}>
                        <thead className={styles.tableHeader}>
                            <tr>
                                <th style={{width: "3em", textAlign: "center"}}></th>
                                <th >Name</th>
                                <th style={{textAlign: "right"}}>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map((score, index) => (
                                <tr key={score._id}>
                                    <td style={{textAlign: "center"}}>{index + 1}</td>
                                    <td>{score.name}</td>
                                    <td style={{textAlign: "right"}}>{score.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </>
    );
}
