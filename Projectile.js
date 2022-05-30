const Vec2 = require('./Vec2');

class Projectile {
    constructor(x, y, direction_x, direction_y) {
        this.pos = new Vec2(x, y);
        this.direction = new Vec2(direction_x - x, direction_y - y);
        this.SPEED = 10;
        this.DAMAGE = 20;
        this.SIZE = 15;     // Size of has to match in Render.js on clietn-side (line: 49)
        this.toBeDeleted = false;
    }

    update() {
        this.pos = Vec2.add(this.pos, this.direction.setLength(this.SPEED));
    }

    /**
     * Serialize projectile to JSON format.
    * @returns Serialized projectile
    */
    serialize() {
        return {
            "pos": {"x": this.pos.x, "y": this.pos.y}
          }
    }
}

module.exports = Projectile;