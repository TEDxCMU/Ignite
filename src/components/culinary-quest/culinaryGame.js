import { useEffect } from "react";
import * as PIXI from "pixi.js";
import Matter from "matter-js";

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
