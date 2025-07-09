<script>
	import { onMount } from 'svelte';

	// Os ícones que serão usados nas cartas. Teremos pares de cada um.
	const iconesBase = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

	// Variável reativa para armazenar todas as cartas do jogo
	let cartas = [];

	// Variáveis para controlar o estado do jogo
	let cartasViradas = []; // Armazena as duas cartas que foram viradas no turno atual
	let bloqueioTabuleiro = false; // Impede que o jogador vire mais cartas enquanto um par está sendo verificado
	let paresEncontrados = 0; // Contador de pares
	let jogadas = 0; // Contador de jogadas (par de cartas viradas)

	// --- Lógica do Jogo ---

	// Função para inicializar/reiniciar o jogo
	function iniciarJogo() {
		jogadas = 0;
		paresEncontrados = 0;
		cartasViradas = [];
		bloqueioTabuleiro = false;

		// Duplica os ícones para criar os pares
		let cartasDuplicadas = [...iconesBase, ...iconesBase];

		// Embaralha as cartas
		cartasDuplicadas = embaralharArray(cartasDuplicadas);

		// Cria o array final de cartas com estados
		cartas = cartasDuplicadas.map((icone, index) => ({
			id: index, // ID único para cada carta
			icone: icone,
			virada: false,
			encontrada: false
		}));
	}

	// Função auxiliar para embaralhar um array (algoritmo Fisher-Yates)
	function embaralharArray(array) {
		let currentIndex = array.length,
			randomIndex;

		// Enquanto existirem elementos para embaralhar.
		while (currentIndex !== 0) {
			// Escolhe um elemento restante.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// E troca com o elemento atual.
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}
		return array;
	}

	// Função chamada ao clicar em uma carta
	function virarCarta(cartaClicada) {
		// Ignora se o tabuleiro estiver bloqueado, a carta já estiver virada ou já tiver sido encontrada
		if (bloqueioTabuleiro || cartaClicada.virada || cartaClicada.encontrada) {
			return;
		}

		// Vira a carta clicada
		cartaClicada.virada = true;
		cartasViradas = [...cartasViradas, cartaClicada]; // Adiciona a carta às viradas

		// Se duas cartas foram viradas
		if (cartasViradas.length === 2) {
			jogadas++;
			bloqueioTabuleiro = true; // Bloqueia o tabuleiro
			const [primeiraCarta, segundaCarta] = cartasViradas;

			// Verifica se as cartas são um par
			if (primeiraCarta.icone === segundaCarta.icone) {
				// Par encontrado!
				paresEncontrados++;
				// Marca as cartas como encontradas para que não possam ser clicadas novamente
				cartas = cartas.map((c) => {
					if (c.id === primeiraCarta.id || c.id === segundaCarta.id) {
						return { ...c, encontrada: true };
					}
					return c;
				});
				cartasViradas = []; // Reseta as cartas viradas
				bloqueioTabuleiro = false; // Desbloqueia o tabuleiro

				// Verifica se o jogo terminou
				if (paresEncontrados === iconesBase.length) {
					alert(
						`Parabéns! Você encontrou todos os ${paresEncontrados} pares em ${jogadas} jogadas!`
					);
				}
			} else {
				// Não é um par, vira as cartas de volta após um pequeno atraso
				setTimeout(() => {
					cartas = cartas.map((c) => {
						if (c.id === primeiraCarta.id || c.id === segundaCarta.id) {
							return { ...c, virada: false }; // Vira de volta
						}
						return c;
					});
					cartasViradas = []; // Reseta as cartas viradas
					bloqueioTabuleiro = false; // Desbloqueia o tabuleiro
				}, 1000); // 1 segundo
			}
		}
	}

	// Ao carregar o componente, inicia o jogo
	onMount(() => {
		iniciarJogo();
	});
</script>

<div class="container">
	<h1>Jogo da Memória</h1>
	<div class="info">
		<p>Pares Encontrados: {paresEncontrados} / {iconesBase.length}</p>
		<p>Jogadas: {jogadas}</p>
		<button on:click={iniciarJogo}>Reiniciar Jogo</button>
	</div>

	<div class="tabuleiro" class:bloqueado={bloqueioTabuleiro}>
		{#each cartas as carta (carta.id)}
			<div
				class="carta"
				class:virada={carta.virada || carta.encontrada}
				class:encontrada={carta.encontrada}
				on:click={() => virarCarta(carta)}
			>
				<div class="face frente">?</div>
				<div class="face tras">
					{carta.icone}
				</div>
			</div>
		{/each}
	</div>

	{#if paresEncontrados === iconesBase.length}
		<p class="mensagem-vitoria">🎉 Você Venceu! 🎉</p>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		font-family: Arial, sans-serif;
		background-color: #f0f0f0;
		min-height: 100vh;
	}

	h1 {
		color: #333;
		margin-bottom: 20px;
	}

	.info {
		display: flex;
		gap: 20px;
		margin-bottom: 20px;
		align-items: center;
	}

	.info p {
		font-size: 1.1em;
		font-weight: bold;
		color: #555;
		margin: 0;
	}

	.info button {
		padding: 10px 15px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 1em;
		transition: background-color 0.2s;
	}

	.info button:hover {
		background-color: #0056b3;
	}

	.tabuleiro {
		display: grid;
		grid-template-columns: repeat(4, 100px); /* 4 colunas de 100px */
		grid-template-rows: repeat(4, 100px); /* 4 linhas de 100px (8 pares = 16 cartas) */
		gap: 10px;
		perspective: 1000px; /* Para o efeito 3D de virar */
		position: relative;
		padding: 10px;
		border-radius: 8px;
		background-color: #e0e0e0;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.tabuleiro.bloqueado::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.1); /* Um overlay leve para indicar bloqueio */
		z-index: 10; /* Fica acima das cartas */
		cursor: not-allowed;
	}

	.carta {
		width: 100px;
		height: 100px;
		position: relative;
		transform-style: preserve-3d;
		transition: transform 0.5s;
		cursor: pointer;
		border-radius: 8px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
	}

	.carta.virada {
		transform: rotateY(180deg);
	}

	.carta.encontrada {
		opacity: 0.5; /* Cartas encontradas ficam levemente transparentes */
		cursor: default;
	}

	.face {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden; /* Oculta a face de trás quando ela está de frente */
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2.5em; /* Tamanho do ícone */
		border-radius: 8px;
	}

	.frente {
		background-color: #6a0dad; /* Roxo */
		color: white;
		border: 2px solid #5a099d;
		z-index: 2; /* Garante que a frente esteja na frente */
	}

	.tras {
		background-color: #fff; /* Branco */
		color: #333;
		border: 2px solid #ddd;
		transform: rotateY(180deg); /* Começa virada para trás */
	}

	.mensagem-vitoria {
		margin-top: 20px;
		font-size: 2em;
		font-weight: bold;
		color: #28a745; /* Verde */
		text-align: center;
	}
</style>
