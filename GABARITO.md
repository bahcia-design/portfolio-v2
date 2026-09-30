# Gabarito (NÃO vai pro site — está no .vercelignore)

Legenda: ✅ pronta · 🟡 falta material dela · ⬜ a construir

Ritmo de cada bloco: **desafio(s) → descobrir o jogo → algo dentro do jogo → próxima fase**.
Jogo que ele precisa e vocês não têm = vira presente naquela fase.

Preços e demos conferidos na Steam em 29/set/2026 (podem mudar).

## BLOCO 1 — "A carta que deu errado" (no ar dia 3/out)

| # | Página | Mecânica | Como resolve | Leva para | Estado |
|---|---|---|---|---|---|
| 1 | `/` (link da carta física) | Presente falso + número escondido | Página de "Resgatar Ghost of Tsushima" → erro → aparece a carta. Saindo da aba, o título muda: "o presente não era esse." → `206440` → "ela tem nome de gente e mora sozinha na beira do penhasco". 206440 = To the Moon na Steam (já têm). No jogo, o farol na beira do penhasco se chama **Anya** | `/anya` | 🟡 confirmar no jogo que o farol aparece com o nome Anya |
| 1-bônus | `/` | **Segredo opcional (muito difícil)** | Depois de "diversão." tem 32 caracteres INVISÍVEIS (zero-width). Invisível = 0, outro invisível = 1 → 8 bits por letra → "momo". Dica dupla no código: "nem tudo aparece enquanto você está olhando" | `/momo` (mensagem secreta dela) | 🟡 falta a mensagem |
| 2 | `/anya` | **A MAIS DIFÍCIL — 3 camadas** | (a) 28 velas = binário, acesa=1. As 3 primeiras (separadas) = `101` = 5 → grupos de 5 bits → S O P R E. (b) Ele tem que DIGITAR "sopre" na página do bolo (sem campo nenhum) → o site pede o microfone → ele SOPRA no microfone e as velas apagam. Se ele tentar `/sopre` no endereço, a página diz pra voltar pro bolo. (c) A fumaça mostra `5.8.1  3.2.2  3.3.2  5.2.2` = parágrafo.palavra.letra da CARTA da fase 1 → **M**ais, s**a**bia, p**r**íncipe, v**e**rdade → MARE. ⚠️ Se o texto da carta da fase 1 mudar, esses números precisam ser refeitos | `/mare` | ✅ |
| 3 | `/mare` | Não fazer nada | 7 min sem mexer. A maré sobe e mostra a palavra na areia (tempo conferido no servidor) | `/portfolio` | ✅ |
| 4 | `/portfolio` | Cor = texto | Hex de cada cor = 3 letras ASCII → "o proximo porto: /ancora" | `/ancora` | ✅ |
| 5 | `/ancora` | Alfabeto do livro (PRECISA DELA) | Frase no alfabeto do marcador de página | ? | 🟡 foto do marcador + frase |
| 6 | ? | Descobrir o jogo: número da Steam | Um número escondido = endereço do jogo na Steam (store.steampowered.com/app/990630) | The Last Campfire | ⬜ |
| 7 | — (dentro do jogo) | **The Last Campfire — demo grátis** | Algo nos primeiros minutos da demo = próxima palavra | ? | 🟡 print de dentro da demo |

## BLOCO 2

| # | Mecânica | Ideia |
|---|---|---|
| 8 | Música 1 — melodia | O site toca a melodia nota por nota. Ele descobre a música; a página mostra um tempo (ex.: 1:23) → palavra cantada nesse segundo |
| 9 | Descobrir o jogo: recorte | Um pedacinho de uma tela do jogo |
| 10 | **To the Moon — já tem (família Steam)** | Realizar o sonho de uma vida inteira antes que seja tarde. Resposta nos primeiros minutos |

## BLOCO 3

| # | Mecânica | Ideia |
|---|---|---|
| 11 | Playlist cifrada | Playlist dela no Spotify, link como código de barras do Spotify. 1ª letra de cada música = palavra |
| 12 | Descobrir o jogo: trilha em notas | O site toca um tema da trilha sonora |
| 13 | **Before Your Eyes — PRESENTE (~R$ 33)** | A vida passa quando você pisca. Resposta dentro do jogo |

## BLOCO 4

| # | Mecânica | Ideia |
|---|---|---|
| 14 | Fonte que mente | Texto na tela diz uma coisa; copiado e colado vira outra |
| 15 | Descobrir o jogo: arte redesenhada | Ela redesenha uma arte do jogo só com formas |
| 16 | **Chicory — demo grátis** | Pintar o mundo. Resposta dentro da demo |

## BLOCO 5

| # | Mecânica | Ideia |
|---|---|---|
| 17 | Espectrograma | Áudio que parece barulho; num programa de áudio mostra uma frase |
| 18 | Descobrir o jogo: transparência | Folha com janelinhas sobre a carta física → aparece o nome do jogo |
| 19 | **Road 96 — já tem (família Steam)** | Escolher o próprio caminho. Resposta dentro do jogo |

## BLOCO 6 — "O dia seguinte"

| # | Mecânica | Ideia |
|---|---|---|
| 20 | Console + página em loop | O site conversa com ele na área de desenvolvedor; a página reinicia a cada 23 s e cada volta mostra um pedaço. Juntos = o jogo |
| 21 | **The Beginner's Guide — PRESENTE (~R$ 25)** | Sobre criar, pressão e se cobrar demais. Resposta dentro do jogo |
| 22 | Final falso | "Parabéns, acabou" com créditos. Nos créditos: "vai falar com ela" |
| 23 | Ela | O último pedaço está com ela → carta completa |

## Outros jogos da lista (reserva)
- Demo grátis: A Plague Tale: Innocence
- Já tem: Life is Strange
- Baratos: Brothers (~R$ 28), Spirit of the North (~R$ 38), Journey (~R$ 44)

## Material que ela precisa me passar
- [ ] Foto do marcador (alfabeto) + frase para traduzir — fase 5
- [ ] Jogar ~10 min da demo de The Last Campfire (na conta Steam DELA) e tirar print de algo escrito — fase 7
- [x] Já têm na família Steam: Life is Strange, Road 96, To the Moon (os da Epic ficam de fora)
- [ ] Presentes: comprar como CHAVE (ex.: Nuuvem) ou "presente" da Steam — NUNCA na conta da família, senão aparece na biblioteca dele
- [ ] Música 1 — fase 8
- [ ] 1 pedaço da carta por bloco

## FASE DO JARDIM (ideia dela) — página `/jardim` (nome provisório; o endereço vai ser a resposta da fase anterior)
- A página mostra `flower.jpg` (brotinhos fechados) e a dica: "quem entende de flor por aqui é o manjericão".
- Manjericão = **Basil**, personagem do **Chicory** (demo grátis). Ele diz: "Some flowers bloom when in color. But others bloom only when blank."
- Ele troca o endereço da imagem: `/jardim/flower.jpg` → `/jardim/color.jpg` (flor colorida: **FLOR**) e `/jardim/blank.jpg` (flor sem cor: **ESCER**).
- Resposta: **/florescer**
- 🟡 Imagens provisórias — trocar pela arte dela (mesmos nomes de arquivo). Confirmar que o Basil aparece na DEMO.
