const dataContext = require('../dao/dao'),
        util = require('../util/util');



function carregaTudo(req,res){

    return dataContext.Visita.findAll({
        order : 'id'
    }).then(function(visitas){
        res.status(200).json({
            sucesso : true,
            data : visitas
        })
    })
}

function carregaPorId(req,res){

    return dataContext.Visita.findById(req.params.id,{
        include : [
            {
                model : dataContext.Pessoa
            },
            {
                model : dataContext.Condomino,
                attributes : ['endereco']
            },
            {
                model : dataContext.Porteiro
            }
        ]
    }).then(function(visita){

        visita = visita.get({plain : true})

        delete visita.pessoa_id;
        delete visita.porteiro_id;
        delete visita.condomino_id;

        res.status(200).json({
            sucesso : true,
            data: visita
        })
    })
}

function salvaVisita(req,res){
	
	let visita = req.body.visita;

    visita.dataHoraReserva = new Date();
    visita.portariaDataHoraChegada = null;

	if (!visita) {
		res.status(409).json({sucesso: false, msg: "Formato de entrada inválido."})
		return;
	}

	
	dataContext.Visita.create(visita)
	.then(function(novoVisita){
		res.status(201).json({sucesso: true, data: novoVisita})
	})
	.catch(function(erro){

        console.log(erro);
		res.status(409).json({ sucesso: false, msg: "Falha ao registrar visita" });
	})
}

function atualizaVisita (req,res){

    if (!req.params.id) {
		res.status(409).json({sucesso : false, msg: "Formato de entrada inválido."})
		return;
	}    

    let visita = req.body.visita;

    if (!visita) {
		res.status(409).json({sucesso : false, msg: "Formato de entrada inválido."})
		return;
    }
    
    dataContext.Visita.findById(req.params.id).then(function(visita){

        if (!visita){
            res.status(409).json({sucesso : false,msg : "Visita nao encontrada"})
        }

        let updateFields = {
            condominoId             : visita.condominoId,
            pessoaId                : visita.pessoaId,
            dataHoraReserva         : visita.dataHoraReserva,
            nomeConvidado           : visita.nomeConvidado,
            condominoObservacao     : visita.condominoObservacao,
            dataHoraExpiracao       : visita.dataHoraExpiracao,
            situacao                : visita.situacao,
            portariaDataHoraChegada : visita.portariaDataHoraChegada,
            portariaObservacao       : visita.portariaObservacao
        }

        console.log(visita)
        visita.update(updateFields)
        .then(function(visitaAtualizada){
            console.log(visitaAtualizada)
            res.status(200).json({
                sucesso : true,
                msg : "Visita atualizada",
                data : visitaAtualizada
            })
        })
        .catch(function(erro){
            console.log(erro)
            res.status(409).json({sucesso:true,msg:"Falha ao atualizar visita"})
        })

    })   

}
function excluiVisita(req,res){

    if(!req.params.id){
        res.status(409).json({sucesso:false,msg:"Formato de entrada invalido"})
    }

    dataContext.Visita.findById(req.params.id).then(function(visita){

        if(!visita){
            res.status(404).json({sucesso : false, msg:"Nenhuma visita encontrada"})
        }

        visita.destroy()
        .then(function(){
            res.status(200).json({
                sucesso : true,
                msg:"Visita exluida com sucesso",
                data:[]
            })
        })
        .catch(function(e){
            console.log(e)
            res.status(409).json({sucesso:false,msg:"Falha ao excluir visita"})
        })
    })
}


module.exports = {
    carregaTudo  	: carregaTudo,
    carregaPorId 	: carregaPorId,
    salva           : salvaVisita, 
    atualiza        : atualizaVisita,
    exclui          : excluiVisita
}