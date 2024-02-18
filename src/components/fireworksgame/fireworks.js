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
  let allSprites = [];

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  p5.setup = () => {
    p5.createCanvas(800, 600);
    spr = new Sprite(
      600, 500, 40, 40);
    spr.shapeColor = p5.color(255);
    spr.velocity.y = -2;
    spr.text = arr[getRandomInt(0, 25)].toLowerCase();
    spr.textSize = 20;
    allSprites.push(spr);
  }

  p5.draw = () => {
    p5.background(50);
    p5.fill("white");
    p5.textSize(25);
    p5.text("Score: " + score, 15, 25);
    if (p5.millis() >= 2000+timer) {
      p5.print("new sprite created")
      spr = new Sprite(getRandomInt(100, 760), 500, 40, 40);
      spr.shapeColor = p5.color(255);
      spr.velocity.y = -2;
      spr.text = arr[getRandomInt(0, 25)].toLowerCase();
      spr.textSize = 20;
      allSprites.push(spr);
      timer = p5.millis();
    }
    for (let i = 0; i < allSprites.length; i++) {
      allSprites[i].update();
      allSprites[i].draw();
      if (allSprites[i].position.y < 0) {
        p5.noLoop();
        p5.fill("red");
        p5.textSize(50);
        p5.text("Game Over", 280, 300);
      }
    }

  }

  p5.keyTyped = () => {
    //contents = contents + key;
    k = p5.key;
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
          curr.shapeColor = p5.color(120);
            score += 1;
          return;
        }
      }
    }
    k = "";
  }

  class Sprite {
    constructor(x, y, w, h) {
      this.position = {
        x: x,
        y: y
      };
      this.w = w;
      this.h = h;

      this.shapeColor = p5.color(255);
      this.velocity = {
        x: 0,
        y: 0
      };
      this.text = "";
      this.textSize = 20;
    }

    update() {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }

    draw() {
      p5.fill(this.shapeColor);
      p5.rect(this.position.x, this.position.y, this.w, this.h);
      p5.fill("white");
      p5.textSize(this.textSize);
      p5.text(this.text, this.position.x, this.position.y);
    }

    remove() {
      allSprites.splice(allSprites.indexOf(this), 1);
    }
  }
};
  
// wrap with NextReactP5Wrapper
function Fireworks() {
  return (
      <NextReactP5Wrapper sketch={sketch} />
  );
}

export default Fireworks;