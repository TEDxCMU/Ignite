import 'styles/globals.css';
import NavBar from 'components/navbar';
import Background from 'components/background';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Background />
            <NavBar />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
