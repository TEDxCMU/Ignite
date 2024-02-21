import React from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import sketch from "components/ethan-game/sketch";
import { DashBoard } from "components/dashboard";

function ethanGame() {
  return (
    <DashBoard title={"Fire Bear"}>
      <NextReactP5Wrapper sketch={sketch} />
    </DashBoard>
  );
}

export default ethanGame;