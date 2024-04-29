let numeroMax = 3;
let numerosSorteados = [];
let numeroSecreto = (gerarNumeroAleatorio(numeroMax));
let tentativa = 1;
exibirMsgInicial();


// functions 
function exibirMsgInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMax}`);
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    let msgVariasTentativas = `Isso aí! Você descobriu o número secreto ${numeroSecreto} depois de ${tentativa} tentativas.`;
    let msgPrimeiraTentativa = `Isso aí! Você descobriu o número secreto ${numeroSecreto} na primeira tentativa.`;
    let msgTentativa = tentativa != 1 ? msgVariasTentativas : msgPrimeiraTentativa;

    if (numeroSecreto == chute) {
        exibirTextoNaTela('h1', 'Parabéns!');
        console.log(tentativa);
        exibirTextoNaTela('p', msgTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroSecreto < chute) {
            exibirTextoNaTela('p', `Ah não! O número secreto é menor.`);
        } else {
            exibirTextoNaTela('p', `Ah não! O número secreto é maior.`);
        }
        tentativa++;
        console.log(tentativa);
        limparCampo();
    }

}

function gerarNumeroAleatorio(numeroMax) {
    let numeroEscolhido = parseInt((Math.random() * numeroMax) + 1);
    let qtdNumerosSorteados = numerosSorteados.length;
    
    if (qtdNumerosSorteados == numeroMax) {
        numerosSorteados = [];
    }

    if (numerosSorteados.includes(numeroEscolhido)) {
        console.log('if: gerando novo numero');
        return gerarNumeroAleatorio(numeroMax);
    } else {
        console.log('else: numero escolhido' + numerosSorteados);
        numerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio(numeroMax);
    limparCampo();
    tentativa = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}