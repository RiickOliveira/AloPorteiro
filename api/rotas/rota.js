let rota = require('express').Router();


let pessoaController = require('../recursos/pessoa.controller');


rota.get('/pessoa', pessoaController.carregaTudo);
rota.get('/pessoa/:id', pessoaController.carregaPorId);
rota.post('/pessoa', pessoaController.salva)
rota.delete('/pessoa/:id', pessoaController.exclui)
rota.put('/pessoa/:id', pessoaController.atualiza)



module.exports = rota;