window.onload = function (){
	(function () {
	var rnd = Math.random;
	function pick(a) { return a[Math.floor(rnd() * a.length)]; }

	var liberado = false, fila = [];
	function aoLiberar(fn) { if (liberado) fn(); else fila.push(fn); }
	function liberar() { liberado = true; fila.forEach(function (f) { f(); }); fila = []; }

	(function abertura() {
		var intro = document.getElementById('intro'), env = document.getElementById('envelope'),
			papel = document.getElementById('papel'), folha = document.getElementById('folha'), linhas = document.getElementById('linhas');
		var acabou = false, timers = [];
		function depois(ms, fn) { timers.push(setTimeout(fn, ms)); }
		function fim(rapido) {
			if (acabou) return; acabou = true;
			timers.forEach(clearTimeout);
			document.body.classList.remove('intro');
			intro.classList.add('some');
			setTimeout(function () { if (intro.parentNode) intro.parentNode.removeChild(intro); }, rapido ? 100 : 700);
			setTimeout(liberar, rapido ? 100 : 300);
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
			var s = Math.max(innerWidth / r.width, innerHeight / r.height) * 1.04;
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

	function quadro(el, orig, forte) {
		el.style.opacity = forte ? (.1 + rnd() * .5) : (.4 + rnd() * .5);
		el.style.left = ((rnd() - .5) * (forte ? 7 : 3)).toFixed(1) + 'px';
		el.style.textShadow = rnd() < .6
			? ((rnd() - .5) * 3).toFixed(1) + 'px 0 rgba(176,69,45,.55), ' + ((rnd() - .5) * -3).toFixed(1) + 'px 0 rgba(29,52,64,.55)'
			: 'none';
		el.textContent = rnd() < (forte ? .6 : .3) ? corrompe(orig, .08) : orig;
	}
	function limpa(el, orig) {
		el.style.opacity = ''; el.style.left = ''; el.style.textShadow = ''; el.textContent = orig;
	}
	function rajada(el, orig, forte, fim) {
		var n = 2 + Math.floor(rnd() * (forte ? 5 : 3)), i = 0;
		(function passo() {
			if (i++ >= n) { limpa(el, orig); if (fim) fim(); return; }
			quadro(el, orig, forte);
			setTimeout(function () {
				if (rnd() < .5) limpa(el, orig);
				setTimeout(passo, 30 + rnd() * 140);
			}, 40 + rnd() * 110);
		})();
	}
	function sumir(el, orig, fim) {
		rajada(el, orig, true, function () {
			el.style.transition = 'opacity ' + (.25 + rnd() * .4).toFixed(2) + 's';
			el.style.opacity = 0;
			setTimeout(function () {
				el.style.transition = 'opacity ' + (.8 + rnd() * .8).toFixed(2) + 's';
				el.style.opacity = '';
				setTimeout(function () { el.style.transition = ''; if (fim) fim(); }, 1700);
			}, 900 + rnd() * 2200);
		});
	}

	var cauda = document.getElementById('cauda'), buraco = document.getElementById('buraco'), quase = document.getElementById('quase');
	var origC = 'fosse até', feito = false;
	function roteiro(passos, fim) {
		var i = 0;
		(function prox() {
			if (i >= passos.length) { if (fim) fim(); return; }
			var p = passos[i++];
			cauda.textContent = p[0];
			cauda.style.opacity = p[2] === undefined ? '' : p[2];
			cauda.style.left = p[3] || '';
			cauda.style.textShadow = p[4] ? '1.5px 0 rgba(176,69,45,.6), -1.5px 0 rgba(29,52,64,.6)' : 'none';
			setTimeout(prox, p[1] * (.75 + rnd() * .6));
		})();
	}
	function sequencia() {
		roteiro([
			['fosse atÃ©', 150, .7, '2px', true],
			[origC, 380],
			[origC + ' fosse a', 110, .8, '-3px', true],
			['fosse at', 690, .75],
			['fosse a▒', 90, .5, '1px', true],
			['fos', 70, .4, '-2px', true],
			['', 0]
		], fantasma);
	}
	function fantasma() {
		setTimeout(function () {
			if (document.hidden || document.activeElement === buraco || buraco.value) { fantasma(); return; }
			roteiro([[pick(['fosse a▒', 'fo', 'f▒', 'fosse atÃ']), 50 + rnd() * 60, .5, '', true], ['', 0]], fantasma);
		}, 10000 + rnd() * 14000);
	}
	// os defeitos acompanham a leitura: comecam no topo e descem no ritmo de quem le
	var gs = Array.prototype.slice.call(document.querySelectorAll(".g")), main = document.querySelector("main");
	var PALAVRAS_POR_S = 8;
	function palavrasAntes(el) { var r = document.createRange(); r.setStart(main, 0); r.setEndBefore(el); return r.toString().trim().split(/\s+/).length; }
	function visivel(el) { var r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight * .9; }
	function quandoVisivel(el, fn) { (function t() { if (document.hidden || !visivel(el)) { setTimeout(t, 400); return; } fn(); })(); }
	function roda(el, forte) {
		if (el._ocupado) return;
		el._ocupado = true;
		var livre = function () { el._ocupado = false; };
		if (forte) sumir(el, el._orig, livre); else rajada(el, el._orig, false, livre);
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
				window.location.href = "./a.html"
			}
		});
})();
}
