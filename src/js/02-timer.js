import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
    input: document.querySelector("#datetime-picker"),
    start: document.querySelector("[data-start]"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
}


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0]< Date.now) {
     Notiflix.Notify.warning('Please choose a date in the future');
     refs.start.setAttribute("disabled", true)
    }
    refs.start.removeAttribute("disabled",)
  },
};

  const clock = flatpickr(refs.input, options);

  refs.start.addEventListener('click', startTimer);
  
  function startTimer() {
    const setTime = clock.selectedDates[0];
  
    const intervals =  setInterval(() => {
      const todaytime = Date.now();
      let msec = setTime - todaytime;
  
      timerHtml(addZero(convertMs(msec)));
  
  
      if (msec <= 1000) {
        clearInterval(intervals)
      }
    }, 1000);

  }
  
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
  
  function addZero({ days, hours, minutes, seconds }) {
      days = days.toString().padStart(2, 0)
      hours = hours.toString().padStart(2, 0)
      minutes = minutes.toString().padStart(2, 0)
      seconds = seconds.toString().padStart(2, 0)
  
      return { days, hours, minutes, seconds }
  }
  
  function timerHtml({ days, hours, minutes, seconds }){
      refs.days.textContent = days
      refs.hours.textContent = hours
      refs.minutes.textContent = minutes
      refs.seconds.textContent = seconds
  }