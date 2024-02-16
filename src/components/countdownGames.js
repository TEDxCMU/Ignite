import { useState, useEffect } from "react";
// import { Layout } from "components/layouts";
import GameCard from "components/gameCard";

import styles from "./countdownGames.module.css";

function CountdownGames() {
    const [data, setData] = useState(null); // TODO: put the data in prismic
    const [loading, setLoading] = useState(true);

    return (
        <div className="pageContainer">
            <div className={styles.bg}>
                <h2 className="title">Countdown</h2>
                <div className={styles.grid}>
                    {loading ? (
                        <h1>Loading</h1>
                    ) : (
                        data.map((item, id) => (
                            <GameCard key={id} speaker={item} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

// Speakers.getLayout = function getLayout(page) {
//     return <Layout>{page}</Layout>;
// };

export default Speakers;