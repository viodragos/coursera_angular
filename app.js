(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.count = -1;
  $scope.customStyle = {};
  $scope.count_menu = function () {
    var array = $scope.name.split(',');
    var cn=0;
    for (var i = 0; i < array.length; i++) {
      if(array[i]){cn += 1;}
    }
    $scope.count=cn;
  };

  $scope.turnGreen = function (){
    $scope.customStyle.style = {"color":"green"};
  }
  $scope.turnRed = function() {
    $scope.customStyle.style = {"color":"red"};
  }
  $scope.menu_message = function () {
    var msg="";
    if($scope.count!=-1){
    if($scope.count>3){
      msg="Too much";
      $scope.turnGreen();
    }
    else if ($scope.count<1){
      msg="Please enter data first";
      $scope.turnRed();
    }
    else {
      msg="Enjoy";
      $scope.turnGreen();
    }
  }
    return msg;
  };
}

})();
