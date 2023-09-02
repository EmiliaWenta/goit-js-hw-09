function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttons = document.querySelectorAll('button');
const body = document.querySelector('body');
const startBtn = buttons[0];
const stopBtn = buttons[1];

startBtn.addEventListener('click', event => {
  event.stopPropagation;
  generateInterval();
});

stopBtn.addEventListener('click', event => {
  event.stopPropagation;
  clearInterval(timerId);
  stopBtn.setAttribute('disabled', 'disabled');
  startBtn.removeAttribute('disabled');
});

function generateInterval() {
  timerId = setInterval(() => {
    const getColor = getRandomHexColor();
    body.style.background = getColor;
    localStorage.setItem('bodyRandomHexColor', getColor);
    startBtn.setAttribute('disabled', 'disabled');
    stopBtn.removeAttribute('disabled');
  }, 1000);
}
