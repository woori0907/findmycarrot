const gameField = document.querySelector('.game-field');
const sectionRect = gameField.getBoundingClientRect();
const count = document.querySelector('.game-score');
const resultText = document.querySelector('.result-text');
const btnRestart = document.querySelector('.btn-restart');
const btnStart = document.querySelector('.game-button');
const countDownTimer = document.querySelector('.game-timer');

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
let carrotCount = 0;
let started = false;
let timer = undefined;


const initGame = () => {
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

//당근 세는 함수
const onCountingCarrot = () =>{
    carrotCount++;
    count.innerText = carrotCount;
    if(carrotCount == 10){
        //게임오버 창 띄우기 : you win으로!
        onGameOver('win');
    }
}

//타이머 함수
const getCountDownTimer = (status) => {
    let secondRemaining = 10;
    let countDownInterval = setInterval(()=>{
        if(status == 'play'){
            countDownTimer.textContent = `0:${secondRemaining}`;
            secondRemaining--;
            console.log(secondRemaining);
        }
        else if(status == 'pause'){
            clearInterval(countDownInterval);
        }
        if(secondRemaining < 0){
            clearInterval(countDownInterval);
            onGameOver('lose');
        }
    }, 1000);
}

//클릭하면 처리하는 함수
const onClickItem = (event) => {
    if(event.target.classList[0] == 'carrot'){
        carrots.removeChild(event.target);
        // 카운팅하기
        onCountingCarrot();
    }
    else if(event.target.classList[0] == 'bug'){
        // 게임오버 : you lose로!
        onGameOver('lose');
    }
}

//뿌려진 애들 다 지우는 거
const removeAllItem = () =>{
    while(bugs.firstChild){
        bugs.removeChild(bugs.firstChild);
    }
    while(carrots.firstChild){
        carrots.removeChild(carrots.firstChild);
    }
}

//게임오버 처리
const onGameOver = (status) => {
    if(status == 'win'){
        resultText.innerText = 'You Win!';
    }
    else if(status == 'lose'){
        resultText.innerText = 'You lose';
    }
    btnRestart.addEventListener('click', onInitGame);
}

//게임 일시정지
const onGamePauseToggle = () => {
    if(timerStatus == 'play'){
        timerStatus = 'pause';
    }
    else{
        timerStatus = 'play';
    }
    getCountDownTimer(timerStatus);
}

//게임 초기화 부분. 나중에는 스타트 버튼 누르면 나오는 거로 바꿀 것.
btnStart.addEventListener('click', () => {
    if(started){
        stopGame();
    }
    else{
        startGame();
    }
    started = !started;
});

const startGame = () => {
    initGame();
    showStopButton();
    showTimerAndScore();
}
const stopGame = () => {

}
const showStopButton = () => {
    const icon = btnStart.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('.fa-play');
}

const showTimerAndScore = () => {
    count.style.visibility = 'visible';
    countDownTimer.style.visibility = 'visible';
}

// bugs.addEventListener('click', onClickItem);
// carrots.addEventListener('click', onClickItem);