(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;
  var categ_state=null;

  service.setState=function (state) {
     categ_state=state;
  };
  service.getState = function () {
    return categ_state;
  };
  //var categ=[];
  service.getAllCategories = function () {
    return $http(
      {
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      }
    ).then(function (result) {
      var foundItems = [];
      var dl = result.data.length;
      for (var i = 0; i < dl; i++) {
        var crt=result.data[i];
        // if(crt.description.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1) {
        //   foundItems.push(crt);
        // }
        foundItems.push(crt);
      }
      return foundItems;
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http(
      {
        method: "GET",
        url: (ApiBasePath + "/menu_items.json?category="+ categoryShortName)
      }
    ).then(function (result) {
      var foundItems = [];
      var dl = result.data.menu_items.length;
      for (var i = 0; i < dl; i++) {
        var crt=result.data.menu_items[i];
        if(crt.short_name.toUpperCase().indexOf(categoryShortName.toUpperCase()) !== -1) {
          foundItems.push(crt);
        }
      }

      return foundItems;
    });
  };



}



})();
