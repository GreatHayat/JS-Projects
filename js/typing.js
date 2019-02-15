window.addEventListener('load', init);
const Gamelevel = {
  easy: 6,
  medium: 4,
  hard: 2
};

let time = 5;
let score = 0;
let isPlaying;

const wordinput = document.querySelector('#word-input');
const currentword = document.querySelector('#current-word');
const timeDisplay = document.querySelector('#time');
const totalScore = document.querySelector('#score');
const message = document.querySelector('#message');

const words = [
  'JavaScript', 'Angular','React','Native','Vue','Ember','Template','Node',
  'C++','C#','.NET','Xamarine','Azure','Core','Web API','TypeScript',
  'Perl','Scala','Java','PHP','Ruby','Python','Django','Flask','WebPy','WinForms',
  'JSF','JSP','Spring','Hibernate','Entity','Laravel','Cake PHP',
  'CodeIgneter','GitHub','GitLab','Spiral','Agile','WaterFall','CBSE','Incremental',
  'Wordpress','Magento','Shopify','Joomla','PSD','Illustrator','After Effect','Premier','InDesign',
];

function init(){
  showwords(words);
  wordinput.addEventListener('input', startMatch);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 50);
}

function startMatch(){
  if(matchwords()){
    isPlaying = true;
    time = 6;
    showwords(words);
    wordinput.value = '';
    score++;
    document.getElementById('score').style.color = '#4DF0D4';
  }
  if(score == -1){
    totalScore.innerHTML = 0;
  }
  else{
    totalScore.innerHTML = score;
  }
}

function matchwords(){
  if(wordinput.value === currentword.innerHTML){
    message.innerHTML = 'Correct Matching!';
    document.getElementById('message').style.color = '#5EB23E';
    return true;
  }
  else{
    message.innerHTML = '';
    return false;
  }
}

function showwords(words){
  const ranIndex = Math.floor(Math.random() * words.length);
  currentword.innerHTML = words[ranIndex];
}

function countdown(){
  if(time > 0){
    time--;
  }
  else if(time === 0){
    isPlaying = false;
    document.getElementById('time').style.color = '#FF782C';
  }
  timeDisplay.innerHTML = time;
}

function checkStatus(){
  if(!isPlaying && time === 0){
    message.innerHTML = 'Game Over!!!';
    document.getElementById('message').style.color = '#FF5746';
    score = -1;
  }
}
