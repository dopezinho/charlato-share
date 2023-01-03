const situations = [
    //['Karaoke', ],
    //['Praia', ],
    //['Zoológico', ],
    ['Bar', ['Gerente', 'Garçon', 'Caixa', 'Universitario', 'Casal Apaixonado', 'Nóia', 'Vendedor de Bala', 'Fumante sem isqueiro', 'Bohêmio', 'Truqueiro']],
    ['Academia', ['Sócio', 'Preguiçoso', 'Rato de Academia', 'Influênciadora', 'Recepcionista', 'Personal Galinha', 'Aluna de Zumba', 'Fisioculturista', 'Lutador', 'Fornecedor de Aparelhos de Academia']],
    ['Balada', ['Mixologista/Bartender', 'Gerente', 'Drogado', 'Fumante', 'DJ', 'HéteroTop', 'Dançarino', 'Vendedor de Hot Dog', 'Eletricista', 'Funcionário de Limpeza']],
    //['Cinema', ],
    ['Clube', ['Treinador', 'Massagista', 'Salva-Vidas', 'Milionário', 'Sócio', 'Esportista', 'Jardineiro', 'Recepcionista', 'Cansado', 'Criança de Férias']],
    ['Cruzeiro', ['Monitor', 'Capitão', 'Pai/Mãe de Primeira Viagem', 'Chef', 'Bartender', 'O Enjoado', 'Jogador Compulsivo', 'A Doida do Protetor Solar', 'Salva-Vidas', 'Baladeiro']],
    ['Delegacia', ['Bêbado', 'Ladrão', 'Delegado', 'Preso por Roubo', 'Preso por 1 Paranga', 'Vítima', 'Familiar da Vítima', 'Advogado', 'Funcionário de Limpeza', 'Policial']],
    //['Estacionamento', ],
    ['Faculdade', ['Bixo', 'Professora', 'Traficantezinho', 'Funcionária da Limpeza', 'Vendedora da Cantina', 'Diretor', 'Bibliotecária', 'Veterano Que Não Se Forma', 'Atleticano Chato', 'Segurança']],
    ['Farmacia', ['Caixa', 'Farmaceutico', 'Cliente Sem Atestado', 'Cliente Comprando Camisinha', 'Idoso', 'Hipocondriaco', 'Repositor de Gondola', 'Estagiaria', 'Maconheiro Comprando Colírio', 'O Que Compra Teste De Gravides']],
    ['Festival', ['Perdido', 'Good Vibes', 'Artista', 'Fã de Carteirinha', 'Fumante', 'Funcionário da Limpeza', 'Segurança', 'Vendedor', 'Cambista', 'Caixa Ambulânte']],
    ['Hospital', ['Médico', 'Infermeiro', 'Cirurgião', 'Recepcionista', 'Hipocondriaco', 'O Doente', 'O Louco', 'A Madre', 'Anestesista', 'O Acidentado']],
    //['Mecanica', ],
    ['Metro', ['Artista', 'Segurança', 'Bilheteiro', 'O Que Pulou A Catraca', 'Executivo', 'Bêbado', 'Vendedor Ambulânte', 'Passageiro', 'Sem Máscara', 'O Atrasado']],
    ['Padaria', ['Padeiro', 'Bêbado', 'Caixa', 'O Que Compra Coxa Creme', 'Cliente Virado', 'Chepeiro', 'Balconista', 'Eletricista', 'Vigilância Sanitária', 'Vizinho']],
    ['Parque', ['Skatista', 'Segurança Noturno', 'Vendedor de Água de Côco', 'Velha do Cooper', 'Boleiro', 'Jogador de Basquete', 'Guarda Civil Municipal', 'Casal Apaixonado', 'Jardineiro', 'Nóia']],
    ['Posto de Gasolina', ['Frentista', 'Bêbado', 'Vendedor da Conveniência', 'Mecânico', 'Gerente', 'Caminhoneiro', 'Cliente', 'Turista de Ônibos', 'Motoboy', 'Ciclista']],
    ['Restaurante', ['Chef', 'Bartender', 'Recepcionista', 'Caixa', 'Influênciadora', 'Vegeteriano', 'Cliente (Que Foge da Conta)', 'Inspetor Sanitârio', 'Casal Que Briga', 'Cliente Que Reclama']],
    //['Rua', ],
    ['Super Mercado', ['Estoquista', 'Caixa', 'Jardineiro da Loja', 'Gerente', 'Cliente', 'Menores Comprando Bebida', 'Anunciante', 'Criança Perdida', 'Louco por Promoção', 'Empacotador']],
    //['Teatro', ],
    ['Banheiro da balada', ['Drogado', 'O Apertado', 'O Que Passando Mal', 'O Que Puxa Assunto', 'O Que Manda Mensagem Pra Ex', 'O Briguento', 'Faxineiro', 'O Beijoqueiro', 'Nunca Sai Da Fila', 'Funcionario Descansando']]
];

// Number of players and charlatans

const minusPlayer = document.getElementById('minusPlayer');
const plusPlayer = document.getElementById('plusPlayer');
nPlayers = 1;
plusPlayer.addEventListener('click', function() {
    nPlayers = nPlayers + 1;
});
minusPlayer.addEventListener('click', function() {
    if (nPlayers > 1) {
        nPlayers = nPlayers - 1;
    }
});
const minusChar = document.getElementById('minusChar');
const plusChar = document.getElementById('plusChar');
nChar = 1;
plusChar.addEventListener('click', function() {
    nChar = nChar + 1;
});
minusChar.addEventListener('click', function() {
    if (nChar > 1) {
        nChar = nChar - 1;
    }
});

//start button, change screen to second point

let startButtom = document.getElementById('start');
let count = 1
startButtom.onclick = function() {
    //if (count < 2) {
        console.log(count < 2);
        personList = selectScenario(nPlayers, nChar); 
        let listaFinal = pushImpostor(personList, nChar);
        console.log(listaFinal)
        let main = document.getElementById('template');
        console.log(main);
        main.innerHTML = '';
        console.log('aquii');
        main.innerHTML = `<div class = "divJogador"><p id = "jogador" class = "jogador">Jogador ${count}</p></div><div class = "divCenario"><p class = "cenario" style = "display: none;" id = "cenario">${listaFinal[0][0]}</p></div><div class = "divRole"><p class = "role" style = "display: none;" id = "secretId">${listaFinal[1][count]}</p></div><div class = "bora"><button id = "start">Next</button><div>`;
        console.log('aquiii');
        secretId = document.getElementById('secretId');
        secretCenario = document.getElementById('cenario')
        showRole = document.getElementById('start')
        showRole.addEventListener('click', function() {
            secretId.setAttribute('style', 'display: flex;');
            secretCenario.setAttribute('style', 'display: flex;');
            startButtom = document.getElementById('start')

            count = count + 1
            console.log(count);
        });
    }
    /*} else{
        console.log(count >= 2);
        console.log('aquiii');
        main = document.getElementById('template');
        console.log(main);
        main.innerHTML = `<p>Jogador ${count}<p><br><br></p><p style = "display: none;" id = "cenario">Cenário: ${listaFinal[0][0]}</p><br><p style = "display: none;" id = "secretId">${listaFinal[1][count]}</p><br><br><button id = "start">Next</button>`;
        secretId = document.getElementById('secretId');
        secretCenario = document.getElementById('cenario')
        showRole = document.getElementById('start')
        showRole.addEventListener('click', function() {
            secretId.setAttribute('style', 'display: flex;');
            secretCenario.setAttribute('style', 'display: flex;')
            startButtom = document.getElementById('start')
            console.log(startButtom);
            console.log(listaFinal);
            console.log(count);
            count = count + 1
            console.log(count);
        });

    }


}*/
/*let count = 1
startButtom.addEventListener('click', function () {
    if (count < 2) {
        console.log(count < 2);
        personList = selectScenario(nPlayers, nChar); 
        let listaFinal = pushImpostor(personList, nChar);
        let main = document.getElementById('template');
        console.log(main);
        main.innerHTML = '';
        main.innerHTML = `<p class = "jogador">Jogador ${count}</p><br><br><p class = "cenario" style = "display: none;" id = "cenario">${listaFinal[0][0]}</p><br><p class = "role" style = "display: none;" id = "secretId">${listaFinal[1][count]}</p><br><br><div class = "bora"><button id = "start">Next</button><div>`;
        secretId = document.getElementById('secretId');
        secretCenario = document.getElementById('cenario')
        showRole = document.getElementById('start')
        showRole.addEventListener('click', function() {
            secretId.setAttribute('style', 'display: flex;');
            secretCenario.setAttribute('style', 'display: flex;');
            startButtom = document.getElementById('start')
            count = count + 1
        });

    } else{
        console.log('aquiii');
        main = document.getElementById('template');
        console.log(main);
        main.innerHTML = `<p>Jogador ${count}<p><br><br></p><p style = "display: none;" id = "cenario">Cenário: ${listaFinal[0][0]}</p><br><p style = "display: none;" id = "secretId">${listaFinal[1][count]}</p><br><br><button id = "start">Next</button>`;
        secretId = document.getElementById('secretId');
        secretCenario = document.getElementById('cenario')
        showRole = document.getElementById('start')
        showRole.addEventListener('click', function() {
            secretId.setAttribute('style', 'display: flex;');
            secretCenario.setAttribute('style', 'display: flex;')
            startButtom = document.getElementById('start')
            console.log(startButtom);
            console.log(listaFinal);
            console.log(count);
            count = count + 1
            console.log(count);
        });

    }
});
*/






/*function nextPlayer(i) {
    let next = document.getElementById('next');
    next.addEventListener('click', function () {
        main.innerHTML = `<h3>Jogador ${i - 1}<h3><br><p id = "secretIdentity" style = "display : none;">${listaFinal[1][i]}</p><br><button id = "next">Next</button>`;
        next = document.getElementById('next');
        next.addEventListener('click', function () {
            main.innerHTML = `<h3>Jogador ${i}<h3><br><p id = "secretIdentity">${listaFinal[1][i]}</p><button id = "next">Next</button>`;
        });
    });
}
*/
// randomize and returns the scenario

function selectScenario(nPessoas, nImpostores) {
    let n = Math.floor(Math.random() * situations.length);
    let local = situations[n][0];
    let persons = situations[n][1];
    let personList = [[], []]
    personList[0].push(local)
    let i = 0
    while (i < (nPessoas - nImpostores)) {
        let m = Math.floor(Math.random() * persons.length);
        let person = persons[m];
        persons.splice(m, 1);
        personList[1].push(person);
        i = i + 1
    }
    return personList;
};

// add the charlatans

function pushImpostor(list, nImpostores) {
    let i = 0;
    while (i < nImpostores) {
        list[1].push('Charlatão');
        const main = document.getElementById('main');
        main.innerHTML = '';
        i = i + 1;
    }
    return list;
}