var form;
var year, month;
var y, z;
var getproduct;
var database;
var productdetails;
var song;

function setup() {
  database = firebase.database();
  
  song= loadSound('mouseclick.mp3');
  var canvas = createCanvas(700,500);
      canvas.position(800,20);

  form = new Form();
  var ref= database.ref('product/data');
  ref.on("value",readdata);
  
}

function draw() {
  
  background(247,245,178);
  form.display();
  getdate();
  fill("black");
  line(350, 0, 350, 500);
  
push();
textSize(22);
text("Products-", 370, 40);
text("Expiry Status-", 30, 40);
pop();

  if(form.productdetails!== null){
  y=60; 
  z=60;

  for(var i in form.productdetails){
    z=z+15;
    text("Name- " + form.productdetails[i][0] + "        Expiry- " + form.productdetails[i][1] + "/" +form.productdetails[i][2], 370, z);

    if(form.productdetails[i][2] <= year){

      if(form.productdetails[i][1] <= month){        
        y=y+15;
        text(form.productdetails[i][0] + " has expired.", 20, y);
      } else if(form.productdetails[i][1] > month){
        y=y+15;
        text(form.productdetails[i][0] + " will expire in " + (form.productdetails[i][1] - month) + " months.", 20, y);
      }

    } else {
      y=y+15;
      var yearsleft = (form.productdetails[i][2] - year);
      text(form.productdetails[i][0] + " will expire in " + yearsleft + " years.", 20, y);
    }
  
  }
  }
}

async function getdate(){
 //fetching month and year
 var expiry = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
 var expiryjson = await expiry.json();
 var datetime = expiryjson.datetime;
 year = datetime.slice(0,4);
 month = datetime.slice(5,7);

}

function readdata(data){
var details=data.val();
 form.productdetails=[];
var keys=Object.keys(details);
for(var i=0;i<keys.length;i++){
  var k=keys[i];
 
form.productdetails.push(details[k]);
}
}
