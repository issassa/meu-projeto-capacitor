<script>
    // Variáveis reativas para armazenar os valores e unidades.
    let v1 = ''; // Valor de entrada para conversão.
    let v2 = ''; // Valor convertido.
    let uni1 = 'ºC'; // Unidade de origem (padrão: Celsius).
    let uni2 = 'F'; // Unidade de destino (padrão: Fahrenheit).

    // Array com as unidades de temperatura disponíveis.
    const unidades = ['ºC', 'F', 'K'];

    // Função para realizar a conversão de temperatura.
    function converter() {
        // Converte o valor de entrada (v1) para um número. Se não for um número válido, limpa v2.
        const valorInput = parseFloat(v1);
        if (isNaN(valorInput)) {
            v2 = '';
            return;
        }

        let tempCelsius;

        // Primeiro, converte o valor de entrada para Celsius (base para todas as conversões).
        if (uni1 === 'ºC') {
            tempCelsius = valorInput;
        } else if (uni1 === 'F') {
            tempCelsius = ((valorInput - 32) * 5) / 9;
        } else if (uni1 === 'K') {
            tempCelsius = valorInput - 273.15;
        } else {
            // Caso a unidade de origem não seja reconhecida.
            v2 = 'Erro';
            return;
        }

        // Em seguida, converte de Celsius para a unidade de destino (uni2).
        if (uni2 === 'ºC') {
            v2 = tempCelsius;
        } else if (uni2 === 'F') {
            v2 = (tempCelsius * 9) / 5 + 32;
        } else if (uni2 === 'K') {
            v2 = tempCelsius + 273.15;
        } else {
            // Caso a unidade de destino não seja reconhecida.
            v2 = 'Erro';
        }

        // A lógica de conversão reversa (usando v2 para calcular v1) não é comum
        // para um input de usuário único. O código abaixo, como estava, faria
        // uma conversão de v2 para v1 imediatamente após v2 ser calculado,
        // o que pode ser confuso ou desnecessário. Mantenho comentado para evitar
        // comportamento inesperado, a menos que haja um caso de uso específico.
        /*
        else if (v2 !== '') { // Este bloco parece ser uma tentativa de conversão reversa se v2 fosse o input.
            if (uni2 === 'ºC') {
                if (uni1 === 'F') v1 = ((parseFloat(v2) - 32) * 5) / 9;
                else if (uni1 === 'K') v1 = parseFloat(v2) - 273.15;
                else v1 = parseFloat(v2);
            } else if (uni2 === 'F') {
                if (uni1 === 'ºC') v1 = (parseFloat(v2) * 9) / 5 + 32;
                else if (uni1 === 'K') v1 = ((parseFloat(v2) - 273.15) * 9) / 5 + 32;
                else v1 = parseFloat(v2);
            } else if (uni2 === 'K') {
                if (uni1 === 'ºC') v1 = parseFloat(v2) + 273.15;
                else if (uni1 === 'F') v1 = (parseFloat(v2) * 9) / 5 - 459.67;
                else v1 = parseFloat(v2);
            }
        }
        */
    }

    // Função para inverter as unidades e os valores nos campos.
    function inverter() {
        [v1, v2] = [v2, v1]; // Troca os valores entre v1 e v2.
        [uni1, uni2] = [uni2, uni1]; // Troca as unidades entre uni1 e uni2.
        converter(); // Chama converter para atualizar o valor após a inversão.
    }
</script>

<nav class="navbar bg-body-tertiary fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="temperatura"> Temperatura </a>
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

        <button onclick={inverter}><b>↔inverter valores</b></button>

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
        background-color: #ffff; /* Cor de fundo branca. */
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