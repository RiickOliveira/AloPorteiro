let rota = require('express').Router();


let pessoaController = require('../recursos/pessoa.controller');
let usuarioController = require('../recursos/usuario.controller');
let porteiroController = require('../recursos/porteiro.controller');

rota.get('/pessoa', pessoaController.carregaTudo);
rota.get('/pessoa/:id', pessoaController.carregaPorId);
rota.post('/pessoa', pessoaController.salva)
rota.delete('/pessoa/:id', pessoaController.exclui)
rota.put('/pessoa/:id', pessoaController.atualiza)

rota.get('/usuario',usuarioController.carregaTudo)
rota.get('/usuario/:id',usuarioController.carregaPorId)
rota.post('/usuario', usuarioController.salva)
rota.delete('/usuario/:id',usuarioController.exclui)
rota.put('/usuario/:id',usuarioController.atualiza)

rota.get('/porteiro',porteiroController.carregaTudo)
rota.get('/porteiro/:id',porteiroController.carregaPorId)
rota.post('/porteiro', porteiroController.salva)
rota.delete('/porteiro/:id',porteiroController.exclui)
rota.put('/porteiro/:id',porteiroController.atualiza)





module.exports = rota;