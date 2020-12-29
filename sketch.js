
var tower , tower_Image;
var ghost,ghost_Image;


var door,door_Image;
var doorsGroup

var climber,climber_Image;
var climberGroup;

var invisibleblock,invisibleGroup; 

var PLAY = 0;
var END = 1;
var gameState = PLAY;

var spookySound;

function preload (){
  
 tower_Image = loadImage("tower.png") 
  ghost_Image = loadImage("ghost-standing.png") 
  
  door_Image = loadImage("door.png");
  
  climber_Image = loadImage("climber.png");
  
  spookySound = loadSound("spooky.wav")
}









function setup (){
  createCanvas(600,600)
  
  tower = createSprite(300,300,10,10);
  tower.addImage(tower_Image);
  tower.velocityY = 2;
  
  ghost = createSprite(400,300,10,10);
  ghost.addImage(ghost_Image);
  ghost.scale = 0.3;
  spookySound.loop();
  
  
  doorsGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
}



function draw(){
  
  background(0);
  
  if (gameState===PLAY){
    if (tower.y>400){
   
   tower.y = 300;
 } 
  
  if (keyDown("left")){
    
    ghost.x = ghost.x-3;
    
  }
   if (keyDown("right")){
    
    ghost.x = ghost.x+3;
    
  }
  
  if (keyDown("space")){
    
    ghost.velocityY = -5;
    
  }
  
  ghost.velocityY = ghost.velocityY+0.8;
  
  
  if (climberGroup.isTouching(ghost)){
    
    ghost.velocityY = 0;
    
  }
  
  if(ghost.isTouching(invisibleGroup)||ghost.y>600){
    
    ghost.destroy();
    
    gameState = END;
  }
  
  
 
 spawnDoors(); 
    
   drawSprites(); 
    
  }else if (gameState===END){
    
    stroke("black")
    textSize(40);  
    text("GAME OVER",200,300);
    
      
    
  }
  
 
  
  
  
}

function spawnDoors(){
  
 if (frameCount%240===0){
   door = createSprite(200,-50);
   door.addImage(door_Image);
   door.velocityY = 2;
   
   climber = createSprite(200,10);
   climber.addImage(climber_Image);
   climber.velocityY = 2;
   
   invisibleblock = createSprite(200,15);
   invisibleblock.width = climber.width;
    invisibleblock.height = 2;
   invisibleblock.velocityY = 2;
   
   invisibleblock.debug = true;
   
   door.x = Math.round(random(120,400)); 
   climber.x = door.x
   
   invisibleblock.x = door.x
   
   ghost.depth = door.depth;
   ghost.depth = door.depth+1;
   
   door.lifetime = 300;
   climber.lifetime = 300;
   invisibleblock.lifetime = 300;
   
   doorsGroup.add(door);
   climberGroup.add(climber);
   invisibleGroup.add(invisibleblock);
  
 } 
    
}








