const gameField = document.querySelector('.game-field');
const sectionRect = gameField.getBoundingClientRect();
const count = document.querySelector('.game-score');
const resultText = document.querySelector('.result-text');

const btnStart = document.querySelector('.game-button');
const countDownTimer = document.querySelector('.game-timer');

const gamePopup = document.querySelector('.pop-up');
const gamePopupText = document.querySelector('.pop-up-text');
const gamePopupRestartBtn = document.querySelector('.pop-up-restart');

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10;
let carrotCount = 0;
let started = false;
let timer = undefined;

const carrotSound = new Audio('sound/carrot_pull.mp3');
const alertSound = new Audio('sound/alert.mp3');
const bgSound = new Audio('sound/bg.mp3');
const winSound = new Audio('sound/game_win.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');

const initGame = () => {
    carrotCount = 0;
    gameField.innerHTML = '';
    count.innerText = CARROT_COUNT;
    addItem('carrot', 5, 'img/carrot.png');
    addItem('bug', 5, 'img/bug.png');
}

const addItem = (className, count, imgPath) => {
    const x1 = 0;
    const y1 = 0;
    const x2 = sectionRect.width-CARROT_SIZE;
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

const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}


btnStart.addEventListener('click', () => {
    if(started){
        showPopup('Replay?');
        stopGame();
    }
    else{
        removePopup();
        startGame();
    }
});

gamePopupRestartBtn.addEventListener('click', () =>{
    removePopup();
    startGame();
});

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

const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
}

const stopSound = (sound) => {
    sound.pause();
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
    showPopup(win?'You Won' : 'You Lose')
}

const onCountingCarrot = () =>{
    carrotCount++;
    count.innerText = CARROT_COUNT - carrotCount;
}

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
    playSound(alertSound);
    stopSound(bgSound);
    stopGameTimer();
}

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

const hideGameButton = () => {
    btnStart.style.visibility = 'hidden';
};

const showStopButton = () => {
    const icon = btnStart.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('.fa-play');
}

const showPopup = (message) => {
    gamePopupText.textContent = message;
    gamePopup.classList.remove('pop-up-hide');
}
const removePopup = () => {
    gamePopup.classList.add('pop-up-hide');
}

const showTimerAndScore = () => {
    count.style.visibility = 'visible';
    countDownTimer.style.visibility = 'visible';
}

// bugs.addEventListener('click', onClickItem);
// carrots.addEventListener('click', onClickItem);
gameField.addEventListener('click', onFieldClick);