let S = 50, s = 30;
let arr = [];
let bluu;
let shapes = [];
let clicked = -1;

function setup() {
  createCanvas(S * 11, S * 12 + 3 * s);
  bluu = color(50, 50, 255);
  
  for (i = 0; i < 9; i ++) {
    arr.push([]);
    for (j = 0; j < 9; j ++) {
      arr[i].push(0);
    }
  }
  arr[1][2] = 1;
  
  for (i = 0; i < 3; i ++) {
    shapes.push(new figur(fig[floor(random(fig.length))], S * 2.5 + i * S * 3, S * 11 + s * 1.5, floor(random(4))));
  }
}

function draw() {
  background(220);
  cursor("default");
  
  strokeWeight(1);
  stroke(100);
  for (i = 0; i < 9; i ++) {
    for (j = 0; j < 9; j ++) {
      if (arr[i][j]) fill(bluu);
      else if (i < 3 || i > 5) {
        if (j < 3 || j > 5) fill(255);
        else fill(210);
      }else{
        if (j > 2 && j < 6) fill(255);
        else fill(210);
      }
      rect((j + 1) * S, (i + 1) * S, S);
    }
  }
  
  strokeWeight(2);
  stroke(0);
  for (i = 0; i < 4; i ++) {
    line(S, S * (i * 3 + 1), S * 10, S * (i * 3 + 1));
    line(S * (i * 3 + 1), S, S * (i * 3 + 1), S * 10);
  }
  
  strokeWeight(1);
  for (k = 0; k < 3; k ++) {
    if (k == clicked) shapes[k].draw(color(red(bluu) + 150, green(bluu) + 150, blue(bluu) + 150), s, shapes[k].x, shapes[k].y, s);
    else shapes[k].draw(bluu, s, shapes[k].x, shapes[k].y, s);
  }
  
  if (mouseIsPressed && clicked >= 0) {
    if (shapes[clicked].fit(mouseX, mouseY)) shapes[clicked].draw(color(red(bluu) + 150, green(bluu) + 150, blue(bluu) + 150), 45, S * (shapes[clicked].middle[0] + 1), S * (shapes[clicked].middle[1] + 1), S);
    shapes[clicked].draw(bluu, 40, mouseX, mouseY, 40);
  }
}

function mousePressed() {
  for (i = 0; i < 3; i ++) {
    if (shapes[i].grab(i)) clicked = i;
  }
}

function mouseReleased() {
  if (clicked >= 0) {
    if (shapes[clicked].fit(mouseX, mouseY)) {
      for (i = 0; i < shapes[clicked].arr.length; i ++) {
        for (j = 0; j < shapes[clicked].arr[0].length; j ++) {
          if (shapes[clicked].arr[i][j]) arr[i + shapes[clicked].cornor1[1]][j + shapes[clicked].cornor1[0]] = 1;
        }
      }
      shapes[clicked] = new figur(fig[floor(random(fig.length))], S * 2.5 + clicked * S * 3, S * 11 + s * 1.5, floor(random(4)));
      
      
    }
  }
  clicked = -1;
}

function figur(shape, x1, y1, rot) {
  this.arr = shape;
  this.x = x1;
  this.y = y1;
  
  for (j = 0; j < rot; j ++) {
    let temp = [];
    for (k = 0; k < this.arr[0].length; k ++) {
      temp.push([]);
      for (l = 0; l < this.arr.length; l ++) {
        temp[k].unshift(this.arr[l][k]);
      }
    }
    this.arr = temp;
  }
  
  
  this.draw = function(col, size1, x, y, size2) {
    this.cornor = [x - size2 * this.arr[0].length / 2 + abs(size1 - size2) / 2, y - size2 * this.arr.length / 2 + abs(size1 - size2) / 2];
    if (abs(mouseX - x) <= this.arr[0].length * size1 / 2 && abs(mouseY - y) <= this.arr.length * size1 / 2) {
      cursor("pointer");
    }
    for (i = 0; i < this.arr.length; i ++) {
      for (j = 0; j < this.arr[0].length; j ++) {
        if (this.arr[i][j]) {
          fill(col);
          stroke(0);
        }else{
          noFill();
          noStroke();
        }
        rect(this.cornor[0] + j * size2, this.cornor[1] + i * size2, size1);
      }
    }
  }
  
  this.grab = function(nr) {
    if (abs(mouseX - x1) <= this.arr[0].length * s / 2 && abs(mouseY - y1) <= this.arr.length * s / 2) {
      return true;
    }
  }
  
  this.fit = function(x, y) {
    this.cornor1 = [round((x - S * this.arr[0].length / 2) / 50 - 1), round((y - S * this.arr.length / 2) / 50 - 1)];
    this.middle = [this.cornor1[0] + this.arr[0].length / 2, this.cornor1[1] + this.arr.length / 2];
    
    let tf = true;
    for (i = 0; i < this.arr.length; i ++) {
      for (j = 0; j < this.arr[0].length; j ++) {
        try {
          if (this.arr[i][j] == 1 && arr[i + this.cornor1[1]][j + this.cornor1[0]] == 1) tf = false;
          else if (arr[i + this.cornor1[1]][j + this.cornor1[0]] == undefined) tf = false;
        }
        catch (error) {
          tf = false;
        }
      }
    }
    return tf;
  }
}