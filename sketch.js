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
var popfactor = 5000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var i = 1; i <= (width * height / popfactor); i++){
    cells.push(new cell(random() * width, random() * height, random() * 10 + 2, random() * 2, random() * 360));
  }
  angleMode(DEGREES);
}

function draw() {
  background(230);
  ellipseMode(CENTER);
  for(var i = 0; i < cells.length; i++){
    
    cells[i].angle += random() * 6 - 3;
    cells[i].angle %= 360;
    cells[i].v += random() * 0.3 - 0.15;
    cells[i].v *= 0.99;
    
    cells[i].r += (width * height / popfactor) / cells.length / 2 * random();
    cells[i].r -= cells.length / (width * height / popfactor) / 2 * random();
    
    if(cells[i].r <= 0){
      cells.splice(i, 1);
      if(cellselect == i){
        cellselect = -1;
      }else if(cellselect > i){
        cellselect--;
      }
      i--;
      continue;
    }
    if(cells[i].r >= 22){
      cells.push(new cell(cells[i].x, cells[i].y, cells[i].r/1.414, cells[i].v, cells[i].angle - 90));
      cells.push(new cell(cells[i].x, cells[i].y, cells[i].r/1.414, cells[i].v, cells[i].angle + 90));
      
      cells.splice(i, 1);
      if(cellselect == i){
        cellselect = -1;
      }else if(cellselect > i){
        cellselect--;
      }
      i--;
      continue;
    }
    
    cells[i].x += cells[i].v * cos(cells[i].angle);
    cells[i].y += cells[i].v * sin(cells[i].angle);
    if(cells[i].x < 0 || cells[i].y < 0 || cells[i].x > width || cells[i].y > height){
      cells[i].x -= cells[i].v * cos(cells[i].angle);
      cells[i].y -= cells[i].v * sin(cells[i].angle);
      cells[i].angle -= 180;
    }
    
    fill(255 - abs(cells[i].v) * 50,255,255);
    if(cells[i].r >= 18){
      strokeWeight(pow(cells[i].r/18,4));
      stroke(255 / 4 * (4 - (22 - cells[i].r)), 0, 0);
    }else{
      strokeWeight(1);
      stroke(0);
    }
    circle(cells[i].x, cells[i].y, cells[i].r);
    if(pow(cells[i].r/2, 2) >= pow(cells[i].x - mouseX, 2) + pow(cells[i].y - mouseY, 2) && mouseIsPressed){
      cellselect = i;
    }
  }
  if(cellselect >= 0){
    fill(0);
    strokeWeight(0);
    stroke(0);
    text("Cell ID: " + cellselect + "\nX = " + round(cells[cellselect].x * 100) / 100 + "\nY = " + round(cells[cellselect].y * 100) / 100 + "\nV = " + round(cells[cellselect].v * 10) / 10 + "\nAngle = " + round(cells[cellselect].angle * 10) / 10 + "\nSize = " + round(cells[cellselect].r * 10) / 10, 4, 12);
    if(keyIsDown(65)){
      cells[cellselect].angle -= 2;
    }
    if(keyIsDown(68)){
      cells[cellselect].angle += 2;
    }
    if(keyIsDown(87)){
      cells[cellselect].v += 0.2;
      cells[cellselect].v *= 0.9;
    }
    if(keyIsDown(83)){
      cells[cellselect].v -= 0.2;
      cells[cellselect].v *= 0.9;
    }
    if(keyIsDown(UP_ARROW)){
      cells[cellselect].r += 0.2;
    }
    if(keyIsDown(DOWN_ARROW)){
      cells[cellselect].r -= 0.2;
    }
    if(keyIsDown(32)){
      strokeWeight(1);
      stroke(0);
      line(0,cells[cellselect].y,width,cells[cellselect].y);
      line(cells[cellselect].x,0,cells[cellselect].x,height);
    }
  }
}