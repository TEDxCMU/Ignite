import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import Matter from 'matter-js';

const createSprite = (t, x, y, w, h, scale, world, app) => {
  const texture = PIXI.Texture.from(t);
  const sprite = new PIXI.Sprite(texture);
  sprite.anchor.set(0.5);
  sprite.x = x;
  sprite.y = y;
  sprite.scale.set(scale);

  // add physics body
  const body = Matter.Bodies.rectangle(x, y, w, h, {
    restitution: 0.8,
  });
  Matter.World.add(world, body);

  app.stage.addChild(sprite);
  app.ticker.add(() => {
    sprite.x = body.position.x;
    sprite.y = body.position.y;
    sprite.rotation = body.angle;
  });

  return [sprite, body];
}

const DragDrop2DGame = () => {

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

    const ground = Matter.Bodies.rectangle(400, 600, 810, 60, { isStatic: true });
    Matter.World.add(world, ground);

    for (let i = 0; i < 10; i++) {
      createSprite('/eee.png', 400, 300, 50, 50, 0.5, world, app);
    }
    
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

  return null; // pixi handles the rendering
};

export default DragDrop2DGame;