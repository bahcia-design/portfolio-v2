const img = document.querySelector("img")

img.addEventListener("click", () => {
	const res = prompt("Como eles me chamam?")

	if(res.toLowerCase() == "anya"){
		window.location.href = ""
		// PASSAR FASE AQUI ANSWER CHECK
	}

	if(res.toLowerCase() == "farol"){
		alert("nao cara")
	}
})