const gameSection = document.querySelector('.game-section');
const bugs = document.querySelector('.bugs');
const carrots = document.querySelector('.carrots');
const sectionRect = gameSection.getBoundingClientRect();
const count = document.querySelector('.carrot-counter');
const resultText = document.querySelector('.result-text');
const btnRestart = document.querySelector('.btn-restart');
const btnStart = document.querySelector('.btn-start');
const countDownTimer = document.querySelector('.countdown-timer');

let carrotCount = 0;


//당근 뿌리기
const paintCarrots = () => {
    const carrot = document.createElement('li');
    const randX = Math.random() * (sectionRect.width - 0) + 0;
    const randY = Math.random() * (sectionRect.height - 0) + 0;
    carrot.style.background = 'url(img/carrot.png) no-repeat'; 
    carrot.style.transform = `translate(${randX}px, ${randY}px)`;
    carrot.classList.add('carrot');
    carrots.appendChild(carrot);
};

//곤충 뿌리기
const paintBugs = () => {
    const bug = document.createElement('li');
    const randX = Math.random() * (sectionRect.width - 0) + 0;
    const randY = Math.random() * (sectionRect.height - 0) + 0;
    bug.style.background = 'url(img/bug.png) no-repeat';
    bug.style.transform = `translate(${randX}px, ${randY}px)`;
    bug.classList.add('bug');
    bugs.appendChild(bug);
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
        countDownTimer.textContent = `0:${secondRemaining}`;
        secondRemaining--;
        if(secondRemaining < 0){
            clearInterval(countDownInterval);
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

//게임 초기화
const onInitGame = () => {
    carrotCount = 0;
    count.innerText = carrotCount;
    resultText.innerText = '';
    removeAllItem();
    btnRestart.removeEventListener('click', onInitGame);
    for(let i = 0; i < 10; i++){
        paintCarrots();
        paintBugs();
    }
    getCountDownTimer();
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
const onGamePause = () => {

}

//게임 초기화 부분. 나중에는 스타트 버튼 누르면 나오는 거로 바꿀 것.
btnStart.addEventListener('click', onInitGame);

bugs.addEventListener('click', onClickItem);
carrots.addEventListener('click', onClickItem);