<script>
    import { onMount } from 'svelte';
   
    import Modal from '$lib/components/Modal.svelte';
    import Toast from '$lib/components/Toast.svelte';
    import ToDoList from '$lib/components/CHAT.svelte';
    import * as bootstrap from 'bootstrap';

    let novamsg = $state(''); // o conteúdo da nova tarefa a ser adicionada.
    let mensagens = $state([]); // armazena todas as mensagens.
    let mensagemToast; 


    //  adicionar uma nova msg.
    async function enviarmensagem() {
        novamsg = novamsg.trim(); 
        if (!novamsg) {

            mensagemToast.show();
            return;
        }
        // adiciona apo array.
        let data = new Date()
        data.toLocaleString()
        mensagens.push({ conteudo: novamsg, data});
        novamsg = ''; 
    }    

    onMount(() => {

        mensagemToast = new bootstrap.Toast('#mensagemToast');
    });
</script>

<br />
    <h2><i class="bi bi-person-circle"></i> <b>Fulano</b></h2>
    <br>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title" style="position:fixed-right;">eu</h5>
          <br>
          <p class="card-text">{novamsg}</p>

        </div>
      </div>
<div class="fixed pt-4" style="z-index: 1020;">
    <Toast msg={'Digite algo!'} />
    <form class="container-fluid input-group px-4 pt-3" onsubmit={enviarmensagem}>
        <input class="form-control form-control-lg" placeholder="Envie uma mensagem..." bind:value={novamsg} />
        <button type="submit" class="btn btn-outline-dark" aria-label="enviar" {enviarmensagem}>
            <i class="bi bi-check-circle-fill"></i>
        </button>
    </form>
</div>

    <hr />