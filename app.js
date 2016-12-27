(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
var shoppingListIni = [
 {
   name: "Milk",
   quantity: "2"
 },
 {
   name: "Donuts",
   quantity: "200"
 },
 {
   name: "Cookies",
   quantity: "300"
 },
 {
   name: "Chocolate",
   quantity: "5"
 },
 {
   name: "Beer",
   quantity: "15"
 }
];
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
  var buyItem = this;

  buyItem.items = ShoppingListCheckOffService.getItems();

  buyItem.buyItem = function (itemIndex,itemName, quantity) {
  ShoppingListCheckOffService.addItem(itemName, quantity);
  ShoppingListCheckOffService.removeItem(itemIndex);
  buyItem.AllBought=function(){
    return ShoppingListCheckOffService.verifyNullArray(buyItem.items);
  };
  }
}

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBought();
  boughtList.NothingBought=function(){
    return ShoppingListCheckOffService.verifyNullArray(boughtList.items);
  };
};


 function ShoppingListCheckOffService() {
 var service = this;

 // List of shopping items
 var items = shoppingListIni;
 var bought=[];

 service.addItem = function (itemName, quantity) {
   var item = {
     name: itemName,
     quantity: quantity
   };
   bought.push(item);
 };

 service.removeItem = function (itemIndex) {
    items.splice(itemIndex,1);
  };
 service.getItems = function () {
   return items;
 };

 service.getBought = function () {
   return bought;
 };

 service.verifyNullArray = function (array) {
   if(array.length===0){return true;}
   else {return false;}
 };

}

})();
