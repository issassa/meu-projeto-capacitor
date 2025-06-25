<script>
	let v1 = ''; // original
	let v2 = ''; // convertido
	let uni1 = 'kg'; // origem
	let uni2 = 'g'; // destino

	const unidades = ['kg', 'g', 'mg'];

	function converter() {
		const univalor = {
			kg: 1000,
			g: 1,
			mg: 0.001
		};

		v2 = (v1 * univalor[uni1]) / univalor[uni2]; 
		v1 = (v2 * univalor[uni2]) / univalor[uni1];
	}

	function inverter() {
		[v1, v2] = [v2, v1];
		[uni1, uni2] = [uni2, uni1];
	}
</script>

<nav class="navbar bg-body-tertiary fixed-top">
	<div class="container-fluid">
		<a class="navbar-brand" href="peso"> Peso </a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="offcanvas"
			data-bs-target="#offcanvasNavbar"
			aria-controls="offcanvasNavbar"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div
			class="offcanvas offcanvas-end"
			tabindex="-1"
			id="offcanvasNavbar"
			aria-labelledby="offcanvasNavbarLabel"
		>
			<div class="offcanvas-header">
				<h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu de unidades</h5>
				<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
				></button>
			</div>
			<div class="offcanvas-body">
				<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
					<li class="nav-item dropdown">
						<a class="dropdown-item" href="conversor-unidades">Início</a>
						<br />
						<a
							class="nav-link dropdown-toggle"
							href="conversor-unidades"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Unidades
						</a>
						<ul class="dropdown-menu">
							<li><a class="dropdown-item" href="distancia">Distância</a></li>
							<li><a class="dropdown-item" href="peso">Peso</a></li>
							<li><a class="dropdown-item" href="temperatura">Temperatura</a></li>
							<li><a class="dropdown-item" href="tempo">Tempo</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
</nav>

<main>
	<br />
	<br />
	<br />
	<div class="converter">
		<div>
			<input type="number" bind:value={v1} placeholder="insira um valor..." oninput={converter} />
			<select bindvalue={uni1} onchange={converter}>
				{#each unidades as unidade}
					<option value={unidade}>{unidade}</option>
				{/each}
			</select>
		</div>

		<button onclick={inverter}><b>↔inverter valores</b></button>

		<div>
			<input type="number" bind:value={v2} placeholder="valor convertido..." oninput={converter} />
			<select bind:value={uni2} onchange={converter}>
				{#each unidades as unidade}
					<option value={unidade}>{unidade}</option>
				{/each}
			</select>
		</div>
	</div>
</main>

<style>
	nav {
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #f5f5f5;
		color: rgb(0, 0, 0);
		padding: 10px 10px;
		font-family: Arial, sans-serif;
	}

	a {
		text-decoration: none;
		color: rgb(0, 0, 0);
		font-weight: bold;
		transition: color 0.3s ease;
	}

	a:hover {
		color: #000000;
	}

	main {
		font-family: Arial, sans-serif;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #ffffff;
		padding: 20px;
		min-height: 100vh;
	}

	.converter {
		display: flex;
		flex-direction: column;
		gap: 15px;
		width: 100%;
		max-width: 294px;
	}

	input,
	select,
	button {
		padding: 10px;
		font-size: 16px;
		border: 1px solid #ddd;
		border-radius: 5px;
	}

	button {
		background-color: #ebc4eb;
		color: rgb(0, 0, 0);
		cursor: pointer;
	}

	button:hover {
		opacity: 0.9;
	}
</style>
