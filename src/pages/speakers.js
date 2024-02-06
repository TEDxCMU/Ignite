import { useState, useEffect } from "react";
import { getSpeakers } from "utils/content";
import SpeakerCard from "components/SpeakerCard";

import styles from "./speakers.module.css";
import { Layout } from "components/layouts";

function Speakers() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    init();
  }, []);

  function compareOrder(a, b) {
    console.log(a.links[0].text);
    return a.links[0].text - b.links[0].text;
  }

  async function init() {
    const content = await getSpeakers();
    const speakers = content.map(({ data }) => data);
    const speakersOrdered = speakers.sort(compareOrder);

    setData(speakersOrdered);
    setLoading(false);
  }

  return (
    <div className="pageContainer">
      <h2 className={styles.pageName}>Speakers</h2>
      <div className={styles.grid}>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          data.map((item, id) => <SpeakerCard key={id} speaker={item} />)
        )}
      </div>
    </div>
  );
}

export default Speakers;
