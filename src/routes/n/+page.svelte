<script>
	let min = 1;
	let max = 100;
	let quant = 1;
	let geradornum = [];

	function gerador() {
		geradornum = []; // limpa os resultados anteriores
		for (let i = 0; i < quant; i++) {
			// garante que min e max sejam núm e que min <= max
			const parsedMin = parseInt(min);
			const parsedMax = parseInt(max);

			const randomNumber = Math.floor(Math.random() * (parsedMax - parsedMin + 1)) + parsedMin;
			geradornum = [...geradornum, randomNumber]; // adiciona o núm ao array
		}
	}
</script>

<br />
<div class="nome" style="color: olive;">
	<h1><b>Isa.Bet</b></h1>
</div>
<br />
<div class="row row-cols-1 row-cols-md-2 g-4">
	<div class="col">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">
					<a href="/n" style="color: olive;">Números</a>
					<i class="bi bi-dice-4" style="color: olive;"></i>
				</h5>
				<p class="card-text">
					Gere infinitos <b>números aleatótios</b>. Não perca seu tempo pensando, deixa que a
					Isa.Bet te ajuda.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="container page-content-container">
	<h2 class="mb-4 text-center">Gerador de Números Aleatórios</h2>

	<div class="mb-3">
		<label for="minInput" class="form-label">Mínimo:</label>
		<input type="number" id="minInput" class="form-control" bind:value={min} />
	</div>

	<div class="mb-3">
		<label for="maxInput" class="form-label">Máximo:</label>
		<input type="number" id="maxInput" class="form-control" bind:value={max} />
	</div>

	<div class="mb-3">
		<label for="quantityInput" class="form-label">Quantidade:</label>
		<input type="number" id="quantityInput" class="form-control" bind:value={quant} min="1" />
	</div>

	<button class="btn btn-primary w-100 mb-4" on:click={gerador}>Gerar Números</button>

	{#if geradornum.length > 0}
		<div class="mt-4 p-3 border rounded">
			<h4 class="mb-3">Números Gerados:</h4>
			<ul class="list-group">
				{#each geradornum as number}
					<li class="list-group-item">{number}</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
