var player, enemy1,enemy2,enemy3;
var laser,backgroundImg,laserImage;
var playerImg,enemy1Img,enemy2Img,enemy3Img;
var score=0;
var Edges,gameover;
var END=1;
var PLAY=0;
var gameState=0;
function preload(){
  playerImg=loadImage("image/player 1.png");
  backgroundImg=loadImage("image/Background.jpg")
  enemy1Img=loadImage("image/enemy 1.png");
  enemy2Img=loadImage("image/enemy 2.png");
  enemy3Img=loadImage("image/enemy 3.png");
  laserImage=loadImage("image/laser.png");
  gameoverIMG=loadImage("image/gameOver..png");
  restartImg=loadImage("image/reset.png");
}

function setup() {
 createCanvas(800,550);
 player=createSprite(400,450,30,30);
 player.addImage(playerImg);
 player.scale=0.35;

 restart=createSprite(400,380,30,30);
restart.addImage(restartImg);
restart.scale=0.12

gameover=createSprite(410,245,30,30);
gameover.addImage(gameoverIMG);
gameover.scale=0.8
gameover.visible=false;
restart.visible=false;
 laserGroup=new Group();
 enemy1Group=new Group();
 enemy2Group=new Group();
 enemy3Group=new Group();
}

function draw() {
  background(backgroundImg); 
  Edges=createEdgeSprites();
  fill("white");
  textSize(23);
  text("score="+ score,10,30);

  if(gameState===PLAY){
    
  if(keyDown(LEFT_ARROW)){
   player.x=player.x-4.5;
}
if(keyDown(RIGHT_ARROW)){
   player.x=player.x+4.5;
}
if (keyDown("space")) {
   createlaser();
}
if(laserGroup.isTouching(enemy2Group)){
  enemy2.destroy();
 laserGroup.destroyEach();
  score=score+5;
}

if(laserGroup.isTouching(enemy1Group)){
  enemy1.destroy();
  laserGroup.destroyEach();
  score=score+1
}
if(laserGroup.isTouching(enemy3Group)){
  enemy3.destroy();
  laserGroup.destroyEach();
  score=score+3;
}
if(enemy1Group.collide(Edges) || enemy2Group.collide(Edges)|| enemy3Group.collide(Edges)){
  gameState=END;
}
spawnenemy();
  }

  else if(gameState===END){
   
    gameover.visible=true;
    restart.visible=true;
  enemy1Group.setVelocityYEach(0);
  enemy2Group.setVelocityYEach(0);
  enemy3Group.setVelocityYEach(0);
  enemy2Group.destroyEach();
  enemy1Group.destroyEach();
  enemy3Group.destroyEach();

  

if(mousePressedOver(restart)){
  reset();
}
  }

drawSprites();
}

 function createlaser() {
    laser= createSprite(400, 400, 7, 25);
    laser.addImage(laserImage);
    laser.x=player.x;
    laser.velocityY = -4;
    laser.scale = 0.06;
    laser.lifetime=100  ;
    laserGroup.add(laser);
    laserGroup.add(laser);
}

function spawnenemy(){
  if(frameCount%150===0){
    enemy1=createSprite(random(30,700),30,30)
    enemy1.velocityY=1.9;
    enemy1.addImage(enemy1Img);
    enemy1.scale=0.07

    enemy1.lifetime=400;
    player.depth=enemy1.depth+1;
    
    enemy1Group.add(enemy1);
  }
  if(frameCount%700===0){
     enemy2=createSprite(random(60,660),30,30)
     enemy2.velocityY=0.5;
     enemy2.addImage(enemy2Img);
     enemy2.scale=0.2
    
     enemy2.lifetime=1600;
     player.depth=enemy2.depth+1;
    
     enemy2Group.add(enemy2);
  }
     
  if(frameCount%190===0){
    enemy3=createSprite(random(30,700),30,30)
    enemy3.velocityY=1.5;
    enemy3.addImage(enemy3Img);
    enemy3.scale=0.06
    
    enemy3.lifetime=600;
    player.depth=enemy3.depth+1;
   
    enemy3Group.add(enemy3);
  }
  
  }
  function reset(){
    
  gameState = 0;
  gameover.visible = false;
  restart.visible = false;
  
  enemy2Group.destroyEach();
  enemy1Group.destroyEach();
  enemy3Group.destroyEach();
    
  score=0;
  }
