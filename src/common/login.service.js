(function () {
"use strict";

angular.module('common')
.service('LoginService', LoginService);


//LoginService.$inject = ['$http','ApiPath'];
function LoginService() {
  var service = this;
  service.users = [];

    service.addUser = function(firstName, lastName,
      emailAdress, phoneNumber, favoriteDish) {
        service.users.push({
            firstName: firstName,
            lastName: lastName,
            emailAdress: emailAdress,
            phoneNumber: phoneNumber,
            favoriteDish: favoriteDish});
    };

    service.getUsers = function() {
        return service.users;
    };

    service.getLastUser = function() {
        if (service.users.length === 0) {
            return undefined;
        } else {
            return service.users[service.users.length - 1];
        }
    };
}

})();
