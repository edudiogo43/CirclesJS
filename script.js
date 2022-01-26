const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Ball {
    constructor({x, y, color, velocity}) {

        this.position = {
            x,
            y
        };

        this.velocity = velocity;

        this.radius = Math.random() * 80 + 10;
        this.color = color;
    }

    draw(){

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
    }
}

const balls = [];
let timeFrame = 0;

function animation() {
    const id = requestAnimationFrame(animation);

    // If you need to clear the screen after write something
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    timeFrame++;

    if(timeFrame % 10 === 0) {

        const hslaColor = `hsla(${Math.floor(Math.random() * 360)}, 50%, 50%, 1)`;
        const velX = (Math.random() * 0.4).toFixed(2);
        const velY = (Math.random() * 0.2).toFixed(2);
        console.log(velX)

        const ball = new Ball({
            x:  Math.random() * canvas.width,
            y:  Math.random() * canvas.height,
            color: hslaColor,
            velocity: {
                x: velX <= 0.2 ? +velX : -velX ,
                y: velX <= 0.1 ? +velY : -velY
            }
        });
    
        balls.push(ball);

    }

    balls.forEach((newBall, index) => {
        newBall.update();

        if(newBall.position.y + newBall.radius >= canvas.height ||
           newBall.position.x + newBall.radius >= canvas.width) {
            balls.splice(index, 1);
        }

    })

    // Clearing the entire screen after 5000 frames
    if(timeFrame >= 5000) {

        balls.forEach((_, index) => {

            setTimeout(() => {
                balls.splice(index, 1);
            }, 500);
                
        })

        timeFrame = 0;

    }

    // If you want to cancel the program execution
    // if(timeFrame >= 5000) {
    //     cancelAnimationFrame(id);
    // }

    // Adding some text control on screen
    // ctx.font = "30px Arial";
    // ctx.fillStyle = "white";
    // const frame = timeFrame ;
    // ctx.fillText("Time Frame: " + frame, 10, 50); 

}

animation();