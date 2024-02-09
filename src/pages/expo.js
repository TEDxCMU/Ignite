// import { useState, useEffect } from 'react';
// import { getInnovators } from 'utils/content';

// function InnovationExpo() {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         init();
//     }, []);

//     async function init() {
//         const content = await getInnovators();
//         setData(content);
//     }

//     return (
//         <div>InnovationExpo</div>
//     );
// }

// export default InnovationExpo;

import { useState, useEffect } from "react";
import { getInnovators } from "utils/content";
import ExpoComp from "components/expo";
import styles from "components/InnovatorCard";
import { Layout } from "components/layouts";

function InnovationExpo() {
    const [data, setData] = useState(null);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const content = await getInnovators();
        const innovators = content.map(({ data }) => data);
        console.log(innovators);
        setData(content);
    }

    return <ExpoComp />;
}

InnovationExpo.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default InnovationExpo;