---
title: Fun with Processing.js
date: 2014-7-8
layout: post
excerpt: a little javascript is fun
categories: programming
---

I've been doing some fun little graphics exercises at the [Khan Academy](https://www.khanacademy.org) web site.
It's fun! I embedded [Processing.js](http://processingjs.org/) here and ported over the solution to one of the
exercises that challenges you to use text and make an advertisement.

---

<script src="/assets/js/processing.js">
</script>

<script type="application/processing" data-processing-target="pjs">
void setup() {
  size(400, 400);
}


function drawWinston(x, y, s, blink) {
  pushMatrix();
  translate(x, y);
  scale(s, s);
    
  strokeWeight(2);
  fill(255, 255, 255);
   
  // Legs
  ellipse(-20, 50, 20, 60);
  ellipse(20, 50, 20, 60);

  // Right arm
  ellipse(60, 10, 30, 60);
    
  // Torso
  ellipse(10, 15, 120, 100);
    
  // Left arm
  ellipse(-40, 10, 30, 60);
    
  // Head
  ellipse(30, -30, 90, 80);
    
  // Eyes
  fill(0, 0, 0);
  if (blink) {
    line(15, -55, 25, -45);
    line(15, -45, 25, -55);
    line(43, -55, 53, -45);
    line(43, -45, 53, -55);
  } else {
    ellipse(20, -50, 10, 10);
    ellipse(48, -50, 10, 10);
  }
    
  // belly button
  fill(40, 40, 40);
  ellipse(25, 45, 5, 5);
  
  // Mouth
  fill(180, 0, 0);
  var lipXradius = blink ? 18 : 20;
  ellipse(35, -10, lipXradius, 10);
    
  popMatrix();
};


void drawPlate(x, y) {
  fill(82, 57, 57);
  ellipse(x, y, 250, 250);
  fill(237, 235, 176);
  ellipse(x, y, 220, 220);
};


var font = createFont("fantasy");
var angle = 0;
var blinking = false;
var still_blinking;

void draw() {
  background(3, 125, 150);
  noFill();
  strokeWeight(2);
  rect(1, 1, width-1, height-1);
    
  drawPlate(200, 195);
  var winstonX = 200;
  var winstonY = 190;
  drawWinston(
      winstonX, 
      winstonY + 10*sin(radians(angle)), 
      1.2,
      blinking);
    
  textFont(font); 
  fill(210, 219, 162);
  textSize(34);
  text("STUFFED WINTHROP!", 16, 51);
  textSize(20);
  text("Spooky!", 158, 350);
  fill(255, 255, 0);
  text("DON'T GO TO SLEEP WITHOUT ONE!", 10, 380);

  if (blinking === false) {
    textSize(15);
    fill(255, 255, 255);
    pushMatrix();
    translate(320, 130);
    rotate(25);
    text("he", 0, 0);
    fill(255, 255, 0);
    text("blinks!", 23, 0);
    popMatrix();
  }
 
   angle += 2;
   if (angle > 360) {
     angle = 0;
   }
     
   if (!blinking) {
     if (random(0, 100) < 1) {
       blinking = true;
       still_blinking = 5;
     }
   } else {
     still_blinking--;
     if (still_blinking === 0) {
       blinking = false;
     }
   }
};

</script>

<canvas id="pjs"> </canvas>

Such fun...
