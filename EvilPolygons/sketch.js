let player;
let bullets = [];
let enemies = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  player = new Player();
  enemies.push(new Shooter());
  enemies.push(new Eater());
}

function draw() {
  background(220);


  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].draw();
    bullets[i].update();
    enemies.forEach( enemy => {
      if (enemy.isHit(bullets[i].getPos())) {
        enemy.hit();
        bullets[i].hit();
      }
    });
    if (bullets[i].toDestroy)
      bullets.splice(i, 1);
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].draw();
    enemies[i].update();
    if (enemies[i].toDestroy)
      enemies.splice(i, 1);

  }

  player.draw();
  player.update();

  if (keyCode == 27)
    window.history.back();
}