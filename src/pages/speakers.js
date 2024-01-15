import { useState, useEffect } from 'react';
import { getSpeakers } from 'utils/content';

function Speakers() {
    const [data, setData] = useState(null);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const content = await getSpeakers();
        setData(content);
    }

    return (
        <div>Speakers</div>
    );
}

export default Speakers;
