(function () {
'use strict';

angular.module('MenuApp')

.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/data/templates/home.template.html'
  })

  // Catgories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/data/templates/categories.template.html',
    controller: 'CategoriesController as categAll',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('items', {
    url: '/items/{categId}',
    templateUrl: 'src/data/templates/items.template.html',
    controller: "ItemsController as itemsCateg",
    resolve: {
      cid: function(MenuDataService,$stateParams) {
      return MenuDataService.getState(MenuDataService.
        setState($stateParams.categId));
    },
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getItemsForCategory(MenuDataService.getState());
      }]
    }
  });

}

})();
