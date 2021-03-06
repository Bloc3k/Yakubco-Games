class Shooter extends Enemy {
    constructor(pos = createVector(innerWidth / 2, innerHeight / 2), reloadTime = 100) {
        super(pos);
        this.loaded = false;
        this.reloadTime = reloadTime;
        this.reloadCounter = 0;
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle + 3 / 4 * Math.PI);
        fill(this.col);
        rectMode(CENTER);
        //-------- player sprite  --------
        circle(0, 0, 26);
        triangle(-13, 0, 0, -13, -13, -13);
        //--------------------------------
        pop();
    }

    update() {
        this.angle = createVector(player.pos.x - this.pos.x, player.pos.y - this.pos.y).heading();

        if (this.loaded) {
            this.shoot();
            this.loaded = false;
        }

        //reloading
        if (this.loaded == false) {
            this.reloadCounter++;
            if (this.reloadCounter >= this.reloadTime) {
                this.loaded = true;
                this.reloadCounter = 0;
            }
        }

        super.update();
    }

    shoot() {
        bullets.push(new Bullet(this.pos, this.dir.add((Math.random() - 0.5) / 2), this.col));
    }

    isHit(target) {
        return dist(this.pos.x, this.pos.y , target.x, target.y) < 13;            
    }

    hit() {
        this.toDestroy = true;
    }
}