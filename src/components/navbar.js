import Link from 'next/link';
import styles from 'components/navbar.module.css';
import Logo from 'assets/tedxcmu-logo.svg';

function NavBar() {
    return (
        <nav className={styles.container}>
            <Logo className={styles.logo} />
            <div className={styles.links}>
                <Link href="/" className={styles.link}>
                    Home
                </Link>
                <Link href="/stage" className={styles.link}>
                    Stage
                </Link>
                <Link href="/schedule" className={styles.link}>
                    Schedule
                </Link>
                <Link href="/speakers" className={styles.link}>
                    Speakers
                </Link>
                <Link href="/expo" className={styles.link}>
                    Innovation Expo
                </Link>
                <Link href="/countdown" className={styles.link}>
                    Countdown
                </Link>
                <Link href="/about" className={styles.link}>
                    About
                </Link>
            </div>
            {/* Empty div for spacing. */}
            <div />
        </nav>
    );
}


export default NavBar;
