import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');

function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;

  const formData = {
    delay: form.elements.delay.value,
    step: form.elements.step.value,
    position: form.elements.amount.value,
  };

  localStorage.setItem('delay', formData.delay);
  localStorage.setItem('step', formData.step);
  localStorage.setItem('position', formData.position);
}

form.addEventListener('submit', handleSubmit);
const position = localStorage.getItem('position');
const delay = localStorage.getItem('delay');
const step = localStorage.getItem('step');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', () => {
  const position = +localStorage.getItem('position');
  const delay = +localStorage.getItem('delay');
  const step = +localStorage.getItem('step');

  for (let i = 1; i <= position; i++) {
    createPromise(i, delay + step * i - step)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
