import { useEffect, useState, useRef } from "react";
import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { recipes } from "./culinaryRecipes";

const CulinaryGame = (props) => {
  const appRef = useRef(null);
  const [page, setPage] = useState(0);
  const [menuSprites, setMenuSprites] = useState([]);
  const [app, setApp] = useState(null);
  const [world, setWorld] = useState(null);

  // btw call props.setGameOver(true) when game over

  const createMenuBase = () => {
    if (!app) {
      return;
    }

    // make the arrows to switch pages
    const texture = PIXI.Texture.from("/eee.png");
    const next = new PIXI.Sprite(texture);
    next.scale.set(0.3);
    next.anchor.set(0.5, 0.5);
    next.x = 30;
    next.y = 50 + 8 * 60;
    next.eventMode = "static";
    next.cursor = "pointer";
    next.on("pointerdown", changePage, {
      next: true,
      totalPages: Math.ceil(recipes.length / 8),
      setPage: page,
    });
    app.stage.addChild(next);
  
    const prev = new PIXI.Sprite(texture);
    prev.scale.set(0.3);
    prev.anchor.set(0.5, 0.5);
    prev.x = 70;
    prev.y = 50 + 8 * 60;
    prev.eventMode = "static";
    prev.cursor = "pointer";
    prev.on("pointerdown", changePage, {
      next: false,
      totalPages: Math.ceil(recipes.length / 8),
      setPage: page,
    });
    app.stage.addChild(prev);
  };

  const showMenu = (page) => {
    if (!app) {
      return;
    }

    const start = page * 8;
    const newSprites = [];
    for (let i = start; i < start + 8; i++) {
      if (i >= recipes.length) break;
      const ingredient = recipes[i];
      const sprite = makeIngredient(ingredient.image, { index: i - start });
      sprite.on('pointerdown', () => onClick(ingredient, i - start));
      app.stage.addChild(sprite);
      newSprites.push(sprite);
    }
    setMenuSprites(newSprites);
  };

  // Load texture and create sprite
  const makeIngredient = (image, options = {}) => {
    const texture = PIXI.Texture.from(image);
    const sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1);
    sprite.anchor.set(0.5, 0.5);
    sprite.x = options.x || 50;
    sprite.y = options.y || 50 + (options.index || 0) * 60;
    sprite.eventMode = "static";
    sprite.buttonMode = true;
    return sprite;
  };

  const changePage = (next) => {
    setPage((prevPage) => {
      const totalPages = Math.ceil(recipes.length / 8);
      return next ? (prevPage + 1) % totalPages : (prevPage - 1 + totalPages) % totalPages;
    });
  };

  const createMatterIngredient = (x, y, image) => {
    if (!app || !world) {
      return;
    }

    const sprite = makeIngredient(image, { x, y });
    const body = Matter.Bodies.rectangle(x, y, sprite.width, sprite.height, {
      restitution: 0.8,
    });

    Matter.Composite.add(world, body);

    app.stage.addChild(sprite);
    app.ticker.add(() => {
      sprite.x = body.position.x;
      sprite.y = body.position.y;
      sprite.rotation = body.angle;
    });
  };

  const onClick = (ingredient, index) => {
    // this will summon the ingredient that can be dragged into the pot -
    // new sprite with matter object attached to it
    // can trash the object by
    console.log(ingredient.element);
    createMatterIngredient(400, 300, ingredient.image);
  };

  // initialize PIXI app
  useEffect(() => {
    const pixiApp = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });
    appRef.current = pixiApp.view;
    document.body.appendChild(pixiApp.view);

    const engine = Matter.Engine.create();
    const matterWorld = engine.world;

    const ground = Matter.Bodies.rectangle(400, 580, 810, 40, { isStatic: true });
    Matter.Composite.add(matterWorld, ground);

    // mouse constraint to add mouse interaction
    const mouse = Matter.Mouse.create(pixiApp.view);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        render: { visible: false },
        stiffness: 0.2,
      },
    });
    Matter.Composite.add(matterWorld, mouseConstraint);

    Matter.Runner.run(engine);

    setApp(pixiApp);
    setWorld(matterWorld);

    return () => {
      Matter.Engine.clear(engine);
      pixiApp.destroy(true, true);
    };
  }, []);

  // show menus once app is initialized
  useEffect(() => {
    createMenuBase();
    showMenu(page);
  }, [app]);

  // update menu sprites when page changes
  useEffect(() => {
    if (menuSprites.length > 0) {
      menuSprites.forEach(sprite => {
        app.stage.removeChild(sprite);
        sprite.destroy();
      });
    }

    showMenu(page);
  }, [page]);

  return null;
};

export default CulinaryGame;
