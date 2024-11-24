import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = form.elements.delay.value;
  const selectedState = form.elements.state.value;

  const delay = parseInt(delayInput, 10);

  if (isNaN(delay) || delay < 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid delay in milliseconds!',
    });
    return;
  }

  createPromise(delay, selectedState)
    .then(message => {
      iziToast.success({
        title: '✅ Success',
        message: message,
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        color: '#00FF00',
        icon: '',
      });
    })
    .catch(message => {
      iziToast.error({
        title: '❌ Error',
        message: message,
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        color: '#FF0000',
        icon: '',
      });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}
