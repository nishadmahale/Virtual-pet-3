var database, dog, dog1, dog2,washroomImg, gardenImg,bedroomImg;
var position, garden, washroom, bedroom;
//var form
var feed, add;
var foodobject;
var feedTime;
var lastfed;
var gameState;
var readState;
var currentTime;
var foodS
//Create variables here

function preload() {
  dogimg1 = loadImage("images/dogImg.png");
  dogimg2 = loadImage("images/dogImg1.png");
  washroomImg= loadImage("images/Wash Room.png");
  gardenImg=loadImage("images/Garden.png");
  bedroomImg=loadImage("images/Bed Room.png");
  //load images here
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();

  foodobject = new Food()
  dog = createSprite(550, 250, 10, 10);
  dog.addImage(dogimg1)
  dog.scale = 0.2

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  feed = createButton("FEED DRAGO")
  feed.position(500, 15);
  feed.mousePressed(FeedDog);

  add = createButton("ADD FOOD")
  add.position(400, 15);
  add.mousePressed(AddFood);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  
  // reading Gamestate from database
  readState=database.ref('gameState');
  readState.on("value",function (data){
    gameState=data.val();


  })


  feedTime=database.ref('feedTime');
  feedTime.on("value",function(data){
    lastfed=data.val();
  });

  

}

function draw() {
 background(46, 139, 87);
  if (position) {
    foodobject.display()

    drawSprites();

    fill(255, 255, 254);
    textSize(15);
  
  }

  currentTime=hour();
  if(currentTime==(lastfed+1)){
    update("Playing");
    foodobject.garden();
  }else if(currentTime==(lastfed+2)){
    update("Sleeping");
    foodobject.bedroom();
  }else if(currentTime>(lastfed+2) && currentTime<=(lastfed+4)){
    update("Bathing");
    foodobject.washroom();
  }else{
    update("Hungry")
    foodobject.display();
  }
if(gameState!="Hungry"){
   feed.hide();
   add.show();
   dog.remove();
 }else{
   feed.show();
   add.show();
   dog.addImage(dogimg1);
 }






}
function readPosition(data) {
  position = data.val();
  console.log(position);
  foodobject.updateFoodStock(position);
}

function showError() {
  console.log("Error in writing to the database");
}

// function writePosition(nazo) {
//   if (nazo > 0) {
//     nazo = nazo - 1
//   }
//   else {
//     nazo = 0
//   }
//   database.ref('/').set({
//     'Food': nazo
//   })

// }

function AddFood() {
  dog.addImage(dogimg1);
  foodS++
  database.ref('/').update({
    Food: foodS

  })
  /*position++;
  database.ref('/').update({
    Food : position
  }

  )*/
}
function FeedDog() {

  dog.addImage(dogimg2)
  foodobject.updateFoodStock(foodobject.getFoodStock() - 1)
  database.ref('/').update({
    Food: foodobject.getFoodStock(),
    feedTime: hour(),
  gameState:"Hungry"
  
  })
  
}

function update(state){
  database.ref('/').update({
    gameState:state

  })
}

function readStock (data){
  foodS=data.val();
  foodobject.updateFoodStock(foodS);
}