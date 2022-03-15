'use strict';
import * as sound from './sound.js';


const CARROT_SIZE = 80;

export default class Field{
    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.gameField = document.querySelector('.game-field');
        this.sectionRect = this.gameField.getBoundingClientRect();
        this.gameField.addEventListener('click', (event) => this.onClick(event));
    }
    init(){
        this.gameField.innerHTML = '';
        this._addItem('carrot', 5, 'img/carrot.png');
        this._addItem('bug', 5, 'img/bug.png');
    }

    

    _addItem = (className, count, imgPath) => {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.sectionRect.width-CARROT_SIZE; /* 게임 필드 밖으로 아이템이 빠져나가지 않도록 아이템의 크기만큼 빼줌. */
        const y2 = this.sectionRect.height-CARROT_SIZE;
        for (let i = 0; i < count; i++){
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.gameField.appendChild(item);
        }
    }    

    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }
 

    onClick(event){
        const target = event.target;
        if(target.matches('.carrot')){
            sound.playCarrot();
            target.remove();
            this.onItemClick&&this.onItemClick('carrot');
        }
        else if(target.matches('.bug')){
            sound.playBug();
            this.onItemClick&&this.onItemClick('bug');
        }
    }

    
}

const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

