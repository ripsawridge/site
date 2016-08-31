---
title: Rowan's homework
date: 2014-11-15
layout: post
---

Rowan had some interesting homework with a protractor.
I broke out [Processing.js](http://processingjs.org/) again to play with it.

---

<script src="../javascript/processing.js">
</script>

<script type="application/processing" data-processing-target="pjs">

void  pointOnLine(x1, y1, x2, y2, l) {
    var acvector = new PVector(x2-x1, y2-y1);
    acvector.normalize();
    var px = x1 + acvector.x * (acvector.mag()*l);
    var py = y1 + acvector.y * (acvector.mag()*l);
    var retval = {};
    retval.x = px;
    retval.y = py;
    return retval;
}


void dist(x1, y1, x2, y2) {
  var a = Math.sqrt((x2-x1)*(x2-x1) + 
                    (y2-y1)*(y2-y1));
  return a;
}


void decorate(cx, cy, ax, ay, ox, oy) {
    // draw a right angle box at point ax,ay
    // box size should be a percentage of the distance
    // between a and o.
    var l = dist(ax, ay, ox, oy) * 0.20;
    stroke(255,0,0);
    var pc = pointOnLine(ax, ay, cx, cy, l);
    var po = pointOnLine(ax, ay, ox, oy, l);
    var acvector = new PVector(cx-ax, cy-ay);
    acvector.normalize();
    var px = po.x + acvector.x  *acvector.mag() * l;
    var py = po.y + acvector.y * acvector.mag() * l;
    line(po.x, po.y, px, py);
    line(pc.x, pc.y, px, py);
    stroke(0,0,0);
}


void computeTriangle(cx, cy, ax, ay, o) {
    var l = dist(cx, cy, ax, ay);
    var h = Math.sqrt(l*l + o*o);
    var quad = (ax <= cx) ? 1 : -1;
    var InitialAngle = quad*Math.atan2((ay-cy),abs(ax-cx));
    var Omega = Math.atan(o/l);
    var OmegaDelta = InitialAngle-Omega;
    var ox = -quad*Math.cos(OmegaDelta)*h + cx;
    var oy = quad*Math.sin(OmegaDelta)*h + cy;
    triangle(cx, cy, ax, ay, ox, oy);
    decorate(cx, cy, ax, ay, ox, oy);
    var retval = {};
    retval.x = ox;
    retval.y = oy;
    retval.angle = Omega;
    return retval;
}

void degrees(rad) {
  return rad*(180/Math.PI);
}

void drawSpiral(cx, cy, ax, ay, o) {
 var total_angle = 0;
 for (var i = 0; i < 1000; i++) {
     if (total_angle > 360.0) {
         break;
     }
     var p = computeTriangle(cx, cy, ax, ay, o);
     ax = p.x; ay = p.y; total_angle += degrees(Math.abs(p.angle));
 }
}


var centerx = width/2;
var centery = height/2;
var ax = centerx;
var ay = centery + height/4;
var o = 200;
var wertangle = 0.0;
var time = 0;
var animating = true;

/* @pjs preload="wert.png"; */
PImage wert;

void setup() {
  size(800, 600);
  centerx = width/2;
  centery = height/2;
  ax = centerx;
  ay = centery + height/4;
  wert = loadImage("wert.png");
  xsize = min(wert.width, width*0.10)
  ysize = wert.width/wert.height * xsize;
  wert.resize(xsize, ysize);
  time = millis();
}


void mouseClicked() {
  ax = mouseX;
  ay = mouseY;
}


void keyPressed() {
  if (key == 'a' || key == 'A') {
    o -= 20;
  } else if (key == 's' || key == 'S') {
    o += 20;
  }
  if (key == 'o' || key == 'O') {
    if (animating === true) animating = false;
    else animating = true;
  }
  if (o < 20) {
    o = 20;
  }
  if (o > 500) {
    o = 500;
  }
}


void draw() {
  background(50, 50, 50);

  pushMatrix();
  translate(centerx, centery);
  rotate(wertangle);
  drawSpiral(0, 0, ax - centerx, ay - centery, o);
  popMatrix();

  pushMatrix();
  translate(centerx, centery);
  rotate(wertangle);
  // draw Wert
  image(wert, -wert.width/2, -wert.height/2);
  popMatrix();

  // Rotate Wert 24 times per second.
  if (animating && ((millis() - time) > (1000/24))) {
    time = millis();
    wertangle += PI/16;
  }
}

</script>

Press the key "o" to start and stop the dizzying animation. Press "a" to shorten the base of the triangles that 
radiate out from the center, and press "s" to lengthen the base. Click the mouse to set the distance of the base of the
first triangle from the center. The succeeding triangles distance from the center point is a function of maintaining
a right angle at the base, and the fixed base length. Wert is there just for fun.

<canvas id="pjs"> </canvas>
