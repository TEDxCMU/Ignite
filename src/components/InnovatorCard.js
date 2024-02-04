import { useState } from "react";
import styles from "components/InnovatorCard.module.css";
import Modal from "./modal";
import cn from "classnames";



export default function InnovatorCard(props) {
    const { innovator, idx } = props;
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <div
                className={styles.container}
                onClick={() => setOpenModal(true)}
            >
                <div className={styles.filler}></div>
                <img className={styles.image} src={innovator.image.url}></img>
                <div className={styles.info}></div>
                <div className={styles.filler2}>
                <text className={styles.name}>{innovator.name}</text>
                    <text className={styles.caption}>
                        {innovator.description.substring(0, 115) + "..."}
                </text>
                </div>
            </div>
            <Modal large active={openModal} setActive={setOpenModal}>
                <div className={styles.left}>
                    <h1
                        lang="de"
                        className={cn(
                            "title",
                            styles.header,
                            innovator.name.includes("NeuroMechatronics") &&
                                styles.hyphen
                        )}
                    >
                        About {innovator.name}
                    </h1>
                    <p className={styles.body}>{innovator.description}</p>
                </div>
                <div className={styles.right}>
                    <img
                        className={styles.modalImage}
                        src={innovator.image.url}
                        alt={innovator.name}
                    />
                </div>
            </Modal>
        </>
    );
}
