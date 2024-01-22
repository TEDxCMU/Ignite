import React from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import sketch from "components/ethan-game/sketch";

function ethanGame() {
  return <NextReactP5Wrapper sketch={sketch} />;
}

export default ethanGame;