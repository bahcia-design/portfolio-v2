// window.onclick = function (){
// 	openCard()
// }

window.onload = openCard

let envelope = document.querySelector("#envelope")
const mainDiv = document.querySelector("main")
const tutDiv = document.querySelector(".page2")
const closeEnvelope = document.querySelector(".close-envelope")
const backToCardBtn = document.querySelector("#swipe-to-msg")

let isOpening = false
let openedEnvelopeOnce = false
let startedTicks = false

closeEnvelope.addEventListener("click", (e) => {
	swipeToTutorial()
})

backToCardBtn.addEventListener("click", (e) => {
	swipeToMessage()
})

function swipeToTutorial() {
	if (!startedTicks) { iniciarTicks(); startedTicks = true; }
	mainDiv.classList.add("goto-left")
	tutDiv.classList.add("goto-center")
}

function swipeToMessage() {
	mainDiv.classList.remove("goto-left")
	tutDiv.classList.remove("goto-center")
}

envelope.addEventListener("click", (e) => {
	e.preventDefault()
	e.stopImmediatePropagation()

	// console.log("opening")
	const isOpened = !mainDiv.classList.contains("hidden")
	if (!isOpened && isOpening == false) {
		openCard()
	}
})

function closeCard() {
	var env = document.getElementById("envelope")
	var folha = document.getElementById("folha")
	var papel = document.getElementById("papel")
	var linhas = document.getElementById("linhas")

	// Para a folha no estado atual
	folha.style.transition = "transform 1s cubic-bezier(.65, 0, .25, 1), opacity 1s"

	// Volta a folha para o estado original
	folha.style.transform = ""
	folha.style.opacity = ""

	mainDiv.classList.add("hidden")

	setTimeout(function () {
		// Remove o estado aberto da folha/envelope
		env.classList.remove("sobe")
		env.classList.remove("aberta")
		env.classList.remove("abre")

		// Esconde novamente as linhas
		linhas.style.opacity = ""

		// Restaura o papel
		papel.style.zIndex = ""
		papel.style.opacity = ""

		// Remove o estado de entrada
		env.classList.remove("entra")

		// Limpa os estilos temporários
		folha.style.transition = ""
		folha.style.transform = ""
		folha.style.opacity = ""

		setTimeout(() => {
			addHintOnTutPage()
		}, 500)

	}, 1000)
}

function addHintOnTutPage() {
	const dick = document.querySelector(".dick")
	dick.classList.remove("hidden")
}
function iniciarTicks() {
	var ticks = Array.prototype.slice.call(document.querySelectorAll("span.tick"))

	function piscar(el) {
		el.classList.add("bolded")

		setTimeout(function () {
			el.classList.remove("bolded")

			setTimeout(function () {
				piscar(el)
			}, 300 + Math.random() * 1200)
		}, 150)
	}

	ticks.forEach(function (el) {
		setTimeout(function () {
			piscar(el)
		}, Math.random() * 1500)
	})
}

function openCard() {
	isOpening = true
	openedEnvelopeOnce = true

	var rnd = Math.random;
	function pick(a) { return a[Math.floor(rnd() * a.length)]; }

	var liberado = false, fila = [];
	function aoLiberar(fn) { if (liberado) fn(); else fila.push(fn); }

	(function abertura() {
		var intro = document.getElementById('intro'), env = document.getElementById('envelope'),
			papel = document.getElementById('papel'), folha = document.getElementById('folha'), linhas = document.getElementById('linhas');
		var acabou = false, timers = [];
		function depois(ms, fn) { timers.push(setTimeout(fn, ms)); }
		function fim(rapido) {
			if (acabou) return; acabou = true;
			timers.forEach(clearTimeout);
			document.body.classList.remove('intro');
			mainDiv.classList.remove("hidden")
			isOpening = false
			// addHintOnTutPage()
			// intro.classList.add('some');
			// setTimeout(function () { if (intro.parentNode) intro.parentNode.removeChild(intro); }, rapido ? 100 : 700);
			// setTimeout(liberar, rapido ? 100 : 300);
		}
		if (/[?&]pular/.test(location.search)) { fim(true); return; }
		intro.addEventListener('click', function () { fim(false); });

		var etapas = [];
		function etapa(ms, fn) { etapas.push([ms, fn]); }
		etapa(80, function () { env.classList.add('entra'); });
		etapa(650, function () { env.classList.add('abre'); });
		etapa(1000, function () { env.classList.add('aberta'); });
		etapa(1200, function () { env.classList.add('sobe'); });
		etapa(2050, function () {
			var r = folha.getBoundingClientRect();
			var dx = innerWidth / 2 - (r.left + r.width / 2), dy = innerHeight / 2 - (r.top + r.height / 2);
			var s = Math.max(innerWidth / r.width, innerHeight / r.height) * 1.54;
			papel.style.zIndex = 10;
			folha.style.transition = 'transform 1s cubic-bezier(.65, 0, .25, 1), box-shadow 1s';
			folha.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')';
			folha.style.boxShadow = 'none';
			linhas.style.opacity = 0;
		});
		etapa(3050, function () { fim(false); });
		if (/[?&]manual/.test(location.search)) { window.__etapas = etapas.map(function (e) { return e[1]; }); return; }
		etapas.forEach(function (e) { depois(e[0], e[1]); });
	})();

	var MOJI = { 'é': 'Ã©', 'ã': 'Ã£', 'ç': 'Ã§', 'ê': 'Ãª', 'á': 'Ã¡', 'í': 'Ã­', 'ó': 'Ã³', 'ú': 'Ãº', 'â': 'Ã¢', 'õ': 'Ãµ' };
	function corrompe(t, p) {
		var s = '';
		for (var i = 0; i < t.length; i++) {
			var c = t[i];
			if (MOJI[c] && rnd() < .8) s += MOJI[c];
			else if (c !== ' ' && rnd() < p) s += pick(['�', '▒', '░', 'Ã', '¤', '¦']);
			else s += c;
		}
		return s;
	}


	var cauda = document.getElementById('cauda'), buraco = document.getElementById('buraco'), quase = document.getElementById('quase');
	var origC = 'fosse', feito = false;

	// os defeitos acompanham a leitura: comecam no topo e descem no ritmo de quem le
	var gs = Array.prototype.slice.call(document.querySelectorAll(".g")), main = document.querySelector("main");
	var PALAVRAS_POR_S = 8;
	function palavrasAntes(el) { var r = document.createRange(); r.setStart(main, 0); r.setEndBefore(el); return r.toString().trim().split(/\s+/).length; }
	function visivel(el) { var r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight * .9; }
	function quandoVisivel(el, fn) { (function t() { if (document.hidden || !visivel(el)) { setTimeout(t, 400); return; } fn(); })(); }
	function roda(el, forte) {
		return
	}
	function tremor() {
		var ps = main.querySelectorAll("p"), p = ps[Math.floor(rnd() * ps.length)], n = 1 + Math.floor(rnd() * 2);
		(function t() {
			if (n-- <= 0) { p.style.transform = ""; return; }
			p.style.transform = "translate(" + ((rnd() - .5) * 3).toFixed(1) + "px," + ((rnd() - .5) * 2).toFixed(1) + "px)";
			setTimeout(function () { p.style.transform = ""; setTimeout(t, 60 + rnd() * 120); }, 50 + rnd() * 90);
		})();
	}
	aoLiberar(function () {
		var fim = 0;
		gs.forEach(function (el, i) {
			el._orig = el.textContent;
			var t = 200 + palavrasAntes(el) / PALAVRAS_POR_S * 1000 * (.9 + rnd() * .2);
			fim = Math.max(fim, t);
			setTimeout(function () { quandoVisivel(el, function () { roda(el, i === 2); }); }, t);
		});
		var tc = 200 + palavrasAntes(cauda) / PALAVRAS_POR_S * 1000;
		fim = Math.max(fim, tc);
		setTimeout(function () { quandoVisivel(cauda, function () { cauda.textContent = origC }); }, tc);
		setTimeout(function solto() {
			if (!document.hidden) {
				var vis = gs.filter(visivel), el = pick(vis.length ? vis : gs);
				roda(el, rnd() < .25);
				if (rnd() < .4) tremor();
			}
			setTimeout(solto, 4500 + rnd() * 6000);
		}, fim + 3000);
	});

	function limpar(v) { return v.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, ''); }
	buraco.addEventListener('keydown', function (e) {
		if (e.key !== 'Enter') return;
		var v = limpar(buraco.value);
		if (!v) return;
		if (v.indexOf('atealua') === 0) {
			quase.textContent = 'quase. em outra língua.';
			return;
		}
		if (v.indexOf('tothemoon') === 0) {
			// PASSAR PRA PROXIMA FASE AQUI ANSWER CHECK
			for (let i = 0; i < 4; i++) {
				explodirConfete(document.querySelector(".buraco"))
				setTimeout(() => {
					explodirConfete(document.querySelector(".buraco"))
				}, 150 * i)
			}

			setTimeout(() => {
				mostrarTransicao()
				history.pushState({}, "", "the.html")
			}, 1200)

			// window.location.href = "./the.html"
		}
	});

}

function explodirConfete(input, scale = 1) {
	var rect = input.getBoundingClientRect()
	var quantidade = 35
	var cores = ["#ff4d6d", "#ffd166", "#06d6a0", "#4dabf7", "#c77dff", "#ffffff"]

	var container = document.createElement("div")

	container.style.position = "fixed"
	container.style.left = "0"
	container.style.top = "0"
	container.style.width = "100%"
	container.style.height = "100%"
	container.style.pointerEvents = "none"
	container.style.zIndex = "9999"

	document.body.appendChild(container)

	var centroX = rect.left + rect.width / 2
	var centroY = rect.top + rect.height / 2

	for (var i = 0; i < quantidade; i++) {
		var confete = document.createElement("span")

		var angulo = Math.random() * Math.PI * 2
		var distancia = 50 + Math.random() * 100
		var tamanho = 4 + Math.random() * 6
		var duracao = 500 + Math.random() * 500

		var x = Math.cos(angulo) * distancia
		var y = Math.sin(angulo) * distancia

		confete.style.position = "fixed"
		confete.style.left = centroX + "px"
		confete.style.top = centroY + "px"
		confete.style.width = tamanho + "px"
		confete.style.height = tamanho * (0.5 + Math.random()) + "px"
		confete.style.background = cores[Math.floor(Math.random() * cores.length)]
		confete.style.borderRadius = Math.random() < 0.5 ? "1px" : "50%"
		confete.style.transform = "translate(-50%, -50%) rotate(" + Math.random() * 360 + "deg)"
		confete.style.transition = "transform " + duracao + "ms cubic-bezier(.15,.8,.3,1), opacity " + duracao + "ms ease-out"

		container.appendChild(confete)
		if (scale != 1) {
			container.style.transform = `translateY(160px) scale(${scale})`
		}

		setTimeout(function (confete, x, y) {
			confete.style.transform = "translate(calc(-50% + " + x + "px), calc(-50% + " + y + "px)) rotate(" + (Math.random() * 720 - 360) + "deg)"
			confete.style.opacity = "0"
		}, 20, confete, x, y)
	}

	setTimeout(function () {
		container.remove()
	}, 1200)
}


function mostrarTransicao(urlIframe) {
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
		<h2 class="fdsdesc">Boa <span class="joia">👍</span></h2>
		<p > pra ajudar a resolver a próxima fase agora você vai ter que jogar <a href="https://store.steampowered.com/app/206440/To_the_Moon/" target="_blank" rel="noopener noreferrer">To the Moon</a> </p> 
	</div>`

	botao.textContent = "Avançar"
	botao.classList.add("adv-btn")

	overlay.appendChild(secao)
	overlay.appendChild(botao)

	iframe.src = "./the.html"
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
			window.location.href = "./the.html"
		}, 1500)
	})


	return secao
}

// mostrarTransicao()