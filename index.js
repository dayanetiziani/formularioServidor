//sintaxe moderna não funciona no vercell
//import express from 'express';

//exemplo de importação de biblioteca usando type:'commonjs'
//sintaxe antiga 
express = require('express')

const porta = 3000;
const host = '0.0.0.0';

const app = express();

//indicando para a aplicação como servir arquivos estáticos localizados na pasta 'paginas'
app.use(express.static('./paginas'));

app.get('/', (requisicao, resposta) => {
    resposta.end(`<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ação Natal 2023 - Página Inicial</title>
        <style>
        body{/* estiliza o que estiver na pagina*/
            font-family: Arial, Helvetica, sans-serif;
            text-align: center;
        }
    </style>
    </head>
    <body>
        <h1 >CAMPANHA PAPAI NOEL 2023</h1>
        <hr>
        <p>Que tal enviar a cartinha para o Papai Noel por aqui?</p>
        <p>Basta clicar no link "Cadastrar Carta", preencher corretamente o formulário e enviar a cartinha.</p>
        <ul>
            <p><a href="/formulario.html">Cadastrar Carta</a></p>
        </ul>
`);
})

app.get('/lista', processaCartasUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});

var listaCartasUsuario = [];

function processaCartasUsuario(requisicao, resposta){
    //processar os parâmetros da url em http://localhost:3000/formulario.html?....
    const usuario = {
                      nome:  requisicao.query.nome,
                      sobrenome: requisicao.query.sobrenome,
                      cpf: requisicao.query.cpf,
                      endereco: requisicao.query.endereco,
                      numero: requisicao.query.numero,
                      complemento: requisicao.query.complemento,
                      bairro: requisicao.query.bairro,
                      uf: requisicao.query.uf,
                      cidade: requisicao.query.cidade,
                      cep: requisicao.query.cep,
                      idade: requisicao.query.idade,
                      anoMeses: requisicao.query.anoMeses,
                      sexo: requisicao.query.sexo,
                      pedido1: requisicao.query.presentes1,
                      descricao1: requisicao.query.descricao1,
                      pedido2: requisicao.query.presentes2,
                      descricao2: requisicao.query.descricao2,
                      pedido3: requisicao.query.presentes3,
                      descricao3: requisicao.query.descricao3
                    }
    //adiciona um novo usuário na lista de usuários já cadastrados
    listaCartasUsuario.push(usuario);
    
    //retorna a lista de cartas dos usuários/crianças
    let conteudoResposta = `<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ação Natal 2023 - Lista de Cartas</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    </head>
    <body>
        <h1>Lista de cartas cadastradas</h1>
        <table class="table table-info table-hover">
        <thead>    
            <tr>
                <th scope="col">Nome Completo</th>
                <th scope="col">CPF</th>
                <th scope="col">Idade</th>
                <th scope="col">Sexo</th>
                <th scope="col">Endereço</th>
                <th scope="col">Cidade</th>
                <th scope="col">CEP</th>
                <th scope="col">Pedido 1</th>
                <th scope="col">Pedido 2</th>
                <th scope="col">Pedido 3</th>
            </tr>
        </thead>
        <tbody`;

    for (const usuario of listaCartasUsuario){
        conteudoResposta += `
            <tr>
                <td>${usuario.nome} ${usuario.sobrenome}</td>
                <td>${usuario.cpf}</td>
                <td>${usuario.idade} ${usuario.anoMeses}</td> 
                <td>${usuario.sexo}</td>
                <td>${usuario.endereco}, ${usuario.numero}, ${usuario.complemento}, ${usuario.bairro}</td>
                <td>${usuario.cidade}-${usuario.uf}</td>
                <td>${usuario.cep}</td>
                <td>${usuario.pedido1}-${usuario.descricao1}</td>
                <td>${usuario.pedido2}-${usuario.descricao2}</td>
                <td>${usuario.pedido3}-${usuario.descricao3}</td>
            </tr>
        `;
    }

        conteudoResposta+= `
            </tbody>
            </table>
           
            <a button type="button" class="btn btn-outline-warning" href="/">Página Inicial</button>
            <a class="btn btn-primary" href="/formulario.html" role="button">Continuar cadastrando</a>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        
        </html>`;

    resposta.end(conteudoResposta);
}