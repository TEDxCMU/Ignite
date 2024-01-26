import { useEffect, useState, useRef } from "react";
import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { recipes } from "./culinaryRecipes";

// creates clickable ingredients

const createMenuBase = (app, data) => {
  // make the arrows to switch pages
  const texture = PIXI.Texture.from("/eee.png");
  const next = new PIXI.Sprite(texture);
  next.scale.x *= 0.3;
  next.scale.y *= 0.3;
  next.anchor.set(0.5, 0.5);
  next.x = 30;
  next.y = 50 + 8 * 60;
  next.eventMode = "static";
  next.cursor = "pointer";
  next.on("pointerdown", changePage, {
    next: true,
    totalPages: data.totalPages,
    setPage: data.setPage,
  });
  app.stage.addChild(next);

  const prev = new PIXI.Sprite(texture);
  prev.scale.x *= 0.3;
  prev.scale.y *= 0.3;
  prev.anchor.set(0.5, 0.5);
  prev.x = 70;
  prev.y = 50 + 8 * 60;
  prev.eventMode = "static";
  prev.cursor = "pointer";
  prev.on("pointerdown", changePage, {
    next: false,
    totalPages: data.totalPages,
    setPage: data.setPage,
  });
  app.stage.addChild(prev);
};

const showMenu = (app, page) => {
  const start = page * 8;
  const sprites = [];
  for (let i = 0 + page * 8; i < start + 8; i++) {
    if (i >= recipes.length) {
      return;
    }
    const recipe = recipes[i];
    const texture = PIXI.Texture.from(recipe.image);
    const sprite = new PIXI.Sprite(texture);
    sprite.scale.x *= 0.1;
    sprite.scale.y *= 0.1;
    sprite.anchor.set(0.5, 0.5);
    sprite.x = 50;
    sprite.y = 50 + (i - start) * 60;

    sprite.eventMode = "static";
    sprite.cursor = "pointer";

    sprite.on("pointerdown", onClick, {
      sprite: sprite,
      element: recipe.element,
    });
    app.stage?.addChild(sprite);
    sprites.push(sprite);
  }
  console.log(sprites);
  return sprites;
};

function changePage() {
  this.setPage((prevPage) =>
    this.next
      ? (prevPage + 1) % this.totalPages
      : (prevPage - 1 + this.totalPages) % this.totalPages
  );
}

function onClick() {
  // this will summon the ingredient that can be dragged into the pot -
  // new sprite with matter object attached to it
  // can trash the object by
  console.log(this.element);
}

const CulinaryGame = () => {
  const appRef = useRef(null);
  const [page, setPage] = useState(0);
  const [menuSprites, setMenuSprites] = useState([]);

  useEffect(() => {
    // define the game logic here in regular pixijs and matterjs code

    // set up pixi application
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });
    appRef.current = app;
    document.body.appendChild(app.view);
    const data = {
      totalPages: Math.ceil(recipes.length / 8),
      setPage: setPage,
      setMenuSprites: setMenuSprites,
    };
    // set up matterjs world
    const engine = Matter.Engine.create();
    const world = engine.world;

    const ground = Matter.Bodies.rectangle(400, 600, 810, 60, {
      isStatic: true,
    });
    Matter.World.add(world, ground);

    createMenuBase(app, data);
    const newSprites = showMenu(app, page);
    setMenuSprites(newSprites);
    console.log("after set");
    console.log(menuSprites);

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

  useEffect(() => {
    console.log(page);
    // remove old sprites
    for (let i = 0; i < menuSprites.length; i++) {
      const curr = menuSprites[i];
      appRef.current?.stage.removeChild(curr);
    }
    // regenerate new sprites
    const newSprites = showMenu(appRef, page);
    console.log("new");
    console.log(newSprites);
    setMenuSprites(newSprites);
  }, [page]);
};

export default CulinaryGame;
