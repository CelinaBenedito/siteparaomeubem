const express = require('express');
const mysql = require('mysql2');
const SERVIDOR_PORTA = 3300;

    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: '127.0.0.1',
            user: 'br1nd4o',
            password: 'Br1nd4oeuteamo2025!',
            database: 'controle',
            port: 3306
        }
    ).promise();
    await poolBancoDados.execute(
        'INSERT INTO gasto (valor, descricao, fkTipo, nomeGasto, fkData) VALUES (?, ?, ?, ?, ?)',
        [valor, Desc, tipo, titulo]
    );
 console.log("valores inseridos no banco: " + valor + ", " + Desc + ", "+ tipo+", "+ titulo);
