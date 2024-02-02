import styles from "components/gameCard.module.css";
import Image from "next/image";

import filler from "../assets/filler1.png";
import Link from "next/link";

export default function GameCard(props) {
    const { game } = props;

    return (
        <>
            <Link 
                href={game.link.url}
                className={styles.container}
            >
                <Image
                  className={styles.image}
                  style={{ objectFit: "contain", padding: "7% 5%" }}
                  src={filler}
                />
                <div className={styles.info}>
                    <h1 className={styles.name}>{game.name}</h1>
                </div>
            </Link>
        </>
    );
}