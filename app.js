
(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'menuList.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'nd',
    bindToController: true
  };
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var nd = this;
  nd.searchTerm = "";
  nd.found = null;
  nd.noItemsFound = function () {
    if(((nd.found !== null) && (nd.found.length > 0)) || (nd.found === null)) {
      return false;
    } else {
      return true;
    }

  };

  nd.getItems = function (searchTerm) {
    if((searchTerm === null) || (searchTerm === "")) {
      nd.found = [];
      return nd.found;
    }
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
      nd.found = response;
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  nd.removeItem = function (itemIndex) {
    if((nd.found !== null) && (nd.found.length > 0)) {
      nd.found.splice(itemIndex, 1);
    }
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http(
      {
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }
    ).then(function (result) {
      var foundItems = [];
      var dl = result.data.menu_items.length;
      for (var i = 0; i < dl; i++) {
        var crt=result.data.menu_items[i];
        if(crt.description.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1) {
          foundItems.push(crt);
        }
      }
      return foundItems;
    });
  };
}



})();
