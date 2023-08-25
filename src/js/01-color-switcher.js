function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttons = document.querySelectorAll('button');
const body = document.querySelector('body');
startBtn = buttons[0];
stopBtn = buttons[1];

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    const getColor = getRandomHexColor();
    body.style.background = getColor;
    localStorage.setItem('bodyRandomHexColor', getColor);
    startBtn.setAttribute('disabled', 'disabled');
    stopBtn.removeAttribute('disabled');
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  const currentColor = localStorage.getItem('bodyRandomHexColor');
  clearInterval(timerId);
  body.style.background = currentColor;
  stopBtn.setAttribute('disabled', 'disabled');
  startBtn.removeAttribute('disabled');
});
