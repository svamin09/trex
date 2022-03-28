
var trex ,trex_running;
var score = 0
var PLAY=1;
var END=0;
var gameState=PLAY
var restart
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
 groundimage=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  restart1=loadImage
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
 trex=createSprite(50,160,50,50);
 trex.addAnimation("ad",trex_running);
 trex.scale=0.5;
 ground=createSprite(200,180,400,20);
 ground.addAnimation("sd",groundimage);
 
 invisibleground=createSprite(200,190,400,20);
 invisibleground.visible=false
 obstaclegroup = new Group()
 cloudsgroup = new Group()
 
 restart=createSprite(300,140);
 restart.add("fg",restartimage)
}

function draw(){
  background("orange");
  text("score:"+score,500,50)
  textSize(5)
  
  if(gameState==PLAY){
   //ground will start
    ground.velocityX=-3;
   // adding score
    score=score+Math.round(frameCount/60)
    if(ground.x<0){
      ground.x=ground.width/2;
  
    }
    if(keyDown("space")&& trex.y>=150){
      trex.velocityY=-5
    }
    trex.velocityY=trex.velocityY+0.8
    spawnclouds()
    spawnobstacle()
    if(obstaclegroup.isTouching(trex)){
      gameState=END;
    }
  }
  else if(gameState==END){
   //ground will close
    ground.velocityX=0;
   obstaclesgroup.setVelocityXEach(0)
   cloudsgroup.setVelocityXEach(0)
   obstaclesgroup.setLifetimeEach(-1)
   cloudsgroup.setLifetimeEach(-1)

  }
  
  trex.collide(invisibleground);
 
  drawSprites();

}
function spawnclouds(){
  if(frameCount%60==0){
    cloud=createSprite(600,100,40,10);
    cloud.y=Math.round(random(10,60));
    cloud.addImage(cloudimage);
    cloud.scale=0.5;
    cloud.velocityX=-3;
    cloud.lifetime=200;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudsgroup.add(cloud)
  }
  
}
 
function spawnobstacle(){
  if(frameCount%60==0){
    obstacle=createSprite(600,165,10,40);
    obstacle.velocityX=-4;
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;                           
    }
      obstacle.scale=0.5;
      obstacle.lifetime=200;
      obstaclegroup.add(obstacle)
  }

}