import { DashBoard } from "components/dashboard";
import Fireworks from "components/fireworksgame/fireworks";
import { GameOver } from "components/gameover";
import { useEffect, useState } from "react";
import { getGameByName } from "utils/content";


function Fireworks1() {
  const [info, setInfo] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [submittedScore, setSubmittedScore] = useState(0);

  useEffect(() => {
    getGameByName("Firework Frenzy").then((data) => {
      setInfo(data.data);
    });
    
  }, []);

  return (
    <DashBoard title={info && info.name} instructions={info && info.instructions}>
      {gameOver && <GameOver score={submittedScore} gameName={"fireworkFrenzy"} />}
      <Fireworks setGameOver={setGameOver} setSubmittedScore={setSubmittedScore}/>
    </DashBoard>
  );
}

export default Fireworks1;