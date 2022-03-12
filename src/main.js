'use strict';
import gamePop from './popup.js';

const gameField = document.querySelector('.game-field');
const sectionRect = gameField.getBoundingClientRect();
const count = document.querySelector('.game-score');

const btnStart = document.querySelector('.game-button');
const countDownTimer = document.querySelector('.game-timer');



// game init 관련
let carrotCount = 0;
let started = false;
let timer = undefined;

// 상수
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10;

// 사운드
const carrotSound = new Audio('sound/carrot_pull.mp3');
const alertSound = new Audio('sound/alert.mp3');
const bgSound = new Audio('sound/bg.mp3');
const winSound = new Audio('sound/game_win.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');

const gameFinishBanner = new gamePop();

gameFinishBanner.setClickListener(()=>{
    startGame();
});

// 게임 초기화
const initGame = () => {
    carrotCount = 0;
    gameField.innerHTML = '';
    count.innerText = CARROT_COUNT;
    addItem('carrot', 5, 'img/carrot.png');
    addItem('bug', 5, 'img/bug.png');
}

const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

// 아이템 뿌려주는 함수. 클래스이름과 갯수, 이미지 경로를 받아와서 랜덤한 위치에 뿌려줌.
const addItem = (className, count, imgPath) => {
    const x1 = 0;
    const y1 = 0;
    const x2 = sectionRect.width-CARROT_SIZE; /* 게임 필드 밖으로 아이템이 빠져나가지 않도록 아이템의 크기만큼 빼줌. */
    const y2 = sectionRect.height-CARROT_SIZE;
    for (let i = 0; i < count; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        gameField.appendChild(item);
    }
}

// 음악, 효과음 재생 관련 함수
const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
}
const stopSound = (sound) => {
    sound.pause();
}

// 게임 필드 클릭 처리함수.
const onFieldClick = (event) => {
    if(!started){
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')){
        playSound(carrotSound);
        event.target.remove();
        // 카운팅하기
        onCountingCarrot();
        if(carrotCount === CARROT_COUNT){
            finishGame(true);
        }
    }
    else if(target.matches('.bug')){
        // 게임오버 : you lose로!
        finishGame(false);
    }
}

const onCountingCarrot = () =>{
    carrotCount++;
    count.innerText = CARROT_COUNT - carrotCount;
}

const finishGame = (win) => {
    started = false;
    stopSound(bgSound);
    if(win){
        playSound(winSound);
    }
    else{
        playSound(bugSound);
    }
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWidthText(win?'You Won' : 'You Lose')
}

// 게임 시작, 종료 관련 함수
const startGame = () => {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
    btnStart.style.visibility = 'visible';
}
const stopGame = () => {
    started = false;
    gameFinishBanner.showWidthText('Replay?');
    playSound(alertSound);
    stopSound(bgSound);
    stopGameTimer();
}

// 타이머 관리 함수
const startGameTimer = () => {
    let secondRemaining = GAME_DURATION_SEC;
    countDownTimer.textContent = `0:${secondRemaining}`;
    timer = setInterval(()=>{
        if(started){
            countDownTimer.textContent = `0:${secondRemaining}`;
            secondRemaining--;
        }
        if(secondRemaining < 0){
            clearInterval(timer);
            finishGame(false);
        }
    }, 1000);
}
const stopGameTimer = () => {
    hideGameButton();
    clearInterval(timer);
}


// 게임 UI관련 함수
const hideGameButton = () => {
    btnStart.style.visibility = 'hidden';
};
const showStopButton = () => {
    const icon = btnStart.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('.fa-play');
}

const showTimerAndScore = () => {
    count.style.visibility = 'visible';
    countDownTimer.style.visibility = 'visible';
}


// 이벤트 리스너
btnStart.addEventListener('click', () => {
    if(started){
        stopGame();
    }
    else{
        startGame();
    }
});


gameField.addEventListener('click', onFieldClick);

// gameFinishBanner.gamePopupRestartBtn.addEventListener('click', () =>{
//     startGame();
// });
