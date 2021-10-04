const express  = require('express')
const app = express()
const port = 3000
const config =  {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'

};

let currentCount = 0;

// Connect com SQL DB
const mysql = require('mysql')
let connection = mysql.createConnection(config)

// Cria tabela caso não exista
let sql = `CREATE TABLE IF NOT EXISTS nodedb.people (id INT AUTO_INCREMENT PRIMARY KEY, name CHAR(255))`
connection.query(sql, function (err, result, fields) 
{
    if (err) throw err;

    // Atualiza o Número de Registros:
    sql = `SELECT COUNT(*) AS count FROM people`
    connection.query(sql, function (err2, result2, fields2) 
    {
        if (err) throw err;
        currentCount = parseInt(result2[0].count)
        currentCount++;
        console.log('Registro Atual:' , currentCount);

    // insere próximo nome
    const valueToInsert = `"Ricardo Santos, Inserção número ${currentCount}"`
    console.log(valueToInsert)
    sql = `INSERT INTO people(name) values(${valueToInsert})`
    console.log(sql)
    connection.query(sql, function(err3, result3, fields3)
    {
        connection.end()
    })
  })
})



app.get('/', (req,res) => 
{
    connection = mysql.createConnection(config)

    let response = '<h1>FULL CYCLE!</h1>'

    // Printa nomes
    sql = `SELECT name FROM people`
    connection.query(sql, function (err, result, fields) 
    {
        if (err) throw err;
        console.log(result);

        result.map(value => {
           response = response + `<p><h2>${value.name}</h2></p>` 
        })

        console.log(response)
        res.send(response)

        connection.end()
    });
   
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})