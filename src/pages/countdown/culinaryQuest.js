import CulinaryGame from "components/culinary-quest/culinaryGame2";
import { DashBoard } from "components/dashboard";
import { GameOver } from "components/gameover";
import { useEffect, useState } from "react";
import FontLoader from "react-font-loader";
import { getGameByName } from "utils/content";

function GameCulinaryQuest() {
  const [gameOver, setGameOver] = useState(false);
  const [submittedScore, setSubmittedScore] = useState(-1);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    getGameByName("Culinary Quest").then((data) => {
      setInfo(data.data);
      console.log(data);
    });
    
  }, []);

  return (
    <DashBoard title={"Culinary Quest"} instructions={info && info.instructions}>
      {gameOver && <GameOver score={submittedScore} />}
      <FontLoader
        fontProvider="google"
        fontFamilies={["Pixelify Sans"]}
        onActive={() => {
          document.body.classList.add("webfonts-loaded");
        }}
        debug
      />
      <CulinaryGame
        setGameOver={setGameOver}
        setSubmittedScore={setSubmittedScore}
      />
    </DashBoard>
  );
}

export default GameCulinaryQuest;

