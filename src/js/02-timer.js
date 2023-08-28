import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timerBox = document.querySelector('.timer');
timerBox.style.display = 'flex';
timerBox.style.gap = '15px';
const spanWithValue = document.querySelectorAll('.value');

const timerBoxFieldsArray = () => {
  const array = [];
  const item = document.querySelectorAll('.field');
  array.push(...item);

  for (const item of array) {
    item.style.display = 'flex';
    item.style.flexDirection = 'column';
    item.firstElementChild.style.display = 'flex';
    item.firstElementChild.style.fontSize = '30px';
    item.firstElementChild.style.lineHeight = '20px';
    item.firstElementChild.style.paddingTop = ' 15px';
    item.firstElementChild.style.paddingBottom = ' 5px';
    item.firstElementChild.style.justifyContent = 'center';
    item.lastElementChild.style.textTransform = 'uppercase';
  }
};

timerBoxFieldsArray();
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  for (const key in value) {
    if (value[key] < 10) {
      value[key] = value[key].toString().padStart(2, '0');
    } else {
      continue;
    }
  }
  return value;
}
const startBtn = document.querySelector('button');
startBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();

    if (selectedDates[0] > date) {
      localStorage.setItem('chosedDate', `${selectedDates[0].getTime()}`);
      startBtn.removeAttribute('disabled');
    } else {
      startBtn.setAttribute('disabled', 'disabled');
      alert('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

function generateTime() {
  timrerId = setInterval(() => {
    const chosedDate = localStorage.getItem('chosedDate');
    const todayDate = new Date().getTime();

    const ms = chosedDate - todayDate;

    localStorage.setItem('convertMS', JSON.stringify(convertMs(ms)));

    const value = JSON.parse(localStorage.getItem('convertMS'));

    addLeadingZero(value);

    const valueArray = Object.values(value);

    for (let i = 0; i < spanWithValue.length; i++) {
      spanWithValue[i].textContent = valueArray[i];
    }
  }, 1000);
}

startBtn.addEventListener('click', event => {
  event.stopPropagation();
  generateTime();
});
