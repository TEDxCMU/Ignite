import { useState, useEffect } from "react";
import { getInnovators } from "utils/content";
import styles from "components/expo.module.css";
import InnovatorCard from "components/InnovatorCard";

function Expo() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const content = await getInnovators();
        const innovators = content.map(({ data }) => data);
        setData(innovators);
        console.log(innovators);
        setLoading(false);
    }

    return (
        <div className="pageContainer">
            <div>
                <div className={styles.pageName}>Innovation Expo</div>
                <div className={styles.grid}>
                    {loading ? (
                        <div>Loading</div>
                    ) : (
                        data?.map((item, id) => (
                            <InnovatorCard key={id} idx={id} innovator={item} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Expo;