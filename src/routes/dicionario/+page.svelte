<script>
    /**
     * @file dicionario/+page.svelte
     * @description Componente Svelte para a página principal do Dicionário.
     * Oferece funcionalidades de busca de palavras em tempo real e a opção de sortear uma palavra aleatória.
     */

    // Importa o objeto 'dicionario' de sua fonte de dados localizada em '$lib/dicionario.js'.
    // Este objeto é presumivelmente um array de termos com propriedades como 'palavra' e 'definicao'.
    import { dicionario } from '$lib/dicionario';
    // Importa a função 'goto' do SvelteKit, que permite navegar programaticamente
    // para diferentes rotas do aplicativo, sem precisar de um clique em um link <a>.
    import { goto } from '$app/navigation'; /** navegar programaticamnte */

    // Variável reativa para armazenar o texto digitado pelo usuário no campo de busca.
    // O '$state' garante que o Svelte detecte mudanças e atualize a UI.
    let palavra = $state('');
    // Variável reativa que armazena a lista de palavras que correspondem à busca.
    // Inicialmente, contém todas as palavras do dicionário.
    let filtradas = $state(dicionario);

    /**
     * Função para filtrar as palavras do dicionário com base no que o usuário digitou.
     * Ela é chamada a cada vez que o input de busca é alterado.
     */
    function buscar() {
        // Se o campo de busca 'palavra' estiver vazio (ou apenas com espaços em branco após o trim),
        // redefine 'filtradas' para mostrar todas as palavras do dicionário.
        if (palavra.trim() === '') { // Adicionado .trim() para considerar espaços em branco.
            filtradas = dicionario;
            return; // Sai da função.
        }

        // Zera o array de palavras filtradas para preenchê-lo com os novos resultados.
        filtradas = [];
        // Itera sobre cada 'termo' (objeto de palavra) no dicionário completo.
        for (const termo of dicionario) {
            // Verifica se a propriedade 'palavra' do termo atual começa com o texto digitado em 'palavra'.
            // '.toLowerCase()' é usado para uma busca que não diferencia maiúsculas de minúsculas.
            if (termo.palavra.toLowerCase().startsWith(palavra.toLowerCase())) {
                // Se a condição for verdadeira, adiciona o termo ao array 'filtradas'.
                filtradas.push(termo);
            }
        }
    }

    /**
     * Função para selecionar uma palavra aleatória do dicionário e navegar para sua definição.
     */
    function aleatoria() {
        // Gera um índice aleatório válido dentro do comprimento do array 'dicionario'.
        const randomIndex = Math.floor(
            Math.random() * dicionario.length
        ); /** índice aleat dentro do dicio */
        // Pega a palavra correspondente ao índice aleatório.
        // O '?.palavra' (optional chaining) é usado para evitar erros se 'dicionario[randomIndex]' for undefined.
        const randomWord =
            dicionario[randomIndex]?.palavra; /** '?.palavra' evita erros se for undefined */

        // Se uma palavra aleatória válida foi encontrada.
        if (randomWord) {
            // Usa a função 'goto' para navegar programaticamente para a rota de definição da palavra sorteada.
            // A URL será construída dinamicamente, por exemplo, '/dicionario/casa'.
            /** navega para a rota de defin da palavra sorteada */
            goto(`/dicionario/${randomWord}`);
        }
    }
</script>

<br />
<div class="card mb-3" style="width: 21rem;">
    <div class="card-body text-center">
        <h2 class="card-title"><b>Dicionário <i class="bi bi-alphabet-uppercase"></i></b></h2>
        <br />
        <div class="input-group mb-3">
            <input
                class="form-control"
                placeholder="digite uma palavra..."
                aria-label="palavra"
                aria-describedby="button-addon2"
                oninput={buscar}
                bind:value={palavra}
            />
        </div>
        <button class="btn btn-outline-secondary" onclick={aleatoria}><b>palavra aleatória</b></button>
        <br />
        <br />
        <br />
        <h5 class="card-title"><b>Lista de palavras <i class="bi bi-journal-text"></i></b></h5>

        {#each filtradas as termo}
            <p><a href="/dicionario/{termo.palavra}">{termo?.palavra}</a></p>
        {/each}
    </div>
</div>