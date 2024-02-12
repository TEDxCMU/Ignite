import styles from "components/gameCard.module.css";
import Image from "next/image";

import filler from "../assets/filler1.png";
import Link from "next/link";

export default function GameCard(props) {
    const { game, locked } = props;

    return (
        <div className={styles.container}>
            {locked ? 
            <div>
                <div className={styles.day}>{game.daysleft}</div>
                <div className={styles.daysleft}>day{game.daysleft > 1 && "s"} left</div>
            </div> :
            <Link 
                href={game.link.url}
            >
                <Image
                    className={styles.image}
                    style={{ objectFit: "contain", padding: "7% 5%" }}
                    src={filler}
                />
                <div className={styles.info}>
                    <div className={styles.name}>{game.name}</div>
                </div>
            </Link>
            }
        </div>
    );
}