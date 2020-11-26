var slideIndex = 1;
var timeLeft = 0;
var timer;

var tick = new Audio("ticking-original.mp3");
tick.loop = true;
var horn = new Audio("timesup.mp3");

document.getElementById("pageTitle").innerHTML = data.title;
document.getElementById("headerTitle").innerHTML = data.title;
document.getElementById("totalQuestions").innerHTML = data.questions.length;

var slides = document.getElementById("slides");
for (i = 0; i < data.questions.length; i++) {
    slides.innerHTML += '<div class="slide"><div class="question"><h1>Question</h1><h4>' + data.questions[i].q + '</h4></div><div class="answer"><h1>Answer</h1><h4>' + data.questions[i].a + '</h4></div></div>'; 
}

var sources = document.getElementById("sources");
for (i = 0; i < data.sources.length; i++) {
    sources.innerHTML += '<li><a href="' + data.sources[i] + '" target="_blank">' + data.sources[i] + '</a></li>'; 
}

showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("slide");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  

  //hide all answers
  var x = document.getElementsByClassName("answer");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }

  document.getElementById("questionNumber").innerHTML = slideIndex;
  clearInterval(timer);
  tick.pause();
  document.getElementById("timer").innerHTML = formatTime(data.secondsPerQuestion);

}

function formatTime(seconds) {
    
    var date = new Date(seconds * 1000);
    var hh = date.getUTCHours();
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    
    if (hh < 10) {hh = "0"+hh;}
    if (mm < 10) {mm = "0"+mm;}
    if (ss < 10) {ss = "0"+ss;}
    
    var t = hh+":"+mm+":"+ss;

    return t;
}

function startTimer() {
  timeLeft = data.secondsPerQuestion - 1;
  clearInterval(timer);
  document.getElementById("timer").innerHTML = formatTime(data.secondsPerQuestion);

  tick.play();
  timer = setInterval(function() {

    document.getElementById("timer").innerHTML = formatTime(timeLeft);
    timeLeft -= 1;

    if (timeLeft < 0) {
      clearInterval(timer);
      tick.pause()
      document.getElementById("timer").innerHTML = '<span style="color: red;">TIMES UP</span>';
      horn.play();
    }
  }, 1000);
}

function showAnswer() {
  clearInterval(timer);
  tick.pause();
  var x = document.getElementsByClassName("answer");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block"; 
}