angular.module('appAloPorteiro').controller('condominoController',condominoController);

function condominoController($scope,$resource,$mdDialog){
    
    $scope.vm = {}
    let vm = $scope.vm

    let condominoApi = $resource('http://localhost:3000/api/condomino/:id' , {id:'@id'},{
        update : {
            method : 'PUT'
        }
    })


    vm.carregaCondominos = function(){
        vm.condominos = new condominoApi();
        vm.condominos.$get().then(function(resposta){
            vm.condominos.data = resposta.data
        })
    }
    vm.carregaCondominos();

    vm.salvaPorteiro = function(){
        let porteiro = new usuarioApi();
        let pessoa = new pessoaApi();
    }

}