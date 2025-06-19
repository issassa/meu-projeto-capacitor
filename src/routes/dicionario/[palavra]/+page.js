import { dicionario } from '$lib/dicionario.js'; //** importa a biblioteca do dicionário */

export async function load({ params }) { //* importa os parametros */

  const name = params.palavra;  //* o name vai ser a palavra que ta nos parametros do url */
  let palavra = dicionario.filter((palavra) => palavra.palavra == name); //* para definir a variável palavra, é executado um filtro dentro da biblio do dicio /* 

  return { palavra }; //* retorna a váriavel palavra para o front ed */
}