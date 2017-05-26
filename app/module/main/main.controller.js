bookSellingApp.controller('mainController', function ($scope, $http, $state, $stateParams, $mdDialog, $mdToast, bookSellingService, $window) {
  var vm = this;
  vm.init = init;
  vm.nextPage = nextPage;
  function init() {
    vm.header = 'Header của page';
    vm.body = 'Nội dung page - trang 1';
  }

  function nextPage() {
    $state.go('product-table');
  }
});