const img = document.querySelector("img")
const answerInput = document.querySelector(".answer")


addEventListener("keydown", evt => {
	if (evt.key.toLowerCase() == "enter") {
		const res = answerInput.value.toLowerCase().trim()

		if (res == "road96" || res == "road 96") {
			transition()
		}

		if (res == "nadia keane" || res == "nadia" || res == "keane") {
			alert("O que está dentro de algo que ela fez pode te ajudar")
		}
		if (res == "road") {
			alert("Road..")
		}
		if (res == "96") {
			alert("..96")
		}
	}
})


function transition() {
	var overlay = document.createElement("div")
	var secao = document.createElement("div")
	var botao = document.createElement("button")
	var iframe = document.createElement("iframe")

	overlay.style.position = "fixed"
	overlay.style.left = "0"
	overlay.style.top = "0"
	overlay.style.width = "100vw"
	overlay.style.height = "100vh"
	overlay.style.background = "#111"
	overlay.style.zIndex = "9999"
	overlay.style.transform = "translateY(-100%)"
	overlay.style.transition = "transform 0.8s cubic-bezier(.65, 0, .25, 1)"
	overlay.style.display = "flex"
	overlay.style.flexDirection = "column"
	overlay.style.alignItems = "center"
	overlay.style.justifyContent = "center"

	secao.style.width = "80%"
	secao.style.maxWidth = "800px"
	secao.style.minHeight = "300px"
	secao.style.display = "flex"
	secao.style.flexDirection = "column"
	secao.style.alignItems = "center"
	secao.style.justifyContent = "center"
	secao.innerHTML = `
	<div class="fase-concluida"> 
		<h2 class="fdsdesc"><span class="joia">👍</span></h2>
		<p > pra próxima fase você vai ter que jogar <a href="https://store.steampowered.com/app/1466640/Road_96/" target="_blank" rel="noopener noreferrer">Road 96</a> </p> 
	</div>`

	botao.textContent = "Avançar"
	botao.classList.add("adv-btn")

	overlay.appendChild(secao)
	overlay.appendChild(botao)

	iframe.src = "./was.html"
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
	document.body.appendChild(overlay)

	requestAnimationFrame(function () {
		overlay.style.transform = "translateY(0)"
		// setTimeout(() => {
		// 	for(let i=0;i<20;i++){
		// 		setTimeout(() => {
		// 			explodirConfete(document.querySelector(".fdsdesc"), 3.9)
		// 			explodirConfete(document.querySelector(".fdsdesc"), 3.9)
		// 		}, i*120)
		// 	}
		// }, 850)
	})

	botao.addEventListener("click", function () {
		overlay.style.transform = "translateY(100%)"
		iframe.style.transform = "translateY(0)"

		setTimeout(() => {
			window.location.href = "./was.html"
		}, 1500)
	})


	return secao
}