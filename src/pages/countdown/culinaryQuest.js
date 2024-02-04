import CulinaryGame from "components/culinary-quest/culinaryGame2";
import { GameOver } from "components/gameover";
import { useState } from "react";

function GameCulinaryQuest() {
  const [gameOver, setGameOver] = useState(false);
  const [submittedScore, setSubmittedScore] = useState(-1);

  return (
    <>
      {gameOver && <GameOver score={submittedScore} />}
      <p>Try to make as many recipes as possible!</p>
      <CulinaryGame
        setGameOver={setGameOver}
        setSubmittedScore={setSubmittedScore}
      />
    </>
  );
}

export default GameCulinaryQuest;
