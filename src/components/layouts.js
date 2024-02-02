import NavBar from "./navbar";

export const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            <div className="content">{children}</div>
        </>
    );
};

export const HomeLayout = ({ children }) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
};
