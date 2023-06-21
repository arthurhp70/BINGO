// Variáveis globais
var numerosDisponiveis = Array.from({ length: 75 }, (_, index) => index + 1);
var numerosSorteados = [];
var nCartelas = 0;

// Função para iniciar o jogo
function gerarCartela() {
    var nome = prompt("Digite seu nome:");

    if (nome !== null && nome.trim() !== "") {
        
        // Cria uma nova seção para a cartela
        var section = document.createElement('section');
        section.classList.add('cartelas');

        // Cria um elemento h4 com o nome
        var h4 = document.createElement('h4');
        h4.textContent = nome;

        // Cria uma tabela para os números da cartela
        var table = document.createElement('table');

        // Função para embaralhar um arranjo de números
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

        // Embaralha os números de cada coluna
        var numerosB = shuffleArray(Array.from({ length: 15 }, (_, index) => index + 1));
        var numerosI = shuffleArray(Array.from({ length: 15 }, (_, index) => index + 16));
        var numerosN = shuffleArray(Array.from({ length: 15 }, (_, index) => index + 31));
        var numerosG = shuffleArray(Array.from({ length: 15 }, (_, index) => index + 46));
        var numerosO = shuffleArray(Array.from({ length: 15 }, (_, index) => index + 61));

        // Cria a primeira linha da tabela com as letras
        var row1 = document.createElement('tr');
        var letras = ['B', 'I', 'N', 'G', 'O'];
        letras.forEach(function (letra) {
            var cell = document.createElement('td');
            cell.textContent = letra;
            row1.appendChild(cell);
        });
        table.appendChild(row1);

        // Cria as outras linhas da tabela com os números
        for (var j = 0; j < 5; j++) {
            var row = document.createElement('tr');
            for (var k = 0; k < 5; k++) {
                var cell = document.createElement('td');
                if (j === 2 && k === 2) {
                    cell.textContent = 'X';
                } else {
                    var numero;
                    switch (k) {
                        case 0:
                            numero = numerosB[j];
                            break;
                        case 1:
                            numero = numerosI[j];
                            break;
                        case 2:
                            numero = numerosN[j];
                            break;
                        case 3:
                            numero = numerosG[j];
                            break;
                        case 4:
                            numero = numerosO[j];
                            break;
                    }
                    cell.textContent = numero;

                    // Adiciona a classe "numero" ao elemento <td> que contém o número
                    cell.classList.add('numero');
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        // Adiciona o h4 e a tabela à seção
        section.appendChild(h4);
        section.appendChild(table);

        // Adiciona a seção à div "cartelas"
        var cartelasDiv = document.getElementById('cartelas');
        cartelasDiv.appendChild(section);

        // Habilita o botão "Correr Bingo" se houver pelo menos uma cartela
        nCartelas++;
        if (nCartelas > 0) {
            document.querySelector('button[onclick="correrBingo()"]').disabled = false;
        }
    } else {
        alert("Por favor, digite um nome válido.");
    }
}

function reiniciarJogo() {
    // Limpa as variáveis e elementos relacionados ao jogo
    numerosDisponiveis = Array.from({ length: 75 }, (_, index) => index + 1);
    numerosSorteados = [];
    nCartelas = 0;

    // Remove as cartelas existentes
    var cartelasDiv = document.getElementById('cartelas');
    cartelasDiv.innerHTML = "";

    // Remove os números sorteados
    var numerosSection = document.getElementById('numeros');
    numerosSection.innerHTML = "";
    

    // Desabilita o botão "Correr Bingo"
    document.querySelector('button[onclick="correrBingo()"]').disabled = true;
}

// Função para sortear os números do bingo
function correrBingo() {
    document.querySelector('button[onclick="correrBingo()"]').disabled = true;

    var interval = setInterval(function () {
        var randomIndex = Math.floor(Math.random() * numerosDisponiveis.length);
        var numeroSorteado = numerosDisponiveis[randomIndex];
        numerosDisponiveis.splice(randomIndex, 1);
        numerosSorteados.push(numeroSorteado);

        var numeroDiv = document.createElement('div');
        numeroDiv.textContent = numeroSorteado;
        numeroDiv.classList.add('numeros');

        var numerosSection = document.getElementById('numeros');
        numerosSection.appendChild(numeroDiv);

        var cartelas = document.getElementsByClassName('cartelas');
        for (var i = 0; i < cartelas.length; i++) {
            var cartela = cartelas[i];
            var numerosCartela = cartela.getElementsByClassName('numero');
            var cartelaCompleta = true;

            for (var j = 0; j < numerosCartela.length; j++) {
                var numeroCartela = numerosCartela[j];
                if (numeroCartela.textContent.trim() === numeroSorteado.toString()) {
                    numeroCartela.style.backgroundColor = 'green';
                }
                if (numeroCartela.style.backgroundColor !== 'green') {
                    cartelaCompleta = false;
                }
            }

            if (cartelaCompleta) {
                clearInterval(interval);
                var h4 = cartela.querySelector('h4').textContent;
                setTimeout(function () {
                    alert("O VENCEDOR FOI: " + h4);
                }, 100);
                return;
            }
        }
    }, 200);
}
