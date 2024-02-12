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
        const gamesOrdered = games.sort((a, b) => (a.daysleft > b.daysleft) ? 1 : ((b.daysleft > a.daysleft) ? -1 : 0)).reverse();
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
                        {data.map((item, id) => {
                            const currentDate = new Date();
                            const targetDate = new Date("February 14, 2024");
                            targetDate.setDate(targetDate.getDate() - item.daysleft);
                            const differenceInDays = Math.floor((targetDate - currentDate) / (1000 * 60 * 60 * 24));
                            console.log("current date", currentDate)
                            console.log("target date", targetDate)
                            console.log("diff in days", differenceInDays)
                            let locked = differenceInDays >= 0;

                            return <GameCard key={id} game={item} locked={locked} />
                        })}
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