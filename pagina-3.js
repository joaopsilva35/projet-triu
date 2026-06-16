function gerarTabuada() {
    const numeroInput = document.getElementById('numero').value;
    const operacao = document.getElementById('operacao').value;
    const lista = document.getElementById('tabuada');
    
    lista.innerHTML = '';

    if (numeroInput === '') {
        alert('Por favor, digite um número!');
        return;
    }

    const numero = Number(numeroInput);

    for (let i = 1; i <= 10; i++) {
        let resultado, sinal;
        switch (operacao) {
            case 'adicao': resultado = numero + i; sinal = '+'; break;
            case 'subtracao': resultado = numero - i; sinal = '-'; break;
            case 'divisao': resultado = Number((numero / i).toFixed(2)); sinal = '÷'; break;
            default: resultado = numero * i; sinal = '✕';
        }
        let item = document.createElement('li');
        item.textContent = `${numero} ${sinal} ${i} = ${resultado}`;
        lista.appendChild(item);
    }
}

function navegar(direcao) {
    const select = document.getElementById('operacao');
    let novoIndex = select.selectedIndex + direcao;

    if (novoIndex < 0) novoIndex = select.options.length - 1;
    else if (novoIndex >= select.options.length) novoIndex = 0;

    select.selectedIndex = novoIndex;
    gerarTabuada();
}