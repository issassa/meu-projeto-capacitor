<script>
    /**
     * @file dicionario/[palavra]/+page.svelte
     * @description Componente de página Svelte para exibir a definição detalhada de uma palavra.
     * Este componente recebe os dados da palavra via as props do SvelteKit (geradas pelo +page.js).
     */

    // Desestrutura a prop 'data' que é fornecida pelo SvelteKit para componentes de página.
    // A 'data' contém os dados carregados pela função 'load' do arquivo +page.js associado.
    let { data } = $props(); //* importa os dados do backend pro front-end, ou seja, pego a váriavel palavra do back-end e passo para o front-end. */

    // Imprime o conteúdo da variável 'data' no console do navegador.
    // Útil para depuração, para verificar quais dados estão sendo recebidos.
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
        <button style="text-itens-center" type="button" class="btn btn-outline-secondary"><b>voltar à página inicial</b></button>
    </a>
    <br>
</div>