import Link from 'next/link';
import Twitter from '../assets/twitter.svg';
import Linkedin from '../assets/linkedin.svg';
import styles from 'components/about.module.css';
import Mushroom from '../assets/2D/About-Page-Image.png';
import Image from 'next/image';

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
                                Where does it all begin? With an idea, starting from a single origin. This idea is not static; it expands, fluctuates, and undergoes a mesmerizing transformation. It is the moment it ignites.
                            </p>
                            <p className={styles.text}>
                            Every idea has the power to not only challenge the established but to illuminate new pathways of thought. By sharing these stories, you become the key to unlocking a cascade of ideas in others. TEDxIgnite is more than a conference; it's a place where answers for the uncharted future are forged in the present. Tomorrow is up to those who prepare for it today. Are you ready to light up the world?
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
                        <Image
                            src={Mushroom.src}
                            alt="TEDxCMU Momentum Graphic"
                            styles={{objectFit: "contain"}}
                            width={0}
                            height={0}
                            sizes="50vw"
                        />
                    </div>
                </section>
            </main>
        </>
    );
}

export default About;