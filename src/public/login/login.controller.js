(function () {
"use strict";

angular.module('public')
    .controller('LoginController', LoginController);

LoginController.$inject = ['LoginService', 'MenuService'];
function LoginController(LoginService, MenuService) {
    var $logCtrl = this;

    $logCtrl.save = function() {
        MenuService.getItem($logCtrl.favouriteDish)
            .then(function onSuccess() {
                LoginService.addUser(
                    $logCtrl.firstName, $logCtrl.lastName,
                    $logCtrl.emailAdress, $logCtrl.phoneNumber,
                    $logCtrl.favouriteDish);
                $logCtrl.exist = true;
                $logCtrl.notFound = false;
            },
            function onFailure() {
                $logCtrl.exist = true;
                $logCtrl.notFound = false;
            });
    }
}

})();
