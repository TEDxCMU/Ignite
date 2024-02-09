import { useState, useEffect } from 'react';
import { getSchedule } from 'utils/content'; 
import JS from '../assets/headshots/JS.png'
import I1 from '../assets/2D/Icon1.png'
import styles from './schedule.module.css'
import Image from 'next/image';
import { Layout } from 'components/layouts';

const firstCard = () =>{
    return(
        <div>
             <h1 className={styles.pageName}>Schedule</h1>
            <div className={styles.time}><p>9:30-10:00AM</p></div>
            <div className={styles.card}>
                <div className={styles.cardLeft}>
                    <div className={styles.titleFirst}>
                        <h1 className={styles.titleText}>INTRODUCTION</h1>
                    </div>
                </div>
                <div className={styles.cardRight}/>
            </div>
        </div> 
    )

}

function ScheduleCard(props){

    return(
        <div>
            <div className={styles.time}><p>{props.time}</p></div>
            <div className={styles.card}>
                <div className={styles.cardLeft}>
                    <div className={styles.title}>
                        <h1 className={styles.titleText}>{props.title}</h1>
                    </div>
                    <div>
                        <div className={styles.intro}>
                            <div className={styles.introLeft}><Image width={50} height={50} src={props.personImg} alt="speaker image"/></div>
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
                    <Image width={200} height={200} src={props.icon} alt="event icon"/>
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
        setData(content);
    }

    const cards = [
        {time: "9:00AM - 9:30AM", title: "TRANSFORMING THE INCARCERATION SYSTEM", personImg: JS , personName: "JASON SPERLING", personPos: "Director of Facebook",
        personDes: "The advertising industry has taken selfish giving and turned it into cause marketing, where companies promoting their socially conscious deeds has not only become accepted, but it has been expected by younger audiences. Jason Sperling examines his selfishness behind creating a video series for kids with cancer, but also how selfish is becoming the new selfless in his industry and in all of us.",
        icon: I1}, 
        {time: "9:00AM - 9:30AM", title: "TRANSFORMING THE INCARCERATION SYSTEM", personImg: JS , personName: "JASON SPERLING", personPos: "Director of Facebook",
        personDes: "The advertising industry has taken selfish giving and turned it into cause marketing, where companies promoting their socially conscious deeds has not only become accepted, but it has been expected by younger audiences. Jason Sperling examines his selfishness behind creating a video series for kids with cancer, but also how selfish is becoming the new selfless in his industry and in all of us.", 
        icon: I1}, 
        {time: "9:00AM - 9:30AM", title: "TRANSFORMING THE INCARCERATION SYSTEM", personImg: JS , personName: "JASON SPERLING", personPos: "Director of Facebook",
        personDes: "The advertising industry has taken selfish giving and turned it into cause marketing, where companies promoting their socially conscious deeds has not only become accepted, but it has been expected by younger audiences. Jason Sperling examines his selfishness behind creating a video series for kids with cancer, but also how selfish is becoming the new selfless in his industry and in all of us.", 
        icon: I1}, 
        {time: "9:00AM - 9:30AM", title: "TRANSFORMING THE INCARCERATION SYSTEM", personImg: JS , personName: "JASON SPERLING", personPos: "Director of Facebook",
        personDes: "The advertising industry has taken selfish giving and turned it into cause marketing, where companies promoting their socially conscious deeds has not only become accepted, but it has been expected by younger audiences. Jason Sperling examines his selfishness behind creating a video series for kids with cancer, but also how selfish is becoming the new selfless in his industry and in all of us.", 
        icon: I1}, 
        {time: "9:00AM - 9:30AM", title: "TRANSFORMING THE INCARCERATION SYSTEM", personImg: JS , personName: "JASON SPERLING", personPos: "Director of Facebook",
        personDes: "The advertising industry has taken selfish giving and turned it into cause marketing, where companies promoting their socially conscious deeds has not only become accepted, but it has been expected by younger audiences. Jason Sperling examines his selfishness behind creating a video series for kids with cancer, but also how selfish is becoming the new selfless in his industry and in all of us.", 
        icon: I1}
    ]


    return (
        <div className='pageContainer'>
            {firstCard()}
            <div className={styles.cardWrap}>
                {cards.map((card, idx) => {
                    return <ScheduleCard 
                        time = {card.time}
                        title = {card.title}
                        personImg = {card.personImg}
                        personName = {card.personName}
                        personPos = {card.personPos}
                        personDes = {card.personDes}
                        icon = {card.icon}
                    />
                    }            
                )}
            </div>
        </div>
    );
}

export default Schedule;
