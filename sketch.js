
var j1Slider = 0;
var j2Slider = 0;
var j3Slider = 0;
var zSlider = 100;
var j1JogValue = 1;
var j2JogValue = 1;
var j3JogValue = 1;
var zJogValue = 1;
var speedSlider = 500;
var accelerationSlider = 500;
var gripperValue = 180;
var gripperAdd=180;
var positionsCounter = 0;
let inp=0;
let inp1=0;
let inp2=0;

var saveStatus = 0;
var runStatus = 0;

var slider1Previous = 0;
var slider2Previous = 0;
var slider3Previous = 0;
var sliderzPrevious = 100;
var speedSliderPrevious = 500;
var accelerationSliderPrevious = 500;
var gripperValuePrevious = 100;

var activeIK = false;

var xP=365;
var yP=0;
var zP=100;
var L1 = 228; // L1 = 228mm
var L2 = 136.5; // L2 = 136.5mm
var theta1, theta2, phi, z;
var data

let slider;
let slider1;
let slider2;
let slider3;
let button;
let button1;
let button2;
let button3;
let button4;
let button5;
let button6;
let button7;
let slider4;
function move() {
 const x= inp.value();
 const y= inp1.value();
const z= inp2.value();
  inverseKinematics(x,y,z)
}
//J1 control
function j1JogPlus() {
var a = slider.value();
  a=a+j1JogValue;
  slider.value(a)
}
function j1JogMinus() {
  var a = round(slider.value());
  a=a-j1JogValue;
  slider.value(a);
}

//J2 control
function  j2JogMinus() {
  var a = slider1.value();
  a=a-j2JogValue;
  slider1.value(a);
}
function j2JogPlus() {
  var a = slider1.value();
  a=a+j2JogValue;
  slider1.value(a);
}
//J3 control
function j3JogMinus() {
  var a = slider2.value();
  a=a-j3JogValue;
  slider2.value(a);
}
function j3JogPlus() {
  var a =slider2.value();
  a=a+j3JogValue;
  slider2.value(a);
}
//J3 control
function zJogMinus() {
  var a = slider3.value();
  a=a-zJogValue;
  slider3.value(a);
}
function zJogPlus() {
  var a = slider3.value();
  a=a+zJogValue;
  slider3.value(a);
}
function savePosition() {
  // Save the J1, J2, J3 and Z position in the array 
  updateData();
  clear();
  background(460,630);
  text(data, 460, 630);
  positionsCounter++;
  saveStatus = 1;
  saveStatus=0;
}
function setup() {
 createCanvas(1000, 1000);
  //myPort = new Serial(this, "COM3", 115200);
  text(xP, 533, 290);
  text(yP, 685, 290);
  text(zP, 835, 290);
  //J1 controls
slider=createSlider(-90,266,0,1);
slider.position(110, 190);
slider.style('width', '270px');
  
button = createButton('JOG-');
button.position(110, 238);
button.size(90,40)
button.mousePressed(j1JogMinus);
button1=createButton("JOG+")
button1.position(290, 238)
button1.size(90,40)
button1.mousePressed(j1JogPlus);
  
slider1=createSlider(-90,260,0,1)
slider1.position(110, 315)
slider1.style('width', '270px');

button2 = createButton('JOG-');
button2.position(110, 363);
button2.size(90,40)
button2.mousePressed(j2JogMinus);
button3=createButton("JOG+")
button3.position(290, 363)
button3.size(90,40)
button3.mousePressed(j2JogPlus);
  
slider2=createSlider(-90,260,0)
slider2.position(110, 440)
slider2.style('width', '270px');

button4 = createButton('JOG-');
button4.position(110, 493);
button4.size(90,40)
button4.mousePressed(j3JogMinus);
button5=createButton("JOG+")
button5.position(290, 493)
button5.size(90,40)
button5.mousePressed(j3JogPlus);
slider3=createSlider(30,270,100,1)
slider3.position(110, 565)
slider3.style('width', '270px');

let button111 = createButton('JOG-');
button111.position(110, 618);
button111.size(90,40)
button111.mousePressed(zJogMinus);
button6=createButton("JOG+")
button6.position(290, 618)
button6.size(90,40)
button6.mousePressed(zJogPlus);
let j1 = slider.value();
print('The value of j1 is ' + j1);
  let j2 = slider1.value();
print('The value of j2 is ' + j2);
  let j3 = slider2.value();
print('The value of x is ' + j3);
  let z = slider3.value();
print('The value of x is ' + z);
  
  inp = createInput('',float);
  inp.position(530, 205);
  inp.size(100,25);
  
  inp1 = createInput('',float);
  inp1.position(680, 205);
  inp1.size(100,25);
  inp2 = createInput('',float);
  inp2.position(830, 205);
  inp2.size(100,25);
  
 
  let button7=createButton("MOVE TO POSITION")
button7.position(590, 315)
button7.size(240, 45)
button7.mousePressed(move);
  
  
let button8=createButton("RUN PROGRAM")
button8.position(725, 520)
button8.size(215, 50)
  
let button9=createButton("Update")
button9.position(760, 590)
button9.size(90,40)
  let button10=createButton("SAVE POSITION")
button10.position(470, 520)
button10.size(215, 50)
button10.mousePressed(savePosition)
slider4=createSlider(0,100,100)
  slider4.position(605, 445);
  slider4.style('width', '170px');
  let button11=createButton("(CLEAR)")
button11.position(490, 650)
button11.size(135, 40)
  let slider5=createSlider(500,4000,500)
  slider5.position(490, 740);
  slider5.style('width', '120px');
  let slider6=createSlider(500,4000,500)
  slider6.position(720, 740);
  slider6.style('width', '120px');
}
function draw() { 
  textSize(26);
  fill(33);
  text("Forward Kinematics", 120, 135); 
  text("Inverse Kinematics", 590, 135); 
  textSize(40);
  text("SCARA Robot Control", 260, 60); 
  textSize(45);
  text("J1", 35, 250); 
  text("J2", 35, 375);
  text("J3", 35, 500);
  text("Z", 35, 625);
  textSize(22);
  text("Speed", 545, 730);
  text("Acceleration", 745, 730);
  
updateData();
  //println(data);

  saveStatus=0;
  if (slider1Previous != j1Slider) {
    if (activeIK == false) {     // Check whether the inverseKinematics mode is active, Executre Forward kinematics only if inverseKinematics mode is off or false
      theta1 = round(slider.value()); // get the value from the slider1
      theta2=round(slider2.value());
      forwardKinematics();
    }
    slider1Previous = j1Slider;
  }
  if (slider2Previous != j2Slider) {
    if (activeIK == false) {     // Check whether the inverseKinematics mode is active, Executre Forward kinematics only if inverseKinematics mode is off or false
      theta1 =round(slider.value()); // get the value from the slider1
      theta2 = round(slider1.value());
      forwardKinematics();
    }
  }
  if (slider3Previous != j3Slider) {
    if (activeIK == false) {     // Check whether the inverseKinematics mode is active, Executre Forward kinematics only if inverseKinematics mode is off or false
      theta1=round(slider.value()); // get the value from the slider1
      theta2 = round(slider.value());
      forwardKinematics();
    }
  }
  slider3Previous = j3Slider;

  fill(33);
  textSize(32);
  text("X: ", 500, 290);
  
  text("Y: ", 650, 290);
  text("Z: ", 800, 290);
 
  
  textSize(26);
  text("Gripper", 650, 420);
  text("CLOSE", 510, 470);
  text("OPEN", 810, 470);
  textSize(18);
  
  if (sliderzPrevious != zSlider) {
    if (activeIK == false) {     // Check whether the inverseKinematics mode is active, Executre Forward kinematics only if inverseKinematics mode is off or false
      zP = round(slider3.value());
      forwardKinematics();
      
    }
  }
  sliderzPrevious = zSlider;

  if (gripperValuePrevious != gripperValue) {
    if (activeIK == false) {     // Check whether the inverseKinematics mode is active, Executre Forward kinematics only if inverseKinematics mode is off or false
      gripperAdd = round(slider4.value());
      gripperValue=gripperAdd+50;
    }
  }
   gripperValuePrevious = gripperValue;
  activeIK = false; // deactivate inverseKinematics so the above if statements can be executed the next interation

  
  function forwardKinematics() {
  var theta1F = theta1 * PI / 180;   // degrees to radians
  var theta2F = theta2 * PI / 180;
  xP = round(L1 * cos(theta1F) + L2 * cos(theta1F + theta2F));
  yP = round(L1 * sin(theta1F) + L2 * sin(theta1F + theta2F));
    clear();
    background(120,290);
    text(xP, 533, 290);
    text(yP, 685, 290);
    text(zP, 835, 290);

}
 
  if (positionsCounter >0 ) {
    text(positions[positionsCounter-1], 460, 630);
    text("Last saved position: No."+(positionsCounter-1), 460, 600);
  } else {
    text("Last saved position:", 460, 600);
    text("None", 460, 630);
  }


  
}
function updateData() {
  data = str(saveStatus)+","+str(runStatus)+","+str(round(slider.value()))+","+str(round(slider1.value()))+","+str(round(slider2.value()))+","+str(round(slider3.value()))+","+str(round(slider4.value())) +","+str(speedSlider)+","+str(accelerationSlider);
j1Slider=slider.value();
j2Slider=slider1.value();
j3Slider=slider2.value();
zSlider=slider3.value();
  console.log(data);
}
 function inverseKinematics(x,y,z) {
  theta2 = acos((sq(x) + sq(y) - sq(L1) - sq(L2)) / (2 * L1 * L2));
  if (x < 0 & y < 0) {
    theta2 = (-1) * theta2;
  }
  
  theta1 = atan(x / y) - atan((L2 * sin(theta2)) / (L1 + L2 * cos(theta2)));
  
  theta2 = (-1) * theta2 * 180 / PI;
  theta1 = theta1 * 180 / PI;

 // Angles adjustment depending in which quadrant the final tool coordinate x,y is
  if (x >= 0 & y >= 0) {       // 1st quadrant
    theta1 = 90 - theta1;
  }
  if (x < 0 & y > 0) {       // 2nd quadrant
    theta1 = 90 - theta1;
  }
  if (x < 0 & y < 0) {       // 3d quadrant
    theta1 = 270 - theta1;
    phi = 270 - theta1 - theta2;
    phi = (-1) * phi;
  }
  if (x > 0 & y < 0) {       // 4th quadrant
    theta1 = -90 - theta1;
  }
  if (x < 0 & y == 0) {
    theta1 = 270 + theta1;
  }
  
  // Calculate "phi" angle so gripper is parallel to the X axis
  phi = 90 + theta1 + theta2;
  phi = (-1) * phi;

  // Angle adjustment depending in which quadrant the final tool coordinate x,y is
  if (x < 0 & y < 0) {       // 3d quadrant
    phi = 270 - theta1 - theta2;
  }
  if (abs(phi) > 165) {
    phi = 180 + phi;
  }
  zP=inp2.value();
  theta1=round(theta1);
  theta2=round(theta2);
  phi=round(phi);
  
  slider.value(theta1)
  slider1.value(theta2);
  slider2.value(phi);
  slider3.value(zP);
}