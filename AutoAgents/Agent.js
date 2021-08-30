class Agent {
    constructor(mass = 10, max_force = 10, max_speed = 20) {
        this.position = createVector(300, 200);
        this.velocity = createVector(0, 0);

        this.mass = mass;
        this.MAX_SPEED = max_force;
        this.MAX_FORCE = max_speed;

        /******* SPRITE *******/
        this.size = map(this.mass, 0, 50, 12, 16);
        this.color = '#a0a';
    }

    /**
     * Agent will pursuite target by taking its velocity vector and multiplying it by T = D*c; 
     * where D is distance from target and c is turning constant
     * It is less sophisticated calculation of T because it dosn't taking into account orientation between target and pursuer.
     * @param {} target - object to pursuit, has to have getVelocity() and getPosition() function
     */
    pursuitWithConst(target) {
        const T = dist(this.position.x, this.position.y, target.getPosition().x, target.getPosition().y) * 0.12;
        this.seekTargetInFuture = p5.Vector.add(p5.Vector.mult(target.getVelocity(), T), target.getPosition()) //remove/edit
        this.seek(this.seekTargetInFuture);
    }

    arrive(target, radius) {
        const steering_direction = p5.Vector.sub(target, this.position);
        const distance_to_target = steering_direction.mag();
        const ramped_speed = this.MAX_SPEED * (distance_to_target / radius);
        const limited_speed = Math.min(ramped_speed, this.MAX_SPEED);
        const desired_velocity = p5.Vector.mult(steering_direction, (limited_speed / distance_to_target));
        const steering_force = this.truncate(p5.Vector.sub(desired_velocity, this.velocity), this.MAX_FORCE);
        const accleration = p5.Vector.div(steering_force, this.mass);
        this.velocity = p5.Vector.add(accleration, this.velocity);
        this.position = p5.Vector.add(this.position, this.velocity);
    }

    seek(target) {
        const steering_direction = p5.Vector.sub(target, this.position);
        const steering_force = this.truncate(steering_direction, this.MAX_FORCE);
        const accleration = p5.Vector.div(steering_force, this.mass);
        this.velocity = this.truncate(p5.Vector.add(this.velocity, accleration), this.MAX_SPEED);
        this.position = p5.Vector.add(this.position, this.velocity);
    }

    flee(target) {
        const steering_direction = p5.Vector.sub(this.position, target);
        const steering_force = this.truncate(steering_direction, this.MAX_FORCE);
        const accleration = p5.Vector.div(steering_force, this.mass);
        this.velocity = this.truncate(p5.Vector.add(this.velocity, accleration), this.MAX_SPEED);
        this.position = p5.Vector.add(this.position, this.velocity);
    }

    draw() {
        push();

        fill(this.color);
        translate(this.position.x, this.position.y)
        rotate(this.velocity.heading());
        triangle(-this.size, -this.size, this.size*2.5 , 0, -this.size, this.size); 
        
        pop(); 
    }

    truncate(vector, amount) {
        return vector.limit(amount);
    }

    setPosition(newPosition) {
        this.position = createVector(newPosition.x, newPosition.y);
    }

    setMaxSpeed(speed) {
        this.MAX_SPEED = speed;
    }

    setMaxForce(force) {
        this.MAX_FORCE = force;
    }

    setMass(mass) {
        this.mass = mass;
        this.size = map(this.mass, 0, 50, 12, 16);
    }
}