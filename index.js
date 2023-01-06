import { buttons } from "./button.js";

//Buttons functionality

let nPlayers = 1;
let nChar = 1;
buttons(nPlayers, nChar)

//Number of players and charlatans

function selectNPlayers() {
    const minusPlayer = document.getElementById('minusPlayer');
    const plusPlayer = document.getElementById('plusPlayer');
    
    plusPlayer.addEventListener('click', function() {
        if(nPlayers <= 10){
            nPlayers++
        }else if (nPlayers - nChar == 10 && nPlayers < 13){
            nPlayers++;
            nChar++;
        }else if (nPlayers < 13) {
            nPlayers++;
        }

    });
        
    minusPlayer.addEventListener('click', function() {
        if (nPlayers > 1 && nPlayers <= 11) {
            nPlayers--;
        }else if (nPlayers > 11 && nChar > 1 && nPlayers - nChar == 10){
            nPlayers--;
            nChar--;
        }else if (nPlayers > 1){
            nPlayers--;
        }
    });
    const minusChar = document.getElementById('minusChar');
    const plusChar = document.getElementById('plusChar');
    
    plusChar.addEventListener('click', function() {
        if (nChar < nPlayers) {
            nChar++;
        }
    });
    minusChar.addEventListener('click', function() {
        if (nChar > 1 && nChar <= 13) {
            nChar--;
        }
        if (nChar > 1 && nPlayers - nChar >= 10){
            nPlayers--;
            nChar--;
        }
    });
};

selectNPlayers();

//Start button, change screen to second point

let startButtom = document.getElementById('start');
let count = 1;
startButtom.onclick = function() {
    let list = selectScenario(nPlayers, nChar);
    let almostList = pushImpostor(list, nChar);
    let finalList = [almostList[0], shuffle(almostList[1])];
    console.log(finalList);
    let main = document.getElementById('template');
    main.innerHTML = '<h1 id="transition">Passe Para O Primeiro Jogador</p>';
    startButtom.setAttribute('style', 'display: none;');
    let show = document.getElementById('show');
    show.setAttribute('style', 'display: flex;');
    show.onclick = function (){
        if (count - 1 < finalList[1].length){
            main.innerHTML = '';
            main.innerHTML = `<div class = "divJogador"><p id = "jogador" class = "jogador" >Jogador ${count}</p></div>
            <div class="legend"><p id="ast">*</p><p class="text">Lugar</p><p id="ast">*</p></div>
            <div class = "divCenario"><p class = "cenario"  id = "cenario" style = "visibility: hidden;">${finalList[0][0]}</p></div>
            <div class="legend"><p id="ast">*</p><p class="text">Função</p><p id="ast">*</p></div>
            <div class = "divRole"><p class = "role"  id = "secretId" style = "visibility: hidden;">${finalList[1][count-1]}</p></div>`;
            main.setAttribute('style', 'display: block;');     
            show.setAttribute('style', 'display: none;');
            let showSecret = document.getElementById('showSecret');
            showSecret.setAttribute('style', 'display: block;');
            showSecret.onclick = function () {
                let role = document.getElementById('secretId');
                role.setAttribute('style', 'visibility: visible;');
                let cenario = document.getElementById('cenario');
                if (role.innerHTML == 'Charlatão'){
                    cenario.innerHTML = `xxxxx`;
                }else{
                    cenario.innerHTML = `${finalList[0][0]}`;
                }
                cenario.setAttribute('style', 'visibility: visible;');
                showSecret.setAttribute('style', 'display: none;');
                show.setAttribute('style', 'display: block;');
                count ++
            };
        }else {
            main.innerHTML = `<div class="players"><h2>Jogadores:</h2></div><div class="wrapper"><span class="minus" id="minusPlayer">*</span><span class="num" id="nJogadores">${nPlayers}</span><span class="plus" id="plusPlayer">*</span></div><div class="players1"><h2>Charlatos:</h2></div><div class="wrapper"><span class="minus1" id="minusChar">*</span><span class="num1" id="nImpostores">${nChar}</span><span class="plus1" id="plusChar">*</span></div>`
            show.setAttribute('style', 'display: none;');
            startButtom.setAttribute('style', 'display: block;')
            selectNPlayers();
            buttons(nPlayers, nChar);
            count = 1;
        }
    }
}

//Randomize and returns the scenario

function selectScenario(nPessoas, nImpostores) {
    const situations = [
        ['Karaoke', ['Cantor', 'Tímido', 'Desafinado', 'Bartender', 'Técnico de Áudio', 'Dançarino', 'Segurança', 'Gerente', 'Dono', 'Vendedor de Milho']],
        ['Praia', ['Vendedor de Picolé', 'Salva Vidas', 'Gringo', 'Fotógrafo', 'Surfista', 'Vendedor de miçangas',' Dono do Quiosque', 'Esportista', 'Pescador', 'Morador Local']],
        ['Zoológico', ['Veterinário', 'Jardineiro', 'Biólogo', 'Funcionário', 'Vendedor de Souvenier', 'Cambista', 'Guia', 'Visitante', 'Fotógrafo', 'Vendedor de Água']],
        ['Bar', ['Gerente', 'Garçon', 'Caixa', 'Universitário', 'Casal Apaixonado', 'Nóia', 'Vendedor de Bala', 'Fumante sem Isqueiro', 'Bohêmio', 'Truqueiro']],
        ['Academia', ['Sócio', 'Preguiçoso', 'Rato de Academia', 'Influênciadora', 'Recepcionista', 'Personal Galinha', 'Aluna de Zumba', 'Fisioculturista', 'Lutador', 'Fornecedor de Aparelhos de Academia']],
        ['Balada', ['Mixologista/Bartender', 'Gerente', 'Drogado', 'Fumante', 'DJ', 'Héterotop', 'Dançarino', 'Vendedor de Hot Dog', 'Eletricista', 'Faxineiro']],
        ['Cinema', ['Vendedor de Pipoca', 'Vendedor da Bilheteria', 'Cinegrafista', 'Casal Apaixonado', 'Pessoa que Ri Alto', 'Pessoa que Dorme', 'Pessoa que Fofóca', 'Pessoa Emocionada', 'Cosplay', 'Eletricista']],
        ['Clube', ['Treinador', 'Massagista', 'Salva Vidas', 'Milionário', 'Sócio', 'Esportista', 'Jardineiro', 'Recepcionista', 'Cansado', 'Criança de Férias']],
        ['Cruzeiro', ['Monitor', 'Capitão', 'Pai/Mãe de Primeira Viagem', 'Chef', 'Bartender', 'Nauseado', 'Jogador Compulsivo', 'A Doida do Protetor Solar', 'Salva Vidas', 'Baladeiro']],
        ['Delegacia', ['Bêbado', 'Ladrão', 'Delegado', 'Preso por Roubo', 'Preso por uma Paranga', 'Vítima', 'Familiar da Vítima', 'Advogado', 'Faxineiro', 'Policial']],
        ['Estacionamento', ['Manobrista', 'Cobrador','Dono', 'Funcionário', 'O Que Perdeu o Ticket', 'Impaciente', 'Fumante', 'Perderam seu Carro', 'Gerente', 'Bêbado']],
        ['Faculdade', ['Bixo', 'Professora', 'Traficantezinho', 'Faxineiro', 'Vendedora da Cantina', 'Diretor', 'Bibliotecária', 'Veterano Que Não Se Forma', 'Atleticano Chato', 'Segurança']],
        ['Farmacia', ['Caixa', 'Farmaceutico', 'Cliente Sem Atestado', 'Cliente Comprando Camisinha', 'Idoso', 'Hipocondriaco', 'Repositor de Gondola', 'Estagiária', 'Maconheiro Comprando Colírio', 'O Que Compra Teste De Gravides']],
        ['Festival', ['Perdido', 'Good Vibes', 'Artista', 'Fã de Carteirinha', 'Fumante', 'Faxineiro', 'Segurança', 'Vendedor', 'Cambista', 'Caixa Ambulânte']],
        ['Hospital', ['Médico', 'Infermeiro', 'Cirurgião', 'Recepcionista', 'Hipocondriaco', 'O Doente', 'O Louco', 'A Madre', 'Anestesista', 'O Acidentado']],
        ['Mecânica', ['Mecânico', 'Dono', 'Sócio', 'Ajudante', 'Cliente', 'Cliente Irritado', 'Cliente Mão de Vaca', 'O Desocupado', 'Vizinho', 'Fornecedor de Peças']],
        ['Metro', ['Artista', 'Segurança', 'Bilheteiro', 'O Que Pulou A Catraca', 'Executivo', 'Bêbado', 'Vendedor Ambulânte', 'Passageiro', 'Sem Máscara', 'Atrasado']],
        ['Padaria', ['Padeiro', 'Bêbado', 'Caixa', 'O Que Compra Coxa Creme', 'Cliente Virado', 'Chepeiro', 'Balconista', 'Eletricista', 'Vigilância Sanitária', 'Vizinho']],
        ['Parque', ['Skatista', 'Segurança Noturno', 'Vendedor de Água de Côco', 'Senhora Fazendo Cooper', 'Boleiro', 'Jogador de Basquete', 'Guarda Civil Municipal', 'Casal Apaixonado', 'Jardineiro', 'Nóia']],
        ['Posto de Gasolina', ['Frentista', 'Bêbado', 'Vendedor da Conveniência', 'Mecânico', 'Gerente', 'Caminhoneiro', 'Cliente', 'Turista de Ônibos', 'Motoboy', 'Ciclista']],
        ['Restaurante', ['Chef', 'Bartender', 'Recepcionista', 'Caixa', 'Influênciadora', 'Vegeteriano', 'Cliente (Que Foge da Conta)', 'Inspetor Sanitârio', 'Casal Que Briga', 'Cliente Que Reclama']],
        ['Rua', ['CET', 'Policial', 'Morador de Rua', 'Pedestre', 'Corredor', 'Motoboy', 'Uber', 'Skatista', 'Gari', 'Panfleteiro']],
        ['Super Mercado', ['Estoquista', 'Caixa', 'Jardineiro da Loja', 'Gerente', 'Cliente', 'Menores Comprando Bebida', 'Anunciante', 'Criança Perdida', 'Louco por Promoção', 'Empacotador']],
        ['Teatro', ['Ator Principal', 'Diretor', 'Espectador', 'Vendedor da Bilheteria', 'Figurinista', 'Familiar do Ator', 'Segurança', 'Vendedor de Pipoca', 'Coadjuvante', 'Espectador Estudante']],
        ['Banheiro da balada', ['Drogado', 'Apertado Para Fazer Xixi', 'O Que está Passando Mal', 'O Que Puxa Assunto', 'O Que Manda Mensagem Pra Ex', 'Briguento', 'Faxineiro', 'Beijoqueiro', 'Nunca Sai Da Fila', 'Funcionario Descansando']],
        ['Fazenda', ['Fazendeiro', 'Agroboy', 'Vaqueiro', 'Lenhador', 'Veterinário', 'Proprietário', 'Forncedor de Adubo', 'Caseiro', 'Vizinho', 'Fã de Sertanejo']],
        ['Cafeteria', ['Caixa', 'Garçon', 'Confeteiro', 'Executivo', 'Crítico Gastronomico', 'Cliente', 'Blogueira', 'Pessoa Atrasada', 'Fofoqueira', 'Universitário']],
        ['Biblioteca', ['Bibliotecário', 'Casal Apaixonado','Estudante', 'O Que Lê Alto', 'Faxineiro', 'Turista', 'Escritor', 'Fã do Escritor', 'Intelectual', 'Curador de Livros']],
        ['Igreja', ['Padre', 'Freira', 'Crente', 'Criança', 'Noiva', 'Noivo', 'Emocionado', 'Turista', 'Fotógrafo', 'O Que Se Confessa']],
        ['Circo', ['Palhaço', 'Mágico', 'Malabarista', 'Trapezista', 'Vendedor da Bilheteria', 'Criança', 'Impressionado', 'Pai de Criança', 'O Atrasado', 'Hippie']],
        ['Parque de Diversões', ['Vendedor de Algodão Doce', 'Primeiro Date', 'Funcionário', 'Nauseado', 'Palhaço', 'Mecânico', 'Criança', 'Adolescente Intediado', 'Pai Animado', 'Bêbado']],
        ['Festa Fantasia', ['Bartender', 'Promoter', 'O Barrado', 'Bruxa', 'Elvis Presley', 'Diabo', 'Sem Fatasia', 'Pickachu', 'Hulk', 'Marilyn Monroe', 'A Anja']],
        ['Casa de Strip', ['A Dançarina', 'Milionário', 'Bêbado', 'Virgem', 'Gerente', 'Curioso', 'Recém Separado', 'Noiva', 'O Tarado', 'DJ']]        
    ];

    //console.log(situations[0].length)
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

//Add the charlatans

function pushImpostor(list, nImpostores) {
    let i = 0;
    while (i < nImpostores) {
        list[1].push('Charlatão');
        const main = document.getElementById('template');
        main.innerHTML = '';
        i = i + 1;
    }
    return list;
}

//Shuffle the characters

function shuffle(array) {
    const newArray = [...array]
    const length = newArray.length
  
    for (let start = 0; start < length; start++) {
      const randomPosition = Math.floor((newArray.length - start) * Math.random())
      const randomItem = newArray.splice(randomPosition, 1)
  
      newArray.push(...randomItem)
    }
    console.log(array);
    return newArray
}