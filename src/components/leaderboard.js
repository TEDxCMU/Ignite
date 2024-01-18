import { useState, useEffect } from 'react';

export default function Leaderboard() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetch('/api/getScores')
            .then(res => res.json())
            .then(data => {
              console.log(data)
              setScores(data)
            });
    }, []);

    const addScore = async () => {
        const name = prompt("Enter your name");
        const score = parseInt(prompt("Enter your score"), 10);

        await fetch('/api/addScore', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, score })
        });

        // Refresh scores
        fetch('/api/getScores')
            .then(res => res.json())
            .then(data => setScores(data));
    };

    return (
        <div>
            <h1>Leaderboard</h1>
            <button onClick={addScore}>Add Score</button>
            <ul>
                {scores.map(score => (
                    <li key={score._id}>{score.name}: {score.score}</li>
                ))}
            </ul>
        </div>
    );
}
