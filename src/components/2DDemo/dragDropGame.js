import { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import Matter from 'matter-js';
import { AsciiFilter, BloomFilter } from 'pixi-filters';

const DragDrop2DGame = () => {

  const [app, setApp] = useState(null);
  const [world, setWorld] = useState(null);

  const screenShake = (shakeDuration, shakeMagnitude, app) => {
    app.ticker.add((delta) => {
      // ... (other update code)
    
      if (shakeDuration > 0) {
        shakeDuration -= delta;
    
        // Randomly change the x and y of the app.stage
        const shakeX = (Math.random() - 0.5) * shakeMagnitude;
        const shakeY = (Math.random() - 0.5) * shakeMagnitude;
    
        app.stage.x = shakeX;
        app.stage.y = shakeY;
    
        // Reduce the magnitude over time for a damping effect
        shakeMagnitude *= 0.9;
      } else {
        // Reset the stage position if the shake is over
        app.stage.x = 0;
        app.stage.y = 0;
        app.ticker.remove(this);
      }
    });
  }

  const createSparkAnimation = (x, y, app) => {
    const numberOfSparks = 10;
    const sparks = [];

    console.log("app", app)
  
    for (let i = 0; i < numberOfSparks; i++) {
      const spark = new PIXI.Graphics();
      spark.beginFill(0xFFFFFF); // white color
      spark.drawCircle(0, 0, 5); // draw a small circle
      spark.endFill();
  
      spark.x = x;
      spark.y = y;
      spark.alpha = 1;
      spark.scale.x = spark.scale.y = Math.random() * 0.5 + 0.5; // random size
      spark.direction = Math.random() * Math.PI * 2; // random direction
      spark.speed = Math.random() * 1 + 1; // random speed
  
      app.stage.addChild(spark);
      sparks.push(spark);
    }
  
    // Animate the sparks
    app.ticker.add(() => {
      for (let i = 0; i < sparks.length; i++) {
        const spark = sparks[i];
        spark.x += Math.cos(spark.direction) * spark.speed;
        spark.y += Math.sin(spark.direction) * spark.speed;
        spark.scale.x = spark.scale.y *= 0.95; // shrink
        spark.alpha -= 0.05; // fade out
  
        // Remove the spark once it's faded out
        if (spark.alpha <= 0) {
          app.stage.removeChild(spark);
          sparks.splice(i, 1);
          i--;
        }
      }
  
      // Stop the ticker if there are no sparks left
      if (sparks.length === 0) {
        app.ticker.remove(this);
      }
    });
  }  

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

  useEffect(() => {
    // define the game logic here in regular pixijs and matterjs code

    // set up pixi application
    const pixiApp = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });
    setApp(pixiApp);
    document.body.appendChild(pixiApp.view);
    pixiApp.stage.filters = [new AsciiFilter()];

    // set up matterjs world
    const engine = Matter.Engine.create();
    const matterWorld = engine.world;
    setWorld(matterWorld);

    const ground = Matter.Bodies.rectangle(400, 600, 810, 60, { isStatic: true });
    Matter.World.add(matterWorld, ground);

    for (let i = 0; i < 10; i++) {
      createSprite('/eee.png', 400, 300, 50, 50, 0.5, matterWorld, pixiApp);
    }
    
    // mouse constraint to add mouse interaction
    const mouse = Matter.Mouse.create(pixiApp.view);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        render: { visible: true },
        stiffness: 0.2,
      },
    });
    Matter.World.add(matterWorld, mouseConstraint);

    // effects on mouse down
    Matter.Events.on(mouseConstraint, 'mousedown', (event) => {
      createSparkAnimation(event.mouse.position.x, event.mouse.position.y, pixiApp);
    });

    // effects on collision
    Matter.Events.on(engine, 'collisionStart', (event) => {
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
        // can probably case on what's being collided here
        const pair = pairs[i];
        const posX = pair.bodyA.position.x + (pair.bodyB.position.x - pair.bodyA.position.x) / 2;
        const posY = pair.bodyA.position.y + (pair.bodyB.position.y - pair.bodyA.position.y) / 2;
        createSparkAnimation(posX, posY, pixiApp);
        screenShake(10, 10, pixiApp);
      }
    });

    Matter.Runner.run(engine);   

    return () => {
      Matter.Engine.clear(engine);
      document.body.removeChild(pixiApp.view);
    };
  }, []);

  return null; // pixi handles the rendering
};

export default DragDrop2DGame;