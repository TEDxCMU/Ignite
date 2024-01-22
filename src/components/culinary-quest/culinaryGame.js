import { useEffect } from "react";
import * as PIXI from "pixi.js";
import Matter from "matter-js";

// creates clickable ingredients
const createMenu = (app) => {
  const texture1 = PIXI.Texture.from("/element1.png");
  const texture2 = PIXI.Texture.from("/element2.png");
  const texture1sq = PIXI.Texture.from("/element1squared.png");
  const texture2sq = PIXI.Texture.from("/element2squared.png");
  const texture3 = PIXI.Texture.from("/element3.png");

  const sprite1 = new PIXI.Sprite(texture1);
  const sprite2 = new PIXI.Sprite(texture2);
  const sprite1sq = new PIXI.Sprite(texture1sq);
  const sprite2sq = new PIXI.Sprite(texture2sq);
  const sprite3 = new PIXI.Sprite(texture3);

  sprite1.anchor.set(0.05);
  sprite1.scale.x *= 0.2;
  sprite1.scale.y *= 0.2;

  sprite1.eventMode = "static";
  sprite1.cursor = "pointer";

  sprite1.on("pointerdown", onClick, sprite1);

  app.stage.addChild(sprite1);
};

function onClick() {
  this.scale.x *= 1.25;
  this.scale.y *= 1.25;
}

const CulinaryGame = () => {
  useEffect(() => {
    // define the game logic here in regular pixijs and matterjs code

    // set up pixi application
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });
    document.body.appendChild(app.view);

    // set up matterjs world
    const engine = Matter.Engine.create();
    const world = engine.world;

    const ground = Matter.Bodies.rectangle(400, 600, 810, 60, {
      isStatic: true,
    });
    Matter.World.add(world, ground);

    createMenu(app);

    // mouse constraint to add mouse interaction
    const mouse = Matter.Mouse.create(app.view);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        render: { visible: false },
        stiffness: 0.2,
      },
    });
    Matter.World.add(world, mouseConstraint);

    Matter.Runner.run(engine);

    return () => {
      Matter.Engine.clear(engine);
      document.body.removeChild(app.view);
    };
  }, []);
};

export default CulinaryGame;
