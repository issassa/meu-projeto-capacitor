<script>

    // 'mensagem' é um array de objetos de mensagem.
    // https://pedrosiqueira.github.io/ifmsjs/guib.html

    let { mensagem } = $props();
  </script>
  
  {#each mensagens as mensagem}
  <div class="input-group mb-1 {tarefa.status == 1 ? 'text-decoration-line-through' : ''}">
    <div class="input-group mb-1">
        <span class="form-control form-control-lg">{mensagem.conteudo}</span>
    </div>
    </div>
  {/each}