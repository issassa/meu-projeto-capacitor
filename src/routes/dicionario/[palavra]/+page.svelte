<script>
	let { data } = $props(); //* importa os dados do backend pro front-end, ou seja, pego a váriavel palavra do back-end e passo para o front-end. */
	console.log(data); //* mostra as variaveis importadas do back-end.*/
</script>

<br>

<div class="card mb-3" style="width: 21rem;">
	<div class="card-body text-center">
		<h1 class="card-title"><b>Dicionário <i class="bi bi-rocket"></i></b></h1>
	</div>
	<h4><b>{data.palavra[0].palavra}</b></h4>
	<br />
    <p><b>Definição:</b></p>
	<p>{data.palavra[0].definicao}</p>
    <br>
	<a href="/dicionario" style="text-align: center;">
    <button style="text-itens-center" type="button" class="btn btn-outline-secondary"><b>voltar a página inicial</b></button> 
	</a>
    <br>
</div>
