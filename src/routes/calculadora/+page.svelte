    <!-- // fzr um app de calculadora  -->
    <!-- // ctrl+espaço ativa o "autocomplete" na linha atual -->
    <!-- // tr*5(indica que queremos 5 linhas) > td*4(indica que queremos 4 células em cada linha) => tr*5>td*4 -->
    <!-- // tab/shift+tab para alternar entre os campos cinzas que aparecem inicialmente após a criação das linhas e células; dps de executar o código acima por exemplo -->
    <!-- // ctrl+H substituição -->
<div class="text-center mt-3">
    <input class="form-control">
<table class="table table-borderless">
    <tbody>
        <tr>
            <td><button type="button" class="btn btn-outline-secondary w-100">C</button></td>
            <td><button type="button" class="btn btn-light w-100">&lpar;</button></td>
            <td><button type="button" class="btn btn-light w-100">&rpar;</button></td>
            <td><button type="button" class="btn btn-light w-100">/</button></td>
        </tr>
        <tr>
            <td><button type="button" class="btn btn-light w-100">7</button></td>
            <td><button type="button" class="btn btn-light w-100">8</button></td>
            <td><button type="button" class="btn btn-light w-100">9</button></td>
            <td><button type="button" class="btn btn-outline-secondary w-100">x</button></td>
        </tr>
        <tr>
            <td><button type="button" class="btn btn-light w-100">4</button></td>
            <td><button type="button" class="btn btn-light w-100">5</button></td>
            <td><button type="button" class="btn btn-light w-100">6</button></td>
            <td><button type="button" class="btn btn-outline-secondary w-100">-</button></td>
        </tr>
        <tr>
            <td><button type="button" class="btn btn-light w-100">1</button></td>
            <td><button type="button" class="btn btn-light w-100">2</button></td>
            <td><button type="button" class="btn btn-light w-100">3</button></td>
            <td rowspan="2" style="height: 0;">
                <button type="button" class="btn btn-outline-secondary w-100 h-100">+</button></td>
        </tr>
        <tr>
            <td><button type="button" class="btn btn-light w-100">0</button></td>
            <td><button type="button" class="btn btn-light w-100">.</button></td>
            <td><button type="button" class="btn btn-light w-100">=</button></td>
        </tr>
    </tbody>
</table>
</div>
