<script>
  let coinResult = ''; // 'cara', 'coroa', ou vazio
  let isFlipping = false; // Estado para controlar a animação de giro

  function flipCoin() {
    isFlipping = true;
    coinResult = ''; // Limpa o resultado anterior

    // Simula um "giro" com um pequeno atraso antes de revelar o resultado
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.5) {
        coinResult = 'cara';
      } else {
        coinResult = 'coroa';
      }
      isFlipping = false;
    }, 1000); // 1 segundo de "giro"
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

  /* Estilos para a moeda */
  .coin {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #ffc107; /* Cor de moeda (amarelo Bootstrap) */
    border: 3px solid #e0a800;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin: 2rem auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .coin.cara {
    background-color: #28a745; /* Verde para Cara */
    border-color: #218838;
    color: white;
  }

  .coin.coroa {
    background-color: #dc3545; /* Vermelho para Coroa */
    border-color: #c82333;
    color: white;
  }

  .coin.flipping {
    background-color: #6c757d; /* Cinza durante o giro */
    border-color: #5a6268;
    color: white;
  }
</style>

<div class="container page-content-container">
  <h2 class="mb-4 text-center">Cara ou Coroa</h2>

  <div class="d-flex justify-content-center">
    <button class="btn btn-primary w-100 mb-4" on:click={flipCoin} disabled={isFlipping}>
      {#if isFlipping}
        Girando...
      {:else}
        Jogar Moeda
      {/if}
    </button>
  </div>

  <div class="coin {coinResult} {isFlipping ? 'flipping' : ''}">
    {#if isFlipping}
      ?
    {:else if coinResult === 'cara'}
      CARA
    {:else if coinResult === 'coroa'}
      COROA
    {/if}
  </div>

  {#if coinResult && !isFlipping}
    <div class="mt-4 p-3 border rounded text-center">
      <h4 class="mb-3">Resultado:</h4>
      <p class="fs-4 fw-bold text-primary">
        {#if coinResult === 'cara'}
          Cara!
        {:else}
          Coroa!
        {/if}
      </p>
    </div>
  {/if}
</div>
