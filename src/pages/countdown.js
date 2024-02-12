import Leaderboard from 'components/leaderboard';

import { useState, useEffect } from "react";
import GameCard from "components/gameCard";

import styles from "./countdown.module.css";
import DayOfEvent from 'components/dayOfEvent';
import { getGames } from 'utils/content';

function CountdownGames() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const content = await getGames();
        const games = content.map(({ data }) => data);
        const gamesOrdered = games.sort((a, b) => (a.daysleft > b.daysleft) ? 1 : ((b.daysleft > a.daysleft) ? -1 : 0));

        setData(gamesOrdered);
        console.log(gamesOrdered)
        setLoading(false);
    }

    return (
        <div className="pageContainer">
            <div className={styles.pageName}>Countdown</div>
            { loading ? <div>Loading</div> :
                <div className={styles.container}>
                    <div className={styles.countdownList}>
                        {data.map((item, id) => (
                                <GameCard key={id} game={item} />
                            ))}
                        <div className={styles.lastCol}>
                            <DayOfEvent />
                            <Leaderboard />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default CountdownGames;