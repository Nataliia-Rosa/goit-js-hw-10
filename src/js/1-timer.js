import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button[data-start]');
const resetButton = document.querySelector('button[data-reset]');
const datetimePicker = document.querySelector('#datetime-picker');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

let timerInterval = null;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        timeout: 2000,
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        color: '#FF0000',
        icon: '',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      resetButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysField.textContent = addLeadingZero(days);
  hoursField.textContent = addLeadingZero(hours);
  minutesField.textContent = addLeadingZero(minutes);
  secondsField.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function startTimer() {
  const now = new Date();
  const targetTime = userSelectedDate;

  datetimePicker.disabled = true;
  startButton.disabled = true;

  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      iziToast.success({ title: 'Success', message: 'Countdown Complete!' });
      datetimePicker.disabled = false;
      startButton.disabled = true;
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      updateTimerDisplay(convertMs(timeDifference));
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  datetimePicker.disabled = false;
  startButton.disabled = true;
  resetButton.disabled = true;

  iziToast.info({ title: 'Reset', message: 'Timer has been reset!' });
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
