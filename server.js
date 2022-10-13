const express = require ('express');
const app = express()

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/to-do'));

app.get('/* ', (req,res) => {
    res.sendFile(__dirname + '/dist/to-do/index.html');
})

app.listen(PORT, ()=> {
    console.log('Servidor rodando na porta: ' + PORT)
})