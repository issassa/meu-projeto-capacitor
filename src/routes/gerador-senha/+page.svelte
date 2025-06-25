<script> 
	// Faça um código JavaScript que crie um gerador de senhas numéricas aleatórias
	// com um botão para gerar a nova senha
	// um botão para copiar a senha criada
	// slider e campo de tamanho da senha
	// caixas de seleção (checkbox) para incluir classes de caracteres:
	//       letras maiúsculas
	//       minúsculas
	//       símbolos
	//       dígitos
	// botão que habilita a geração de várias senhas de uma vez
	// com cada senha em uma linha
	// e com botão de copiar

	// Função para gerar senha aleatória

	// estilizar e mudar o nome das variáveis

	let tamsenha = '';
	let contsenha = 1;
	let incminus = true;
	let incmaius = true;
	let incnum = true;
	let incsimb = true;

	const letramin = 'abcdefghijklmnopqrstuvwxyz';
	const letramai = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const numeros = '0123456789';
	const simbolos = '!@#$%^&*()_-+=<>?';

	function gerarsenha() {
		let caracteres = '';
		let senha = '';

		if (incminus) caracteres += letramin;
		if (incmaius) caracteres += letramai;
		if (incnum) caracteres += numeros;
		if (incsimb) caracteres += simbolos;

		if (!caracteres) return ''; // sem opção selec.

		for (let i = 0; i < tamsenha; i++) {
			senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
		}
		return senha;
	}

	function variassenhas() {
		let senhas = [];
		for (let i = 0; i < contsenha; i++) {
			senhas.push(gerarsenha());
		}
		return senhas;
	}

	function copiarsenha(senha) {
		navigator.clipboard
			.writeText(senha)
			.then(() => {
				alert('Senha copiada para a área de transferência!');
			})
			.catch((err) => {
				console.error('Erro ao copiar a senha: ', err);
			});
	}

	let senhas = variassenhas();
</script>

<main>
	<div class="card text-center" style="width: 34rem; margin: 0 auto;">
		<div class="card-body" style="background-color: #dbead5;">
			<h1><b>Gerador de Senhas <i class="bi bi-database-lock"></i></b></h1>
			<p><b>Gere senhas extremamente secretas, mantenha sua segurança🔐!</b></p>
			<br />
			<div class="corpo">
				<div>
					<label for="tamsenha">Insira o comprimento da senha: </label>
					<input type="number" id="tamsenha" bind:value={tamsenha} min="4" max="32" />
				</div>

				<div>
					<label for="contsenha">Insira o número de senhas: </label>
					<input type="number" id="contsenha" bind:value={contsenha} min="1" max="4" />
				</div>
				<br />

				<p><b>Crie senhas diversas! Selecione os itens desejados: </b></p>

				<div>
					<label>
						<input type="checkbox" bind:checked={incminus} /> incluir letras minúsculas
					</label>
				</div>
				<div>
					<label>
						<input type="checkbox" bind:checked={incmaius} /> incluir letras maiúsculas
					</label>
				</div>
				<div>
					<label>
						<input type="checkbox" bind:checked={incnum} /> incluir números
					</label>
				</div>
				<div>
					<label>
						<input type="checkbox" bind:checked={incsimb} /> incluir símbolos
					</label>
				</div>
				<br />

				<button on:click={() => (senhas = variassenhas())}>gerar senha</button>
			</div>
			<br />
			<br />

			{#if senhas.length > 0}
				<h2><b>Senhas Geradas:</b></h2>
				<p>Fique tranquilo(a), vou guardar segredo🤫!</p>
				<ul>
					{#each senhas as senha}
						<br />
						<li>
							{senha}
							<button on:click={() => copiarsenha(senha)}>copiar</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</main>

<style>
	main {
		font-family: Arial, sans-serif;
		padding: 20px;
		text-align: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		background-color: #f3f4f6;
	}

	.card {
		border-radius: 10px;
		box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
	}

	input {
		margin: 5px;
		border-radius: 5px;
		padding: 5px;
	}

	button {
		margin-top: 10px;
		padding: 8px 16px;
		background-color: #556b2f;
		color: white;
		border: none;
		cursor: pointer;
		border-radius: 8px; /* Borda arredondada */
	}

	button:hover {
		background-color: #4b5e3b;
	}

	ul {
		list-style-type: none;
		padding: 0;
		width: 100%;
		max-width: 500px; /* Limita a largura  */
		margin-bottom: 10px;
		align-items: center;
		margin: 0 auto;
	}

	li {
		background: #dbead5;
		padding: 10px;
		margin-top: 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-radius: 10px;
	}

	li button {
		background-color: #556b2f;
		color: white;
		padding: 5px 10px;
		border: none;
		cursor: pointer;
		border-radius: 5px;
	}

	li button:hover {
		background-color: #4b5e3b;
	}

	.corpo {
		text-align: left;
		text-decoration: rgb(255, 255, 255);
	}

	h1, h2 {
			color: #475928;
		}


</style>
