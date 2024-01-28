import * as Matter from 'matter-js';

const sketch = (p5) => {

    var Engine = Matter.Engine,
    //    Render = Matter.Render,
    World = Matter.World; 

    let instructions = 
    [
    ["Fire Bear can run over fire, but not over water", false, [100, 550]], 
    ["Press Up Arrow to jump", false, [500, 550]],
    ["Double press to jump higher!", false, [550, 450]],
    ["Hit the lever to move the ramp down", false, [100, 450]], 
    ["Now try them both!", false, [550, 250]], 
    ["Push obstacles out of the way", false, [150, 150]], 
    ["Final Stretch!", false, [400, 75]], 
    ]; 

    //matter.js setup
    var engine = Matter.Engine.create();
    let world; 

    //player
    let player;
    let bear; 
    let sideBearL;
    let sideBearR;  
    let boulderImg; 
    let doorImg; 

    //player position
    let pos = [40,560]; 

    //board
    let grounds = []; 

    //obstacles
    let waters = []; 
    let waterId = []; 

    let fires = []; 
    let ramps = []; 

    let levers = []; 
    let leverId = []; 

    let boulders = []; 

    let doors = []; 
    let doorId = []; 

    let front = true; 
    let left = false; 
    let right = false; 

    let gameOne = true; 
    let gameTwo = false; 

    let endGame = false; 

    //updating position of player
    const updatePhysicsCirclePosition = (physicsCircle, x, y) => {
        Matter.Body.setPosition(physicsCircle.body, { x, y });
      };


    //creating board boundaries
    const createBoundary = (x, y, w, h, t) => {
        const body = Matter.Bodies.rectangle(x, y, w, h, { isStatic: true });
        Matter.World.add(world, body);
        if (t == "w")
        {
            waterId.push(body.id); 
        }

        if (t == "l")
        {
            leverId.push([body.id, true]); 
        }

        if (t == "d")
        {
            doorId.push(body.id); 
        }

        return { body, w, h };
      };


    //creating circle (player)
    const createCircle = (x, y, radius) => {
        const body = Matter.Bodies.circle(x, y, radius);
        Matter.World.add(world, body);
        return { body, radius };
    };


    //creating circle (player)
    const createBoulder = (x, y, w, h) => {
        const body = Matter.Bodies.rectangle(x, y, w, h);
        Matter.World.add(world, body);
        return { body, w, h };
    };  


    //showing boundaries and walls 
    const showBoundary = (type, boundary) => {
        let pos = boundary.body.position;
        let angle = boundary.body.angle;
  
        if (type === "g")
        {
            p5.fill(128, 128, 51);
        }

        if (type === "w")
        {
            p5.fill(0, 0, 255);
        }

        if (type === "f")
        {
            p5.fill(255, 0, 0); 
        }

        if (type === "r" || type ==="l")
        {
            p5.fill(249, 166, 2); 
        }

        if (type === "b")
        {
            p5.fill(128, 128, 128); 
        }

        if (type === "d")
        {
            p5.fill(0, 255, 0); 
        }

        p5.push();
        p5.translate(pos.x, pos.y);
        p5.rotate(angle);
        p5.rectMode(p5.CENTER);
        p5.noStroke();
        p5.rect(0, 0, boundary.w, boundary.h);
        p5.pop();
    };


    //showing player
    const showCircle = (circle, img) => {
        // p5.fill(255, 0, 0); // Set fill color
        p5.noFill()
        p5.noStroke(); // No outline
        p5.ellipse(circle.body.position.x, circle.body.position.y, circle.radius * 2);

        // Draw the image within the circular boundary
        p5.imageMode(p5.CENTER);
        p5.image(img, circle.body.position.x, circle.body.position.y, circle.radius * 2, circle.radius * 2);
      };

    const showObstacles = (t, rectangle, img) => {
        p5.noFill()
        p5.noStroke(); // No outline
        p5.rect(rectangle.body.position.x - rectangle.width / 2, rectangle.body.position.y - rectangle.height / 2, rectangle.width, rectangle.height);

        // Draw the image within the rectangular boundary
        p5.imageMode(p5.CENTER);
        p5.image(img, rectangle.body.position.x, rectangle.body.position.y, rectangle.width, rectangle.height);
    }


    //setting up physics and world
    const setupPhysics = () => {
        engine = Matter.Engine.create();
        world = engine.world;

        Matter.World.add(world, grounds);
    };

    const lowerRamp = (j) => {
        let ramp = ramps[j];
        let dx = ramp.body.position.x; 
        let dy = ramp.body.position.y + 85;
        console.log("lower", dx, dy) 
        Matter.Body.setPosition(ramp.body, {x: dx, y: dy });
    };


    //applying force on object when jumping
    const applyJumpForce = (player) => {
        // Apply an upward force to the circular body
        const force = { x: 0, y: -0.017 }; // Adjust the force as needed
        Matter.Body.applyForce(player.body, player.body.position, force);
      };

       
    //handles any collisions that may happen
    const handleCollision = (event) => {
        const pairs = event.pairs;
  
        for (let i = 0; i < pairs.length; i++) {
          const bodyA = pairs[i].bodyA;
  
          // Check if the colliding bodies are boxes
          // TODO: Change to not hardcoding ids

          for (let j = 0; j < leverId.length; j++)
          {
            if (leverId[j][0] == bodyA.id && leverId[j][1])
            {
                console.log("lever activated"); 
                lowerRamp(j); 
                leverId[j][1] = false; 
            }
          }

          if (waterId.includes(bodyA.id)) {
            // Perform actions when boxes collide
            gameOver(); 
            console.log('Collision between two boxes!');
          }

          if (doorId.includes(bodyA.id)) {
            // Perform actions when boxes collide
            if (gameOne)
            {
                gameOne = false; 
                gameTwo = true; 

                createBoardTwo(); 
            }
          }
        }
      };


    const clearBoard = () => {

        console.log(world); 
        
        for (let d of doors){
            Matter.World.remove(world, d);
        }

        for (let r of ramps){
            Matter.World.remove(world, r);
        }

        for (let b of boulders){
            Matter.World.remove(world, b); 
        }

        for (let g of grounds){
            Matter.World.remove(world, g); 
        }

        for (let l of levers){
            Matter.World.remove(world, l); 
        }

        for (let f of fires){
            Matter.World.remove(world, f); 
        }

        for (let w of waters){
            Matter.World.remove(world, w); 
        }
    }


    //creating the first board
    const createBoardOne = () => {

        grounds.push(createBoundary(0, p5.height / 2, 40, p5.height));
        grounds.push(createBoundary(p5.width, p5.height / 2, 40, p5.height));
        grounds.push(createBoundary(p5.width/2, 0, p5.width, 40));
        grounds.push(createBoundary(p5.width/2, p5.height, p5.width, 40));

        for (let i = 0; i < 30; i++) {

            if (i == 3)
            {
                doors.push(createBoundary(p5.width/12, i * 20, 40, 60, "d")); 
            }

            if (i == 10)
            {
                ramps.push(createBoundary(p5.width/10, i * 20, 120, 10, "r"));
            }

            if (i == 7)
            {
                boulders.push(createBoulder(p5.width/2, i * 20, 25, 25));
            }

            if (i == 9)
            {
                grounds.push(createBoundary(p5.width/2, i * 20, 80, 20, "g"));
                grounds.push(createBoundary(520, i * 20, 80, 20, "g"));
            }

            if (i == 14)
            {
                levers.push(createBoundary(200, (i+0.25) * 20, 5, 10, "l"));
            }

            if (i == 15)
            {
                fires.push(createBoundary(540, (i-0.25) * 20, 50, 10, "f"));
                waters.push(createBoundary(380, (i-0.25) * 20, 50, 10, "w"));
            }

            if (i == 20)
            {
                ramps.push(createBoundary(p5.width/10, i * 20, 120, 10, "r"));
            }

            if (i == 24)
            {
                levers.push(createBoundary(200, (i+0.25) * 20, 5, 10, "l"));
            }

            if (i==29)
            {
                waters.push(createBoundary(500, (i+0.25) * 20, 50, 10, "w"));
                fires.push(createBoundary(350, (i+0.25) * 20, 50, 10, "f"));
                doors.push(createBoundary(p5.width/3, i * 20, 40, 60, "d")); 
            }

            // Populate the row with zeros
            for (let j = 0; j < 40; j++) {

                if (j%5 == 0)
                {                   
                    if (j%2 == 1)
                    {
                        grounds.push(createBoundary(p5.width/3, j * 20, p5.width, 20, "g"));
                    }

                    else
                    {
                        grounds.push(createBoundary((2*p5.width)/3, j * 20, p5.width, 20, "g"));
                        grounds.push(createBoundary(760, (j-1) * 20, 60, 60, "g"));
                    }
                   
                }
            }
        }
    }


    const createBoardTwo = () => {

        console.log("here")

        clearBoard(); 

        console.log("cleared")

        //empty arrays
        doors = [];     
        ramps = []; 
        boulders = []; 
        grounds = []; 
        levers = []; 
        fires = []; 
        waters = []; 

        grounds.push(createBoundary(0, p5.height / 2, 40, p5.height));
        grounds.push(createBoundary(p5.width, p5.height / 2, 40, p5.height));
        grounds.push(createBoundary(p5.width/2, 0, p5.width, 40));
        grounds.push(createBoundary(p5.width/2, p5.height, p5.width, 40));

        for (let i = 0; i < 30; i++) {

            if (i == 3)
            {
                doors.push(createBoundary(p5.width/12, i * 20, 40, 60, "d")); 
            }

            if (i == 9)
            {
                grounds.push(createBoundary(p5.width/2, i * 20, 80, 20, "g"));
                grounds.push(createBoundary(520, i * 20, 80, 20, "g"));
            }


            // Populate the row with zeros
            for (let j = 0; j < 40; j++) {

                if (j%5 == 0)
                {                   
                    if (j%2 == 1)
                    {
                        grounds.push(createBoundary(p5.width/3, j * 20, p5.width, 20, "g"));
                    }

                    else
                    {
                        grounds.push(createBoundary((2*p5.width)/3, j * 20, p5.width, 20, "g"));
                        grounds.push(createBoundary(760, (j-1) * 20, 60, 60, "g"));
                    }                  
                }
            }

            updatePhysicsCirclePosition(player, 40, 560); 
        }
    }


    const gameOver = () => {
        console.log("over"); 
        endGame = true; 
        updatePhysicsCirclePosition(player, 40, 560); 
    }


    p5.preload = () => {
        // Image is 50 x 50 pixels.
        bear = p5.loadImage('/Bear.png');
        sideBearL = p5.loadImage('/SBL.png');
        sideBearR = p5.loadImage('/SBR.png');
        boulderImg = p5.loadImage('/rock.png');
        doorImg = p5.loadImage('/door.png'); 
    };


    //setup function
    p5.setup = () => {
        p5.createCanvas(800,600); 
        engine = Engine.create();
        world = engine.world;

        setupPhysics();
        createBoardOne(); 
        player = createCircle(pos[0], pos[1], 20);

        // Set up collision events
        Matter.Events.on(engine, 'collisionStart', handleCollision);

    }


    //keypressed function
    p5.keyPressed = () => {
        let body = player.body.position
        let x = body.x 
        if (p5.keyCode === p5.LEFT_ARROW) {
            if (x-40 > 0)
            {
                // x-=40; 
                // updatePhysicsCirclePosition(player, x, y); 
                // pos[0] = x; 
                left = true; 
                front = false; 
                right = false; 
                const force = { x: -0.01, y: 0}
                Matter.Body.applyForce(player.body, player.body.position, force);
            }
        } else if (p5.keyCode === p5.RIGHT_ARROW) {
            if (x+40 < 780)
            {
                left = false; 
                front = false; 
                right = true; 
                const force = { x: 0.01, y: 0}
                Matter.Body.applyForce(player.body, player.body.position, force);
            }

        } else if (p5.keyCode === p5.UP_ARROW) {
            left = false; 
            front = true; 
            right = false; 
            applyJumpForce(player); 
        }
      }

  
    //draw function 
    p5.draw = () => {

        p5.background(64,64,40);

        Engine.update(engine);

        if (gameOne){

            for (let i = 0; i < instructions.length; i++)
            {
                let t = instructions[i][0]; 
                let x = instructions[i][2][0]; 
                let y = instructions[i][2][1]; 

                p5.fill(255); 
                p5.text(t, x, y); 
            }
        }

        for (let ground of grounds) {
            showBoundary("g", ground);
        }
    
        for (let water of waters) {
            showBoundary("w", water);
        }

        for (let fire of fires) {
            showBoundary("f", fire);
        }

        for (let ramp of ramps){
            showBoundary("r", ramp);
        }

        for (let lever of levers){
            showBoundary("l", lever);
        }

        for (let boulder of boulders){
            showObstacles("b", boulder, boulderImg);
        }

        for (let door of doors){
            showObstacles("d", door, doorImg);
        }   
        
        if (front)
        {
            showCircle(player, bear);
        }

        if (left)
        {
            showCircle(player, sideBearL);
        }

        if (right)
        {
            showCircle(player, sideBearR);
        }
      
    };
  };

export default sketch; 