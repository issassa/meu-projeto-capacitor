
<br>
<div class="text-center">
	<h2><b>Conversor de Unidades</b> <i class="bi bi-calculator"></i></h2>
</div>
<main>
	<div class="buttons">
		<button class="distancia" onclick={() => (location.href = '/distancia')}><b>Distância</b></button>
		<button class="peso" onclick={() => (location.href = '/peso')}><b>Peso</b></button>
		<button class="temperatura" onclick={() => (location.href = '/temperatura')}><b>Temperatura</b></button>
		<button class="tempo" onclick={() => (location.href = '/tempo')}><b>Tempo</b></button>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: Arial, sans-serif;
		background-color: #ffffff;
		padding: 50px;
		min-height: 100vh;
		color: #000000;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
		max-width: 350px;
	}

	button {
		padding: 10px 10px;
		font-size: 16px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		color: rgb(0, 0, 0);
		background-color: #ebc4eb;
		cursor: pointer;
	}

	button.distancia {
		background-color: #ebc4eb;
	}

	button.peso {
		background-color: #ebc4eb;
	}

	button.temperatura {
		background-color: #ebc4eb;
	}

	button.tempo {
		background-color: #ebc4eb;
	}

	button:hover {
		opacity: 0.9;
	}
</style>
