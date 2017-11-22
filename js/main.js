(function() {
  "use strict";

var data = '{ "quiz": [' +
'{ "speech":"I Have a Dream", "audioFile":"audio/king.mp3", "a":"images/roosevelt.png", "b":"images/king.png", "c":"images/lincoln.png", "d":"images/churchill.png", "answer":"b", "captions": [{"name":"Theodore Roosevelt"}, {"name":"Martin Luther King"}, {"name":"Abraham Lincoln"}, {"name":"Winston Churchill"}] },' +
'{ "speech":"Duties of American Citizenship", "audioFile":"audio/roosevelt.mp3", "a":"images/lincoln.png", "b":"images/churchill.png", "c":"images/eisenhower.png", "d":"images/roosevelt.png", "answer":"d", "captions": [{"name":"Abraham Lincoln"}, {"name":"Winston Churchill"}, {"name":"Dwight Eisenhower"}, {"name":"Theodore Roosevelt"}] },' +
'{ "speech":"Tis Not Too Late to Seek A Newer World", "audioFile":"audio/kennedy_b.mp3", "a":"images/kennedy_b.png", "b":"images/nixon.png", "c":"images/kennedy_j.png", "d":"images/johnson.png", "answer":"a", "captions": [{"name":"Bobby Kennedy"}, {"name":"Richard Nixon"}, {"name":"John Kennedy"}, {"name":"Lyndon Johnson"}] },' +
'{ "speech":"Spiritual Message", "audioFile":"audio/gandhi.mp3", "a":"images/tutu.png", "b":"images/yogi.png", "c":"images/dalai_lama.png", "d":"images/gandhi.png", "answer":"d", "captions": [{"name":"Desmond Tutu"}, {"name":"Maharishi Mahesh Yogi"}, {"name":"Dalai Lama"}, {"name":"Mahatma Gandhi"}] },' +
'{ "speech":"Address to the Nation on the War in Vietnam", "audioFile":"audio/nixon.mp3", "a":"images/kennedy_j.png", "b":"images/eisenhower.png", "c":"images/nixon.png", "d":"images/reagan.png", "answer":"c", "captions": [{"name":"John Kennedy"}, {"name":"Dwight Eisenhower"}, {"name":"Richard Nixon"}, {"name":"Ronald Reagan"}] },' +
'{ "speech":"We Shall Fight on the Beaches", "audioFile":"audio/churchill.mp3", "a":"images/churchill.png", "b":"images/roosevelt.png", "c":"images/king.png", "d":"images/chamberlain.png", "answer":"a", "captions": [{"name":"Winston Churchill"}, {"name":"Theodore Roosevelt"}, {"name":"Martin Luther King"}, {"name":"Neville Chamberlain"}] },' +
'{ "speech":"Meaning of a Successful Life", "audioFile":"audio/dalai_lama.mp3", "a":"images/francis.png", "b":"images/dalai_lama.png", "c":"images/gandhi.png", "d":"images/tutu.png", "answer":"b", "captions": [{"name":"Pope Francis"}, {"name":"Dalai Lama"}, {"name":"Mahatma Gandhi"}, {"name":"Desmond Tutu"}] },' +
'{ "speech":"Address on the Challenger Disaster", "audioFile":"audio/reagan.mp3", "a":"images/clinton.png", "b":"images/johnson.png", "c":"images/reagan.png", "d":"images/nixon.png", "answer":"c", "captions": [{"name":"Bill Clinton"}, {"name":"Lyndon Johnson"}, {"name":"Ronald Reagan"}, {"name":"Richard Nixon"}] } ]}';

  var jsonObj = JSON.parse(data);
  // console.log(jsonObj);

  var order = document.querySelector("#ordenation");
  var speech = document.querySelector("#speech > span");
  var audio = document.querySelector("#myAudio");
  var audioSrc = audio.querySelector("source");
  var photoA = document.querySelector("#a");
  var photoB = document.querySelector("#b");
  var photoC = document.querySelector("#c");
  var photoD = document.querySelector("#d");
  var captions = document.querySelectorAll(".captions");
  var nextBtn = document.querySelector("#next");
  var restBtn = document.querySelector("#restart");
  var score = document.querySelector("#score");
  var total = document.querySelector("#total");
  var overDiv = document.querySelector("#gameOver");
  var overScore = overDiv.querySelector("#overScore");
  var overTotal = overDiv.querySelector("#overTotal");
  var questionNum = 0;
  var points = 0;
  var isClicked = false;

  total.textContent = jsonObj["quiz"].length;

  function init() {
    order.textContent = questionNum + 1;
    audioSrc.src = jsonObj["quiz"][questionNum].audioFile;
    audio.load();
    speech.textContent = jsonObj["quiz"][questionNum].speech;
    for (var i = 0; i < 4 ; i++) {
      captions[i].textContent = jsonObj["quiz"][questionNum].captions[i].name;
      captions[i].style.color = null;
      captions[i].style.fontWeight = null;
    }
    photoA.src = jsonObj["quiz"][questionNum].a;
    photoB.src = jsonObj["quiz"][questionNum].b;
    photoC.src = jsonObj["quiz"][questionNum].c;
    photoD.src = jsonObj["quiz"][questionNum].d;
    photoA.style.opacity = null;
    photoB.style.opacity = null;
    photoC.style.opacity = null;
    photoD.style.opacity = null;
    nextBtn.textContent = "Skip question";
    score.textContent = points;
    isClicked = false;
  }

  function checkAnswer(evt) {
    evt.preventDefault();
    if (!isClicked) {
      isClicked = true;
      var evtCap = colorCaption(evt.currentTarget.id);
      opacityPhotos();
      if (evt.currentTarget.id == jsonObj["quiz"][questionNum].answer) {
        // console.log("correct");
        points++;
        score.textContent = points;
        captions[evtCap].style.color = "#097909";
        captions[evtCap].style.fontWeight = "bold";
      }
      else {
        // console.log("wrong");
        var corCap = colorCaption(jsonObj["quiz"][questionNum].answer);
        captions[evtCap].style.color = "#c90d0d";
        captions[corCap].style.color = "#097909";
        captions[corCap].style.fontWeight = "bold";
      }
      nextBtn.textContent = "Next question";
    }
  }

  function opacityPhotos() {
    photoA.style.opacity = 0.5;
    photoB.style.opacity = 0.5;
    photoC.style.opacity = 0.5;
    photoD.style.opacity = 0.5;
    if (jsonObj["quiz"][questionNum].answer == "a") {
      photoA.style.opacity = 1;
    }
    else if (jsonObj["quiz"][questionNum].answer == "b") {
      photoB.style.opacity = 1;
    }
    else if (jsonObj["quiz"][questionNum].answer == "c") {
      photoC.style.opacity = 1;
    }
    else{
      photoD.style.opacity = 1;
    }
  }

  function colorCaption(id) {
    var posCap;
    if (id == "a") {
      posCap = 0;
    }
    else if (id == "b") {
      posCap = 1;
    }
    else if (id == "c") {
      posCap = 2;
    }
    else {
      posCap = 3;
    }
    return posCap;
  }

  function nextQuestion() {
    questionNum++;
    console.log(jsonObj["quiz"].length);
    if (questionNum < jsonObj["quiz"].length) {
      init();
    }
    else {
      nextBtn.style.display = "none";
      restBtn.style.display = "inline";
      overScore.textContent = points;
      overTotal.textContent = jsonObj["quiz"].length;
      overDiv.style.display = "block";
    }
  }

  function restartTest() {
    location.reload();
  }

  window.addEventListener("load", init, false);
  photoA.addEventListener("click", checkAnswer, false);
  photoB.addEventListener("click", checkAnswer, false);
  photoC.addEventListener("click", checkAnswer, false);
  photoD.addEventListener("click", checkAnswer, false);
  nextBtn.addEventListener("click", nextQuestion, false);
  restBtn.addEventListener("click", restartTest, false);

})();
