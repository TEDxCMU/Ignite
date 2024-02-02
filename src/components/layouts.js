import { Background } from "./background";
import NavBar from "./navbar";

export const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            <Background />
            <div className="content">{children}</div>
        </>
    );
};

export const HomeLayout = ({ children }) => {
    return (
        <>
            <NavBar />
            <Background home />
            {children}
        </>
    );
};
