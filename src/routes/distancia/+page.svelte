<script>
    // Variáveis reativas para armazenar os valores e unidades.
    let v1 = ''; // Valor de entrada para conversão.
    let v2 = ''; // Valor convertido.
    let uni1 = 'km'; // Unidade de origem (padrão: quilômetros).
    let uni2 = 'm'; // Unidade de destino (padrão: metros).

    // Array com as unidades de distância disponíveis.
    const unidades = ['km', 'm', 'cm', 'mm'];

    // Objeto que mapeia cada unidade ao seu valor em metros para facilitar a conversão.
    // Todas as conversões são feitas em relação ao metro como base.
    const univalor = {
        km: 1000,   // 1 km = 1000 metros
        m: 1,       // 1 m = 1 metro
        cm: 0.01,   // 1 cm = 0.01 metros
        mm: 0.001   // 1 mm = 0.001 metros
    };

    // Função para realizar a conversão de unidades.
    function converter() {
        // Converte v1 (valor de origem) para metros, depois para a unidade de destino (uni2).
        // Se o valor de entrada (v1) for um número válido, calcula v2.
        if (!isNaN(parseFloat(v1))) {
            v2 = (parseFloat(v1) * univalor[uni1]) / univalor[uni2];
        } else {
            v2 = ''; // Limpa v2 se v1 não for um número válido.
        }

        // Esta linha abaixo causaria um loop de conversão se v2 fosse editado pelo usuário
        // e v1 dependesse dele. Para um conversor de mão dupla, o ideal seria ter um
        // handler separado para quando v2 é modificado ou garantir que apenas um input
        // por vez acione a conversão. No contexto atual (v1 é o input principal),
        // esta linha pode ser removida ou usada com cuidado.
        // v1 = (parseFloat(v2) * univalor[uni2]) / univalor[uni1];
    }

    // Função para inverter as unidades e os valores nos campos.
    function inverter() {
        [v1, v2] = [v2, v1]; // Troca os valores entre v1 e v2.
        [uni1, uni2] = [uni2, uni1]; // Troca as unidades entre uni1 e uni2.
        converter(); // Chama converter para atualizar o valor depois de inverter.
    }
</script>

<nav class="navbar bg-body-tertiary fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="distancia"> Distância </a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
        >
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu de unidades</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
                ></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li class="nav-item dropdown">
                        <a class="dropdown-item" href="conversor-unidades">Início</a>
                        <br />
                        <a
                            class="nav-link dropdown-toggle"
                            href="conversor-unidades"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Unidades
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="distancia">Distância</a></li>
                            <li><a class="dropdown-item" href="peso">Peso</a></li>
                            <li><a class="dropdown-item" href="temperatura">Temperatura</a></li>
                            <li><a class="dropdown-item" href="tempo">Tempo</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>

<main>
    <br />
    <br />
    <br />
    <div class="converter">
        <div>
            <input type="number" bind:value={v1} placeholder="insira um valor..." oninput={converter} />
            <select bind:value={uni1} onchange={converter}>
                {#each unidades as unidade}
                    <option value={unidade}>{unidade}</option>
                {/each}
            </select>
        </div>

        <button onclick={inverter}><b>↔ inverter valores</b></button>

        <div>
            <input type="number" bind:value={v2} placeholder="valor convertido..." oninput={converter} />
            <select bind:value={uni2} onchange={converter}>
                {#each unidades as unidade}
                    <option value={unidade}>{unidade}</option>
                {/each}
            </select>
        </div>
    </div>
</main>

<style>
    /* Estilos para a barra de navegação. */
    nav {
        display: flex; /* Usa flexbox. */
        justify-content: space-around; /* Espaça os itens. */
        align-items: center; /* Centraliza verticalmente. */
        background-color: #f5f5f5; /* Cor de fundo cinza claro. */
        color: rgb(0, 0, 0); /* Cor do texto. */
        padding: 10px 10px; /* Preenchimento. */
        font-family: Arial, sans-serif; /* Fonte. */
    }

    /* Estilos para os links na navegação. */
    a {
        text-decoration: none; /* Remove sublinhado. */
        color: rgb(0, 0, 0); /* Cor do texto. */
        font-weight: bold; /* Negrito. */
        transition: color 0.3s ease; /* Transição suave na cor. */
    }

    /* Estilos ao passar o mouse sobre os links. */
    a:hover {
        color: #000000; /* Cor do texto preta ao hover. */
    }

    /* Estilos para o conteúdo principal da página. */
    main {
        font-family: Arial, sans-serif; /* Fonte. */
        display: flex; /* Usa flexbox. */
        flex-direction: column; /* Itens em coluna. */
        align-items: center; /* Centraliza horizontalmente. */
        background-color: #ffffff; /* Cor de fundo branca. */
        padding: 20px; /* Preenchimento. */
        min-height: 100vh; /* Altura mínima da viewport. */
    }

    /* Estilos para o contêiner do conversor. */
    .converter {
        display: flex; /* Usa flexbox. */
        flex-direction: column; /* Itens em coluna. */
        gap: 15px; /* Espaçamento entre os elementos. */
        width: 100%; /* Largura total. */
        max-width: 294px; /* Largura máxima. */
    }

    /* Estilos para inputs, selects e botões dentro do conversor. */
    input,
    select,
    button {
        padding: 10px; /* Preenchimento. */
        font-size: 16px; /* Tamanho da fonte. */
        border: 1px solid #ddd; /* Borda. */
        border-radius: 5px; /* Arredondamento. */
    }

    /* Estilos específicos para botões dentro do conversor. */
    button {
        background-color: #ebc4eb; /* Cor de fundo. */
        color: rgb(0, 0, 0); /* Cor do texto. */
        cursor: pointer; /* Cursor de ponteiro. */
    }

    /* Estilos ao passar o mouse sobre os botões. */
    button:hover {
        opacity: 0.9; /* Diminui a opacidade. */
    }
</style>