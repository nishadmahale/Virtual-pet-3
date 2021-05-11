class Food {
  constructor(){
  this.foodStock=0;
  this.lastfed;
  this.image=loadImage('images/Milk.png');
  }

 updateFoodStock(foodStock){
  this.foodStock=foodStock;
 }

 deductFood(){
   if(this.foodStock>0){
    this.foodStock=this.foodStock-1;
   }
  }

  getFedTime(lastfed){
    this.lastfed=lastfed
  }

  getFoodStock(){
    return this.foodStock;
  }

  bedroom(){
    background(bedroom,550,500);
  }

  garden(){
    background(garden,550,500);
  }

  washroom() {
    background(washroom,550,500);
  }
  
  display(){
    var x=70,y=100;
    
    imageMode(CENTER);
 
    
    if(this.foodStock!=0){
      for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
          x=33;
          y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;
      }
    }

    if(lastfed>=12){
      text("Last Feed:"+ lastfed%12 + "PM" ,50,30);
    }else if(lastfed==0){
      text("Last Feed: 12 AM",50,30);
    }else{
      text("Last Feed :" +lastfed + "AM" , 50,30);
    }  

    
  }
}