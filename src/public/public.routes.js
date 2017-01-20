(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.login', {
      url: '/login',
      templateUrl: 'src/public/login/login.html',
      controller: 'LoginController',
      controllerAs: 'logCtrl'
  })
  .state('public.info', {
        url: '/info',
        templateUrl: 'src/public/info/info.html',
        controller: 'InfoController as infoCtrl',
        resolve: {
          user: ['LoginService', function (LoginService) {
            return LoginService.getLastUser();
          }],
          favDish: ['LoginService', 'MenuService',
          function (LoginService, MenuService) {
            var user = LoginService.getLastUser();
            if (user === undefined) {
              return undefined;
            }
            var shortName = user.favoriteDish;
            return MenuService.getItem(shortName);
          }]
        }
      })

    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    });
}
})();
