<script>
	/** falta:
	 * lista de palavras por letras (a-z)
	 * palavra aleatória -> funcionar
	 * botão para voltar a pág inicial -> funcionar
	 */

	import { dicionario } from '$lib/dicionario';

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
</script>

<br />
<div class="card mb-3" style="width: 21rem;">
	<div class="card-body text-center">
		<h1 class="card-title"><b>Dicionário <i class="bi bi-rocket"></i></b></h1>
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
		<button class="btn btn-outline-secondary" disabled><b>palavra aleatória</b></button>
		<br />
		<br />
		{#each filtradas as termo}
			<p><a href="/dicionario/{termo.palavra}">{termo?.palavra}</a></p>
		{/each}
	</div>
</div>
