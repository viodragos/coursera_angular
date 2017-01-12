(function () {
'use strict';

angular.module('data')
.component('categories', {
  templateUrl: 'src/data/templates/categories.list.template.html',
  bindings: {
    items: '<'
  }
});


})();
