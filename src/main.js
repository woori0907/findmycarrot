'use strict';

//클래스 불러오기
import gamePop from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

//UI 관련 DOM요소 받아오기
const count = document.querySelector('.game-score');
const btnStart = document.querySelector('.game-button');
const countDownTimer = document.querySelector('.game-timer');

// game init 관련
let carrotCount = 0; // 게임 스코어
let started = false; // 시작했는지 안 했는지 판단하는 거
let timer = undefined; // 타이머 변수. 처음엔 undefined였다가 나중에 게임 시작하면 타이머 넣어줌.

// 상수
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10;



//객체 생성
const gameFinishBanner = new gamePop();//팝업 객체 생성
const gameField = new Field(CARROT_COUNT,BUG_COUNT);//필드 객체 생성


const onItemClick = (item) => {
    if(!started){
        return;
    }
    console.log(item);
    if(item === 'carrot'){
        onCountingCarrot();
        if(carrotCount === CARROT_COUNT){
            finishGame(true);
        }
    }
    else if(item === 'bug'){
        finishGame(false);
    }
}

gameField.setClickListener(onItemClick);

gameFinishBanner.setClickListener(()=>{
    startGame();
});

// 게임 초기화
const initGame = () => {
    carrotCount = 0;
    count.innerText = CARROT_COUNT;
    gameField.init();//gameField 객체 안의 init 함수를 통해서 게임 필드에 아이템 초기화 시킴.
}



const onCountingCarrot = () =>{
    carrotCount++;
    count.innerText = CARROT_COUNT - carrotCount;
}

const finishGame = (win) => {
    started = false;
    sound.stopBg();
    if(win){
        sound.playWin();
    }
    else{
        sound.playWin();
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
    sound.playBg();
    btnStart.style.visibility = 'visible';
}
const stopGame = () => {
    started = false;
    gameFinishBanner.showWidthText('Replay?');
    sound.playAlert();
    sound.stopBg();
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


// gameField.addEventListener('click', onFieldClick);

// gameFinishBanner.gamePopupRestartBtn.addEventListener('click', () =>{
//     startGame();
// });
