const img = document.querySelector("img")
const answerInput = document.querySelector(".answer")

addEventListener("keydown", evt => {
	if (evt.key.toLowerCase() == "enter") {
		const res = answerInput.value.toLowerCase().trim()

		if (res == "before your eyes" || res == "beforeyoureyes") {
			transition()
		}

		if (res == "color") {
			alert("Não é o lugar certo pra isso")
		}
		if (res == "blank") {
			alert("Não é o lugar certo pra isso")
		}
	}
})


function transition() {
	var iframe = document.createElement("iframe")

	iframe.src = "./asd.html"
	iframe.style.position = "fixed"
	iframe.style.left = "0"
	iframe.style.top = "0"
	iframe.style.width = "100vw"
	iframe.style.height = "100vh"
	iframe.style.border = "0"
	iframe.style.margin = "0"
	iframe.style.padding = "0"
	iframe.style.zIndex = "9998"
	iframe.style.transform = "translateY(-100%)"
	iframe.style.transition = "transform 0.8s cubic-bezier(.65, 0, .25, 1)"

	document.body.appendChild(iframe)

	requestAnimationFrame(function () {
		iframe.style.transform = "translateY(0)"

		setTimeout(() => {
			window.location.href = "./asd.html"
		}, 1500)
	})

}