const bodyNode = document.querySelector('#body-js');
const titleNode = document.querySelector('.bored__title-js');
const textNode = document.querySelector('.bored__text-js');
const btnBoredNode = document.querySelector('.bored__btn-js');

const BORED_EMOJI = String.fromCodePoint(129300);
const FIRE_EMOJI = String.fromCodePoint(128293);
const INIT_QUESTION = `${BORED_EMOJI} You get bored?`;
const INIT_ANSWER = `Let's find something to do!`;
const GO_PRESS = `Hurray! Now it's not boring! ${FIRE_EMOJI}`;

const initApp = () => {
  titleNode.textContent = `${INIT_QUESTION}`;
  textNode.textContent = `${INIT_ANSWER}`;
};

initApp();

const getInet = () => {
    fetch('http://www.boredapi.com/api/activity/')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            alert('Попробуй перезагрузить страницу.')
        })
        .then((res) => {
            textNode.textContent = res.activity;
            renderNewStyles();
        })
        .catch(() =>
            alert('Проблемы с подключением к Сети. Проверьте ваше подключение и попробуй перезагрузить страницу.')
        );
};

function renderNewStyles() {
    titleNode.textContent = `${GO_PRESS}`;
    fetch('https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json/')
        .then(response => response.json())
        .then(colorSet => {
            let randomColorIndex = Math.floor(Math.random() * colorSet.length);
            const firstGradientColor = colorSet[randomColorIndex].colors[0];
            const secondGradientColor = colorSet[randomColorIndex].colors[1];
            document.body.style.background = `
            linear-gradient(${firstGradientColor}, ${secondGradientColor})`
        });
};

btnBoredNode.addEventListener('click', getInet);
