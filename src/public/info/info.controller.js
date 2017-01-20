(function () {
"use strict";

angular.module('public')
    .controller('InfoController', InfoController);

InfoController.$inject = ['user', 'favDish'];
function InfoController(user, favDish) {
    var $ctrl = this;
    if (user === undefined) {
        $ctrl.logged = false;
    } else {
        $ctrl.user = user;
        $ctrl.favDish = favDish;
        $ctrl.logged = true;
    }
}

})();
