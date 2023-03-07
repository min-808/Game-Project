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
    this.width = 90;
    this.height = 20;

    this.xPos = 200;
    this.yPos = 200;

    this.turn = 0;

    this.show = function() {
        fill(0, 0, 0);
        rectMode(CORNER)
        rect(player.xPos -/* + */ player.width, player.yPos + player.height, this.width, this.height);

        this.turn += 5;

        //rotate(this.turn);
        translate(100,100)

        console.log("hi");
        
    }

    this.unpause = function() {
        this.turn = 0;
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