<script>
  let selectedRoulette = 'comidas'; // 'comidas', 'jogos', 'livros', 'objetos'
  let result = '';

  // --- ONDE VOCÊ DEVE COLOCAR SUAS OPÇÕES ---
  const rouletteOptions = {
    comidas: [
      'Pizza',
      'Hambúrguer',
      'Sushi',
      'Taco',
      'Lasanha',
      'Salada',
    ],
    jogos: [
      'Xadrez',
      'Dama',
      'Monopoly',
      'Banco Imobiliário',
      'Detetive',
      'War',
    ],
    livros: [
      'Ficção Científica',
      'Fantasia',
      'Romance',
      'Suspense',
      'Biografia',
      'História',
    ],
    objetos: [
      'Chave',
      'Celular',
      'Carteira',
      'Caneta',
      'Óculos',
      'Livro',
    ],
  };

  // Função para girar a roleta e obter um resultado
  function spinRoulette() {
    const options = rouletteOptions[selectedRoulette];
    if (options && options.length > 0) {
      const randomIndex = Math.floor(Math.random() * options.length);
      result = options[randomIndex];
    } else {
      result = 'Selecione uma roleta válida.';
    }
  }
</script>

<style>
  /* Estilos para o container interno da página */
  .page-content-container {
    padding: 1.5rem;
    border: 1px solid #dee2e6; /* Borda suave */
    border-radius: 0.4rem;
    margin-top: 1.5rem;
  }

  /* Estilos para a roleta ilustrativa */
  .roulette-illustration {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #f0f0f0; /* Cor de fundo da roleta */
    border: 5px solid #007bff; /* Borda da roleta */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin: 1.5rem auto; /* Centraliza a roleta */
    text-align: center;
    flex-direction: column;
    position: relative; /* Essencial para posicionar os segmentos */
    overflow: hidden; /* Crucial para recortar os segmentos fora do círculo */
  }

  /* Estilos para os segmentos da roleta (as "casinhas") */
  .roulette-segment {
    position: absolute;
    top: 0; /* Alinha o topo do segmento com o topo da roleta */
    left: 50%; /* Posiciona a borda esquerda do segmento no centro horizontal da roleta */
    width: 50%; /* Metade da largura da roleta (o raio) */
    height: 100%; /* Altura total da roleta (o diâmetro) */
    transform-origin: 0% 50%; /* O ponto de rotação é o meio da borda esquerda do segmento, que coincide com o centro da roleta */
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start; /* Alinha o texto ao início da fatia */
    align-items: center; /* Centraliza o texto verticalmente dentro da área da fatia */
    padding-left: 10px; /* Afasta o texto do centro da roleta */
    font-size: 0.8rem;
    color: #555;
    /* As cores de fundo para segment-1 a segment-6 (definidas no App.svelte) serão aplicadas */
    border-right: 1px solid rgba(0, 0, 0, 0.1); /* Adiciona uma linha sutil para separar as fatias */
  }

  /* Cores e rotações para os segmentos da roleta (mantidas do App.svelte para referência, mas a lógica de rotação agora está no .roulette-segment) */
  .segment-1 { transform: rotate(0deg); background-color: #e6e6e6; }
  .segment-2 { transform: rotate(60deg); background-color: #d6d6d6; }
  .segment-3 { transform: rotate(120deg); background-color: #c6c6c6; }
  .segment-4 { transform: rotate(180deg); background-color: #b6b6b6; }
  .segment-5 { transform: rotate(240deg); background-color: #a6a6a6; }
  .segment-6 { transform: rotate(300deg); background-color: #969696; }

  .roulette-pointer {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid #dc3545; /* Ponteiro vermelho */
    position: absolute;
    top: -10px; /* Ajuste para posicionar acima da roleta */
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
</style>

<div class="container page-content-container">
  <h2 class="mb-4 text-center">Roleta</h2>

  <div class="mb-3">
    <label for="selectRoulette" class="form-label">Escolha a Roleta:</label>
    <select id="selectRoulette" class="form-select" bind:value={selectedRoulette}>
      <option value="comidas">Comidas</option>
      <option value="jogos">Jogos</option>
      <option value="livros">Livros</option>
      <option value="objetos">Objetos</option>
    </select>
  </div>

  <button class="btn btn-primary w-100 mb-4" on:click={spinRoulette}>Girar Roleta</button>

  <div class="roulette-illustration">
    <div class="roulette-pointer"></div>
    <!-- Exibindo as opções da roleta selecionada de forma ilustrativa -->
    {#if rouletteOptions[selectedRoulette]}
      {#each rouletteOptions[selectedRoulette] as option, i}
        <div class="roulette-segment segment-{i + 1}" style="transform: rotate({i * 60}deg);">
          {option}
        </div>
      {/each}
    {/if}
  </div>

  {#if result}
    <div class="mt-4 p-3 border rounded text-center">
      <h4 class="mb-3">Resultado:</h4>
      <p class="fs-4 fw-bold text-primary">{result}</p>
    </div>
  {/if}
</div>
