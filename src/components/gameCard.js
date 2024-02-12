import styles from "components/gameCard.module.css";
import Image from "next/image";

import filler from "../assets/filler1.png";
import Link from "next/link";

import cn from "classnames";

export default function GameCard(props) {
    const { game, locked } = props;

    return (
        <>
            {locked ? 
            <div className={cn(styles.container, styles.containerLocked)}>
                <div className={styles.daycount}>
                    <div className={styles.day}>{game.daysleft}</div>
                    <div className={styles.daysleft}>day{game.daysleft > 1 && "s"} left</div>
                </div> 
            </div> :
            <div className={styles.container}>
                <Link 
                    className={styles.link}
                    href={game.link.url}
                >
                    <Image
                        className={styles.image}
                        width={0}
                        height={0}
                        sizes="30vw"
                        style={{ objectFit: "cover"}}
                        src={game.image.url}
                    />
                    <div className={styles.info}>
                        <div className={styles.name}>{game.name}</div>
                        <div className={styles.body}>{game.description}</div>
                    </div>
                </Link>
            </div>
        }
    </>
    );
}