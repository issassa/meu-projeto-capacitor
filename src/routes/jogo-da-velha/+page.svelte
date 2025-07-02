<script>
	let v1 = '';
	let v2 = '';

	function novamente() {
		
	}
</script>

<br />
<div class="text-center">
	<h2><b>Jogo da Velha</b> <i class="bi bi-x-circle"></i></h2>
	<p>Olá! Seja bem-vindo(a) ao Jogo da Velha!</p>
</div>
<b>Modo de jogar:</b> chame um amigo para se divertir com você. Clique sobre a casinha desejada e
digite sua indentificação (X ou O).
<br />
<br />
<div class="text-center">
	<p><b>Opções de identificação:</b></p>
</div>
<div class="text-center">
	<button type="button" class="btn bg-danger-subtle w-22"><b>X</b></button>
	<button type="button" class="btn bg-danger-subtle w-22"><b>O</b></button>
</div>
<br />
<table class="table table-sm table-bordered">
	<tbody>
		<tr>
			<td><input type="text" class="btn bg-danger-subtle w-100" /></td>
			<td><input type="text" class="btn bg-danger-subtle w-100" /></td>
			<td><input type="text" class="btn bg-danger-subtle w-100" /></td>
		</tr>
		<tr>
			<td><input type="text" class="btn bg-danger-subtle w-100" /></td>
			<td><input type="text" class="btn bg-danger-subtle w-100" /></td>
			<td><input type="text" class="btn bg-danger-subtle w-100" /></td>
		</tr>
		<tr>
			<td><input type="text" class="btn bg-danger-subtle w-100" /></td>
			<td><input type="text" class="btn bg-danger-subtle w-100" /></td>
			<td><input type="text" class="btn bg-danger-subtle w-100" /></td>
		</tr>
	</tbody>
</table>
<br />
<br />
<div class="text-center">
	<button type="button" class="btn bg-danger-subtle w-30 h-10" onclick={novamente}
		><b>Jogar Novamente</b></button
	>
</div>
