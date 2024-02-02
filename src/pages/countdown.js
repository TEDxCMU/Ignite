import Leaderboard from 'components/leaderboard';

import { useState, useEffect } from "react";
import GameCard from "components/gameCard";

import styles from "./countdown.module.css";
import DayOfEvent from 'components/dayOfEvent';

function CountdownGames() {
    // const [data, setData] = useState(null); // TODO: put the data in prismic

    const data = [
      {
        name: "p5.js Demo",
        url: "/countdown/p5GameDemo"
      },
      {
        name: "3D Physics Demo",
        url: "/countdown/3DPhysicsDemo"
      },
      {
        name: "2D Demo with Physics",
        url: "/countdown/2DDemo"
      }
    ]

    const [loading, setLoading] = useState(false);

    return (
        <div className="pageContainer">
            <div className={styles.bg}>
                <h2 className="title">Countdown</h2>
                <div className={styles.outerContainer}>
                    <div className={styles.innerContainer}>
                      <div className={styles.countdownList}>
                          {loading ? (
                              <h1>Loading</h1>
                          ) : (
                              data.map((item, id) => (
                                  <GameCard key={id} game={item} />
                              ))
                          )}
                      </div>
                      <Leaderboard />
                  </div>
                  <div>
                    <DayOfEvent />
                  </div>
                </div>
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