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
    this.maxPages = 5;

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
            text("You move around with WASD and shoot by clicking on the screen", this.instxPos, this.instyPos)
            text("The gray box around you is your hitbox. If enemies enter it, you will take damage", this.instxPos, this.instyPos + 40)
            text("Additionally, shooting depletes your stamina bar. You can't shoot if this reaches 0", this.instxPos, this.instyPos + 80)
            text("Health and stamina gradually regenerate over time", this.instxPos, this.instyPos + 120)
        } else if (this.currentPage == 3) {
            noStroke()
            textSize(25)
            fill(255,255,255)
            textAlign(CENTER)
            textStyle(NORMAL)
            text("If you press the [R] key while in a level, you will be sent to the Nexus", this.instxPos, this.instyPos)
            text("In the Nexus, there's a shop to purchase power-ups and upgrades", this.instxPos, this.instyPos + 40)
        } else if (this.currentPage == 4) {
            noStroke()
            textSize(25)
            fill(255,255,255)
            textAlign(CENTER)
            textStyle(NORMAL)
            text("As you progress in level, the enemies will change and get harder", this.instxPos, this.instyPos)
            text("It begins with snakes, then slimes, to golems, and finally a dragon", this.instxPos, this.instyPos + 40)
            text("You win when you hit level 20 and defeat the dragon!", this.instxPos, this.instyPos + 120)
        } else if (this.currentPage == 5) {
            noStroke()
            textSize(35)
            fill(255,255,255)
            textAlign(CENTER)
            textStyle(NORMAL)
            text("Good luck, and have fun!", this.instxPos, this.instyPos + 60)
        }
    }



    this.arrowMove = function() {
        textSize(15)
        textStyle(BOLD)
        textAlign(CENTER)
        fill(0,0,0)
        text("Use the arrow keys LEFT/RIGHT to navigate the instructions", this.instxPos, this.instyPos + 200)
        text(this.currentPage + " / " + this.maxPages, this.instxPos, this.instyPos - 60)
    }
}

function start() {
    mode = 1;
    document.getElementById("start").style.visibility = "hidden";

    stamina = maxStamina;
}

function tip() {
    this.instxPos = w/2;
    this.instyPos = 100

    this.fade = 0;

    this.show = function() {
        this.fade += 1
        noStroke()
        textSize(20)
        fill(0,0,0, this.fade)
        textAlign(CENTER)
        textStyle(BOLD)
        text("[TIP] : You can press [R] to go to the Nexus and buy upgrades", this.instxPos, this.instyPos - 20)
        stroke(0)
    }
}

function shop() {
    this.instWidth = 850;
    this.instHeight = 300;
    this.instxPos = w/2;
    this.instyPos = 100;

    this.instShow = function() {
        fill(0,0,0,100)
        rectMode(CENTER);
        rect(this.instxPos, this.instyPos, this.instWidth, this.instHeight);
        textSize(25);
        fill(255,255,255)
        textAlign(CENTER)
        textStyle(NORMAL)
        noStroke()
        text("Welcome to the Nexus!", this.instxPos, this.instyPos - 40);
        text("Here you can regenerate your HP and Stamina without being attacked", this.instxPos, this.instyPos);
        text("You can click the 'shop' button to open/close the shop", this.instxPos, this.instyPos + 80);
        text("You can click the 'return' button to return to the level", this.instxPos, this.instyPos + 120);
    }
}

function hitbox() {
    this.width = 240;
    this.height = 240;

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
        if ((level >= 1) && (level < 5)) {
            for (var h = 0; h < snakeAmount.length; h++) {

                var hitPlayer = collideRectRect((this.xPos - this.width / 2) + 40, (this.yPos - this.height / 2) + 40, this.width, this.height, snakeAmount[h].getxPos(), snakeAmount[h].getyPos(), snakeAmount[h].getWidth(), snakeAmount[h].getHeight())
            
                if (hitPlayer) {
                    player.takingDamage(50); // invokes the take damage function and makes player lose hp
                }

            }
        }

        if ((level >= 5) && (level < 10)) {
            for (var p = 0; p < slimeAmount.length; p++) {

                var hitPlayer2 = collideRectRect((this.xPos - this.width / 2) + 40, (this.yPos - this.height / 2) + 40, this.width, this.height, slimeAmount[p].getxPos(), slimeAmount[p].getyPos(), slimeAmount[p].getWidth(), slimeAmount[p].getHeight())
            
                if (hitPlayer2) {
                    player.takingDamage(60); // invokes the take damage function and makes player lose hp
                }

            }
        }

        if ((level >= 10) && (level < 15)) {
            for (var w = 0; w < blobAmount.length; w++) {

                var hitPlayer3 = collideRectRect((this.xPos - this.width / 2) + 40, (this.yPos - this.height / 2) + 40, this.width, this.height, blobAmount[w].getxPos(), blobAmount[w].getyPos(), blobAmount[w].getWidth(), blobAmount[w].getHeight())
            
                if (hitPlayer3) {
                    player.takingDamage(65); // invokes the take damage function and makes player lose hp
                }

            }
        }

        if ((level >= 15) && (level < 20)) {
            for (var y = 0; y < golemAmount.length; y++) {

                var hitPlayer4 = collideRectRect((this.xPos - this.width / 2) + 40, (this.yPos - this.height / 2) + 40, this.width, this.height, golemAmount[y].getxPos(), golemAmount[y].getyPos(), golemAmount[y].getWidth(), golemAmount[y].getHeight())
            
                if (hitPlayer4) {
                    player.takingDamage(75); // invokes the take damage function and makes player lose hp
                }

            }
        }

        if (level == 20) {
            for (var z = 0; z < dragonAmount.length; z++) {

                var hitPlayer5 = collideRectRect((this.xPos - this.width / 2) + 40, (this.yPos - this.height / 2) + 40, this.width, this.height, dragonAmount[z].getxPos(), dragonAmount[z].getyPos(), dragonAmount[z].getWidth(), dragonAmount[z].getHeight())
            
                if (hitPlayer5) {
                    player.takingDamage(90); // invokes the take damage function and makes player lose hp
                }

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
    this.lxBarPos = this.xPos - this.width / 2;
    this.lyPos = this.yPos - 65;
    this.lyBarPos = this.yPos - 100;
    this.lWidth = 80;
    this.lHeight = 10;

    this.lColorR = 160;
    this.lColorG = 32;
    this.lColorB = 240;

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
        rectMode(CORNER)
        fill(this.lColorR, this.lColorG, this.lColorB, 20);
        rect(this.lxBarPos, this.lyBarPos, this.lWidth, this.lHeight) // Outer LV box

        noStroke()
        fill(this.lColorR, this.lColorG, this.lColorB, 100);
        rect(this.lxBarPos, this.lyBarPos, map(experience - prevExp, 0, neededExp - prevExp, 0, this.lWidth), this.lHeight); // Inner LV box
        stroke(0)

        fill(0,0,0);
        textSize(20);
        textAlign(CENTER)
        textStyle(BOLD)
        text("Lv. " + level, this.lxPos, this.lyPos);
    }

    this.updateLevel = function() {
        level = level;

        this.lxPos = this.xPos;
        this.lxBarPos = this.xPos - this.width / 2
        this.lyPos = this.yPos - 65;
        this.lyBarPos = this.yPos - 100;
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

/* 
ENEMY NUMBER ONE
ENEMY NUMBER ONE
ENEMY NUMBER ONE
ENEMY NUMBER ONE
ENEMY NUMBER ONE
ENEMY NUMBER ONE
ENEMY NUMBER ONE
*/


class enemy {

    constructor(alt_x, alt_y, speed_, curHealth, maxHealth) {
        this.width = 80;
        this.height = 80;

        this.speed = 200; // Higher number is slower
        this.editSpeed = speed_;

        this.xPos = w - alt_x;
        this.yPos = h - alt_y;

        this.altX = alt_x;
        this.altY = alt_y;

        this.currentCount = 0;

        this.hxPos = this.xPos - this.hWidth / 2;
        this.hyPos = this.yPos + 40;
        this.hWidth = 80;
        this.hHeight = 10;
        
        this.hColorR = 144;
        this.hColorG = 238;
        this.hColorB = 144;

        this.curHealth = curHealth;
        this.maxHealth = maxHealth;
    }

    display() {
        image(snake, this.xPos, this.yPos, this.height, this.height);
    }

    displayHealthBars() {
        fill(this.hColorR, this.hColorG, this.hColorB)
        rectMode(CORNER)
        rect(this.hxPos, this.hyPos, map(this.curHealth, 0, this.maxHealth, 0, this.hWidth), this.hHeight);
    }

    updateHealthBars() {
        this.hxPos = this.xPos - this.hWidth / 2;
        this.hyPos = this.yPos + 40;
    }

    move() {
        this.xPos += (player.xPos - this.xPos /*+ this.alt/2*/) / (this.speed / this.editSpeed);
        this.yPos += (player.yPos - this.yPos /*- this.alt/3*/) / (this.speed / this.editSpeed);
    }

    // GETTERS

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

/* 
ENEMY NUMBER TWO
ENEMY NUMBER TWO
ENEMY NUMBER TWO
ENEMY NUMBER TWO
ENEMY NUMBER TWO
ENEMY NUMBER TWO
ENEMY NUMBER TWO
*/

class enemy2 {

    constructor(alt_x, alt_y, speed_, curHealth, maxHealth) {
        this.width = 80;
        this.height = 80;

        this.speed = 250; // Higher number is slower
        this.editSpeed = speed_;

        this.xPos = w - alt_x;
        this.yPos = h - alt_y;

        this.altX = alt_x;
        this.altY = alt_y;

        this.currentCount = 0;

        this.hxPos = this.xPos - this.hWidth / 2;
        this.hyPos = this.yPos + 40;
        this.hWidth = 80;
        this.hHeight = 10;
        
        this.hColorR = 144;
        this.hColorG = 238;
        this.hColorB = 144;

        this.curHealth = curHealth;
        this.maxHealth = maxHealth;
    }

    display() {
        image(slime, this.xPos, this.yPos, this.height, this.height);
    }

    displayHealthBars() {
        rectMode(CORNER)
        fill(this.hColorR, this.hColorG, this.hColorB)
        rect(this.hxPos, this.hyPos, map(this.curHealth, 0, this.maxHealth, 0, this.hWidth), this.hHeight);
    }

    updateHealthBars() {
        this.hxPos = this.xPos - this.hWidth / 2;
        this.hyPos = this.yPos + 40;
    }

    move() {
        this.xPos += (player.xPos - this.xPos /*+ this.alt/2*/) / (this.speed / this.editSpeed);
        this.yPos += (player.yPos - this.yPos /*- this.alt/3*/) / (this.speed / this.editSpeed);
    }

    // GETTERS

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

/* 
ENEMY NUMBER THREE
ENEMY NUMBER THREE
ENEMY NUMBER THREE
ENEMY NUMBER THREE
ENEMY NUMBER THREE
ENEMY NUMBER THREE
ENEMY NUMBER THREE
ENEMY NUMBER THREE
*/

class enemy3 {

    constructor(alt_x, alt_y, speed_, curHealth, maxHealth) {
        this.width = 80;
        this.height = 80;

        this.speed = 275; // Higher number is slower
        this.editSpeed = speed_;

        this.xPos = w - alt_x;
        this.yPos = h - alt_y;

        this.altX = alt_x;
        this.altY = alt_y;

        this.currentCount = 0;

        this.hxPos = this.xPos - this.hWidth / 2;
        this.hyPos = this.yPos + 40;
        this.hWidth = 80;
        this.hHeight = 10;
        
        this.hColorR = 144;
        this.hColorG = 238;
        this.hColorB = 144;
        
        this.curHealth = curHealth;
        this.maxHealth = maxHealth;
    }

    display() {
        image(blob, this.xPos, this.yPos, this.height, this.height);
    }

    displayHealthBars() {
        rectMode(CORNER)
        fill(this.hColorR, this.hColorG, this.hColorB)
        rect(this.hxPos, this.hyPos, map(this.curHealth, 0, this.maxHealth, 0, this.hWidth), this.hHeight);
    }

    updateHealthBars() {
        this.hxPos = this.xPos - this.hWidth / 2;
        this.hyPos = this.yPos + 40;
    }

    move() {
        this.xPos += (player.xPos - this.xPos /*+ this.alt/2*/) / (this.speed / this.editSpeed);
        this.yPos += (player.yPos - this.yPos /*- this.alt/3*/) / (this.speed / this.editSpeed);
    }

    // GETTERS

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

/* 
ENEMY NUMBER FOUR
ENEMY NUMBER FOUR
ENEMY NUMBER FOUR
ENEMY NUMBER FOUR
ENEMY NUMBER FOUR
ENEMY NUMBER FOUR
ENEMY NUMBER FOUR
ENEMY NUMBER FOUR
*/

class enemy4 {

    constructor(alt_x, alt_y, speed_, curHealth, maxHealth) {
        this.width = 80;
        this.height = 80;

        this.speed = 300; // Higher number is slower
        this.editSpeed = speed_;

        this.xPos = w - alt_x;
        this.yPos = h - alt_y;

        this.altX = alt_x;
        this.altY = alt_y;

        this.currentCount = 0;

        this.hxPos = this.xPos - this.hWidth / 2;
        this.hyPos = this.yPos + 40;
        this.hWidth = 80;
        this.hHeight = 10;
        
        this.hColorR = 144;
        this.hColorG = 238;
        this.hColorB = 144;

        this.curHealth = curHealth;
        this.maxHealth = maxHealth;
    }

    display() {
        image(golem, this.xPos, this.yPos, this.height, this.height);
    }

    displayHealthBars() {
        rectMode(CORNER)
        fill(this.hColorR, this.hColorG, this.hColorB)
        rect(this.hxPos, this.hyPos, map(this.curHealth, 0, this.maxHealth, 0, this.hWidth), this.hHeight);
    }

    updateHealthBars() {
        this.hxPos = this.xPos - this.hWidth / 2;
        this.hyPos = this.yPos + 40;
    }

    move() {
        this.xPos += (player.xPos - this.xPos /*+ this.alt/2*/) / (this.speed / this.editSpeed);
        this.yPos += (player.yPos - this.yPos /*- this.alt/3*/) / (this.speed / this.editSpeed);
    }

    // GETTERS

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

/* 
ENEMY NUMBER FIVE
ENEMY NUMBER FIVE
ENEMY NUMBER FIVE
ENEMY NUMBER FIVE
ENEMY NUMBER FIVE
ENEMY NUMBER FIVE
ENEMY NUMBER FIVE
ENEMY NUMBER FIVE
*/

class enemy5 {

    constructor(alt_x, alt_y, speed_, curHealth, maxHealth) {
        this.width = 80;
        this.height = 80;

        this.speed = 320; // Higher number is slower
        this.editSpeed = speed_;

        this.xPos = w - alt_x;
        this.yPos = h - alt_y;

        this.altX = alt_x;
        this.altY = alt_y;

        this.currentCount = 0;

        this.hxPos = this.xPos - this.hWidth / 2;
        this.hyPos = this.yPos + 40;
        this.hWidth = 80;
        this.hHeight = 10;
        
        this.hColorR = 144;
        this.hColorG = 238;
        this.hColorB = 144;

        this.curHealth = curHealth;
        this.maxHealth = maxHealth;
    }

    display() {
        image(dragon, this.xPos, this.yPos, this.height, this.height);
    }

    displayHealthBars() {
        rectMode(CORNER)
        fill(this.hColorR, this.hColorG, this.hColorB)
        rect(this.hxPos, this.hyPos, map(this.curHealth, 0, this.maxHealth, 0, this.hWidth), this.hHeight);
    }

    updateHealthBars() {
        this.hxPos = this.xPos - this.hWidth / 2;
        this.hyPos = this.yPos + 50;
    }

    move() {
        this.xPos += (player.xPos - this.xPos /*+ this.alt/2*/) / (this.speed / this.editSpeed);
        this.yPos += (player.yPos - this.yPos /*- this.alt/3*/) / (this.speed / this.editSpeed);
    }

    // GETTERS

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
 /*         SCRAPPED SYSTEM
class powerup {
    constructor(xNum, yNum) {
        // SCRAPPED
    }
}
*/

function doSomething() { // just a placeholder function for testing purposes
    console.log("Something")
}

function toggleShop() {
    if ((shopStatus == false) && (mode == 2)) {
        document.getElementById("shopContainer").style.visibility = "visible"
        document.getElementById("shopText").textContent = "Close Shop"
        shopStatus = true;
    } else if ((shopStatus == true) && (mode == 2)) {
        document.getElementById("shopContainer").style.visibility = "hidden";
        document.getElementById("shopText").textContent = "Open Shop"
        shopStatus = false;
    }
}

function returnToGame() {
    if (mode == 2) {
        mode = 1;
    }
}

function staminaBoost() { // change stamina parameters in html cause its now greater than 60
    if ((oneLevel <= 5) && (gold - oneRequired >= 0)) {
        oneLevel++;
        gold -= oneRequired;

        if (oneLevel == 2) {
            document.getElementById("staminaAdd").textContent = 10;
            maxStamina += 5;
            stamina = maxStamina;

            oneRequired = 150;
        } else if (oneLevel == 3) {
            document.getElementById("staminaAdd").textContent = 20;
            maxStamina += 10
            stamina = maxStamina;

            oneRequired = 200
        } else if (oneLevel == 4) {
            document.getElementById("staminaAdd").textContent = 50;
            maxStamina += 20;
            stamina = maxStamina;

            oneRequired = 250;
        }

        if (oneLevel == 5) {
            oneLevel = "MAX"
            document.getElementById("itemOneDesc").textContent = "SOLD OUT";
            document.getElementById("itemOneDesc").style.fontWeight = "bold";
    
            maxStamina += 50;
            stamina = maxStamina;
    
    
            document.getElementById("itemOneAdd").disabled = true;
        }
    }

}

function staminaRegen() {
    if ((fourLevel <= 2) && (gold - fourRequired >= 0)) {
        fourLevel++;
        gold -= fourRequired;

        if (fourLevel == 2) {
            fourLevel = "MAX"
            document.getElementById("itemFourDesc").textContent = "SOLD OUT";
            document.getElementById("itemFourDesc").style.fontWeight = "bold";

            hasStaminaRegen = true;
            
            document.getElementById("itemFourAdd").disabled = true;
        }
    }

}

function healthBoost() {
    if ((twoLevel <= 5) && (gold - twoRequired >= 0)) {
        twoLevel++;
        gold -= twoRequired;
    
        if (twoLevel == 2) {
            document.getElementById("healthAdd").textContent = 50;
            player.maxHealth += 20;
            player.health = player.maxHealth;
    
            twoRequired = 250;
        } else if (twoLevel == 3) {
            document.getElementById("healthAdd").textContent = 100;
            player.maxHealth += 50;
            player.health = player.maxHealth;
    
            twoRequired = 300
        } else if (twoLevel == 4) {
            document.getElementById("healthAdd").textContent = 200;
            player.maxHealth += 100;
            player.health = player.maxHealth;
    
            twoRequired = 350;
        }

        if (twoLevel == 5) {
            twoLevel = "MAX"
            document.getElementById("itemTwoDesc").textContent = "SOLD OUT";
            document.getElementById("itemTwoDesc").style.fontWeight = "bold";
    
            player.maxHealth += 200;
            player.health = player.maxHealth;
    
            document.getElementById("itemTwoAdd").disabled = true;
        }
    }
}

function healthRegen() {
    if ((fiveLevel <= 2) && (gold - fourRequired >= 0)) {
        fiveLevel++;
        gold -= fiveRequired;

        if (fiveLevel == 2) {
            fiveLevel = "MAX"
            document.getElementById("itemFiveDesc").textContent = "SOLD OUT";
            document.getElementById("itemFiveDesc").style.fontWeight = "bold";

            hasHealthRegen = true;
            
            document.getElementById("itemFiveAdd").disabled = true;
        }
    }

}

function damageBoost() {
    if ((threeLevel <= 2) && (gold - threeRequired >= 0)) {
        threeLevel++;
        gold -= threeRequired;

        if (threeLevel == 2) {
            document.getElementById("damageAdd").textContent = "3x";
            dmgPerHit += 2;
    
            threeRequired = 750;
        }

        if (threeLevel == 3) {
            threeLevel = "MAX"
            document.getElementById("itemThreeDesc").textContent = "SOLD OUT";
            document.getElementById("itemThreeDesc").style.fontWeight = "bold";

            dmgPerHit *= 3;
            
            document.getElementById("itemThreeAdd").disabled = true;
        }
    }
}

function showCompletion() {
    this.instWidth = 1000;
    this.instHeight = 320;
    this.instxPos = w/2;
    this.instyPos = 100

    this.show = function() {
        fill(0,0,0,100);
        rectMode(CENTER)
        rect(this.instxPos, this.instyPos, this.instWidth, this.instHeight)
        noStroke()
        textSize(35)
        fill(255,255,255)
        textAlign(CENTER)
        textStyle(BOLD)
        text("Congratulations! You won!", this.instxPos, this.instyPos + 40)   
    }
}

function showDeath() {
    this.instWidth = 1000;
    this.instHeight = 320;
    this.instxPos = w/2;
    this.instyPos = 100

    this.show = function() {
        fill(0,0,0,100);
        rectMode(CENTER)
        rect(this.instxPos, this.instyPos, this.instWidth, this.instHeight)
        noStroke()
        textSize(35)
        fill(255,255,255)
        textAlign(CENTER)
        textStyle(BOLD)
        text("You died! Refresh the website to try again", this.instxPos, this.instyPos + 40)   
    }
}