<script>
	/** falta: estilizar mais */

	import { dicionario } from '$lib/dicionario';
	import { goto } from '$app/navigation'; /** navegar programaticamnte */

	let palavra = $state('');
	let filtradas = $state(dicionario);

	function buscar() {
		if (palavra == '') {
			filtradas = dicionario;
			return;
		}

		filtradas = [];
		for (const termo of dicionario) {
			if (termo.palavra.startsWith(palavra)) {
				filtradas.push(termo);
			}
		}
	}

	function aleatoria() {
		const randomIndex = Math.floor(
			Math.random() * dicionario.length
		); /** índice aleat dentro do dicio */
		const randomWord =
			dicionario[randomIndex]?.palavra; /** '?.palavra' evita erros se for undefined */

		if (randomWord) {
			/** navega para a rota de defin da palavra sorteada */
			goto(`/dicionario/${randomWord}`);
		}
	}
</script>

<br />
<div class="card mb-3" style="width: 21rem;">
	<div class="card-body text-center">
		<h2 class="card-title"><b>Dicionário <i class="bi bi-alphabet-uppercase"></i></b></h2>
		<br />
		<div class="input-group mb-3">
			<input
				class="form-control"
				placeholder="digite uma palavra..."
				aria-label="palavra"
				aria-describedby="button-addon2"
				oninput={buscar}
				bind:value={palavra}
			/>
		</div>
		<button class="btn btn-outline-secondary" onclick={aleatoria}><b>palavra aleatória</b></button>
		<br />
		<br />
		<br />
		<h5 class="card-title"><b>Lista de palavras <i class="bi bi-journal-text"></i></b></h5>

		{#each filtradas as termo}
			<p><a href="/dicionario/{termo.palavra}">{termo?.palavra}</a></p>
		{/each}
	</div>
</div>
