<script>
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
	<div class="card text-center mb-3" style="width: 21rem;">
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
			<p class="card-text">aa</p>
			<div class="text-justify"></div>
			<ul>
				{#each filtradas as termo}
					<li><a href="/dicionario/{termo.palavra}">{termo?.palavra}</a></li>
				{/each}
			</ul>
		</div>
	</div>
