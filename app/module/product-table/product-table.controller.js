bookSellingApp.controller('productTableController', function ($scope, $http, $state, $stateParams, $mdDialog, $mdToast, bookSellingService, $window) {
  var vm = this;
  vm.init = init;

  function init() {
    vm.body = 'Nội dung page - trang 2';
  }
});