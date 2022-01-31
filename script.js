// JavaScript Document
const el = document.querySelector(".clock");
const bell = document.querySelector("audio");

const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");

const startBtn = document.querySelector(".start");
localStorage.setItem("btn", "focus");

let initial, totalsecs, perc, paused, mins, seconds;

startBtn.addEventListener("click", () => {
  let btn = localStorage.getItem("btn");

  if (btn === "focus") {//if button is focus then we need the focusTime from localstorage
    mins = +localStorage.getItem("focusTime") || 1;
  } else {// if button is not focus then will set to break get the breakTime from localstorage
    mins = +localStorage.getItem("breakTime") || 1;
  }

  seconds = mins * 60;//convert secs to mins
  totalsecs = mins * 60;
  setTimeout(decremenT(), 60);
  startBtn.style.transform = "scale(0)";//hide the start button after timer started
  paused = false;// after the timer is started, paused will be set to false
});

function decremenT() {
  mindiv.textContent = Math.floor(seconds / 60);//minutes
  secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;//seconds , if secs is single digit then it will return as two digits.
  if (circle.classList.contains("danger")) {
    circle.classList.remove("danger");
  }
	//every second decremenT() function will be call, textCont for mins, secs will be reassigned, seconds will be decremented by 1 and later circular progress will be set until reaches  0.
  if (seconds > 0) {
    perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);//calculates the percentage. math.ceil ensures a whole number between 0-100
    setProgress(perc);
    seconds--;
    initial = window.setTimeout("decremenT()", 1000);
    if (seconds < 10) {
      circle.classList.add("danger");
    }//circle will pulse if seconds is less then 10.
  } else {//audio played when reached 0.
    mins = 0;
    seconds = 0;
    bell.play();
    let btn = localStorage.getItem("btn");
	  
	  //	shows break after focus timer ran
    if (btn === "focus") {
      startBtn.textContent = "Start Break";
      startBtn.classList.add("break");
      localStorage.setItem("btn", "break");
    } else {//shows focus after break timer ran
      startBtn.classList.remove("break");
      startBtn.textContent = "Start Focus";
      localStorage.setItem("btn", "focus");
    }
    startBtn.style.transform = "scale(1)";// outside conditions start button is visible again
  }
}