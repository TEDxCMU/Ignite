import React from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import styles from "../game.module.css"
import Matter from "matter-js";
import { Howl, Howler } from "howler";
  
// wrap with NextReactP5Wrapper
function Fireworks(props) {

  // define your sketch here
const sketch = (p5) => {
  let spr;
  let k = "";
  let timer = 0;
  let score = 0;
  let currTyping = false;
  let curr;
  let buf = 2000;
  let num = 0;
  let lvl = 1;
  let sfx1 = new Howl({ src: ['/sounds/firework.mp3'], volume: 0.1});
  let sfx2 = new Howl({ src: ['/sounds/sfx2.wav'], volume: 0.1});
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
    "Illuminate",
    "Fervent",
  "Cinder",
  "Bonfire",
  "Pyromania",
  "Burning",
  "Combustion",
  "Enkindle",
  "Singe",
  "Flambeau",
  "Volcano",
  "Emblaze",
  "Scald",
  "Sparkle",
  "Radiant",
  "Fuel",
  "Wildfire",
  "Consume",
  "Embroil",
  "Sear",
  "Explosion",
  "Conflagrant",
  "Fireshow",
  "Erupt",
  "Flamboyant",
  ];
  let allSprites = [];
  let allAmmo = [];
  let exploded = [];
  let img;
  let fire;
  let bg;
  let ex;
  let a;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  p5.preload = () => {
    img = p5.loadImage('/imgs/bubble.png');
    ex = p5.loadImage('/imgs/firework2.gif');
    fire = p5.loadImage('/imgs/fire.png');
  }

  p5.setup = () => {
    bg = p5.loadImage('/imgs/fajrbackground.png');
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
    if (props.gameOver) {
      p5.noLoop();
    }
    p5.background(bg);
    p5.fill("white");
    p5.textSize(25);
    p5.text("Score: " + score, 15, 25);
    p5.text("Level " + lvl, 15, 55);
    if (p5.millis() >= buf+timer) {
      spr = new Sprite(getRandomInt(100, 760), 500, 40, 40);
      spr.shapeColor = p5.color(255);
      spr.velocity.y = -2;
      spr.text = arr[getRandomInt(0, 49)].toLowerCase();
      spr.textSize = 20;
      allSprites.push(spr);
      timer = p5.millis();
      num += 1;
      if(num == 10){
        lvl += 1;
        buf *= (3/4);
        num = 0;
        playSoundEffect(sfx2);
      }
    }
    for (let i = 0; i < allSprites.length; i++) {
      allSprites[i].update();
      allSprites[i].draw();
      if (allSprites[i].position.y < 0) {
        props.setGameOver(true);
        props.setSubmittedScore(score);
        p5.noLoop();
        p5.fill("red");
        p5.textSize(50);
        p5.text("Game Over", 280, 300);
      }
    }
    for(let i = 0; i < allAmmo.length; i++){
      allAmmo[i].draw();
      allAmmo[i].update();
    }
    for(let i = 0; i < exploded.length; i++){
      exploded[i].draw();
      exploded[i].update();
    }

  }

  p5.keyTyped = () => {
    //contents = contents + key;
    k = p5.key;
    if(currTyping){
      if(k == curr.text[0]){
        curr.text = curr.text.substring(1);
        score += 4;
        a = new Ammo(curr);
        allAmmo.push(a);
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
          score += 4;
          a = new Ammo(allSprites[i]);
          allAmmo.push(a);
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

      this.shapeColor = p5.color(100);
      this.velocity = {
        x: 0,
        y: 0
      };
      this.text = "";
      this.textSize = 20;
      this.img = img;
      this.time = 0;
    }

    update() {
      if(allSprites.includes(this)){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
      }else{
        this.img = ex;
        this.w = 120;
        this.h = 120;
        if(p5.millis() - this.time > 1000){
          exploded.splice(exploded.indexOf(this), 1);
        }
      }
      
    }

    draw() {
      p5.fill('rgba(0,255,0, 0)');
      p5.noStroke()
      p5.rect(this.position.x, this.position.y, this.w, this.h);
      p5.fill("white");
      p5.image(this.img, this.position.x, this.position.y, this.w, this.h)
      p5.textSize(this.textSize);
      p5.text(this.text, this.position.x, this.position.y);
    }

    remove() {
      this.img = ex;
      this.time = p5.millis();
      exploded = exploded.concat(allSprites.splice(allSprites.indexOf(this), 1));
      this.position.x -= 10;
      this.position.y -= 10;
      playSoundEffect(sfx1);
    }
  }
  class Ammo {
    constructor(spr) {
      this.position = {
        x: 400,
        y: 590
      };
      this.count = 0;
      this.dx = spr.position.x - this.position.x;
      this.dy = spr.position.y - this.position.y;
      this.shapeColor = p5.color(100);
      this.velocity = {
        x: this.dx/10,
        y: this.dy/10 - 5
      };
      this.img = fire;
      this.time = 0;
      this.w = 40;
      this.h = 40;
    }
  
    update() {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.count += 1;
      for(let i = 0; i < allAmmo.length; i++){
        if (allAmmo[i].count >= 10){
          allAmmo.splice(i, 1);
        }
      }
    }
  
    draw() {
      p5.fill('rgba(0,255,0, 0)');
      p5.noStroke()
      p5.rect(this.position.x, this.position.y, this.w, this.h);
      p5.image(this.img, this.position.x, this.position.y, this.w, this.h)
    }
  
  }
};



let playSoundEffect = (sfx) => {
  sfx.play();
}

  return (
      <NextReactP5Wrapper sketch={sketch} />
  );
}

export default Fireworks;