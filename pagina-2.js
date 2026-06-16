let visorAtivo = 1;

function selecionarVisor(numero) {
    visorAtivo = numero;
    document.getElementById('visor1').classList.remove('active');
    document.getElementById('visor2').classList.remove('active');
    document.getElementById(`visor${numero}`).classList.add('active');
}

function pressionarBotao(valor, event) {
    const botao = event.currentTarget;
    aplicarEfeitosVisuais(botao);

    const visor = document.getElementById(`visor${visorAtivo}`);
    
    if (valor === 'C') {
        visor.innerText = '0';
    } else {
        if (visor.innerText === '0') {
            visor.innerText = valor;
        } else {
            // Limita a 4 dígitos para não quebrar o layout da interface do jogo
            if (visor.innerText.length < 4) {
                visor.innerText += valor;
            }
        }
    }
}

function aplicarEfeitosVisuais(elemento) {
    // 1. Remove efeitos antigos se houver cliques rápidos seguidos
    const antigosSlashes = elemento.querySelectorAll('.sword-slash, .zeus-lightning');
    antigosSlashes.forEach(el => el.remove());

    // 2. Injeta o Corte Espartano
    const slash = document.createElement('div');
    slash.className = 'sword-slash';
    elemento.appendChild(slash);

    // 3. Injeta o Raio de Zeus
    const lightning = document.createElement('div');
    lightning.className = 'zeus-lightning';
    elemento.appendChild(lightning);
}

function calcularEspartano(event) {
    aplicarEfeitosVisuais(event.currentTarget);

    const n1 = parseFloat(document.getElementById('visor1').innerText);
    const n2 = parseFloat(document.getElementById('visor2').innerText);
    const container = document.getElementById('resultado-combate');

    // Subtração Absoluta Inteligente (Sempre Positiva)
    const resultado = Math.abs(n1 - n2);

    let htmlEstrutura = `
        <div class="main-result">FÚRIA ABSOLUTA: <strong>${resultado}</strong></div>
        <div class="tabuada-box">
            <h3>📜 PERGAMINHO DO DESTINO: TABUADA DO ${resultado}</h3>
    `;

    for (let i = 1; i <= 10; i++) {
        const delay = (i * 0.05).toFixed(2);
        htmlEstrutura += `
            <p class="tabuada-linha" style="animation-delay: ${delay}s">
                ⚡ ${resultado} - ${i} = <strong style="color: #cca43b;">${resultado - i}</strong>
            </p>
        `;
    }

    htmlEstrutura += `</div>`;
    container.innerHTML = htmlEstrutura;
}