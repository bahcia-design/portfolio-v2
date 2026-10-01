const img = document.querySelector("img")
const hitbox = document.querySelector(".hitbox")
const arrow = document.querySelector(".seta-tutorial")
const answerInput = document.querySelector(".answer")

hitbox.addEventListener("click", () => {
	alert("Como eles me chamam?")

})

arrow.addEventListener("click", () => {
	alert("colocar algo ali")
})

addEventListener("keydown", evt => {
	if (evt.key.toLowerCase() == "enter") {
		const res = answerInput.value.toLowerCase().trim()

		if (res == "anya") {
			window.location.href = ""
			// PASSAR FASE AQUI ANSWER CHECK
		}

		if (res == "farol") {
			alert("é simples mas nem tanto")
		}
	}
})