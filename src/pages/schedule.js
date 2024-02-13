import { useState, useEffect } from 'react';
import { getSchedule } from 'utils/content'; 
import JS from '../assets/headshots/JS.png'
import I1 from '../assets/2D/Icon1.png'
import styles from './schedule.module.css'
import Image from 'next/image';
import { Layout } from 'components/layouts';
import Background from 'components/background';

function sortByTime(a, b) {
    console.log(new Date(b.start_time) - new Date(a.start_time));
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.start_time) - new Date(b.start_time);
}

function DetailCard(props){

    const startTime = new Date(props.startTime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

    const endTime = new Date(props.endTime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

    return(
        <div>
            <div className={styles.time}><p>{`${startTime} - ${endTime}`}</p></div>
            <div className={styles.card}>
                <div className={styles.cardLeft}>
                    <div className={styles.titleFirst}>
                        <h1 className={styles.titleText}>{props.title}</h1>
                    </div>
                </div>
            </div>
        </div> 
    )

}

function ScheduleCard(props){

    const startTime = new Date(props.startTime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

    const endTime = new Date(props.endTime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

    return(
        <div>
            <div className={styles.time}><p>{`${startTime} - ${endTime}`}</p></div>
            <div className={styles.card}>
                <div className={styles.cardLeft}>
                    <div className={styles.title}>
                        <h1 className={styles.titleText}>{props.title}</h1>
                    </div>
                    <div>
                        <div className={styles.intro}>
                            <div className={styles.introLeft}><Image width={50} height={50} style={{objectFit: "cover", borderRadius: "50px"}} src={props.personImg} alt="speaker image"/></div>
                            <div className={styles.introRight}> 
                                <div><p className={styles.text}>{props.personName}</p></div>
                                <div><p className={styles.text}>{props.personPos}</p></div>
                            </div>
                        </div>
                        <div className = {styles.des}>
                            <div className={styles.personDes}><p className={styles.text}>{props.personDes}</p></div>
                        </div>
                    </div>
                </div>
                <div className={styles.cardRight}>
                    <Image width={200} height={200} style={{objectFit: "cover"}} src={props.icon} alt="event icon"/>
                </div>
            </div>
        </div> 
    )
}

function Schedule() {
    const [data, setData] = useState(null);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const content = await getSchedule();
        const events = content.map(({ data }) => data).sort(sortByTime);
        setData(events);
        console.log(events);
    }


    return (
        <div className='pageContainer'>
            <div className={styles.cardWrap}>
                {data && data.map((card, idx) => {
                    console.log(card); 
                    if (card.description != null)
                    {
                        return <ScheduleCard 
                            key = {idx}
                            startTime = {card.start_time}
                            endTime = {card.end_time}
                            title = {card.title}
                            personDes = {card.description}
                            personImg = {card.speaker.data.image.url}
                            personName = {card.speaker.data.name}
                            personPos = {card.speaker.data.title}
                            icon = {card.image.url}
                        />
                    }
                    else
                    {
                        return <DetailCard
                            key = {idx}
                            title = {card.title}
                            startTime = {card.start_time}
                            endTime = {card.end_time}
                        />
                    }
                    }            
                )}
            </div>
        </div>
    );
}

export default Schedule;
