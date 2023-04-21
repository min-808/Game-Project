function getMouseVector() {
    let mouseXalt = mouseX - player.xPos;
    let mouseYalt = mouseY - player.yPos;
    let mouseDir = createVector(mouseXalt, mouseYalt);
    mouseDir.normalize();
    return mouseDir;
}

function drawCursor() {
    this.radius = 30;

    this.xPos = 0;
    this.yPos = 0;

    this.show = function() {
        fill(23,231,38)
        circle(this.xPos, this.yPos, this.radius);

    }

    this.update = function() {
        this.xPos = mouseX;
        this.yPos = mouseY;
    }
}

function drawLine() {

    this.xPos = 0
    this.yPos = 0
    this.xPos2 = 0
    this.yPos2 = 0

    this.show = function() {
        fill(255,255,255);
        line(this.xPos, this.yPos, this.xPos2, this.yPos2);
    }

    this.update = function() {
        this.xPos = player.xPos;
        this.yPos = player.yPos;
        this.xPos2 = mouseX;
        this.yPos2 = mouseY;
    }

}

function hitbox() {
    this.width = 180;
    this.height = 180;

    this.xPos = player.xPos;
    this.yPos = player.yPos;

    this.show = function() {
        rectMode(CENTER);
        fill(0, 0, 0, 35);
        rect(this.xPos, this.yPos, this.width, this.height);
    }

    this.update = function() {
        this.xPos = player.xPos;
        this.yPos = player.yPos;
    }
} // hi

function player() {
    this.width = 80;
    this.height = 80;

    this.xPos = w/2;
    this.yPos = h/2;

    this.show = function() {
        imageMode(CENTER);
        image(knight, this.xPos, this.yPos, this.width, this.height);
    }

    this.update = function() {
        //
    }

    this.up = function() {
        this.yPos -= 5;
    }

    this.down = function() {
        this.yPos += 5;
    }

    this.left = function() {
        this.xPos -= 5;
    }

    this.right = function() {
        this.xPos += 5;
    }
    
}

/*function weapon() {
    this.width = 100;
    this.height = 10;

    this.xPos = 300;
    this.yPos = 300;

    this.rRot = -90;

    this.speed = 7;

    this.opacity = 0;

    this.show = function() {
        rectMode(CORNER);
        this.rRot += this.speed;
        translate(player.xPos + player.height, player.yPos + player.width);
        rotate(this.rRot);
        translate(0,-100)

        fill(135,135,135, this.opacity);
        this.opacity += 20;
        noStroke();
        rect(0, 0, this.width, this.height);
        stroke(0,0,0)

        stamina -= 0.1;

        if (stamina <= 0) {
            stamina = 0;
        }

        if (stamina >= 60) {
            stamina = 60;
        }

        if (this.opacity <= 0) {
            this.opacity = 0;
        }

        if (this.opacity >= 300) {
            this.opacity = 300;
        }

        console.log(this.xPos)
    }

    this.update = function() {
        this.xPos = player.xPos;
        this.yPos = player.yPos;
    }

    this.fade = function() {
        rectMode(CORNER)
        translate(player.xPos + player.height, player.yPos + player.width); // this might be the problem  cancel out the translate somehow to only do it to this object
        rotate(this.rRot);
        translate(0,-100)

        this.opacity -= 20;

        fill(135,135,135, this.opacity);
        noStroke();
        rect(0, 0, this.width, this.height);
        stroke(0,0,0)

        stamina += 0.08;

        if (stamina <= 0) {
            stamina = 0;
        }

        if (stamina >= 60) {
            stamina = 60;
        }

        if (this.opacity <= 0) {
            this.opacity = 0;
        }

        if (this.opacity >= 300) {
            this.opacity = 300;
        }
    }

    //this.swing = function() {
        //
    //}
}*/

class enemy {

    constructor(alt_x, alt_y, speed_) {
        this.width = 80;
        this.height = 80;

        this.speed = 215; // Higher number is slower
        this.editSpeed = speed_;

        this.xPos = w - alt_x;
        this.yPos = h - alt_y;

        this.altX = alt_x;
        this.altY = alt_y;

        //this.hits = collideRectRect(this.xPos, this.yPos, this.width, this.height, shoot.xPos, shoot.yPos, shoot.width, shoot.height);
    }

    display() {
        image(snake, this.xPos, this.yPos, this.height, this.height);
    }

    move() {
        this.xPos += (player.xPos - this.xPos /*+ this.alt/2*/) / (this.speed / this.editSpeed);
        this.yPos += (player.yPos - this.yPos /*- this.alt/3*/) / (this.speed / this.editSpeed);
    }

    check() {
        //if (this.hits == true) {
            //document.getElementById("snakesValue").innerText = this.hits;
        //}
    }

    // my getters even though this isn't a private class

    getxPos() {
        return this.xPos;
    }

    getyPos() {
        return this.yPos;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }



        //var hits = collideRectRect(this.xPos, this.yPos, this.width, this.height, weapon.xPos, weapon.yPos, weapon.width, weapon.height);
        
        //document.getElementById("snakesValue").textContent = hits;

        

        //this.hit = collideRectRect(jumper.x, jumper.y, jumper.width, jumper.height, this.Xpos, this.Ypos, this.width, this.width);

        //if (this.hit == true) {
            //death();
        //}

        //if (jumper.y == h - jumper.width) {
            //death();
        //}
        
        //if (this.Xpos < 0) {
            //this.Xpos = w - this.width;
            //this.Ypos = random(0, h - this.width);
            //this.inc += 1.25;
        //}

}

class shoot {
    constructor(x_, y_) {
        this.width = 30;
        this.height = 30;

        this.xPos = player.xPos;
        this.yPos = player.yPos;

        this.xSpeed = 15 * x_;
        this.ySpeed = 15 * y_;

        this.opacity = 255;

        this.mousePosX = x_;
        this.mousePosY = y_;
    }

    display() {
        ellipseMode(CENTER);
        fill(0,0,0, this.opacity);
        ellipse(this.xPos, this.yPos, this.width, this.height);
    }

    move() {
        this.xPos += this.xSpeed;
        this.yPos += this.ySpeed;

        this.xSpeed *= 0.99;
        this.ySpeed *= 0.99;
    }

    getxPos() {
        return this.xPos;
    }

    getyPos() {
        return this.yPos;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }


    
}