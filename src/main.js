'use strict';

//클래스 불러오기
import GameBuilder, { Reason } from './game.js';
import gamePop from './popup.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10;


//객체 생성
const gameFinishBanner = new gamePop();//팝업 객체 생성
const game = new GameBuilder().withGameDuration(5).withCarrotCount(3).withBugCount(3).build();//게임 생성


//게임 종료시 배너 띄워줌
game.setGameStopListener((reason) => {
    let message; 
    switch(reason){
        case Reason.cancel:
            message = 'Replay?';
            break;
        case Reason.win:
            message = 'You Won';
            break;
        case Reason.lose:
            message = 'You Lose';
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWidthText(message);
})

//게임 시작
gameFinishBanner.setClickListener(()=>{
    game.start();
});
