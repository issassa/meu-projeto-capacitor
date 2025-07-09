<script>
	import { tick } from 'svelte';

	let tabuleiro = $state(['', '', '', '', '', '', '', '', '']);
	let jogadaAtual = 'X';

	function reiniciar() {
		(tabuleiro = ['', '', '', '', '', '', '', '', '']), (jogadaAtual = 'X');
	}
	async function jogada(i) {
		if (tabuleiro[i] != '') {
			alert('Casa já ocupada!');
			return;
		}

        // atualizando o tabuleiro com a jogada atual
        const novoTabuleiro = [...tabuleiro];
        novoTabuleiro[i] = jogadaAtual;
        tabuleiro = novoTabuleiro;

        await tick();
		await new Promise(resolve => setTimeout(resolve, 2)); 


        // se vitoria ou empate
        const fimdejogo = vitoria(); // vitoria agora pode indicar se o jogo acabou

        // (nem vitória, nem empate), troca o jogador
        if (!fimdejogo) {
            if (jogadaAtual === 'X') {
                jogadaAtual = 'O';
            } else {
                jogadaAtual = 'X';
            }
        }
	}

	function vitoria() {
        const paravencer = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // conclusão ds linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // conclusão das colunas
            [0, 4, 8], [2, 4, 6]             // conclusão diagonais
        ];

        for (let i = 0; i < paravencer.length; i++) {
            const [a, b, c] = paravencer[i]; // a combinação atual, a vencedora, as casas onde estão os 3 x ou as 3 O que marcaram vitória
            if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) { // verificação se casa A esta vazia, não pode, dps verifica se o conteúdo das 3 casinhas são iguais 
                alert("Parabéns!! Você venceu a jogada!"); // se verdadeiras, tem um vencedor 
                reiniciar(); // reinicia o jogo
                return true;
            }
        }

        if (tabuleiro.every(casa => casa !== '')) { // verificação de empate, se tem alguma casinha vazia
            alert('Houve empate! Ninguém venceu.');
            reiniciar();
			return true;
        }
		return false;
	}
</script>

<br />
<div class="mt-3">
	<center>
		<h2><b>Jogo da Velha</b> <i class="bi bi-x-circle"></i></h2>
		<br />
		<p>Olá! Seja bem-vindo(a) ao Jogo da Velha!</p>
		<b>Modo de jogar:</b> chame um amigo para se divertir com você...
		<br />
		<br />
		<table>
			<tbody>
				<tr>
					<td onclick={() => jogada(0)} class="borda-direita borda-inferior">{tabuleiro[0]}</td>
					<td onclick={() => jogada(1)} class="borda-direita borda-inferior">{tabuleiro[1]}</td>
					<td onclick={() => jogada(2)} class="borda-inferior">{tabuleiro[2]}</td>
				</tr>
				<tr>
					<td onclick={() => jogada(3)} class="borda-direita borda-inferior">{tabuleiro[3]}</td>
					<td onclick={() => jogada(4)} class="borda-direita borda-inferior">{tabuleiro[4]}</td>
					<td onclick={() => jogada(5)} class="borda-inferior">{tabuleiro[5]}</td>
				</tr>
				<tr>
					<td onclick={() => jogada(6)} class="borda-direita">{tabuleiro[6]}</td>
					<td onclick={() => jogada(7)} class="borda-direita">{tabuleiro[7]}</td>
					<td onclick={() => jogada(8)}>{tabuleiro[8]}</td>
				</tr>
			</tbody>
		</table>
		<br />
		<button onclick={reiniciar} class="btn bg-danger-subtle w-30"><b>Jogar Novamente!</b></button>
	</center>
</div>

<style>
	table {
		width: 60dvw;
		height: 60dvw;
		text-align: center;
		font-size: 13dvw;
	}

	td {
		width: 33%;
		height: 33%;
	}

	.borda-direita {
		border-right: 1dvw solid rgb(0, 0, 0);
	}
	.borda-inferior {
		border-bottom: 1dvw solid black;
	}
</style>
