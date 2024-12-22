function validarMinuto(input) {
    let valor = input.value;
    valor = valor.replace(/[^0-9]/g, '');
    valor = valor.slice(0, 2);
    let num = parseInt(valor);
    if (num > 59) {
        valor = '59';
    }
    input.value = valor;
}

function autoAvanco(atual, proximo, limite) {
    if (atual.value.length >= limite) {
        if (proximo) {
            proximo.focus();
        }
    }
}

document.getElementById('entrada-hora').addEventListener('input', function() {
    validarHora(this);
    autoAvanco(this, document.getElementById('entrada-minuto'), 2);
});

document.getElementById('entrada-minuto').addEventListener('input', function() {
    validarMinuto(this);
    autoAvanco(this, document.getElementById('saida-hora'), 2);
});

document.getElementById('saida-hora').addEventListener('input', function() {
    validarHora(this);
    autoAvanco(this, document.getElementById('saida-minuto'), 2);
});

document.getElementById('saida-minuto').addEventListener('input', function() {
    validarMinuto(this);
    autoAvanco(this, null, 2);
});

function calcularHoras() {
    const entradaHora = parseInt(document.getElementById('entrada-hora').value) || 0;
    const entradaMinuto = parseInt(document.getElementById('entrada-minuto').value) || 0;
    const saidaHora = parseInt(document.getElementById('saida-hora').value) || 0;
    const saidaMinuto = parseInt(document.getElementById('saida-minuto').value) || 0;

    const entrada = new Date();
    entrada.setHours(entradaHora, entradaMinuto, 0);

    const saida = new Date();
    saida.setHours(saidaHora, saidaMinuto, 0);

    if (saida < entrada) {
        saida.setDate(saida.getDate() + 1);
    }

    const diff = saida - entrada;
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('resultado').innerHTML = `
        <h3>Tempo Trabalhado:</h3>
        <p>${horas} horas e ${minutos} minutos</p>
    `;
}

function subtrairHoras() {
    const entradaHora = parseInt(document.getElementById('entrada-hora').value) || 0;
    const entradaMinuto = parseInt(document.getElementById('entrada-minuto').value) || 0;
    const saidaHora = parseInt(document.getElementById('saida-hora').value) || 0;
    const saidaMinuto = parseInt(document.getElementById('saida-minuto').value) || 0;

    const entrada = new Date();
    entrada.setHours(entradaHora, entradaMinuto, 0);

    const saida = new Date();
    saida.setHours(saidaHora, saidaMinuto, 0);

    if (entrada < saida) {
        entrada.setDate(entrada.getDate() + 1);
    }

    const diff = entrada - saida;
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('resultado').innerHTML = `
        <h3>Tempo Subtraído:</h3>
        <p>${horas} horas e ${minutos} minutos</p>
    `;
}
