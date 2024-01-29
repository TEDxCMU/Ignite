import { useEffect, useState, useRef } from "react";
import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { startingRecipes } from "./startingRecipes";
import { allRecipes } from "./allRecipes";

const CulinaryGame = (props) => {
  const [page, setPage] = useState(0);
  const [menuSprites, setMenuSprites] = useState([]);
  const [app, setApp] = useState(null);
  const [playerRecipes, setPlayerRecipes] = useState(startingRecipes);
  const [world, setWorld] = useState(null);
  const recipeMap = new Map();

  // initialize all the recipes into map so they can easily be checked
  for (let i = 0; i < allRecipes.length; i++) {
    const currRecipe = allRecipes[i];
    const key = `${currRecipe.element1}-${currRecipe.element2}`;
    recipeMap.set(key, currRecipe);
  }

  // btw call props.setGameOver(true) when game over

  const createMenuButtons = () => {
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
      totalPages: Math.ceil(playerRecipes.length / 8),
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
      totalPages: Math.ceil(playerRecipes.length / 8),
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
      if (i >= playerRecipes.length) break;
      const ingredient = playerRecipes[i];
      const sprite = createPixiIngredient(ingredient.image, {
        index: i - start,
      });
      sprite.on("pointerdown", () => onClick(ingredient));
      app.stage.addChild(sprite);
      newSprites.push(sprite);
    }
    setMenuSprites(newSprites);
  };

  // Load texture and create sprite
  const createPixiIngredient = (image, options = {}) => {
    const texture = PIXI.Texture.from(image);
    const sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1);
    sprite.anchor.set(0.5, 0.5);
    sprite.x = options.x || 50;
    sprite.y = options.y || 50 + (options.index || 0) * 60;
    sprite.eventMode = "static";
    sprite.cursor = "pointer";
    return sprite;
  };

  const changePage = (next) => {
    setPage((prevPage) => {
      const totalPages = Math.ceil(playerRecipes.length / 8);
      return next
        ? (prevPage + 1) % totalPages
        : (prevPage - 1 + totalPages) % totalPages;
    });
  };

  const createIngredient = (x, y, image, name) => {
    if (!app || !world) {
      return;
    }

    const sprite = createPixiIngredient(image, { x, y });
    const body = Matter.Bodies.rectangle(x, y, sprite.width, sprite.height, {
      restitution: 0.8,
      label: `ingredient-${name}`,
      isStatic: false,
    });

    body.pixiSprite = sprite;

    Matter.Composite.add(world, body);

    app.stage.addChild(sprite);
    app.ticker.add(() => {
      sprite.x = body.position.x;
      sprite.y = body.position.y;
      sprite.rotation = body.angle;
    });
  };

  const createIngredientWithAppWorld = (
    localApp,
    localWorld,
    x,
    y,
    image,
    name
  ) => {
    const sprite = createPixiIngredient(image, { x, y });
    const body = Matter.Bodies.rectangle(x, y, sprite.width, sprite.height, {
      restitution: 0.8,
      label: `ingredient-${name}`,
    });

    body.pixiSprite = sprite;

    Matter.Composite.add(localWorld, body);

    localApp.stage.addChild(sprite);
    localApp.ticker.add(() => {
      sprite.x = body.position.x;
      sprite.y = body.position.y;
      sprite.rotation = body.angle;
    });
  };

  const onClick = (ingredient) => {
    // this will summon the ingredient that can be dragged into the pot -
    // new sprite with matter object attached to it
    // can trash the object by
    createIngredient(400, 300, ingredient.image, ingredient.name);
  };

  const parseIngredients = (labelA, labelB) => {
    if (!labelA.startsWith("ingredient") || !labelB.startsWith("ingredient")) {
      return "";
    }
    const labelAParts = labelA.split("-");
    const labelBParts = labelB.split("-");
    const labelARes = labelAParts[labelAParts.length - 1];
    const labelBRes = labelBParts[labelBParts.length - 1];
    const labels = [labelARes, labelBRes];
    labels.sort();
    return `${labels[0]}-${labels[1]}`;
  };

  // Function to remove the Pixi.js sprite associated with the Matter.js body
  const removePixiSprite = (pixiApp, matterBody) => {
    // if (!app || !world) {
    //   return;
    // }

    // Retrieve the associated Pixi.js sprite
    const pixiSprite = matterBody.pixiSprite;

    // If the sprite is found, remove it from the Pixi.js stage
    if (pixiSprite) {
      pixiApp.stage.removeChild(pixiSprite);
    }
  };

  // initialize PIXI app
  useEffect(() => {
    const pixiApp = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });
    document.body.appendChild(pixiApp.view);

    const engine = Matter.Engine.create();
    const matterWorld = engine.world;

    const ground = Matter.Bodies.rectangle(400, 550, 810, 40, {
      isStatic: true,
    });
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

    // check for ingredient collisions
    Matter.Events.on(engine, "collisionStart", function (event) {
      // We know there was a collision so fetch involved elements ...
      var pairs = event.pairs;

      var objA = pairs[0].bodyA;
      var objB = pairs[0].bodyB;

      var objALabel = objA.label;
      var objBLabel = objB.label;

      if (
        objALabel.startsWith("ingredient") &&
        objBLabel.startsWith("ingredient")
      ) {
        // check if in the recipe list
        const recipeKey = parseIngredients(objALabel, objBLabel);
        const recipeVal = recipeMap.get(recipeKey);
        if (recipeVal != undefined) {
          // if it is, combine the elements
          // remove the old elements
          Matter.Composite.remove(engine.world, pairs[0].bodyA);
          removePixiSprite(pixiApp, pairs[0].bodyA);
          Matter.Composite.remove(engine.world, pairs[0].bodyB);
          removePixiSprite(pixiApp, pairs[0].bodyB);
          // add the new element
          // const tempGround = Matter.Bodies.rectangle(400, 500, 810, 40, {
          //   isStatic: true,
          // });
          // Matter.Composite.add(matterWorld, tempGround);
          createIngredientWithAppWorld(
            pixiApp,
            matterWorld,
            objA.position.x,
            objA.position.y - 150,
            recipeVal.image,
            recipeVal.name
          );
          // Matter.Composite.remove(matterWorld, tempGround);
          // update recipe list if not already in
          if (playerRecipes.indexOf(recipeKey) == -1) {
            setPlayerRecipes([...playerRecipes, recipeVal]);
          }
        }
      }
    });

    return () => {
      Matter.Engine.clear(engine);
      pixiApp.destroy(true, true);
    };
  }, []);

  // show menus once app is initialized
  useEffect(() => {
    createMenuButtons();
    showMenu(page);
  }, [app, playerRecipes]);

  // update menu sprites when page changes
  useEffect(() => {
    if (menuSprites.length > 0) {
      menuSprites.forEach((sprite) => {
        app.stage.removeChild(sprite);
        sprite.destroy();
      });
    }

    showMenu(page);
  }, [page]);

  return null;
};

export default CulinaryGame;
