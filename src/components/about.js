import Link from 'next/link';
import Twitter from '../assets/twitter.svg';
import Linkedin from '../assets/linkedin.svg';
import styles from 'components/about.module.css';
import Mushroom from '../assets/2D/Mushroom Full Piece.png';

function About() {
    return (
        <>
            <main className={styles.container}>
                <h1 className={styles.header}>
                    About
                </h1>
                <section className={styles.card}>
                    <div className={styles.content}>
                        <div>
                            <p className={styles.text}>
                                Momentum is what drives something still into an unstoppable force of motion, power, energy and most importantly, change. It fuels motivation, defies stagnancy and demands the spurring of action. People who are constantly in momentum are those that make change, those that pursue something more and those that see in the world the potential for something better.
                            </p>
                            <p className={styles.text}>
                                Momentum pushes us to keep moving in spite of the challenges we face. TEDxCMU Momentum hopes to teach the power of striving for more and taking the step that allows momentum to thrive—the first one forward.
                            </p>
                        </div>
                        <div className={styles.links}>
                            <Link className={styles.button} href="https://www.tedxcmu.org">
                                TEDxCMU.ORG
                            </Link>
                            <Link className={styles.icon} href="https://twitter.com/tedxcmu">
                                <Twitter />
                            </Link>
                            <Link className={styles.icon} href="https://www.linkedin.com/company/tedxcmu">
                                <Linkedin />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.image}>
                        <img
                            src={Mushroom.src}
                            alt="TEDxCMU Momentum Graphic"
                        />
                    </div>
                </section>
            </main>
        </>
    );
}

export default About;