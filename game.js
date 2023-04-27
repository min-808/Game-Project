function getMouseVector() {
    let mouseXalt = mouseX - player.xPos;
    let mouseYalt = mouseY - player.yPos;
    let mouseDir = createVector(mouseXalt, mouseYalt);
    mouseDir.normalize();
    return mouseDir;
}

function getRandomVectorToPlayer() {
    let dir = createVector(random(0, w), player.xPos);
    dir.normalize();
    return dir;
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

function instructions() {
    this.instWidth = 1000;
    this.instHeight = 320;
    this.instxPos = w/2;
    this.instyPos = 100

    this.arrowWidth = 100;
    this.arrowHeight = 100;
    this.arrowxPos = w/2 + 100;
    this.arrowyPos = 300;

    this.currentPage = 1;
    this.maxPages = 6;

    this.inst1 = function() {
        fill(0,0,0,100);
        rectMode(CENTER)
        rect(this.instxPos, this.instyPos, this.instWidth, this.instHeight)
        if (this.currentPage == 1) {
            noStroke()
            textSize(25)
            fill(255,255,255)
            textAlign(CENTER)
            textStyle(NORMAL)
            text("Hello! Welcome to my game", this.instxPos, this.instyPos)
            text("This is a 2-D shooter where you shoot at enemies to gain gold and experience", this.instxPos, this.instyPos + 40)
            text("You can use the gold to purchase upgrades, and the experience strengthens your stats", this.instxPos, this.instyPos + 80)
        } else if (this.currentPage == 2) {
            noStroke()
            textSize(25)
            fill(255,255,255)
            textAlign(CENTER)
            textStyle(NORMAL)
            text("You can move around with WASD and shoot by clicking on the screen", this.instxPos, this.instyPos)
            text("The gray box around you is your hitbox. If enemies enter it, you will take damage", this.instxPos, this.instyPos + 40)
            text("Additionally, shooting depletes your stamina bar. You can't shoot if this reaches 0", this.instxPos, this.instyPos + 80)
            text("Health and stamina gradually regenerate over time", this.instxPos, this.instyPos + 120)
        } else if (this.currentPage == 3) {
            noStroke()
            textSize(25)
            fill(255,255,255)
            textAlign(CENTER)
            textStyle(NORMAL)
            text("Power-ups that boost your movement speed, gold, and despawn enemies will appear", this.instxPos, this.instyPos)
            text("These will disappear after a while, and bullets begin shooting around them", this.instxPos, this.instyPos + 40)
        }
    }



    this.arrowMove = function() {
        textSize(15)
        textStyle(BOLD)
        textAlign(CENTER)
        fill(0,0,0)
        text("You can use the arrow keys LEFT/RIGHT to navigate the instructions", this.instxPos, this.instyPos + 200)
        text(this.currentPage + " / " + this.maxPages, this.instxPos, this.instyPos - 60)
    }
}

function hitbox() {
    this.width = 220;
    this.height = 220;

    this.xPos = player.xPos;
    this.yPos = player.yPos;

    this.show = function() {
        stroke(0)
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


    this.hitReg = function() {
        for (var h = 0; h < snakeAmount.length; h++) {

            var hitPlayer = collideRectRect((this.xPos - this.width / 2) + 40, (this.yPos - this.height / 2) + 40, this.width, this.height, snakeAmount[h].getxPos(), snakeAmount[h].getyPos(), snakeAmount[h].getWidth(), snakeAmount[h].getHeight())
        
            if (hitPlayer) {
                player.takingDamage(50); // invokes the take damage function and makes player lose hp
                console.log('hit')
            }

        }

    }   
}

function player() {
    this.width = 80;
    this.height = 80;

    this.xPos = w/2;
    this.yPos = h/2;

    //this.level = level                            Use the global variable for the level
    this.lxPos = this.xPos;
    this.lyPos = this.yPos - 65;

    this.health = health;
    this.maxHealth = maxHealth;
    this.hxPos = this.xPos - this.hWidth / 2;
    this.hyPos = this.yPos + 60;
    this.hWidth = 160;
    this.hHeight = 15;

    this.hColorR = 255;
    this.hColorG = 0;
    this.hColorB = 0;

    //this.stamina = stamina;                       Use the global variable stamina for the stamina
    //this.maxStamina = maxStamina;
    this.sxPos = this.xPos - this.sWidth / 2;
    this.syPos = this.yPos + 80;
    this.sWidth = 160;
    this.sHeight = 15;

    this.sColorR = 0;
    this.sColorG = 0;
    this.sColorB = 255;

    this.show = function() {
        imageMode(CENTER);
        image(knight, this.xPos, this.yPos, this.width, this.height);
    }

    this.displayLevel = function() {
        fill(0,0,0);
        textSize(20);
        textAlign(CENTER)
        textStyle(BOLD)
        text("Lv. " + level, this.lxPos, this.lyPos);
    }

    this.updateLevel = function() {
        level = level;

        this.lxPos = this.xPos;
        this.lyPos = this.yPos - 65;
    }

    this.displayHealthBars = function() {
        rectMode(CORNER)
        fill(this.hColorR, this.hColorG, this.hColorB, 20);
        rect(this.hxPos, this.hyPos, this.hWidth, this.hHeight) // Outer HP box

        noStroke()
        fill(this.hColorR, this.hColorG, this.hColorB, 100);
        rect(this.hxPos, this.hyPos, map(this.health, 0, this.maxHealth, 0, 160), this.hHeight); // Inner HP box
        stroke(0)

        fill(0,0,0)
        textSize(13);
        //textStyle(BOLD)
        textAlign(CENTER)
        textStyle(NORMAL)
        text(this.health.toFixed(0) + " / " + this.maxHealth.toFixed(0), this.xPos, this.hyPos + 12);
    }

    this.updateHealthBars = function() {
        this.hxPos = this.xPos - this.hWidth / 2;
        this.hyPos = this.yPos + 60;
        
        if (this.health <= 0) {
            this.health = 0;
        }
        console.log(this.health)
    }

    this.displayStaminaBars = function() {
        rectMode(CORNER)
        fill(this.sColorR, this.sColorG, this.sColorB, 20);
        rect(this.sxPos, this.syPos, this.sWidth, this.sHeight) // Outer Stamina box

        noStroke()
        fill(this.sColorR, this.sColorG, this.sColorB, 100);
        rect(this.sxPos, this.syPos, map(stamina, 0, maxStamina, 0, 160), this.sHeight); // Inner Stamina box
        stroke(0)

        fill(0,0,0)
        textSize(13);
        //textStyle(BOLD)
        textAlign(CENTER)
        textStyle(NORMAL)
        text(stamina.toFixed(0) + " / " + maxStamina.toFixed(0), this.xPos, this.syPos + 12);
    }

    this.updateStaminaBars = function() {
        this.sxPos = this.xPos - this.sWidth / 2;
        this.syPos = this.yPos + 80;
        
        if (stamina <= 0) {
            stamina = 0;
        }
        //console.log(this.stamina)
    }

    this.takingDamage = function(amount) {
        this.health -= amount / 100;
        this.health.toFixed(0);
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

        this.speed = 200; // Higher number is slower
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

class powerup {
    constructor(xNum, yNum) {
        //
    }
}