import { useEffect, useState, useRef } from "react";
import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { startingRecipes } from "./startingRecipes";
import { allRecipes } from "./allRecipes";

const CulinaryGame = (props) => {
  const [page, setPage] = useState(0);
  const [menuSprites, setMenuSprites] = useState([]);
  const [app, setApp] = useState(null);
  const [score, setScore] = useState(0);
  const [playerRecipes, setPlayerRecipes] = useState([...startingRecipes]);
  const [world, setWorld] = useState(null);
  const recipeMap = new Map();

  const prevRecipesRef = useRef([...startingRecipes]);

  // initialize all the recipes into map so they can easily be checked
  for (let i = 0; i < allRecipes.length; i++) {
    const currRecipe = allRecipes[i];
    const key = `${currRecipe.element1}-${currRecipe.element2}`;
    recipeMap.set(key, currRecipe);
  }

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

    // make submit score button
    const submit = new PIXI.Sprite(texture);
    submit.scale.set(0.4);
    submit.anchor.set(0.5, 0.5);
    submit.x = 50;
    submit.y = 100 + 8 * 60;
    submit.eventMode = "static";
    submit.cursor = "pointer";
    submit.on("pointerdown", submitScore);
    app.stage.addChild(submit);
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
    sprite.scale.set(options.scale || 1.5);
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

  const submitScore = () => {
    console.log("Submitting Score:", score);
    console.log("Submitted Score:", score);
    props.setGameOver(true);
  };

  const createIngredient = (x, y, image, name) => {
    if (!app || !world) {
      return;
    }

    const sprite = createPixiIngredient(image, { x, y, scale: 3 });
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
    console.log(body);

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

  const parseIngredientName = (ingredient) => {
    if (!ingredient.startsWith("ingredient")) {
      return "";
    }
    const ingredientParts = ingredient.split("-");
    const ingredientRes = ingredientParts[ingredientParts.length - 1];
    return ingredientRes;
  };

  const getImageByName = (elementName) => {
    const recipe = allRecipes.find((recipe) => recipe.name === elementName);
    return recipe ? recipe.image : null;
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

  const closePopup = (pixiApp, base, a, b, c) => {
    console.log("close");
    pixiApp.stage.removeChild(base);
    pixiApp.stage.removeChild(a);
    pixiApp.stage.removeChild(b);
    pixiApp.stage.removeChild(c);
  };

  const makeNewRecipePopup = (
    pixiApp,
    ingredientA,
    ingredientB,
    ingredientC
  ) => {
    console.log(ingredientA, ingredientB);
    const aImage = getImageByName(ingredientA);
    const bImage = getImageByName(ingredientB);
    const cImage = getImageByName(ingredientC);

    // base texture
    const base = PIXI.Texture.from("/newRecipe.png");
    const sprite = new PIXI.Sprite(base);
    sprite.scale.set(0.3);
    sprite.anchor.set(0.5, 0.5);
    sprite.eventMode = "static";
    sprite.x = 420;
    sprite.y = 300;
    pixiApp.stage.addChild(sprite);
    sprite.cursor = "pointer";

    const a = PIXI.Texture.from(aImage);
    const spriteA = new PIXI.Sprite(a);
    spriteA.scale.set(1.5);
    spriteA.anchor.set(0.5, 0.5);
    spriteA.x = 270;
    spriteA.y = 320;
    spriteA.eventMode = "static";
    spriteA.cursor = "pointer";
    pixiApp.stage.addChild(spriteA);

    const b = PIXI.Texture.from(bImage);
    const spriteB = new PIXI.Sprite(b);
    spriteB.scale.set(1.5);
    spriteB.anchor.set(0.5, 0.5);
    spriteB.x = 430;
    spriteB.y = 320;
    spriteB.eventMode = "static";
    spriteB.cursor = "pointer";
    pixiApp.stage.addChild(spriteB);

    const c = PIXI.Texture.from(cImage);
    const spriteC = new PIXI.Sprite(c);
    spriteC.scale.set(1.5);
    spriteC.anchor.set(0.5, 0.5);
    spriteC.x = 570;
    spriteC.y = 320;
    spriteC.eventMode = "static";
    spriteC.cursor = "pointer";
    pixiApp.stage.addChild(spriteC);

    sprite.on("pointerdown", () =>
      closePopup(pixiApp, sprite, spriteA, spriteB, spriteC)
    );
    spriteA.on("pointerdown", () =>
      closePopup(pixiApp, sprite, spriteA, spriteB, spriteC)
    );
    spriteB.on("pointerdown", () =>
      closePopup(pixiApp, sprite, spriteA, spriteB, spriteC)
    );
    spriteC.on("pointerdown", () =>
      closePopup(pixiApp, sprite, spriteA, spriteB, spriteC)
    );
  };

  // initialize PIXI app
  useEffect(() => {
    const pixiApp = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });
    document.body.appendChild(pixiApp.view);
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    const renderOptions = {
      // Other options...
      showDebug: true,
    };

    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: document.body,
      engine: engine,
      options: renderOptions,
    });

    Matter.Render.run(render);
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
        if (recipeVal) {
          // if it is, combine the elements
          // remove the old elements
          Matter.Composite.remove(engine.world, pairs[0].bodyA);
          removePixiSprite(pixiApp, pairs[0].bodyA);
          Matter.Composite.remove(engine.world, pairs[0].bodyB);
          removePixiSprite(pixiApp, pairs[0].bodyB);
          // add the new element

          // update recipe list if not already in
          if (
            !prevRecipesRef.current.some(
              (recipe) => recipe.name === recipeVal.name
            )
          ) {
            console.log("Adding new recipe:", recipeVal.name);
            setPlayerRecipes((prevRecipes) => [...prevRecipes, recipeVal]);
            props.setSubmittedScore((prevScore) => prevScore + 1);
            prevRecipesRef.current = [...prevRecipesRef.current, recipeVal];
            // show a popup to indicate the new recipe was made
            const ingredientAName = parseIngredientName(objALabel);
            const ingredientBName = parseIngredientName(objBLabel);
            makeNewRecipePopup(
              pixiApp,
              ingredientAName,
              ingredientBName,
              recipeVal.name
            );
          } else {
            createIngredientWithAppWorld(
              pixiApp,
              matterWorld,
              objA.position.x,
              objA.position.y - 150,
              recipeVal.image,
              recipeVal.name
            );
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
  }, [app]);

  // update menu sprites when page changes
  useEffect(() => {
    setTimeout(() => {
      if (menuSprites.length > 0) {
        menuSprites.forEach((sprite) => {
          app.stage.removeChild(sprite);
          sprite.destroy();
        });
      }

      showMenu(page);
    }, 100);
  }, [page, playerRecipes]);

  useEffect(() => {
    console.log("Updated Score:", score);
    props.setSubmittedScore(score);
  }, [score, props.setSubmittedScore]);

  return null;
};

export default CulinaryGame;
