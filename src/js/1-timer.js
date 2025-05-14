import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"
const picker = document.querySelector("#datetime-picker"),
	startButton = document.querySelector("button[data-start]"),
	daysElement = document.querySelector("span[data-days]"),
	hoursElement = document.querySelector("span[data-hours]"),
	minutesElement = document.querySelector("span[data-minutes]"),
	secondsElement = document.querySelector("span[data-seconds]")
const convertMs = ms => {
	const second = 1000
	const minute = second * 60
	const hour = minute * 60
	const day = hour * 24

	const days = Math.floor(ms / day)
	const hours = Math.floor((ms % day) / hour)
	const minutes = Math.floor(((ms % day) % hour) / minute)
	const seconds = Math.floor((((ms % day) % hour) % minute) / second)

	return { days, hours, minutes, seconds }
}
const counter = date => {
	if (timeStarted) return
	if (date - new Date() < 1) {
		iziToast.error({
			title: "Error",
			message: "Illegal operation",
		})
		return
	}
	timeStarted = true
	picker.disabled = true
	startButton.disabled = true
	const interval = setInterval(() => {
		const now = date - new Date()
		if (now < 1) {
			clearInterval(interval)
			timeStarted = false
			picker.disabled = false
			iziToast.success({
				title: "Hey",
				message: "Your timer has ran out of time, now you can start a new one!",
			})
		} else {
			const { days, hours, minutes, seconds } = convertMs(now)
			daysElement.textContent = days.toString().padStart(2, 0)
			hoursElement.textContent = hours.toString().padStart(2, 0)
			minutesElement.textContent = minutes.toString().padStart(2, 0)
			secondsElement.textContent = seconds.toString().padStart(2, 0)
		}
	}, 1000)
}
const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		currentDate = selectedDates[0]
		startButton.disabled = currentDate - new Date() < 1
	},
}
const flatpicker = flatpickr("#datetime-picker", options)
let currentDate = flatpicker.config.now
let timeStarted = false
startButton.addEventListener("click", () => counter(currentDate))
