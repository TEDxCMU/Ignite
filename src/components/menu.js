import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from 'components/menu.module.css';

function Menu({ parent, items, active, setActive }) {
    const router = useRouter();

    function handleClick() {
        setActive((s) => !s);
        if (parent && parent.current && items && items.current) {
            parent.current.classList.toggle(styles.menu);
            items.current.classList.toggle(styles.menuItems);
        }
    }

    function handleRouteChange() {
        setActive(false);
        if (parent && parent.current && items && items.current) {
            parent.current.classList.remove(styles.menu);
            items.current.classList.remove(styles.menuItems);
        }
    }

    useEffect(() => {
        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    return (
        <>
            <div className={styles.container} onClick={handleClick}>
                {!active && (
                    <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        shapeRendering="geometricPrecision"
                    >
                        <path d="M3 12h18" />
                        <path d="M3 6h18" />
                        <path d="M3 18h18" />
                    </svg>
                )}
                {active && (
                    <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        shapeRendering="geometricPrecision"
                    >
                        <path d="M18 6L6 18" />
                        <path d="M6 6l12 12" />
                    </svg>
                )}
            </div>
        </>
    );
}

export default Menu;