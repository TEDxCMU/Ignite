import React from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import styles from "../game.module.css"

// define your sketch here
const sketch = (p5) => {

  // setup function
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);

    let osc = p5.Oscillator();
  }

  // draw function (called every frame)
  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
};

// wrap with NextReactP5Wrapper
function P5Sketch() {
  return (
      <NextReactP5Wrapper sketch={sketch} />
  );
}

export default P5Sketch;