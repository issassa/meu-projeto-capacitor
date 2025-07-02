<script>
    // Importa a função onMount do Svelte para executar código após o componente ser montado no DOM.
    import { onMount } from 'svelte';
    // Importa componentes auxiliares: Modal para diálogos, Toast para notificações,
    // e ToDoList (que é o componente que renderiza as tarefas individuais).
    import Modal from '$lib/components/Modal.svelte';
    import Toast from '$lib/components/Toast.svelte';
    import ToDoList from '$lib/components/ToDoList.svelte';
    // Importa a biblioteca Bootstrap para funcionalidades como o Toast.
    import * as bootstrap from 'bootstrap';

    // Declaração de variáveis reativas usando $state para gerenciamento de estado.
    let novaTarefa = $state(''); // Armazena o conteúdo da nova tarefa a ser adicionada.
    let tarefas = $state([]); // Array principal que armazena todas as tarefas.
    // Variáveis derivadas usando $derived para filtrar tarefas sem recomputar a cada renderização.
    let tarefasPendentes = $derived(tarefas.filter((tarefa) => tarefa.status == 0)); // Tarefas com status 0 (pendente).
    let tarefasConcluidas = $derived(tarefas.filter((tarefa) => tarefa.status == 1)); // Tarefas com status 1 (concluída).
    let conteudoTarefaEditando = $state(''); // Armazena o conteúdo de uma tarefa sendo editada.
    let tarefaEditando = $state(); // Armazena a tarefa que está atualmente em modo de edição.
    let tarefaExcluindo; // Armazena a tarefa que está sendo considerada para exclusão.
    let mensagemToast; // Referência ao objeto Toast do Bootstrap para exibir mensagens.

    // Função assíncrona para adicionar uma nova tarefa.
    async function adicionarTarefa() {
        novaTarefa = novaTarefa.trim(); // Remove espaços em branco do início e fim.
        if (!novaTarefa) {
            // Se a tarefa estiver vazia, exibe um toast de aviso.
            mensagemToast.show();
            return;
        }
        // Adiciona a nova tarefa ao array 'tarefas' com status 0 (pendente).
        tarefas.push({ conteudo: novaTarefa, status: 0 });
        novaTarefa = ''; // Limpa o campo de nova tarefa.
    }

    // Função para iniciar o modo de edição de uma tarefa.
    function editarTarefa(tarefa) {
        tarefaEditando = tarefa; // Define a tarefa que será editada.
        conteudoTarefaEditando = tarefa.conteudo; // Preenche o campo de edição com o conteúdo atual da tarefa.
    }

    // Função para confirmar a edição de uma tarefa.
    function confirmarEdicao() {
        conteudoTarefaEditando = conteudoTarefaEditando.trim(); // Remove espaços em branco.
        if (!conteudoTarefaEditando) {
            // Se o conteúdo editado estiver vazio, exibe um toast.
            mensagemToast.show();
            return;
        }
        tarefaEditando.conteudo = conteudoTarefaEditando; // Atualiza o conteúdo da tarefa.
        tarefaEditando = undefined; // Sai do modo de edição.
    }

    // Função para cancelar a edição de uma tarefa.
    function cancelarEdicao() {
        tarefaEditando = undefined; // Sai do modo de edição sem salvar as mudanças.
    }

    // Função para preparar a exclusão de uma tarefa (abre o modal de confirmação).
    function excluirTarefa(tarefa) {
        tarefaExcluindo = tarefa; // Armazena a tarefa a ser excluída.
    }

    // Função para confirmar e executar a exclusão de uma tarefa.
    function confirmarExclusao() {
        const i = tarefas.indexOf(tarefaExcluindo); // Encontra o índice da tarefa no array.
        if (i >= 0) tarefas.splice(i, 1); // Remove a tarefa do array.
        tarefaExcluindo = undefined; // Limpa a tarefa que estava sendo excluída.
    }

    // Função para alterar o status de uma tarefa (pendente/concluída).
    function alterarStatus(tarefa, status) {
        tarefa.status = status; // Atualiza o status da tarefa.
    }

    // onMount é executado uma vez, após o componente ser renderizado.
    onMount(() => {
        // Inicializa o componente Toast do Bootstrap.
        mensagemToast = new bootstrap.Toast('#mensagemToast');
    });
</script>

<br />
<div class="text-center">
    <h2><b>Lista de Tarefas</b> <i class="bi bi-card-checklist"></i></h2>
</div>
<div class="fixed pt-4" style="z-index: 1020;">
    <form class="container-fluid input-group px-4 pt-3" onsubmit={adicionarTarefa}>
        <input class="form-control form-control-lg" placeholder="Nova tarefa" bind:value={novaTarefa} />
        <button type="submit" class="btn btn-primary input-group-text" aria-label="adicionar">
            <i class="bi bi-plus-lg"></i>
        </button>
    </form>
    <Toast msg={'Digite algo!'} />
</div>

<div class="container-fluid mt-5 pt-3">
    <ToDoList
        tarefas={tarefasPendentes}
        {tarefaEditando}
        bind:conteudoTarefaEditando
        {editarTarefa}
        {confirmarEdicao}
        {cancelarEdicao}
        {alterarStatus}
        {excluirTarefa}
    />
    <hr />
    <ToDoList
        tarefas={tarefasConcluidas}
        {tarefaEditando}
        bind:conteudoTarefaEditando
        {editarTarefa}
        {confirmarEdicao}
        {cancelarEdicao}
        {alterarStatus}
        {excluirTarefa}
    />
</div>

<Modal msg={'Deseja excluir a tarefa?'} acao={confirmarExclusao} />