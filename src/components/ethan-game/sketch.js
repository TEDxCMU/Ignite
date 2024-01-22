import * as Matter from 'matter-js';

const sketch = (p5) => {

    var Engine = Matter.Engine,
    //    Render = Matter.Render,
    World = Matter.World,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies;

    let engine;
    let world;

    //board
    let background = []; 
    let grounds = []; 
    let player = [];

    //player position
    let pos = [40,60]; 

    let timerStart = false; 

    const updatePhysics = () => {
        Matter.Engine.update(world, deltaTime);
      };

    const updatePhysicsCirclePosition = (physicsCircle, x, y) => {
        Matter.Body.setPosition(physicsCircle.body, { x, y });
      };

    const createBoundary = (x, y, w, h) => {
        const body = Matter.Bodies.rectangle(x, y, w, h, { isStatic: true });
        Matter.World.add(world, body);
        return { body, w, h };
      };

    const createCircle = (x, y, radius) => {
        const body = Matter.Bodies.circle(x, y, radius);
        Matter.World.add(world, body);
        return { body, radius };
    };


    const showBoundary = (boundary) => {
        let pos = boundary.body.position;
        let angle = boundary.body.angle;
  
        p5.push();
        p5.translate(pos.x, pos.y);
        p5.rotate(angle);
        p5.rectMode(p5.CENTER);
        p5.noStroke();
        p5.fill(128, 128, 51);
        p5.rect(0, 0, boundary.w, boundary.h);
        p5.pop();
    };

    const showCircle = (circle) => {
        p5.fill(255, 0, 0); // Set fill color
        p5.noStroke(); // No outline
        p5.ellipse(circle.body.position.x, circle.body.position.y, circle.radius * 2);
      };

    const setupPhysics = () => {
        engine = Matter.Engine.create();
        world = engine.world;
        grounds.push(createBoundary(0, p5.height / 2, 40, p5.height));
        grounds.push(createBoundary(p5.width, p5.height / 2, 40, p5.height));
        grounds.push(createBoundary(p5.width/2, 0, p5.width, 40));
        grounds.push(createBoundary(p5.width/2, p5.height, p5.width, 40));

        Matter.World.add(world, grounds);
    };

    //creating the first board
    const createBoardOne = () => {
        for (let i = 0; i < 30; i++) {
            
            // Populate the row with zeros
            for (let j = 0; j < 40; j++) {

                if (j%5 == 0)
                {                   
                    if (j%2 == 1)
                    {
                        grounds.push(createBoundary(p5.width/3, j * 20, p5.width, 20));
                    }

                    else
                    {
                        grounds.push(createBoundary((2*p5.width)/3, j * 20, p5.width, 20));

                    }
                   
                }
            }
        }
    }

    //setup function
    p5.setup = () => {
        p5.createCanvas(800,600); 
        engine = Engine.create();
        world = engine.world;

        setupPhysics();
        createBoardOne(); 
        player.push(createCircle(pos[0], pos[1], 20));

    }

    //keypressed function
    p5.keyPressed = () => {
        let body = player[0].body.position
        let x = body.x 
        let y = body.y
        if (p5.keyCode === p5.LEFT_ARROW) {
            x-=20; 
            updatePhysicsCirclePosition(player[0], x, y); 
            pos[0] = x; 
        } else if (p5.keyCode === p5.RIGHT_ARROW) {
            x += 20; 
            updatePhysicsCirclePosition(player[0], x, y); 
            pos[0] = x; 

        } else if (p5.keyCode === p5.UP_ARROW && !timerStart) {
            jump = true; 
        }

        pos[0] = x; 
        pos[1] = y; 
      }

  
    //draw function 
    p5.draw = () => {

        p5.background(64,64,40);

        Engine.update(engine);
        for (let ground of grounds) {
            showBoundary(ground);
          }
        
        for (let circle of player) {
            showCircle(circle);
        }

      
    };
  };

export default sketch; 