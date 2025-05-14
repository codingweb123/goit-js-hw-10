import { isEmail } from "validator"
import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"
const storageKey = "feedback-form-state"
const formData = {
	email: JSON.parse(localStorage.getItem(storageKey))?.email ?? "",
	message: JSON.parse(localStorage.getItem(storageKey))?.message ?? "",
}
localStorage.setItem(storageKey, JSON.stringify(formData))
const form = document.querySelector(".feedback-form")
;[...form.elements].map(item => {
	if (item.nodeName !== "INPUT" && item.nodeName !== "TEXTAREA") return
	item.value = formData[item.name]
})
const checkValidity = () => {
	return (
		formData.email.trim() === "" ||
		!isEmail(formData.email) ||
		formData.message.trim() === ""
	)
}
form.addEventListener("input", e => {
	formData[e.target.name] = e.target.value
	localStorage.setItem(storageKey, JSON.stringify(formData))
})
form.addEventListener("submit", e => {
	e.preventDefault()
	if (checkValidity()) {
		iziToast.error({
			title: "Hey",
			message: "Fill please all fields!",
		})
		return
	}
	iziToast.success({
		title: "Yoopeee",
		message: "Thank you for sending your message! 😊",
	})
	;[...form.elements].map(item => {
		if (item.nodeName !== "INPUT" && item.nodeName !== "TEXTAREA") return
		formData[item.name] = ""
		item.value = ""
	})
	localStorage.removeItem(storageKey)
})
