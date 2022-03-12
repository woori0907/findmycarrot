'use strict';

export default class Popup{
    constructor() {
        // 팝업 element
        this.gamePopup = document.querySelector('.pop-up');
        this.gamePopupText = document.querySelector('.pop-up-text');
        this.gamePopupRestartBtn = document.querySelector('.pop-up-restart');
        this.gamePopupRestartBtn.addEventListener('click', ()=>{
            this.onClick && this.onClick();
            this.hide();
        });
    }

    setClickListener(onClick){
        this.onClick = onClick;
    }
    hide() {
        this.gamePopup.classList.add('pop-up-hide');
    }
    showWidthText(message){
        this.gamePopupText.textContent = message;
        this.gamePopup.classList.remove('pop-up-hide');
    }
}