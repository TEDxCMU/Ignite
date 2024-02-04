import React from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import styles from "../game.module.css"

// define your sketch here
const sketch = (p5) => {
  let typed = "";
  // setup function
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
  }

  // draw function (called every frame)
  p5.draw = () => {
    p5.background(0);
    p5.textSize(30);
    p5.fill('cyan');
    p5.textFont('futura');
    p5.text(typed, 10, 10, window.innerWidth-40, window.innerHeight-40);
  };
  p5.keyTyped = () => {
    typed += p5.key;
  }
};
  
// wrap with NextReactP5Wrapper
function Fireworks() {
  return (
      <NextReactP5Wrapper sketch={sketch} />
  );
}

export default Fireworks;