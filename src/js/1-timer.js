import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"

const button = document.querySelector('button[data-start]')
const textDays = document.querySelector('span[data-days]')
const textHours = document.querySelector('span[data-hours]')
const textMinutes = document.querySelector('span[data-minutes]')
const textSeconds = document.querySelector('span[data-seconds]')

let userSelectedDate = 0
let intervalId = null

button.disabled = true

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0]<options.defaultDate) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                maxWidth: 400,
                position: "topRight",
            });
             clear()
        } else {
            clear()
            userSelectedDate = selectedDates[0]
            button.disabled = false
        }
    },
};

function clear() {
    clearInterval(intervalId)
    textDays.textContent = '00'
    textHours.textContent = '00'
 textMinutes.textContent = '00'
 textSeconds.textContent = '00'
}

function getDate() {
    const nowDate = userSelectedDate - new Date
    if(nowDate<0)return
    convertMs(nowDate)
    console.log(nowDate)
}

flatpickr("#datetime-picker", options);

function convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        textDays.textContent = Math.floor(ms / day).toString().padStart(2, '0');
        // Remaining hours
        textHours.textContent = Math.floor((ms % day) / hour).toString().padStart(2, '0');
        // Remaining minutes
        textMinutes.textContent = Math.floor(((ms % day) % hour) / minute).toString().padStart(2, '0');
        // Remaining seconds
        textSeconds.textContent = Math.floor((((ms % day) % hour) % minute) / second).toString().padStart(2, '0');
}

button.addEventListener('click', () => {
         button.disabled = true
   intervalId = setInterval(() => {
       getDate()
       }, 1000)}
)