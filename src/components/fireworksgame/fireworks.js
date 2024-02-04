import React from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import styles from "../game.module.css"

// define your sketch here
const sketch = (p5) => {
  let spr;
  let k = "";
  let timer = 0;
  let score = 0;
  let currTyping = false;
  let curr;
  const arr = [
    "Spark",
    "Fire",
    "Ignition",
    "Blaze",
    "Combust",
    "Inflame",
    "Kindle",
    "Inferno",
    "Flare",
    "Ember",
    "Pyre",
    "Conflagration",
    "Ardent",
    "Flash",
    "Incite",
    "Intense",
    "Radiate",
    "Ignite",
    "Torch",
    "Heat",
    "Scorch",
    "Firestorm",
    "Spontaneous",
    "Fiery",
    "Illuminate"
  ];
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  p5.setup = () => {
    p5.createCanvas(800, 600);
    spr = createSprite(
      600, 500, 40, 40);
    spr.shapeColor = color(255);
    spr.velocity.y = -2;
    spr.text = arr[getRandomInt(0, 25)];
    spr.textSize = 20;
  }
  p5.draw = () => {
    p5.background(50);
    p5.fill("white");
    p5.textSize(25);
    p5.text("Score: " + score, 15, 25);
    if (millis() >= 2000+timer) {
      spr = createSprite(getRandomInt(100, 760), 500, 40, 40);
      spr.shapeColor = color(255);
      spr.velocity.y = -2;
      spr.text = arr[getRandomInt(0, 25)];
      spr.textSize = 20;
      timer = millis();
    }
    for (let i = 0; i < allSprites.length; i++) {
      if (allSprites[i].position.y < 0) {
        p5.noLoop();
        p5.fill("red");
        p5.textSize(50);
        p5.text("Game Over", 280, 300);
      }
    }
    drawSprites();
  }

  p5.keyTyped = () => {
    //contents = contents + key;
    k = key;
    if(currTyping){
      if(k == curr.text[0]){
        curr.text = curr.text.substring(1);
        score += 1;
        if(curr.text == ""){
          curr.remove();
          currTyping = false;
        }
      }
    }
    else{
      for (let i = 0; i < allSprites.length; i++) {
        if (allSprites[i].text[0].toLowerCase() == k) {
          currTyping = true;
          curr = allSprites[i];
          curr.text = curr.text.substring(1);
          curr.shapeColor = color(120);
            score += 1;
          return;
        }
      }
    }
    k = "";
  }
};
  
// wrap with NextReactP5Wrapper
function Fireworks() {
  return (
      <NextReactP5Wrapper sketch={sketch} />
  );
}

export default Fireworks;