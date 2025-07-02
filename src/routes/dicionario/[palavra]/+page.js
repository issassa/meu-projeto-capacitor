/**
 * @file dicionario/[palavra]/+page.js
 * @description Script de carregamento de dados do SvelteKit para a rota dinâmica do dicionário.
 * Ele busca a definição de uma palavra específica com base no parâmetro da URL.
 * Este script é executado antes do componente Svelte (+page.svelte) ser renderizado.
 */

// Importa o objeto 'dicionario' da sua fonte de dados.
// Este é o array que contém todas as palavras e suas definições.
import { dicionario } from '$lib/dicionario.js'; //** importa a biblioteca do dicionário */

/**
 * Função 'load' do SvelteKit.
 * É uma função especial que o SvelteKit executa para carregar dados para uma página.
 * Ela é assíncrona, o que permite operações como buscar dados de uma API.
 * @param {Object} context - O objeto de contexto fornecido pelo SvelteKit.
 * @param {Object} context.params - Contém os parâmetros dinâmicos da URL.
 */
export async function load({ params }) { //* importa os parametros */

    // Extrai o valor do parâmetro 'palavra' da URL.
    // Ex: Se a URL é '/dicionario/exemplo', params.palavra será 'exemplo'.
    const name = params.palavra;  //* o name vai ser a palavra que ta nos parametros do url */

    // Filtra o array 'dicionario' para encontrar o objeto de palavra que corresponde ao 'name' da URL.
    // O método '.filter()' retorna um novo array contendo todos os elementos
    // que satisfazem a condição de teste.
    // A condição 'palavra.palavra == name' compara a propriedade 'palavra' de cada item
    // do dicionário com o nome extraído da URL.
    let palavra = dicionario.filter((palavra) => palavra.palavra == name); //* para definir a variável palavra, é executado um filtro dentro da biblio do dicio */

    // Retorna um objeto com a propriedade 'palavra'.
    // O SvelteKit disponibiliza o conteúdo deste objeto retornado
    // como a prop 'data' para o componente Svelte associado a esta rota (+page.svelte).
    // Assim, o frontend pode acessar 'data.palavra' para exibir a palavra e sua definição.
    return { palavra }; //* retorna a váriavel palavra para o front ed */
}