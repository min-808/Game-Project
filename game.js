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

    this.getxPos = function() {
        return this.xPos;
    }

    this.getyPos = function() {
        return this.yPos;
    } // inaccuracies might have something to do with the rectmode or something
}

class invisibleHitBox {
    constructor() {
        this.width = 180;
        this.height = 180;

        this.xPos = player.xPos;
        this.yPos = player.yPos;
    }

    display() {
        rectMode(CENTER);
        fill(0,0,0,0);
        rect(this.xPos, this.yPos, this.width, this.height);
    }

    update() {
        this.xPos = player.xPos;
        this.yPos = player.yPos;
    }
}

function player() {
    this.width = 80;
    this.height = 80;

    this.xPos = w/2;
    this.yPos = h/2;

    this.show = function() {
        imageMode(CENTER);
        image(knight, this.xPos, this.yPos, this.width, this.height);
    }

    this.update = function() { // Bounds
        if (this.yPos > h - this.width / 2) {
            this.yPos = h - this.width / 2;
        }

        if (this.yPos < 0 + this.width / 2) {
            this.yPos = 0 + this.width / 2;
        }

        if (this.xPos < 0 + this.width / 2) {
            this.xPos = 0 + this.width / 2; 
        }

        if (this.xPos > w - this.width / 2) {
            this.xPos = w - this.width / 2;
        }
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

        this.currentCount = 0;

        this.hxPos = this.xPos;
        this.hyPos = this.yPos + 50;
        this.hWidth = 80;
        this.hHeight = 10;
        
        this.hColorR = 144;
        this.hColorG = 238;
        this.hColorB = 144;

    }

    display() {
        image(snake, this.xPos, this.yPos, this.height, this.height);
    }

    displayHealthBars() {
        fill(this.hColorR, this.hColorG, this.hColorB)
        rect(this.hxPos, this.hyPos, this.hWidth, this.hHeight);
    }

    updateHealthBars() {
        this.hxPos = this.xPos;
        this.hyPos = this.yPos + 50;

        if ((this.currentCount >= 1) && (this.currentCount <= 10)) {
            this.hWidth -= 5;

            this.hColorR += 10;
            this.hColorG -= 5;
            this.hColorB -= 5;

            if (this.hWidth <= 30) {
                this.hWidth = 30;
            }

            if (this.hColorG <= 213) {
                this.hColorG = 213;
            }

            if (this.hColorB <= 128) {
                this.hColorB = 128;
            }
        }

        if ((this.currentCount > 10) && (this.currentCount <= 11)) {
            this.hWidth -= 5;

            if (this.hWidth <= 0) {
                this.hWidth = 0;
            }
        }
    }

    move() {
        this.xPos += (player.xPos - this.xPos /*+ this.alt/2*/) / (this.speed / this.editSpeed);
        this.yPos += (player.yPos - this.yPos /*- this.alt/3*/) / (this.speed / this.editSpeed);
    }

    // GETTERS

    getCount() {
        return this.currentCount;
    }

    addCount(newCount) {
        this.currentCount += newCount;
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

        //if (this.hit == true) {
            //death();
        //}
}

class shoot {
    constructor(x_, y_) {
        this.width = 30;
        this.height = 30;

        this.xPos = player.xPos;
        this.yPos = player.yPos;

        this.xSpeed = 13 * x_;
        this.ySpeed = 13 * y_;

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

        this.xSpeed *= 1;
        this.ySpeed *= 1; // for no slowdown at the end of the point
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