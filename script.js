const btn = document.querySelector('button')
const cells = document.querySelectorAll('.cell')
const gameContainer = document.querySelector('.cell-container')
const score = document.querySelector('#score>span')
const highScore = document.querySelector('#high-score>span')
let audioTurn = new Audio("ting.mp3")
let audioGameOver = new Audio("gameover.mp3")

let LEVEL = 0
let GAME_PATTERN = []
let USER_CLICK_COUNT = 0
let HISCORE = 0
if(localStorage['high-score']){
  HISCORE = +localStorage['high-score']
  highScore.innerHTML = HISCORE
}

const blinkBox = (elem, timeoutDiv) => {
    setTimeout(()=>{
        elem.classList.add('active')
    },timeoutDiv*300)
    setTimeout(()=>{
        elem.classList.remove('active')
    },timeoutDiv*300+300)
}

const runPattern = () => {
    score.innerHTML = LEVEL
    if(LEVEL>HISCORE){
        HISCORE = LEVEL
        localStorage['high-score'] = HISCORE
        highScore.innerHTML = HISCORE
    }
    LEVEL++
    for(let i=0;i<LEVEL;i++){
        setTimeout(()=>{
            const randInd = Math.floor(Math.random()*8)
            blinkBox(cells[randInd], i)
            GAME_PATTERN.push(randInd)
        }, 300*i+300)
    }
}

const gameOver = () => {
    btn.disabled = false
    gameContainer.removeEventListener('click', handleGameClick)
    LEVEL = 0
    score.innerHTML = LEVEL
    GAME_PATTERN = []
    USER_CLICK_COUNT = 0
}

const handleGameClick = e => {
    audioTurn.currentTime = 0
    audioTurn.play();
    blinkBox(e.target, 0)
    const correctIndex = GAME_PATTERN[USER_CLICK_COUNT]
    USER_CLICK_COUNT++
    if(e.target!==cells[correctIndex]){
        audioTurn.pause()
        audioGameOver.play()
        alert("Gameover")
    gameOver()
    return
  }
  if(USER_CLICK_COUNT===LEVEL){
    GAME_PATTERN = []
    USER_CLICK_COUNT = 0
    setTimeout(runPattern,300)
  }
}

const startGame = () => {
  btn.disabled = true
  runPattern()
  gameContainer.addEventListener('click', handleGameClick)
}

btn.addEventListener('click', startGame)