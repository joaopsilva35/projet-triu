function gerarTabuada() {
    const numeroInput = document.getElementById('numero').value;
    const operacao = document.getElementById('operacao').value;
    const lista = document.getElementById('tabuada');
    
    // Limpa resultados anteriores
    lista.innerHTML = '';

    if (numeroInput === '') {
        alert('Por favor, digite um número válido!');
        return;
    }

    const numero = Number(numeroInput);

    // Gera os resultados de 1 a 10 adaptando à operação
    for (let i = 1; i <= 10; i++) {
        let resultado;
        let sinal;

        switch (operacao) {
            case 'adicao':
                resultado = numero + i;
                sinal = '+';
                break;
            case 'subtracao':
                resultado = numero - i;
                sinal = '-';
                break;
            case 'divisao':
                // .toFixed(2) evita dízimas longas; Number() remove zeros finais inúteis
                resultado = Number((numero / i).toFixed(2));
                sinal = '÷';
                break;
            case 'multiplicacao':
            default:
                resultado = numero * i;
                sinal = 'x';
                break;
        }

        // Cria a estrutura visual de cada linha com efeito de transição
        let item = document.createElement('li');
        item.textContent = `${numero} ${sinal} ${i} = ${resultado}`;
        lista.appendChild(item);
    }
}