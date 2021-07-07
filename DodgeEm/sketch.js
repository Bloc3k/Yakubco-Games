var player;
var bullets = [];
var lassers = [];
var coin;
var running = false;
var leaderboard;
let scoring = false;
let reseter;
let skill_f;
let skill_d;
let stealth_s, coin_s, reset_s, gameover_s, click_s, placed_s, port_s;

function preload() {
  stealth_s = loadSound("/DodgeEm/Assests/stelth.wav");
  coin_s = loadSound("/DodgeEm/Assests/pop.wav");
  reset_s = loadSound("/DodgeEm/Assests/pop1.wav");
  gameover_s = loadSound("/DodgeEm/Assests/gameover.wav");
  click_s = loadSound("/DodgeEm/Assests/click.wav");
  placed_s = loadSound("/DodgeEm/Assests/placed.wav");
  port_s = loadSound("/DodgeEm/Assests/port.wav");
}

function setup() {
  document.cookie = "leaderboard=Yakub-69_LuckyBoy-31_PEPEE-21_OMEGALUL-19_KEKW-16_toddler-15_newbie-11_noob-7_rookie-6_pleb-3";
  createCanvas(innerWidth, innerHeight);
  player = new Player();
  coin = new Coin();
  leaderboard = new Leaderboard();
  reseter = new Reseter();
  skill_f = new Skills();

  for (let i = 0; i < innerWidth*innerHeight / 121000; i++) { //11
    bullets[i] = new Bullet(i % 2);
  }
}

function draw() {
  background(0);
  
  if (running) {
    //------------------ Game is Running ------------------
    skill_f.drawPortal();
    reseter.draw();
    reseter.update();
    skill_f.update(stealth_s, click_s, player, placed_s, port_s);
    
    for (let bullet of bullets) {
      bullet.draw();
      bullet.update();
      if (skill_f.effect == false) { /*Not detecting if skill is on*/
        if (bullet.colision(player)){
          running = false;
          gameover_s.play();
          gameover_s.setVolume(0.4);
        }
      }
    }
    if (coin.colected(player)) {
      coin_s.play();
      coin.coinCount++;
      coin.respawn();
      reseter.reset();
    }
    coin.draw();
    if (skill_f.effect == true)
      player.drawEffect(skill_f.duration, skill_f.effectTime);
    else
      player.draw();
    player.update();

    if (reseter.colected(player)) {
      reset_s.play();
      coin.respawn();
      reseter.timer = 0;
      reseter.done = false;
    }

    skill_f.draw();

    scoring = true;
  } else {
    //----------------------- LOBBY -----------------------
    skill_f.drawPortal();
    reseter.draw();
    reseter.timer = 0;
    reseter.done = false;
    for (let bullet of bullets) {
      bullet.draw();
    }
    coin.draw();
    player.draw();
    leaderboard.show();
    fill(240);
    textSize(34);
    if (floor(player.y % 3) == 0)
      text("You Died LOL xD", player.x, player.y);
    else if (floor(player.y % 3) == 1)
      text("Keep up <3", player.x, player.y);
    text("Press ESC to get back to main menu", innerWidth / 2 - 250, 40);
    text("Press Left Mouse button to play again", innerWidth / 2 - 250, 80);
    //text("Try to collect as many coins as possible without dying", innerWidth/2 - 375, 120);
    
    /*add new record*/
    if (coin.coinCount > leaderboard.topten[leaderboard.topten.length - 1][1]) {
      if (scoring) { 
        nickname = null;
        nickname = prompt("You're one of the best. You've earned a place in the Hell of Flame <3 \nMax length: 10 ", "What's your nickname, sir?");
        if (nickname != null) 
        leaderboard.update(nickname.substring(0, 10), coin.coinCount);
        scoring = false;
      }
    }
    
    /*Restart game*/
    if (mouseIsPressed) {
      running = true;
      coin.coinCount = 0;
      player.reset();
      bullets.forEach(function(entry) {
        entry.reset();
      });
      skill_f.reset();
    }
  }
  if (keyCode == 27)
    window.history.back();

  coin.drawScore();
  skill_f.draw();
}

function newRecord() {
  console.log(this.value);
}