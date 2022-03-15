// 사운드
const alertSound = new Audio('sound/alert.mp3');
const bgSound = new Audio('sound/bg.mp3');
const winSound = new Audio('sound/game_win.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const carrotSound = new Audio('sound/carrot_pull.mp3');
 
export const playCarrot = () => {
    playSound(carrotSound);
}

export const playBug = () => {
    playSound(bugSound);
}

export const playBg = () => {
    playSound(bgSound);
}

export const stopBg = () => {
    stopSound(bgSound);
}

export const playWin = () => {
    playSound(winSound);
}

export const playAlert = () => {
    playSound(alertSound);
}

// 음악, 효과음 재생 관련 함수
const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
}

const stopSound = (sound) => {
    sound.pause();
}
