<script>
    /**
     * @file r/+page.svelte
     * @description Componente Svelte para uma Roleta Interativa.
     * Permite ao usuário escolher uma categoria e girar a roleta para obter um item aleatório.
     */

    // Variável reativa para a categoria de roleta selecionada pelo usuário (ex: 'comidas', 'jogos').
    let selectedRoulette = $state('comidas'); // Valor inicial.
    // Variável reativa para o resultado final do giro da roleta.
    let result = $state('');
    // Variável reativa para controlar a rotação visual da roleta (usada em estilos).
    let rotation = $state(0);
    // Variável reativa para controlar a animação de giro (desabilitar botão, etc.).
    let spinning = $state(false);

    // Objeto que contém as opções para cada categoria de roleta.
    const rouletteOptions = {
        comidas: ['Pizza', 'Hambúrguer', 'Sushi', 'Taco', 'Salada', 'Lasanha', 'Feijoada', 'Churrasco'],
        jogos: ['Xadrez', 'Monopoly', 'Poker', 'Dominó', 'RPG', 'Catan', 'Banco Imobiliário', 'War'],
        livros: ['Ficção Científica', 'Fantasia', 'Romance', 'Mistério', 'Thriller', 'Biografia', 'História', 'Autoajuda'],
        objetos: ['Chave', 'Celular', 'Caneta', 'Copo', 'Livro', 'Fone de ouvido', 'Relógio', 'Carteira'],
    };

    /**
     * Função que inicia o giro da roleta e determina o resultado aleatório.
     */
    function spinRoulette() {
        // Se a roleta já estiver girando, não faz nada.
        if (spinning) return;

        // Define o estado de giro como verdadeiro.
        spinning = true;
        // Limpa o resultado anterior.
        result = '';

        // Obtém as opções da roleta com base na categoria selecionada.
        const options = rouletteOptions[selectedRoulette];

        // Verifica se há opções para a categoria selecionada.
        if (options && options.length > 0) {
            // Calcula o ângulo de cada segmento da roleta.
            const anglePerOption = 360 / options.length;
            // Gera um índice aleatório para selecionar uma opção.
            const randomIndex = Math.floor(Math.random() * options.length);
            // Calcula o ângulo final para o ponteiro parar na opção sorteada.
            // Adiciona múltiplos de 360 para garantir várias voltas visuais.
            const newRotation = 360 * 5 + (360 - (randomIndex * anglePerOption + anglePerOption / 2));
            rotation = newRotation; // Atualiza a rotação reativa para a animação.

            // Usa setTimeout para exibir o resultado após a animação da roleta.
            setTimeout(() => {
                result = options[randomIndex]; // Define o resultado final.
                spinning = false; // Define o estado de giro como falso.
            }, 3000); // Tempo da animação CSS (3 segundos).
        } else {
            result = 'Selecione uma roleta com opções!';
            spinning = false;
        }
    }

    // Função para obter as opções da roleta selecionada atualmente.
    function getCurrentRouletteOptions() {
        return rouletteOptions[selectedRoulette] || [];
    }
</script>

<style>
    /* Estilos gerais do contêiner da página. */
    .page-content-container {
        display: flex;
        flex-direction: column;
        align-items: center; /* Centraliza horizontalmente. */
        padding: 20px;
        box-sizing: border-box;
        min-height: calc(100vh - 56px);
        background-color: #f8f9fa;
    }

    /* Estilos do título. */
    h2 {
        color: #343a40;
        margin-bottom: 30px;
    }

    /* Estilos do card principal que envolve a roleta e controles. */
    .roulette-card {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 30px;
        width: 100%;
        max-width: 500px; /* Largura máxima do card. */
        margin-bottom: 30px;
        text-align: center;
    }

    /* Estilos para o grupo de seleção da roleta. */
    .roulette-select-group {
        margin-bottom: 25px;
    }

    .roulette-select-group label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
        color: #555;
    }

    .roulette-select-group select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ced4da;
        border-radius: 5px;
        font-size: 1em;
        box-sizing: border-box;
    }

    /* Estilos para o botão de girar. */
    .btn-spin {
        background-color: #ffc107; /* Amarelo Bootstrap (warning). */
        border-color: #ffc107;
        font-size: 1.2em;
        padding: 12px 30px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        color: #343a40;
        font-weight: bold;
        margin-bottom: 30px;
    }

    .btn-spin:hover:not(:disabled) {
        background-color: #e0a800; /* Amarelo mais escuro no hover. */
        border-color: #d39e00;
    }

    .btn-spin:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    /* Estilos do contêiner visual da roleta. */
    .roulette-visual-container {
        position: relative;
        width: 250px;
        height: 250px;
        border-radius: 50%;
        background-color: #eee;
        margin: 0 auto;
        border: 5px solid #ccc;
        overflow: hidden; /* Garante que os segmentos não transbordem. */
        box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2);
    }

    /* A ilustração principal da roleta que gira. */
    .roulette-illustration {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        /* A transição de rotação é aplicada aqui. */
        transition: transform 3s cubic-bezier(0.2, 0.8, 0.2, 1); /* Curva de desaceleração. */
        transform: rotateZ(var(--rotation, 0deg)); /* Aplica a rotação. */
    }

    /* Estilos para o ponteiro da roleta. */
    .roulette-pointer {
        position: absolute;
        top: -15px; /* Posição acima da roleta. */
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-bottom: 30px solid #dc3545; /* Vermelho Bootstrap (danger). */
        z-index: 10;
    }

    /* Estilos para cada segmento da roleta. */
    .roulette-segment {
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 50%;
        transform-origin: 0% 100%; /* Pivô de rotação no centro inferior do segmento. */
        overflow: hidden;
        border: 1px solid #ddd;
        box-sizing: border-box;
    }

    /* Conteúdo visível dentro de cada segmento. */
    .roulette-segment-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 200%; /* Para cobrir todo o segmento circular. */
        height: 200%;
        border-radius: 50%;
        background: var(--segment-color); /* Cor de fundo definida por variável CSS. */
        transform: rotate(calc(90deg - var(--angle) / 2)) skewY(calc(90deg - var(--angle)));
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        font-weight: bold;
        padding: 5px;
        text-align: center;
        box-sizing: border-box;
    }

    .segment-text {
        position: absolute;
        top: 10px; /* Ajusta a posição do texto dentro do segmento. */
        left: 50%;
        transform: translateX(-50%) rotate(calc(var(--angle) / 2)); /* Ajusta a rotação do texto */
        color: white;
        font-size: 0.8em;
        width: 100%;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }

    /* Cores de segmento para rotação */
    .roulette-segment:nth-child(odd) .roulette-segment-content {
        background-color: #6c757d; /* Cinza escuro. */
    }
    .roulette-segment:nth-child(even) .roulette-segment-content {
        background-color: #f8f9fa; /* Cinza claro. */
    }

    /* Estilos para a seção de resultado. */
    .result-section {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #eee;
        width: 100%;
        max-width: 400px;
    }

    .result-section h3 {
        color: #343a40;
        margin-bottom: 15px;
    }

    .result-section p {
        font-size: 1.5em;
        font-weight: bold;
        color: #007bff; /* Azul Bootstrap (primary). */
    }
</style>

<div class="page-content-container">
    <h2>Roleta <i class="bi bi-person-bounding-box"></i></h2>

    <div class="roulette-card">
        <div class="roulette-select-group">
            <label for="rouletteSelect">Escolha a Roleta:</label>
            <select id="rouletteSelect" bind:value={selectedRoulette}>
                {#each Object.keys(rouletteOptions) as category}
                    <option value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                {/each}
            </select>
        </div>

        <button class="btn-spin" onclick={spinRoulette} disabled={spinning}>
            Girar Roleta
        </button>

        <div class="roulette-visual-container">
            <div class="roulette-pointer"></div>
            <div class="roulette-illustration" style="--rotation: {rotation}deg;">
                {#each getCurrentRouletteOptions() as option, i}
                    {@const anglePerOption = 360 / getCurrentRouletteOptions().length}
                    {@const startAngle = i * anglePerOption}
                    <div
                        class="roulette-segment"
                        style="
                            transform: rotate({startAngle}deg) skewY(-{90 - anglePerOption}deg);
                            background-color: var(--segment-color-{i % 2});
                        "
                    >
                        <div class="roulette-segment-content"
                            style="
                                transform: rotate(calc(90deg - {anglePerOption}deg / 2)) skewY(calc(90deg - {anglePerOption}deg));
                                --segment-color: {i % 2 === 0 ? '#6c757d' : '#f8f9fa'};
                            "
                        >
                            <span class="segment-text" style="--angle: {anglePerOption}deg;">{option}</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        {#if result}
            <div class="result-section">
                <h3>Resultado:</h3>
                <p>{result}</p>
            </div>
        {/if}
    </div>
</div>