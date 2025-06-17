<script>
	import { page } from '$app/state';
	import { dicionario } from '$lib/dicionario';

	let termo = $state();

	/** lógica que busca a variável no dicionário que é uma lista de objetos, aquele cuja propriedade "palavra" seja igual ao parâmetro de rota da palavra
	 * ao encontar, atribua esse objeto à variável "termo"
	 *
	 * dps de atribuir, percorra sua definições no html usando o comando {#each}
	 */

</script>

<h2>{page.params.palavra}</h2>

<div class="card mb-3" style="width: 21rem;">
	<div class="card-body text-center">
		<h1 class="card-title"><b>Dicionário <i class="bi bi-rocket"></i></b></h1>
		<br />
	</div>
	<p class="card-text">a</p>
        <h2>{page.params.palavra}</h2>
</div>
