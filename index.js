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
    main.innerHTML = '<h1 id="transition">Passe para o primeiro jogador</p>';
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
                if (role.innerHTML == 'eeta charlatãozin safad'){
                    cenario.innerHTML = `Descubra o lugar!`;
                }else{
                    cenario.innerHTML = `${finalList[0][0]}`;
                }
                cenario.setAttribute('style', 'visibility: visible;');
                showSecret.setAttribute('style', 'display: none;');
                show.setAttribute('style', 'display: block;');
                count ++
            };
        }else {
            main.innerHTML = `<div class="players"><h2>Jogadores:</h2></div><div class="wrapper"><span class="minus" id="minusPlayer">-</span><span class="num" id="nJogadores">${nPlayers}</span><span class="plus" id="plusPlayer">+</span></div><div class="players1"><h2>Charlatos:</h2></div><div class="wrapper"><span class="minus1" id="minusChar">-</span><span class="num1" id="nImpostores">${nChar}</span><span class="plus1" id="plusChar">+</span></div>`
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
        ['Karaoke', ['Cantor', 'Tímido', 'Desafinado', 'Bartender', 'Técnico de Áudio', 'Dançarino', 'Segurança', 'Gerente', 'Dono', 'Vendedor de milho']],
        ['Praia', ['Vendedor de picolé', 'Salva-Vidas', 'Gringo', 'Fotógrafo', 'Surfista', 'Vendedor de miçangas',' Dono do quiosque', 'Esportista', 'Pescador', 'Morador local']],
        ['Zoológico', ['Veterinário', 'Jardineiro', 'Biólogo', 'Funcionário', 'Vendedor de souvenir', 'Cambista', 'Guia', 'Visitante', 'Fotógrafo', 'Vendedor de água']],
        ['Bar', ['Gerente', 'Garçom', 'Caixa', 'Universitário', 'Casal apaixonado', 'Nóia', 'Vendedor de bala', 'Fumante sem isqueiro', 'Boêmio', 'Truqueiro']],
        ['Academia', ['Sócio', 'Preguiçoso', 'Rato de academia', 'Influenciadora', 'Recepcionista', 'Personal galinha', 'Aluna de Zumba', 'Fisiculturista', 'Lutador', 'Fornecedor']],
        ['Balada', ['Mixologista/Bartender', 'Gerente', 'Drogado', 'Fumante', 'DJ', 'Héterotop', 'Dançarino', 'Vendedor de Hot Dog', 'Eletricista', 'Faxineiro']],
        ['Cinema', ['Vendedor de pipoca', 'Vendedor da bilheteria', 'Cinegrafista', 'Casal apaixonado', 'Pessoa que ri alto', 'Pessoa que dorme', 'Pessoa que fofoca', 'Pessoa emocionada', 'Cosplay', 'Eletricista']],
        ['Clube', ['Treinador', 'Massagista', 'Salva-Vidas', 'Milionário', 'Sócio', 'Esportista', 'Jardineiro', 'Recepcionista', 'Cansado', 'Criança de férias']],
        ['Cruzeiro', ['Monitor', 'Capitão', 'Pai/Mãe de primeira viagem', 'Chef', 'Bartender', 'Nauseado', 'Jogador compulsivo', 'A doida do protetor solar', 'Salva-Vidas', 'Baladeiro']],
        ['Delegacia', ['Bêbado', 'Ladrão', 'Delegado', 'Preso por roubo', 'Preso por uma paranga', 'Vítima', 'Familiar da vítima', 'Advogado', 'Faxineiro', 'Policial']],
        ['Estacionamento', ['Manobrista', 'Cobrador','Dono', 'Funcionário', 'O que perdeu o ticket', 'Impaciente', 'Fumante', 'Perderam seu carro', 'Gerente', 'Bêbado']],
        ['Faculdade', ['Bixo', 'Professora', 'Traficantezinho', 'Faxineiro', 'Vendedora da cantina', 'Diretor', 'Bibliotecária', 'Veterano que não se forma', 'Atleticano chato', 'Segurança']],
        ['Farmacia', ['Caixa', 'Farmacêutico', 'Cliente sem atestado', 'Cliente comprando camisinha', 'Idoso', 'Hipocondríaco', 'Repositor de gôndola', 'Estagiária', 'Maconheiro comprando colírio', 'O que compra teste de gravides']],
        ['Festival', ['Perdido', 'Good Vibes', 'Artista', 'Fã de carteirinha', 'Fumante', 'Faxineiro', 'Segurança', 'Vendedor', 'Cambista', 'Caixa ambulante']],
        ['Hospital', ['Médico', 'Enfermeiro', 'Cirurgião', 'Recepcionista', 'Hipocondríaco', 'O Doente', 'O louco', 'A madre', 'Anestesista', 'O acidentado']],
        ['Mecânica', ['Mecânico', 'Dono', 'Sócio', 'Ajudante', 'Cliente', 'Cliente irritado', 'Cliente mão de vaca', 'O desocupado', 'Vizinho', 'Fornecedor de peças']],
        ['Metro', ['Artista', 'Segurança', 'Bilheteiro', 'O que pulou a catraca', 'Executivo', 'Bêbado', 'Vendedor ambulante', 'Passageiro', 'Sem máscara', 'Atrasado']],
        ['Padaria', ['Padeiro', 'Bêbado', 'Caixa', 'O que compra coxa creme', 'Cliente virado', 'Chapeiro', 'Balconista', 'Eletricista', 'Vigilância sanitária', 'Vizinho']],
        ['Parque', ['Skatista', 'Segurança noturno', 'Vendedor de água de côco', 'Senhora fazendo cooper', 'Boleiro', 'Jogador de Basquete', 'Guarda Civil Municipal', 'Casal apaixonado', 'Jardineiro', 'Nóia']],
        ['Posto de gasolina', ['Frentista', 'Bêbado', 'Vendedor da conveniência', 'Mecânico', 'Gerente', 'Caminhoneiro', 'Cliente', 'Turista de ônibus', 'Motoboy', 'Ciclista']],
        ['Restaurante', ['Chef', 'Bartender', 'Recepcionista', 'Caixa', 'Influenciadora', 'Vegetariano', 'Cliente (que foge da conta)', 'Inspetor sanitário', 'Casal que briga', 'Cliente que reclama']],
        ['Rua', ['CET', 'Policial', 'Morador de rua', 'Pedestre', 'Corredor', 'Motoboy', 'Uber', 'Skatista', 'Gari', 'Panfleteiro']],
        ['Supermercado', ['Estoquista', 'Caixa', 'Jardineiro da loja', 'Gerente', 'Cliente', 'Menores comprando bebida', 'Anunciante', 'Criança perdida', 'Louco por promoção', 'Empacotador']],
        ['Teatro', ['Ator principal', 'Diretor', 'Espectador', 'Vendedor da bilheteria', 'Figurinista', 'Familiar do ator', 'Segurança', 'Vendedor de pipoca', 'Coadjuvante', 'Espectador estudante']],
        ['Banheiro da balada', ['Drogado', 'Apertado para fazer xixi', 'O que está passando mal', 'O que puxa assunto', 'O que manda mensagem pra ex', 'Briguento', 'Faxineiro', 'Beijoqueiro', 'Nunca sai da fila', 'Funcionário descansando']],
        ['Fazenda', ['Fazendeiro', 'Agroboy', 'Vaqueiro', 'Lenhador', 'Veterinário', 'Proprietário', 'Fornecedor de adubo', 'Caseiro', 'Vizinho', 'Fã de sertanejo']],
        ['Cafeteria', ['Caixa', 'Garçom', 'Confeiteiro', 'Executivo', 'Crítico gastronômico', 'Cliente', 'Blogueira', 'Pessoa atrasada', 'Fofoqueira', 'Universitário']],
        ['Biblioteca', ['Bibliotecário', 'Casal apaixonado','Estudante', 'O que lê em voz alta', 'Faxineiro', 'Turista', 'Escritor', 'Fã do escritor', 'Intelectual', 'Curador de livros']],
        ['Igreja', ['Padre', 'Freira', 'Crente', 'Criança', 'Noiva', 'Noivo', 'Emocionado', 'Turista', 'Fotógrafo', 'O que se confessa']],
        ['Circo', ['Palhaço', 'Mágico', 'Malabarista', 'Trapezista', 'Vendedor da bilheteria', 'Criança', 'Impressionado', 'Pai/Mãe de criança', 'O atrasado', 'Hippie']],
        ['Parque de Diversões', ['Vendedor de algodão doce', 'Primeiro date', 'Funcionário', 'Nauseado', 'Palhaço', 'Mecânico', 'Criança', 'Adolescente entediado', 'Pai animado', 'Bêbado']],
        ['Festa a Fantasia', ['Bartender', 'Promoter', 'O barrado', 'Bruxa', 'Elvis Presley', 'Diabo', 'Sem fantasia', 'Pikachu', 'Hulk', 'Marilyn Monroe', 'A anja']],
        ['Casa de Strip', ['A dançarina', 'Milionário', 'Bêbado', 'Virgem', 'Gerente', 'Curioso', 'Recém separado', 'noiva', 'O tarado', 'DJ']]        
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
        list[1].push('eeta charlatãozin safad');
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