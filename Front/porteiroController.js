angular.module('appAloPorteiro')
.controller('porteiroListaController',porteiroListaController)
.controller('porteiroController',porteiroController);

function porteiroListaController($scope,$resource,$mdDialog){
    
    $scope.vm = {}
    let vm = $scope.vm

    let porteiroApi = $resource('http://localhost:3000/api/porteiro/:id' , {id :'@id'}, {
        update : {
            method : 'PUT'
        }
    })
    
    function init(){
        carregaPorteiros();
    }    
    init();

    
    vm.carregaPorteiros = carregaPorteiros;
    vm.cadastraPorteiro = cadastraPorteiro;



    function carregaPorteiros(){
        vm.porteiros = new porteiroApi()
        vm.porteiros.$get().then(function(resposta){
            console.log(resposta)
            vm.porteiros.data = resposta.data
        })
    } 

    function cadastraPorteiro(ev){
        $mdDialog.show({
            templateUrl: 'novoPorteiro.html',
            controller: 'porteiroController',            
            parent: angular.element(document.body),
            targetEvent: ev            
        }).then(function(novoCadastro){
            if (novoCadastro) {
                vm.carregaPorteiros()
            }
        })    
    }              

}


function porteiroController($scope, $resource,$mdDialog){
    $scope.vm = {}
    let vm = $scope.vm

    let porteiroApi = $resource('http://localhost:3000/api/porteiro/:id' , {id :'@id'}, {
        update : {
            method : 'PUT'
        }
    })
    
    function init(){
        
    }      

    vm.cancelar = cancelar;
    vm.salvar   = salvar;   


    function cancelar() {
        $mdDialog.cancel();
    }

    function salvar(){
        let dsPorteiro = new porteiroApi();
        let porteiro = {
                usuario : {
                    email : vm.usuarioEmail,
                    senha : vm.usuarioSenha
                },
                pessoa : {
                    nome : vm.pessoaNome,
                    cpf : vm.pessoaCpf,
                    nascimento : vm.pessoaNascimento,
                    enderecoLogradouro : vm.pessoaLogradouro,
                    enderecoNumero  : vm.pessoaNumero,
                    enderecoBairro  : vm.pessoaBairro,
                    enderecoCidade  : vm.pessoaCidade,
                    enderecoUf  : vm.pessoaUf
                }
            };
            
        dsPorteiro.porteiro = porteiro;
        

        
        let sucesso = function(resposta){
			console.log(resposta)
			
			if (resposta.sucesso) {				

				if (vm.porteiroId) {
					toastr.info("Cliente atualizado com êxito","SUCESSO")
				} else {
					toastr.success("Cliente incluído com êxito :)","SUCESSO")	
				}
    
                $mdDialog.hide(true);
			}
			
		}

		let erro = function(resposta){
			console.log(resposta)	
        }
        
        if (vm.porteiroId) {
			dsPorteiro.id = vm.porteiroId;
			dsPorteiro.$update().then(sucesso,erro);
			//vm.pessoaForm.$setUntouched();								
		} else {
			dsPorteiro.$save().then(sucesso,erro)               				
		}
    
    }  
  
    
}