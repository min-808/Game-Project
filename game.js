function hitbox() {
    this.width = 180;
    this.height = 180;

    this.xPos = player.xPos;
    this.yPos = player.yPos;

    this.show = function() {
        rectMode(CORNER);
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
        imageMode(CORNER);
        image(knight, this.xPos + this.width/2, this.yPos + this.height/2, this.width, this.height);
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

function weapon() {
    this.width = 100;
    this.height = 10;

    this.xPos = player.xPos;
    this.yPos = player.yPos;

    this.rRot = -90;
    this.lRot = -180;
    this.uRot = 180;
    this.dRot = 360;

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

        console.log(this.dRot);

        stamina-=0.1

        if (this.rRot >= 340) {
            this.reset();
            this.opacity = 0;
        }

        if (stamina <= 0) {
            stamina = 0;
        }
    }

    this.update = function() {
        this.xPos = player.xPos;
        this.yPos = player.yPos;
    }

    //this.swing = function() {
        //
    //}
}

function enemy() {

    this.width = 80;
    this.height = 80;

    this.speed = 50;

    this.xPos = w;
    this.yPos = h/2;

    this.show = function() {
        image(snake, this.xPos, this.yPos, this.width, this.height);
    }

    this.update = function() {
        this.xPos += (player.xPos - this.xPos) / this.speed;
        this.yPos += (player.yPos - this.yPos) / this.speed;

        var hit = collideRectRect(hitbox.xPos, hitbox.yPos, hitbox.width, hitbox.height, this.xPos, this.yPos, this.width, this.height);

        if (hit == true) {
            console.log("within hitbox");
            //
        }

        

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
}