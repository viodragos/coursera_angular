(function () {
'use strict';

angular.module('data')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['MenuDataService','items', 'cid'];
function ItemsController(MenuDataService,items,cid ) {
  var itemsCateg = this;
  itemsCateg.items = items;
  itemsCateg.catId=cid ;
}

})();
