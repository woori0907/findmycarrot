const gameSection = document.querySelector('.game-section');
const bugs = document.querySelector('.bugs');
const carrots = document.querySelector('.carrots');
const sectionRect = gameSection.getBoundingClientRect();


console.log(sectionRect.width, sectionRect.height);

const paintCarrots = () => {
    const carrot = document.createElement('li');
    const randX = Math.random() * (sectionRect.width - 0) + 0;
    const randY = Math.random() * (sectionRect.height - 0) + 0;
    carrot.style.background = 'url(img/carrot.png) no-repeat'; 
    carrot.style.transform = `translate(${randX}px, ${randY}px)`;
    carrot.classList.add('carrot');
    carrots.appendChild(carrot);
};

const paintBugs = () => {
    const bug = document.createElement('li');
    const randX = Math.random() * (sectionRect.width - 0) + 0;
    const randY = Math.random() * (sectionRect.height - 0) + 0;
    bug.style.background = 'url(img/bug.png) no-repeat';
    bug.style.transform = `translate(${randX}px, ${randY}px)`;
    bug.classList.add('bug');
    bugs.appendChild(bug);
}

const onClickItem = (event) => {
    if(event.target.classList[0] == 'carrot'){
        console.log('carrot!!');
        carrots.removeChild(event.target);
    }
    else if(event.target.classList[0] == 'bug'){
        console.log('bug!!');
    }
}


window.addEventListener('load', () => {
    for(let i = 0; i < 10; i++){
        paintCarrots();
        paintBugs();
    }
});

bugs.addEventListener('click', onClickItem);
carrots.addEventListener('click', onClickItem);