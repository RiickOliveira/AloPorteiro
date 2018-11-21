angular.module('appAloPorteiro').controller('adminController',adminController);

function adminController($scope,$resource,$mdDialog){
    
    $scope.vm = {}
    let vm = $scope.vm

    let porteiroApi = $resource('http://localhost:3000/api/porteiro/:id' , {id :'@id'}, {
        update : {
            method : 'PUT'
        }
    })

    let condominoApi = $resource('http://localhost:3000/api/condomino/:id' , {id:'@id'},{
        update : {
            method : 'PUT'
        }
    })


    vm.carregaPorteiros = function(){
        vm.porteiros = new porteiroApi()
        vm.porteiros.$get().then(function(resposta){
            vm.porteiros.data = resposta.data
        })
    } 
    vm.carregaPorteiros();

    vm.carregaCondominos = function(){
        vm.condominos = new condominoApi();
        vm.condominos.$get().then(function(resposta){
            vm.condominos.data = resposta.data
        })
    }
    vm.carregaCondominos();


}