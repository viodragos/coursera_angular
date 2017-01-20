(function () {
"use strict";

angular.module('public')
    .directive('logChk', LoginChkDirective);

LoginChkDirective.$inject = ['MenuService'];
function LoginChkDirective(MenuService) {
    var ddo = {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$asyncValidators.logChk = function (modelValue, viewValue) {
                console.log(ctrl);
                if (ctrl.$isEmpty(modelValue)) {
                    return Promise.resolve(true);
                }

                return MenuService.getItem(modelValue);
            }
        }
    };
    return ddo;
}
})();
