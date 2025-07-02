<script>
    /**
     * @file c-c/+page.svelte
     * @description Componente Svelte para o jogo de Cara ou Coroa.
     * Simula o giro de uma moeda e exibe o resultado aleatório.
     */

    // Variável reativa para armazenar o resultado do giro da moeda.
    // Pode ser 'cara', 'coroa' ou uma string vazia (estado inicial ou antes de girar).
    let coinResult = $state('');
    // Variável reativa para controlar o estado de animação/giro da moeda.
    // True quando a moeda está "girando", false quando parada.
    let isFlipping = $state(false);

    /**
     * Função assíncrona que simula o giro da moeda.
     * Define um tempo de espera para a animação e então determina o resultado.
     */
    async function flipCoin() {
        // Define o estado de giro como verdadeiro para ativar a animação.
        isFlipping = true;
        // Limpa o resultado anterior para que o usuário veja a moeda "girando".
        coinResult = '';

        // Aguarda 1 segundo (1000 milissegundos) para simular o tempo de giro da moeda.
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Gera um número aleatório entre 0 e 1.
        // Se for menor que 0.5, o resultado é 'cara', caso contrário, é 'coroa'.
        if (Math.random() < 0.5) {
            coinResult = 'cara';
        } else {
            coinResult = 'coroa';
        }
        // Define o estado de giro como falso para parar a animação.
        isFlipping = false;
    }
</script>

<style>
    /* Estilos para o contêiner da página. */
    .page-content-container {
        display: flex;
        flex-direction: column;
        align-items: center; /* Centraliza horizontalmente */
        justify-content: flex-start; /* Alinha ao topo */
        padding: 20px;
        box-sizing: border-box;
        min-height: calc(100vh - 56px); /* Altura mínima da tela, considerando uma navbar de 56px */
        background-color: #f8f9fa; /* Cor de fundo clara */
    }

    /* Estilos para o contêiner da moeda. */
    .coin-container {
        margin-top: 40px; /* Espaçamento superior */
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* Estilos básicos para a moeda. */
    .coin {
        width: 120px;
        height: 120px;
        border-radius: 50%; /* Torna o elemento um círculo */
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2em;
        font-weight: bold;
        color: white;
        transition: transform 0.5s ease-out, background-color 0.5s ease-out; /* Transição suave para transform e cor de fundo */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para profundidade */
    }

    /* Estilos quando a moeda está girando. */
    .coin.flipping {
        background-color: #6c757d; /* Cinza durante o giro */
        transform: rotateY(360deg) scale(1.1); /* Animação de giro e leve aumento */
    }

    /* Estilos quando o resultado é 'cara'. */
    .coin.cara {
        background-color: #28a745; /* Verde para 'cara' */
    }

    /* Estilos quando o resultado é 'coroa'. */
    .coin.coroa {
        background-color: #007bff; /* Azul para 'coroa' */
    }

    /* Estilos para o texto do resultado. */
    .result {
        margin-top: 20px;
        font-size: 1.8em;
        font-weight: bold;
        color: #343a40; /* Cor de texto escuro */
    }

    /* Estilos para o botão de jogar moeda. */
    .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
        font-size: 1.2em;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .btn-primary:hover:not(:disabled) {
        background-color: #0056b3;
        border-color: #004085;
    }

    .btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
</style>

<div class="page-content-container">
    <h2 class="mt-4">Cara ou Coroa <i class="bi bi-coin"></i></h2>

    <div class="coin-container">
        <button class="btn btn-primary mb-4" onclick={flipCoin} disabled={isFlipping}>
            Jogar Moeda
        </button>

        <div class="coin" class:flipping={isFlipping} class:cara={coinResult === 'cara'} class:coroa={coinResult === 'coroa'}>
            {#if coinResult === 'cara'}
                C
            {:else if coinResult === 'coroa'}
                K
            {/if}
        </div>

        {#if coinResult}
            <p class="result mt-4">
                {coinResult === 'cara' ? 'Cara!' : 'Coroa!'}
            </p>
        {/if}
    </div>
</div>