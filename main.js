const gameSection = document.querySelector('.game-section');
const bugs = document.querySelector('.bugs');
const carrots = document.querySelector('.carrots');
const sectionRect = gameSection.getBoundingClientRect();


console.log(sectionRect.width, sectionRect.height);

const paintCarrots = () => {
    const carrot = document.createElement('li');
    const carrotImage = document.createElement('img');
    const randX = Math.random() * (sectionRect.width - 0) + 0;
    const randY = Math.random() * (sectionRect.height - 0) + 0;
    carrotImage.setAttribute('src', "img/carrot.png");
    carrot.style.transform = `translate(${randX}px, ${randY}px)`;
    carrot.appendChild(carrotImage);
    carrots.appendChild(carrot);
};

const paintBugs = () => {
    const bug = document.createElement('li');
    const bugImage = document.createElement('img');
    const randX = Math.random() * (sectionRect.width - 0) + 0;
    const randY = Math.random() * (sectionRect.height - 0) + 0;
    bugImage.setAttribute('src', "img/bug.png");
    bug.style.transform = `translate(${randX}px, ${randY}px)`;
    bug.appendChild(bugImage);
    bugs.appendChild(bug);
}

for(let i = 0; i < 10; i++){
    paintCarrots();
    paintBugs();
}