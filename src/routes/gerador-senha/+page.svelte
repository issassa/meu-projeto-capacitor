<script>
    /**
     * @file gerador-senha/+page.svelte
     * @description Componente Svelte para um gerador de senhas aleatórias.
     * Permite personalizar o comprimento, incluir tipos de caracteres e gerar múltiplas senhas.
     */

    // Variáveis reativas para as opções do gerador de senha.
    let tamsenha = $state(12); // Comprimento da senha (padrão: 12).
    let contsenha = $state(1); // Quantidade de senhas a serem geradas (padrão: 1).
    let incminus = $state(true); // Incluir letras minúsculas (padrão: true).
    let incmaius = $state(true); // Incluir letras maiúsculas (padrão: true).
    let incnum = $state(true); // Incluir números (padrão: true).
    let incsimb = $state(false); // Incluir símbolos (padrão: false).
    // Array reativo para armazenar as senhas geradas.
    let senhasGeradas = $state([]);

    // Constantes com os conjuntos de caracteres disponíveis.
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    /**
     * Gera uma única senha aleatória com base nas opções selecionadas.
     * @returns {string} A senha gerada ou uma string vazia se nenhuma opção for selecionada.
     */
    function gerarsenha() {
        let availableChars = '';
        // Constrói a string de caracteres disponíveis com base nas checkboxes marcadas.
        if (incminus) availableChars += lowercaseChars;
        if (incmaius) availableChars += uppercaseChars;
        if (incnum) availableChars += numberChars;
        if (incsimb) availableChars += symbolChars;

        // Se nenhum tipo de caractere for selecionado ou o tamanho da senha for inválido, retorna vazio.
        if (availableChars.length === 0 || tamsenha <= 0) {
            return '';
        }

        let password = '';
        // Gera a senha escolhendo caracteres aleatoriamente.
        for (let i = 0; i < tamsenha; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            password += availableChars[randomIndex];
        }
        return password;
    }

    /**
     * Gera múltiplas senhas e armazena no array 'senhasGeradas'.
     * Chamado quando o botão "gerar senha" é clicado.
     */
    function variassenhas() {
        // Limpa as senhas geradas anteriormente.
        senhasGeradas = [];
        // Loop para gerar a quantidade de senhas especificada.
        for (let i = 0; i < contsenha; i++) {
            const newPassword = gerarsenha();
            if (newPassword) { // Adiciona a senha apenas se não for vazia.
                senhasGeradas.push(newPassword);
            }
        }
    }

    /**
     * Copia a senha fornecida para a área de transferência do usuário.
     * @param {string} senha A senha a ser copiada.
     */
    async function copiarsenha(senha) {
        try {
            await navigator.clipboard.writeText(senha);
            alert('Senha copiada para a área de transferência!'); // Feedback para o usuário.
        } catch (err) {
            console.error('Erro ao copiar senha: ', err);
            alert('Não foi possível copiar a senha.'); // Feedback de erro.
        }
    }
</script>

<style>
    /* Estilos para o contêiner principal da página. */
    .page-container {
        display: flex;
        flex-direction: column;
        align-items: center; /* Centraliza horizontalmente. */
        padding: 20px;
        box-sizing: border-box;
        min-height: calc(100vh - 56px); /* Ajusta para a altura da viewport. */
        background-color: #f8f9fa; /* Cor de fundo clara. */
    }

    /* Estilos do card principal que contém os controles do gerador. */
    .password-generator-card {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 30px;
        width: 100%;
        max-width: 500px; /* Largura máxima. */
        margin-bottom: 30px;
        text-align: center;
    }

    /* Estilos para o título. */
    h2 {
        color: #343a40;
        margin-bottom: 10px;
    }

    /* Estilos para a descrição. */
    p.description {
        color: #6c757d;
        margin-bottom: 25px;
    }

    /* Estilos para os grupos de input de texto/número. */
    .input-group {
        margin-bottom: 20px;
        text-align: left; /* Alinha o label e input à esquerda dentro do grupo. */
    }

    .input-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #555;
    }

    .input-group input[type="number"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ced4da;
        border-radius: 5px;
        font-size: 1em;
        box-sizing: border-box;
    }

    /* Estilos para os grupos de checkboxes. */
    .checkbox-group {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        text-align: left;
    }

    .checkbox-group input[type="checkbox"] {
        margin-right: 10px;
        transform: scale(1.2); /* Aumenta o tamanho do checkbox. */
    }

    .checkbox-group label {
        font-weight: normal;
        color: #343a40;
        cursor: pointer;
    }

    /* Estilos para o botão de geração de senhas. */
    .btn-generate {
        background-color: #007bff; /* Azul Bootstrap (primary). */
        border-color: #007bff;
        font-size: 1.2em;
        padding: 12px 30px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        color: white;
        font-weight: bold;
        margin-top: 20px;
    }

    .btn-generate:hover {
        background-color: #0056b3;
        border-color: #004085;
    }

    /* Estilos para a seção de resultados (senhas geradas). */
    .results-section {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #eee;
        width: 100%;
        max-width: 500px;
        text-align: center;
    }

    .results-section h3 {
        color: #343a40;
        margin-bottom: 15px;
    }

    /* Estilos para a lista de senhas geradas. */
    .password-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .password-item {
        background-color: #e9ecef; /* Cor de fundo para cada item. */
        padding: 10px 15px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between; /* Espaçamento entre senha e botão. */
        align-items: center;
        margin-bottom: 10px;
        font-family: 'Courier New', Courier, monospace; /* Fonte monoespaçada para senhas. */
        font-size: 1.1em;
        color: #495057;
    }

    /* Estilos para o botão de copiar dentro do item da senha. */
    .password-item button {
        background-color: #6c757d; /* Cinza Bootstrap (secondary). */
        border-color: #6c757d;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .password-item button:hover {
        background-color: #5a6268;
        border-color: #545b62;
    }
</style>

<div class="page-container">
    <div class="password-generator-card">
        <h2>Gerador de Senhas <i class="bi bi-key-fill"></i></h2>
        <p class="description">Crie senhas fortes e seguras rapidamente.</p>

        <div class="input-group">
            <label for="tamsenha">Comprimento da Senha:</label>
            <input type="number" id="tamsenha" bind:value={tamsenha} min="4" max="32" />
        </div>

        <div class="input-group">
            <label for="contsenha">Número de Senhas:</label>
            <input type="number" id="contsenha" bind:value={contsenha} min="1" max="10" />
        </div>

        <div class="checkbox-group">
            <input type="checkbox" id="incminus" bind:checked={incminus} />
            <label for="incminus">Incluir letras minúsculas (a-z)</label>
        </div>
        <div class="checkbox-group">
            <input type="checkbox" id="incmaius" bind:checked={incmaius} />
            <label for="incmaius">Incluir letras maiúsculas (A-Z)</label>
        </div>
        <div class="checkbox-group">
            <input type="checkbox" id="incnum" bind:checked={incnum} />
            <label for="incnum">Incluir números (0-9)</label>
        </div>
        <div class="checkbox-group">
            <input type="checkbox" id="incsimb" bind:checked={incsimb} />
            <label for="incsimb">Incluir símbolos (!@#$%...)</label>
        </div>

        <button class="btn-generate" onclick={variassenhas}>Gerar Senha</button>
    </div>

    {#if senhasGeradas.length > 0}
        <div class="results-section password-generator-card">
            <h3>Senhas Geradas:</h3>
            <ul class="password-list">
                {#each senhasGeradas as senha}
                    <li class="password-item">
                        <span>{senha}</span>
                        <button onclick={() => copiarsenha(senha)}>Copiar</button>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>