import { useState, useEffect } from "react";
import { getInnovators } from "utils/content";
import ExpoComp from "components/expo";
import { Layout } from "components/layouts";

function InnovationExpo() {
    const [data, setData] = useState(null);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const content = await getInnovators();
        const innovators = content.map(({ data }) => data);
        setData(content);
    }

    return <ExpoComp />;
}

export default InnovationExpo;