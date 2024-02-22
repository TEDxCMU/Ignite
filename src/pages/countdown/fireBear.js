import React, { useEffect, useState } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import EthanGame from "components/ethan-game/sketch";
import { DashBoard } from "components/dashboard";
import { getGameByName } from "utils/content";
import { GameOver } from "components/gameover";

function FireBear() {
  const [info, setInfo] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [submittedScore, setSubmittedScore] = useState(0);

  useEffect(() => {
    getGameByName("Fire Bear").then((data) => {
      setInfo(data.data);
    });
    
  }, []);
  return (
    <DashBoard title={info && info.name} instructions={info && info.instructions}>
      {gameOver && <GameOver score={submittedScore} />}
      <EthanGame setGameOver={setGameOver} setSubmittedScore={setSubmittedScore}/>
    </DashBoard>
  );
}

export default FireBear;