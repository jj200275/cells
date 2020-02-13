class cell{
  constructor(x, y, r, v, angle){
    this.x = x;
    this.y = y;
    this.r = r;
    this.v = v;
    this.angle = angle;
  }
}

var cells = [];
var cellselect = -1;

function setup() {
  createCanvas(720, 720);
  for(var i = 1; i <= (width * height / 2000); i++){
    cells.push(new cell(random() * width, random() * height, random() * 15 + 2, random() * 2, random() * 360));
  }
  angleMode(DEGREES);
}

function draw() {
  background(230);
  ellipseMode(CENTER);
  for(var i = 0; i < cells.length; i++){
    if(cellselect != i){
      cells[i].angle += random() * 6 - 3;
      cells[i].v += random() * 0.3 - 0.15;
      cells[i].v *= 0.99;
    }
    
    cells[i].x += cells[i].v * cos(cells[i].angle);
    cells[i].y += cells[i].v * sin(cells[i].angle);
    if(cells[i].x < 0 || cells[i].y < 0 || cells[i].x > width || cells[i].y > height){
      cells[i].x -= cells[i].v * cos(cells[i].angle);
      cells[i].y -= cells[i].v * sin(cells[i].angle);
      cells[i].angle -= 180;
    }
    
    fill(255 - cells[i].v * 50,255,255);
    circle(cells[i].x, cells[i].y, cells[i].r);
    if(pow(cells[i].r/2, 2) >= pow(cells[i].x - mouseX, 2) + pow(cells[i].y - mouseY, 2) && mouseIsPressed){
      cellselect = i;
    }
  }
  if(cellselect >= 0){
    fill(0);
    text("Cell ID: " + cellselect + "\tX = " + round(cells[cellselect].x * 100) / 100 + "\tY = " + round(cells[cellselect].y * 100) / 100 + "\tV = " + round(cells[cellselect].v * 10) / 10 + "\tAngle = " + round(cells[cellselect].angle * 10) / 10 + "\tSize = " + round(cells[cellselect].r * 10) / 10, 4, 12);
    if(keyIsDown(LEFT_ARROW)){
      cells[cellselect].angle -= 1;
    }
    if(keyIsDown(RIGHT_ARROW)){
      cells[cellselect].angle += 1;
    }
    if(keyIsDown(UP_ARROW)){
      cells[cellselect].v += 1;
    }
    if(keyIsDown(DOWN_ARROW)){
      cells[cellselect].v -= 1;
    }
  }
}