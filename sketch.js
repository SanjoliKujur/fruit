// Game states
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Variables
var alien1, alien2, fruit1, fruit2, fruit3, fruit4, sword;

var alien1Image, alien2Image, fruit1Image, fruit2Image, fruit3Image, fruit4Image, gameOverImage, swordImage;

var score = 0;

function preload(){
  //loading images 
   alien1Image = loadImage("alien1.png");
   alien2Image = loadImage("alien2.png");
   fruit1Image = loadImage("fruit1.png");
   fruit2Image = loadImage("fruit2.png");
   fruit3Image = loadImage("fruit3.png");
   fruit4Image = loadImage("fruit4.png");
   gameOverImage = loadImage("gameover.png");
   swordImage = loadImage("sword.png");
  
 //loading Sounds
  swordSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  
  sword = createSprite(40,200,20,20);
  sword.addImage("sword",swordImage);
  sword.scale = 0.7;
  
  sword.setCollider("rectangle",0,0,40,40);
  
  fruitG = createGroup();
  alienG = createGroup();
}
function draw(){
  background("plum");
  
  sword.x =World.mouseX;
  sword.y = World.mouseY;
  
  if(sword.isTouching(fruitG)){
    fruitG.destroyEach();
    score=score+2;
    swordSound.play();
  }
  if(sword.isTouching(alienG)){
    gameOver = createSprite(300,250);
    gameOver.addImage(gameOverImage);
    gameOverSound.play();
    gameOver.scale = 1.5;
    gameState = END;
  }
  
  if(gameState===PLAY){
     fruits();
  aliens();
  }else if(gameState===END){
    fruit.velocityX = 0;
    alien.velocityX = 0;
  }
    
  
  
drawSprites();
  text("SCORE : "+score,270,30);
}

function fruits(){
  if(World.frameCount%80===0){
    fruit = createSprite(Math.round(random(width-200,width-50)),200,20,20);
    fruit.scale =0.2;
    
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1Image);
    }else if (r==2){
      fruit.addImage(fruit2Image);
    }else if (r==3){
      fruit.addImage(fruit3Image);
    } else {
      fruit.addImage(fruit4Image);
    }
    
    fruit.y=Math.round(random(50,340));
    fruit.velocityX = -(7 + 2*score/100);
    fruit.setLifetime = 100;
    fruitG.add(fruit);
  }
}
function aliens(){
  if(World.frameCount%200===0){
    alien=createSprite(Math.round(random(width-200,width-50)),200,20,20);
    alien.addAnimation("moving",alien1Image,alien2Image);
    alien.y = Math.round(random(100,350));
    alien.velocityX =-(8 + 3*score/100);
    alien.setLifetime=50;
    alienG.add(alien);
  }
}