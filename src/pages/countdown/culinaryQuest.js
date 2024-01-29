import CulinaryGame from "components/culinary-quest/culinaryGame2";
import { GameOver } from "components/gameover";
import { useState } from "react";

function GameCulinaryQuest() {
  const [gameOver, setGameOver] = useState(false);

  return (
    <>
      {gameOver && <GameOver />}
      <p>Try to make as many recipes as possible!</p>
      <CulinaryGame setGameOver={setGameOver} />
    </>
  );
}

export default GameCulinaryQuest;
