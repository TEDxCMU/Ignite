import CulinaryGame from "components/culinary-quest/culinaryGame2";
import { GameOver } from "components/gameover";
import { useState } from "react";
import FontLoader from "react-font-loader";

function GameCulinaryQuest() {
  const [gameOver, setGameOver] = useState(false);
  const [submittedScore, setSubmittedScore] = useState(-1);

  return (
    <>
      {gameOver && <GameOver score={submittedScore} />}
      <p>Try to make as many recipes as possible!</p>
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
      <a href="https://www.vecteezy.com/free-vector/wok">
        Wok Vectors by Vecteezy
      </a>
    </>
  );
}

export default GameCulinaryQuest;
