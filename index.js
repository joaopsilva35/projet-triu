let activeOperation = '+';

const tableGrid = document.getElementById('tableGrid');
const tableTitle = document.getElementById('tableTitle');
const numberInput = document.getElementById('numberInput');
const hitEffect = document.getElementById('hitEffect');
const lifeBar = document.getElementById('lifeBar');
const charName = document.getElementById('charName');

// Mapeamento de rotas para linkagem direta das páginas de operação
const routes = {
    '#soma': { op: '+', name: 'RYU', title: 'TABUADA DE SOMA (+)', linkId: 'link-soma' },
    '#subtracao': { op: '-', name: 'KEN', title: 'TABUADA DE SUBTRAÇÃO (-)', linkId: 'link-subtracao' },
    '#multiplicacao': { op: '*', name: 'CHUN-LI', title: 'TABUADA DE MULTIPLICAÇÃO (×)', linkId: 'link-multiplicacao' },
    '#divisao': { op: '/', name: 'GUILE', title: 'TABUADA DE DIVISÃO (÷)', linkId: 'link-divisao' }
};

// Gerenciador de rotas baseado no link clicado
function handleRouting() {
    const hash = window.location.hash || '#soma';
    const route = routes[hash];

    if (route) {
        activeOperation = route.op;
        charName.innerText = route.name;
        tableTitle.innerText = route.title;

        // Atualiza a classe visual ativa no menu superior
        document.querySelectorAll('.menu-link').forEach(link => link.classList.remove('active-page'));
        document.getElementById(route.linkId).classList.add('active-page');

        // Sempre que o jogador mudar de página, recalcula a tabuada automaticamente se houver valor
        if (numberInput.value !== '') {
            generateMultiplicationTable();
        }
    }
}

window.addEventListener('hashchange', handleRouting);
window.addEventListener('load', () => {
    if(!window.location.hash) window.location.hash = '#soma';
    handleRouting();
});

// Mecanismo Inteligente de Produção da Tabuada
function generateMultiplicationTable() {
    const baseNumber = parseFloat(numberInput.value);

    if (isNaN(baseNumber)) {
        tableGrid.innerHTML = '<div class="empty-state">INSIRA UM NÚMERO VÁLIDO!</div>';
        return;
    }

    tableGrid.innerHTML = ''; // Limpa a tabela anterior
    let hitText = '';
    let hitColor = '';

    // Define animações e golpes baseados no modo de jogo escolhido nos links
    switch (activeOperation) {
        case '+':
            hitText = 'HADOUKEN!';
            hitColor = '#00d2d3';
            buildAdditionTable(baseNumber);
            break;
        case '-':
            hitText = 'SHORYUKEN!';
            hitColor = '#ff3f34';
            buildSubtractionTable(baseNumber);
            break;
        case '*':
            hitText = 'TATSUMAKI!';
            hitColor = '#f6b93b';
            buildMultiplicationTable(baseNumber);
            break;
        case '/':
            hitText = 'SONIC BOOM!';
            hitColor = '#05c46b';
            buildDivisionTable(baseNumber);
            break;
    }

    // Executa animação do golpe especial
    triggerHit(hitText, hitColor);

    // Flutuação estética da barra de vida do oponente
    let randomLife = Math.floor(Math.random() * 60) + 40;
    lifeBar.style.width = randomLife + '%';
}

/* Funções Auxiliares de Construção das Linhas da Tabuada */

function buildAdditionTable(num) {
    for (let i = 1; i <= 10; i++) {
        createLineElement(`${num} + ${i}`, num + i);
    }
}

function buildSubtractionTable(num) {
    // Uma tabuada inteligente de subtração evita números negativos para melhor estudo
    for (let i = 1; i <= 10; i++) {
        let target = num + i; // Cria parcelas limpas ex: se num=5, faz (6-5, 7-5...)
        createLineElement(`${target} - ${num}`, target - num);
    }
}

function buildMultiplicationTable(num) {
    for (let i = 1; i <= 10; i++) {
        createLineElement(`${num} × ${i}`, num * i);
    }
}

function buildDivisionTable(num) {
    // Garante divisões exatas inteligentes com base no número escolhido
    if (num === 0) {
        tableGrid.innerHTML = '<div class="empty-state">NÃO É POSSÍVEL DIVIDIR POR ZERO!</div>';
        return;
    }
    for (let i = 1; i <= 10; i++) {
        let product = num * i;
        createLineElement(`${product} ÷ ${num}`, product / num);
    }
}

// Injeta as divs estilizadas dentro da arena de resultados
function createLineElement(operationText, resultText) {
    const line = document.createElement('div');
    line.className = 'table-line';
    line.innerHTML = `<span>${operationText}</span> <span>= ${resultText}</span>`;
    tableGrid.appendChild(line);
}

// Ativador de efeitos especiais na tela
function triggerHit(text, color) {
    hitEffect.innerText = text;
    hitEffect.style.color = color;
    hitEffect.style.textShadow = `0 0 10px ${color}, 3px 3px 0 #000`;
    
    hitEffect.classList.remove('animate-hit');
    void hitEffect.offsetWidth; // Força re-renderização do elemento para reiniciar animação
    hitEffect.classList.add('animate-hit');
}