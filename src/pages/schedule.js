import { useState, useEffect } from 'react';
import { getSchedule } from 'utils/content';

function Schedule() {
    const [data, setData] = useState(null);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const content = await getSchedule();
        setData(content);
    }

    return (
        <div>Schedule</div>
    );
}

export default Schedule;
