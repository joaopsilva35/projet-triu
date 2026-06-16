let activeOperation = '/'; // Começa com foco principal na divisão conforme pedido

const tableGrid = document.getElementById('tableGrid');
const tableTitle = document.getElementById('tableTitle');
const numberInput = document.getElementById('numberInput');
const hitEffect = document.getElementById('hitEffect');
const lifeBar = document.getElementById('lifeBar');
const charName = document.getElementById('charName');

// Estrutura de roteamento associando as URLs aos dados de cada lutador
const routes = {
    '#divisao': { op: '/', name: 'GUILE', title: 'TABUADA DE DIVISÃO (÷)', linkId: 'link-divisao', color: '#05c46b' },
    '#soma': { op: '+', name: 'RYU', title: 'TABUADA DE SOMA (+)', linkId: 'link-soma', color: '#00d2d3' },
    '#subtracao': { op: '-', name: 'KEN', title: 'TABUADA DE SUBTRAÇÃO (-)', linkId: 'link-subtracao', color: '#ff3f34' },
    '#multiplicacao': { op: '*', name: 'CHUN-LI', title: 'TABUADA DE MULTIPLICAÇÃO (×)', linkId: 'link-multiplicacao', color: '#f6b93b' }
};

// Monitor do Menu por Links (Router)
function handleRouting() {
    const hash = window.location.hash || '#divisao'; // Inicia na divisão por padrão
    const route = routes[hash];

    if (route) {
        activeOperation = route.op;
        charName.innerText = route.name;
        tableTitle.innerText = route.title;

        // Modifica a barra de vida para as cores específicas do lutador
        document.documentElement.style.setProperty('--current-theme-color', route.color);

        // Controla o acendimento luminoso do menu superior
        document.querySelectorAll('.menu-link').forEach(link => link.classList.remove('active-page'));
        document.getElementById(route.linkId).classList.add('active-page');

        // Dispara o recálculo automático ao transitar de página se houver número inserido
        if (numberInput.value !== '') {
            generateTable();
        }
    }
}

window.addEventListener('hashchange', handleRouting);
window.addEventListener('load', () => {
    if(!window.location.hash) window.location.hash = '#divisao';
    handleRouting();
});

// Distribuidor de Combates (Gera as tabuadas)
function generateTable() {
    const baseNumber = parseFloat(numberInput.value);

    if (isNaN(baseNumber)) {
        tableGrid.innerHTML = '<div class="empty-state">INSIRA UM NÚMERO VÁLIDO!</div>';
        return;
    }

    tableGrid.innerHTML = '';
    let hitText = '';
    let hitColor = '';

    switch (activeOperation) {
        case '/':
            hitText = 'SONIC BOOM!';
            hitColor = '#05c46b';
            buildDivisionTable(baseNumber);
            break;
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
    }

    // Executa o letreiro do golpe especial
    triggerHit(hitText, hitColor);

    // Flutuação na barra de energia
    let randomLife = Math.floor(Math.random() * 50) + 50;
    lifeBar.style.width = randomLife + '%';
}

/* Lógica Inteligente das Operações */

function buildDivisionTable(num) {
    if (num === 0) {
        tableGrid.innerHTML = '<div class="empty-state">ERRO: DIVISÃO POR ZERO GERA K.O.!</div>';
        return;
    }
    // Uma tabuada de divisão inteligente multiplica o número para que o resultado dê redondo (1 a 10)
    for (let i = 1; i <= 10; i++) {
        let product = num * i;
        createLineElement(`${product} ÷ ${num}`, i);
    }
}

function buildAdditionTable(num) {
    for (let i = 1; i <= 10; i++) {
        createLineElement(`${num} + ${i}`, num + i);
    }
}

function buildSubtractionTable(num) {
    // Inverte a subtração inteligente para evitar números negativos no painel de treino
    for (let i = 1; i <= 10; i++) {
        let target = num + i;
        createLineElement(`${target} - ${num}`, i);
    }
}

function buildMultiplicationTable(num) {
    for (let i = 1; i <= 10; i++) {
        createLineElement(`${num} × ${i}`, num * i);
    }
}

// Injetor de linhas na interface do painel
function createLineElement(operationText, resultText) {
    const line = document.createElement('div');
    line.className = 'table-line';
    // Aplica a cor do tema dinamicamente na borda esquerda de cada golpe
    line.style.borderLeftColor = hitEffect.style.color;
    line.innerHTML = `<span>${operationText}</span> <span>= ${resultText}</span>`;
    tableGrid.appendChild(line);
}

// Gatilho do efeito visual do Golpe Especial
function triggerHit(text, color) {
    hitEffect.innerText = text;
    hitEffect.style.color = color;
    hitEffect.style.textShadow = `0 0 10px ${color}, 3px 3px 0 #000`;
    
    hitEffect.classList.remove('animate-hit');
    void hitEffect.offsetWidth; // Força re-render do motor gráfico do browser
    hitEffect.classList.add('animate-hit');
}