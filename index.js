//sintaxe moderna
import express from 'express';

//exemplo de importação de biblioteca usando type:'commonjs'
//sintaxe antiga 
//express = require('express')

const porta = 3000;
const host = '0.0.0.0';

const app = express();

//indicando para a aplicação como servir arquivos estáticos localizados na pasta 'paginas'
app.use(express.static('./paginas'));

app.use('/', (requisicao, resposta) => {
    resposta.end(`<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ação Natal 2023 - Página Inicial</title>
    </head>
    <body>
        <h1>Menu</h1>
        <hr>
        <ul>
            <li><a href="/formulario.html">Enviar Carta</a></li>
        </ul>
`);
})

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});