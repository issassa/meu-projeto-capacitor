    <!-- 03.06
     fzr um app de calculadora  
     ctrl+espaço ativa o "autocomplete" na linha atual 
     tr*5(indica que queremos 5 linhas) > td*4(indica que queremos 4 células em cada linha) => tr*5>td*4 
     tab/shift+tab para alternar entre os campos cinzas que aparecem inicialmente após a criação das linhas e células; dps de executar o código acima por exemplo 
     ctrl+H substituição 
     MVP -> M (minimun) V (Value) P (Product)-->
    <!-- 04.06
     implemente mais operações na sua calculadora: (10.06) inverter sinal, quadado, rais quadrada, arredondar, log base 10, resto da divisão, apagar o último número e clear-->

<script>
    let display=$state('');

    function clear() {
        display=''; 
    } 
    
    function backspace() {
        display = display.slice(0, -1);
    }

    function press(c) {
        display+=c;
    } 
    
    function calc() {
        display=eval(display);
    } 

    function invertesinal() {
        let num = parseFloat(display);
        if (!isNaN(num)) {
            display = String(-num);
        }
    }

    function quadrado() {
        let num = parseFloat(display);
        if (!isNaN(num)) {
                display = String(num * num);
            }
    }

    function raizquad() {
        let num = parseFloat(display);
            if (!isNaN(num)) {
                if (num >= 0) {
                    display = String(Math.sqrt(num));
                } 
            }    
    }

    function circle() {
        let num = parseFloat(display);
            if (!isNaN(num)) {
                display = String(Math.round(num));
            }
    }

    function log10() {
        let num = parseFloat(display);
            if (!isNaN(num) && num > 0) {
                display = String(Math.log10(num));
            }
    }

</script>

<div class="text-center mt-3">
    <input class="form-control" readonly bind:value={display}/>
<table class="table table-sm table-borderless">
    <tbody>
        <tr>
            <td><button type="button" class="btn bg-body-secondary w-100" onclick={()=>clear()}>C</button></td>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={()=>press('(')}>&lpar;</button></td>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={()=>press(')')}>&rpar;</button></td>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={invertesinal}>+/-</button></td>
            <td><button type="button" class="btn bg-body-secondary w-100" onclick={circle}>○</button></td>
        </tr>
        <tr>
            <td><button type="button" class="btn bg-body-secondary w-100" onclick={backspace}>←</button></td>
            <td><button type="button" class="btn bg-body-secondary w-100" onclick={log10}>log</button></td>
            <td><button type="button" class="btn bg-body-secondary w-100" onclick={quadrado}>x²</button></td>
            <td><button type="button" class="btn bg-body-secondary w-100" onclick={raizquad}>√</button></td>
            <td><button type="button" class="btn bg-body-secondary w-100" onclick={()=>press('%')}>mod</button></td>
        </tr>
        <tr>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={()=>press(7)}>7</button></td>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={()=>press(8)}>8</button></td>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={()=>press(9)}>9</button></td>
            <td><button type="button" class="btn bg-body-secondary w-100" onclick={()=>press('*')}>x</button></td>
            <td><button type="button" class="btn bg-body-secondary w-100" onclick={()=>press('/')}>÷</button></td>
        </tr>
        <tr>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={()=>press(4)}>4</button></td>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={()=>press(5)}>5</button></td>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={()=>press(6)}>6</button></td>
            <td><button type="button" class="btn bg-body-secondary w-100" onclick={()=>press('-')}>-</button></td>
            <td rowspan="3" style="height: 0;">
                <button type="button" class="btn bg-body-secondary w-100 h-100" onclick={()=>calc()}>=</button></td>
        </tr>
        <tr>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={()=>press(1)}>1</button></td>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={()=>press(2)}>2</button></td>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={()=>press(3)}>3</button></td>
            <td rowspan="2" style="height: 0;">
                <button type="button" class="btn bg-body-secondary w-100 h-100" onclick={()=>press('+')}>+</button></td>
        </tr>
        <tr>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={()=>press(0)}>0</button></td>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={()=>press(.00)}>.00</button></td>
            <td><button type="button" class="btn bg-danger-subtle w-100" onclick={()=>press('.')}>.</button></td>
        </tr>
    </tbody>
</table>
</div>

