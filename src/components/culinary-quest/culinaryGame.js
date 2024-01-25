import { useEffect } from "react";
import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { recipes } from "./culinaryRecipes";

// creates clickable ingredients
const showMenu = (app) => {
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const texture = PIXI.Texture.from(recipe.image);
    const sprite = new PIXI.Sprite(texture);
    sprite.scale.x *= 0.1;
    sprite.scale.y *= 0.1;
    sprite.anchor.set(0.5, 0.5);
    sprite.x = 50;
    sprite.y = 50 + i * 60;

    sprite.eventMode = "static";
    sprite.cursor = "pointer";

    sprite.on("pointerdown", onClick, {
      sprite: sprite,
      element: recipe.element,
    });
    app.stage.addChild(sprite);
  }
};

function onClick() {
  // this will summon the ingredient that can be dragged into the pot -
  // new sprite with matter object attached to it
  // can trash the object by
  console.log(this.element);
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

    showMenu(app);

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
