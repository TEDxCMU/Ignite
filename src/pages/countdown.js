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
            <div className={styles.bg}>
                <h2 className="title">Countdown</h2>

                { loading ? <h1>Loading</h1> :
                <div className={styles.outerContainer}>
                    <div className={styles.innerContainer}>
                      <div className={styles.countdownList}>
                          {data.map((item, id) => (
                                  <GameCard key={id} game={item} />
                              ))}
                      </div>
                      <Leaderboard />
                  </div>
                  <div>
                    <DayOfEvent />
                  </div>
                </div>
                }

            </div>
        </div>
    );
}

// Speakers.getLayout = function getLayout(page) {
//     return <Layout>{page}</Layout>;
// };

export default CountdownGames;

// function Countdown() {
//   return (
//     <div>
//       <Link href="/countdown/p5GameDemo">p5.js Demo</Link>
//       <Link href="/countdown/3DPhysicsDemo">3D Physics Demo</Link>
//       <Link href="/countdown/3DAnimationDemo">3D Animation Demo</Link>
//       <Link href="/countdown/2DDemo">2D Demo with Physics</Link>
//       <Leaderboard />
//     </div>
//   );
// }

// export default Countdown;