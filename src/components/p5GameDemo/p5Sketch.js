import React from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import Matter from "matter-js";

// define your sketch here
const sketch = (p5) => {

  let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

  let engine;
  let world;
  let boxes = [];
  let collisions = [];
  let ground;
  let mConstraint;
  let shakeIntensity = 10;
  let shakeDuration = 0;

  let seaBg;
  let midBg;
  let bubbleImg;

  let graphics;
  let vignetteShader;
  let vignetteShaderTexture;
  let particlesShader;
  let particlesShaderTexture;

  p5.preload = () => {
    // preload assets
    seaBg = p5.loadImage('/imgs/sea_background.png');
    midBg = p5.loadImage('/imgs/mid_background.png');
    bubbleImg = p5.loadImage('/imgs/bubble.png');

    vignetteShader = p5.loadShader('/shaders/base.vert', '/shaders/vignette.frag');
    particlesShader = p5.loadShader('/shaders/base.vert', '/shaders/glowingParticles.frag');
  }

  // setup function
  p5.setup = () => {
    p5.createCanvas(800, 600, p5.WEBGL);
    graphics = p5.createGraphics(800, 600, p5.WEBGL);
    vignetteShaderTexture = p5.createGraphics(800, 600, p5.WEBGL);
    particlesShaderTexture = p5.createGraphics(800, 600, p5.WEBGL);

    engine = Engine.create();
    world = engine.world;
    Matter.Runner.run(engine);

    // Create ground (static)
    ground = Bodies.rectangle(400, p5.height - 30, 810, 60, { isStatic: true });
    World.add(world, ground);

    // Add mouse control
    let canvasmouse = Mouse.create(p5.canvas.elt);
    canvasmouse.pixelRatio = p5.pixelDensity();
    let options = {
        mouse: canvasmouse
    }

    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);

    // collision event
    Matter.Events.on(engine, 'collisionStart', (event) => {
      let pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
        let bodyA = pairs[i].bodyA;
        let bodyB = pairs[i].bodyB;
    
        if ((bodyA === ground && bodyB.label === 'box') || (bodyB === ground && bodyA.label === 'box')) {
          let collisionPosition = bodyA === ground ? bodyB.position : bodyA.position;
          p5.print(collisionPosition);
          collisions.push({ position: collisionPosition, startTime: p5.millis() });
          triggerShake(10);
        }
      }
    });    
  }

  p5.mousePressed = () => {
    let mousePos = p5.createVector(p5.mouseX, p5.mouseY);
    
    for (let box of boxes) {
      if (mousePos.x > box.body.position.x - box.w / 2 &&
          mousePos.x < box.body.position.x + box.w / 2 &&
          mousePos.y > box.body.position.y - box.h / 2 &&
          mousePos.y < box.body.position.y + box.h / 2) {
        // If true, the mouse is on a box, so set isDragging to true and don't create a new box
        return; // Exit the function early
      }
    }

    let boxSize = p5.random(10, 40);
    boxes.push(new AnimatedSprite(mousePos.x, mousePos.y, boxSize, boxSize, bubbleImg));
  }

  p5.draw = () => {

    p5.translate(-p5.width / 2, -p5.height / 2);
    p5.background(0);

    // shaders
    addShaderImageBg(seaBg);
    addShaderImageBg(midBg);
    addVignette();
    addGlowingParticles();
    
    p5.texture(particlesShaderTexture);
    p5.rect(p5.width/2, p5.height/2, p5.width, p5.height);

    if (shakeDuration > 0) {
      const shakeX = p5.random(-shakeIntensity, shakeIntensity);
      const shakeY = p5.random(-shakeIntensity, shakeIntensity);
      p5.translate(shakeX, shakeY);
      shakeDuration--;
    }

    for (let i = collisions.length - 1; i >= 0; i--) {
      const collision = collisions[i];
      const timeElapsed = p5.millis() - collision.startTime;
      renderCircleAnimation(collision.position, timeElapsed);
      renderSparkAnimation(collision.position, timeElapsed);
  
      if (timeElapsed > 500) { // assuming the animation lasts 500 milliseconds
        collisions.splice(i, 1); // remove the collision from the array
      }
    }

    for (let box of boxes) {
        box.show();
    }

    p5.fill(10, 20, 50);
    p5.stroke(255);
    p5.rectMode(p5.CENTER);
    p5.rect(ground.position.x, ground.position.y, 810, 60);

    if (mConstraint.body) {
        let pos = mConstraint.body.position;
        let offset = mConstraint.constraint.pointB;
        let m = mConstraint.mouse.position;
        p5.stroke(0, 255, 0);
        p5.line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
    }
  }

  let triggerShake = (duration) => {
    shakeDuration = duration;
  }

  let renderCircleAnimation = (position, timeElapsed) => {
    const animationDuration = 500; // duration of the animation in milliseconds
    const animationSize = p5.map(timeElapsed, 0, animationDuration, 0, 100); // animate from size 0 to 100
    
    if (timeElapsed < animationDuration) {
      p5.push();
      p5.translate(position.x, position.y);
      p5.noFill();
      p5.strokeWeight(p5.random(1, 5));
      p5.stroke(255, 255, 255, p5.map(timeElapsed, 0, animationDuration, 255, 0));
      p5.ellipse(0, 0, animationSize);
      p5.pop();
    }
  }

  let renderSparkAnimation = (position, timeElapsed) => {
    const animationDuration = 300; // duration of the animation in milliseconds
    const numSparks = 4; // number of sparks
    const maxSparkLength = p5.random(0, 200); // maximum length of the sparks
    
    for (let i = 0; i < numSparks; i++) {
      const angle = (i / numSparks) * p5.TWO_PI; // angle for this spark
      const sparkLength = p5.map(timeElapsed, 0, animationDuration, 0, maxSparkLength); // length of the spark decreases over time
  
      // Calculate the spark's end position based on its angle and length
      const endX = position.x + sparkLength * p5.cos(angle);
      const endY = position.y + sparkLength * p5.sin(angle);
  
      // Set the stroke weight and color of the sparks
      p5.strokeWeight(2);
      p5.stroke(255, 255, 255, p5.map(timeElapsed, 0, animationDuration, 255, 0)); // spark color
  
      // Draw the spark as a line from the collision center to the end position
      p5.line(position.x, position.y, endX, endY);
    }
  }

  let addShaderImageBg = (shaderImage) => {
    graphics.push();
    graphics.scale(1, -1);
    graphics.image(shaderImage, -p5.width / 2, -p5.height / 2, p5.width, p5.height);
    // graphics.image(midBg, -p5.width / 2, -p5.height / 2, p5.width, p5.height);
    graphics.pop();
  }

  let addShaderTexture = (shaderTexture) => {
    graphics.push();
    graphics.scale(1, -1);
    graphics.texture(shaderTexture);
    graphics.rect(-p5.width / 2, -p5.height / 2, p5.width, p5.height);
    graphics.pop();

    return shaderTexture;
  }

  let addVignette = () => {
    vignetteShaderTexture.shader(vignetteShader);
    vignetteShader.setUniform('textureID', graphics);
    vignetteShader.setUniform('resolution', [p5.width, p5.height]);
    vignetteShader.setUniform('vignetteAmount', 1.0);
    vignetteShaderTexture.rect(-p5.width / 2, -p5.height / 2, p5.width, p5.height);
    addShaderTexture(vignetteShaderTexture);
  }

  let addGlowingParticles = () => {
    particlesShaderTexture.shader(particlesShader);
    particlesShader.setUniform('textureID', graphics);
    particlesShader.setUniform('resolution', [p5.width, p5.height]);
    particlesShader.setUniform('time', p5.millis() / 1000);
    particlesShaderTexture.rect(-p5.width / 2, -p5.height / 2, p5.width, p5.height);
    addShaderTexture(particlesShaderTexture);
  }

  class AnimatedSprite {
    constructor(x, y, w, h, img) {
        let options = {
            friction: 0.3,
            restitution: 0.9,
            label: 'box'
        }
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        this.img = img;
        World.add(world, this.body);

        // for animation
        this.baseSize = 1.0; // Base scale size
        this.sizeVariance = 0.1; // How much the sprite should grow/shrink
        this.animationSpeed = 0.1; // Speed of size change
        this.sizeChange = 0; // A value to oscillate the size
        this.numSteps = 2; // Number of discrete steps in size change
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;

        let stepSize = p5.TWO_PI / this.numSteps;
        let discreteStep = p5.round(this.sizeChange / stepSize) * stepSize;
        let currentSize = this.baseSize + this.sizeVariance * p5.cos(discreteStep);

        p5.push();
        p5.translate(pos.x, pos.y);
        p5.rotate(angle);
        p5.rectMode(p5.CENTER);
        p5.image(this.img, -this.w / 2, -this.h / 2, this.w, this.h * currentSize);
        p5.pop();

        this.sizeChange += this.animationSpeed;
    }
  }

}

// wrap with NextReactP5Wrapper
function P5Sketch() {
  return (
      <NextReactP5Wrapper sketch={sketch} />
  );
}

export default P5Sketch;