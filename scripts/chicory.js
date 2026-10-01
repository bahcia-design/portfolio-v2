const img = document.querySelector("img")
const answerInput = document.querySelector(".answer")

addEventListener("keydown", evt => {
	if (evt.key.toLowerCase() == "enter") {
		const res = answerInput.value.toLowerCase().trim()

		if (res == "before your eyes") {
			window.location.href = ""
			// PASSAR FASE AQUI ANSWER CHECK
		}

		if (res == "color") {
			alert("nao é a resposta nem o lugar certo pra isso")
		}
	}
})