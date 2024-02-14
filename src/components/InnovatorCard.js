import { useState } from "react";
import styles from "components/InnovatorCard.module.css";
import Modal from "./modal";
import cn from "classnames";

import Filler from "../assets/filler1.png";

export default function InnovatorCard(props) {
    const { innovator, idx } = props;
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <div
                className={styles.container}
                onClick={() => setOpenModal(true)}
            >
                <img className={
                    cn(styles.image, innovator.name === "CarnegieGPT" && styles.imgContain)} 
                    src={innovator.image.url}></img>
                <div className={styles.info}>
                    <div className={styles.name}>{innovator.name}</div>
                    <div className={styles.caption}>
                        {innovator.description.substring(0, 115) + "..."}
                    </div>
                </div>
            </div>
            <Modal large active={openModal} setActive={setOpenModal}>
                <div className={styles.left}>
                    <h1
                        lang="de"
                        className={cn(
                            "title",
                            styles.header,
                        )}
                    >
                        About {innovator.name}
                    </h1>
                    <p className={styles.body}>{innovator.description}</p>
                </div>
                <div className={cn(styles.right, innovator.name === "CarnegieGPT" && styles.rightContain)}>
                    <img
                        className={cn(styles.modalImage, innovator.name === "CarnegieGPT" && styles.imgContainModal)}
                        src={innovator.image.url}
                        alt={innovator.name}
                    />
                </div>
            </Modal>
        </>
    );
}