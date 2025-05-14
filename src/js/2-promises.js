import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"
const form = document.querySelector(".form"),
	delayElement = document.querySelector(`[name="delay"]`)
form.addEventListener("submit", e => {
	e.preventDefault()
	const delay = delayElement.value
	if (delay < 0 || delay.includes("e")) {
		iziToast.error({
			title: "Error",
			message: "Delay must be an integer",
		})
		return
	}
	const stateElement = document.querySelector(`[name="state"]:checked`)
	delayPromise(delay, stateElement.value === "fulfilled")
		.then(() =>
			iziToast.success({
				title: "Promise",
				message: `✅ Fulfilled promise in ${delay}ms`,
			})
		)
		.catch(() =>
			iziToast.error({
				title: "Promise",
				message: `❌ Rejected promise in ${delay}ms`,
			})
		)
	delayElement.value = ""
	stateElement.checked = false
})
const delayPromise = (delay, state) => {
	return new Promise((resolve, reject) =>
		setTimeout(() => (state ? resolve() : reject()), delay)
	)
}
