// JavaScript Document

const circle = document.querySelector(".progress-ring__circle");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

//Progress circular timer
circle.style.strokeDasharray = circumference; //defines the width of the dashes and gap between them.
circle.style.strokeDashoffset = circumference; // decreasing stroke-dasharray would start to reveal our shape.

//function caculates the offset creating the circular progress indicator
function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}