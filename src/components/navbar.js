import Link from 'next/link';
import styles from 'components/navbar.module.css';
import Logo from 'assets/tedxcmu-logo.svg';
import cn from 'classnames';
import Menu from './menu';
import { useRef, useState } from 'react';

function NavBar() {

    const parentRef = useRef(null);
    const itemsRef = useRef(null);
    const ticketRef = useRef(null);
    const [active, setActive] = useState(false);

    return (
        <nav className={styles.container} ref={parentRef}>
            <Link href="/">
                <Logo className={styles.logo} />
            </Link>
            <div className={styles.links} ref={itemsRef}>
                <Link href="/schedule" className={styles.link}>
                    Schedule
                </Link>
                <Link href="/speakers" className={styles.link}>
                    Speakers
                </Link>
                <Link href="/expo" className={styles.link}>
                    Innovation Expo
                </Link>
                <Link href="/about" className={styles.link}>
                    About
                </Link>
            </div>
            <Link
                target="_blank"
                className={cn(styles.link, styles.btn)}
                href="https://carnegiemellontickets.universitytickets.com/w/event.aspx?id=2451&p=1"
            >
                Purchase Tickets
            </Link>
            <Menu
                parent={parentRef}
                items={itemsRef}
                ticket={ticketRef}
                active={active}
                setActive={setActive}
            />
        </nav>
    );
}

export default NavBar;
