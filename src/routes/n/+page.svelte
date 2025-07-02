<script>
    /**
     * @file n/+page.svelte
     * @description Componente Svelte para um Gerador de Números Aleatórios.
     * Permite ao usuário definir um intervalo (mínimo e máximo) e a quantidade de números a serem gerados.
     */

    // Variável reativa para o valor mínimo do intervalo (inicializado como 1).
    let min = $state(1);
    // Variável reativa para o valor máximo do intervalo (inicializado como 100).
    let max = $state(100);
    // Variável reativa para a quantidade de números a serem gerados (inicializado como 1).
    let quant = $state(1);
    // Array reativo para armazenar os números gerados.
    let geradornum = $state([]);

    /**
     * Função que gera números aleatórios com base nos valores de min, max e quant.
     */
    function gerador() {
        // Limpa o array de números gerados para uma nova geração.
        geradornum = [];

        // Converte os valores de min e max para números inteiros.
        // Math.floor(min) e Math.floor(max) garantem que os valores são inteiros.
        const parsedMin = Math.floor(min);
        const parsedMax = Math.floor(max);

        // Verifica se os valores são válidos (min menor ou igual a max, e quant maior que 0).
        if (parsedMin > parsedMax || quant <= 0) {
            alert('Por favor, insira valores válidos: Mínimo <= Máximo e Quantidade > 0.');
            return;
        }

        // Loop para gerar a quantidade de números especificada.
        for (let i = 0; i < quant; i++) {
            // Gera um número inteiro aleatório entre parsedMin (inclusive) e parsedMax (inclusive).
            // Math.random() * (parsedMax - parsedMin + 1) -> gera um número entre 0 e (max - min + 1)
            // + parsedMin -> ajusta a faixa para começar em parsedMin.
            // Math.floor() -> arredonda para o número inteiro mais próximo para baixo.
            const randomNumber = Math.floor(Math.random() * (parsedMax - parsedMin + 1)) + parsedMin;
            // Adiciona o número gerado ao array.
            geradornum.push(randomNumber);
        }
    }
</script>

<style>
    /* Estilos para o contêiner principal da página. */
    .page-content-container {
        display: flex;
        flex-direction: column;
        align-items: center; /* Centraliza horizontalmente o conteúdo. */
        padding: 20px;
        box-sizing: border-box;
        min-height: calc(100vh - 56px); /* Altura mínima para ocupar a tela toda, descontando uma possível navbar. */
        background-color: #f8f9fa; /* Cor de fundo clara. */
    }

    /* Estilos para o título do gerador. */
    h2 {
        color: #343a40; /* Cor de texto escuro. */
        margin-bottom: 30px;
    }

    /* Estilos para os cards (contêineres de inputs). */
    .card {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave para profundidade. */
        padding: 30px;
        width: 100%;
        max-width: 400px; /* Largura máxima para o card. */
        margin-bottom: 30px;
        text-align: center;
    }

    /* Estilos para os grupos de input (label + input). */
    .input-group-n {
        margin-bottom: 20px;
        text-align: left;
    }

    .input-group-n label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #555;
    }

    .input-group-n input[type="number"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ced4da;
        border-radius: 5px;
        font-size: 1em;
        box-sizing: border-box; /* Garante que padding não aumente a largura total. */
    }

    /* Estilos para o botão de geração. */
    .btn-primary {
        background-color: #28a745; /* Verde Bootstrap. */
        border-color: #28a745;
        font-size: 1.1em;
        padding: 12px 25px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        color: white;
        width: 100%;
        max-width: 200px;
    }

    .btn-primary:hover {
        background-color: #218838; /* Verde mais escuro no hover. */
        border-color: #1e7e34;
    }

    /* Estilos para a seção de resultados. */
    .results-section {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #eee; /* Linha divisória. */
        width: 100%;
        max-width: 400px;
    }

    .results-section h3 {
        color: #343a40;
        margin-bottom: 15px;
    }

    /* Estilos para a lista de números gerados. */
    .generated-numbers-list {
        list-style: none; /* Remove marcadores de lista. */
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap; /* Permite que os itens quebrem linha. */
        gap: 10px; /* Espaçamento entre os números. */
        justify-content: center; /* Centraliza os números na lista. */
    }

    .generated-numbers-list li {
        background-color: #e9ecef; /* Cor de fundo para cada número. */
        padding: 8px 15px;
        border-radius: 20px; /* Cantos arredondados. */
        font-size: 1.1em;
        color: #495057;
        font-weight: bold;
    }
</style>

<div class="page-content-container">
    <h2>Gerador de Números Aleatórios <i class="bi bi-dice-5"></i></h2>

    <div class="card">
        <div class="input-group-n">
            <label for="minInput">Mínimo:</label>
            <input type="number" id="minInput" bind:value={min} placeholder="Ex: 1" />
        </div>

        <div class="input-group-n">
            <label for="maxInput">Máximo:</label>
            <input type="number" id="maxInput" bind:value={max} placeholder="Ex: 100" />
        </div>

        <div class="input-group-n">
            <label for="quantInput">Quantidade:</label>
            <input type="number" id="quantInput" bind:value={quant} placeholder="Ex: 5" />
        </div>

        <button class="btn btn-primary" onclick={gerador}>Gerar Números</button>
    </div>

    {#if geradornum.length > 0}
        <div class="results-section card">
            <h3>Números Gerados:</h3>
            <ul class="generated-numbers-list">
                {#each geradornum as num}
                    <li>{num}</li>
                {/each}
            </ul>
        </div>
    {/if}
</div>