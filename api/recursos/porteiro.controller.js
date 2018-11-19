const dataContext = require('../dao/dao'),
    util          = require('../util/util');

function carregaTudo(req,res) {
    
    return dataContext.Porteiro.findAll({
    	order : 'id'
    }).then(function(porteiros){
        res.status(200).json({
			sucesso : true,
			data : porteiros
		})
    })
}    


function carregaPorId(req,res) {
    //req.param.id porque passei na URL
    return dataContext.Porteiro.findById(req.params.id,{
        include : [
            {
                model       : dataContext.Usuario,
                attributes : ['email','desativado']
            },
            {
                model : dataContext.Pessoa
            }
        ]    
    }).then(function(porteiro){
        
        porteiro = porteiro.get({plain : true})

        delete porteiro.pessoa_id;
        delete porteiro.usuario_id;
        
        //Por padrão retorna o status
        res.status(200).json({
			sucesso: true,
			data: porteiro
		})
    })


} 

function salvaPorteiro(req,res){
    //req.body campos do body
    //Mesma coisa que [FromBody] no C#
       let porteiro = req.body.porteiro,
           usuario = {
               email : porteiro.usuario.email,
               senha : porteiro.usuario.senha,
               tipo  : 1,
               desativado : false,
               criacao : new Date()
           },
           pessoa = {
               nome                : porteiro.pessoa.nome,
               cpf                 : porteiro.pessoa.cpf,
               nascimento          : porteiro.pessoa.nascimento,
               digital             : util.geraDigital(),
               enderecoLogradouro  : porteiro.pessoa.enderecoLogradouro,
               enderecoNumero      : porteiro.pessoa.enderecoNumero,
               enderecoBairro      : porteiro.pessoa.enderecoBairro,
               enderecoCidade      : porteiro.pessoa.enderecoCidade,
               enderecoUf          : porteiro.pessoa.enderecoUf,
               criacao             : new Date()
           }
           
   
    if (!porteiro) {
     res.status(404).json({
      sucesso: false, 
      msg: "Formato de entrada inválido."
     })
     return;
    }    
       
       //variavel para receber o usuario criado devido ao "Clojure"
       let resposta;
   
       dataContext.Usuario.create(usuario)
       .then(function(novoUsuario){     
           respostaUsuario = novoUsuario;
           return dataContext.Pessoa.create(pessoa)
       })
       .then(function(novaPessoa){
           respostaPessoa = novaPessoa;
           return dataContext.Porteiro.create({
               usuarioId : respostaUsuario.id,
               pessoaId  : respostaPessoa.id 
           })
       })
       .then(function(novoPorteiro){
           respostaPorteiro = novoPorteiro;
           
           res.status(201).json({
               sucesso : true,
               data : resposta
           })
       })
       .catch(function(e){
           console.log(respostaUsuario)
           console.log(respostaPessoa)
           res.status(409).json({ 
               sucesso: false,
               msg: "Falha ao incluir o porteiro" 
           })
       })
   }

function excluiUsuario(req,res){
	if (!req.params.id) {
		res.status(409).json({sucesso: false, msg: "Formato de entrada inválido."})
		return;
	}

	dataContext.Usuario.findById(req.params.id).then(function(usuario){
        
		if (!usuario) {
			res.status(404).json({sucesso: false, msg: "Pessoa não encontrada."})
			return;
		}

		usuario.destroy()
		.then(function(){
			res.status(200).json({
        		sucesso: true,
        		msg: "Registro excluído com sucesso",
        		data: []
        	})	        	
		})
		.catch(function(erro){
			console.log(erro);
			res.status(409).json({ sucesso: false, msg: "Falha ao excluir a pessoa" });	
		})

    })
	
}

function atualizaUsuario(req,res){
	
	if (!req.params.id) {
		res.status(409).json({sucesso : false, msg: "Formato de entrada inválido."})
		return;
	}

	let usuario = req.body.usuario;

	if (!usuario) {
		res.status(409).json({sucesso : false, msg: "Formato de entrada inválido."})
		return;
	}


	dataContext.Usuario.findById(req.params.id).then(function(usuario){
		
		if (!usuario) {
			res.status(404).json({sucesso: false, msg: "Pessoa não encontrada."})
			return;
		}
		
		let updateFields = {
			email  : usuario.email,
			tipo   : usuario.tipo,
			senha  : usuario.senha,			
		}

		usuario.update(updateFields)
		.then(function(usuarioAtualizado){
			res.status(200).json({
        		sucesso: true,
        		msg: "Registro atualizado com sucesso",
        		data: usuarioAtualizado
        	})	
		})
		.catch(function(erro){
			console.log(erro);
			res.status(409).json({sucesso: false, msg: "Falha ao atualizar a pessoa" });	
		})

	})
	
}


module.exports = {
    carregaTudo  	: carregaTudo,
    carregaPorId 	: carregaPorId,
    salva 			: salvaPorteiro,
    exclui 			: excluiUsuario,
    atualiza 		: atualizaUsuario    
}