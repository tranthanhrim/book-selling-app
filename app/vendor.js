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
bookSellingApp.controller('productManagementController', function ($scope, $http, $state, $stateParams, $mdDialog, $mdToast, bookSellingService) {
  var vm = this;
  vm.init = init;
  vm.showDialogAddProduct = showDialogAddProduct;
  vm.productList = [];
  function init() {
    vm.header = 'Header của page';
    vm.body = 'Nội dung page - trang 1';
  }

  function showMdDialog(controller, templateUrl, event, param, isEditMode) {
    $mdDialog.show({
      controller: controller,
      controllerAs: 'vm',
      templateUrl: templateUrl,
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: false,
      locals: {
        product: param,
        isEditMode: isEditMode
      }
    });
  }

  function showDialogAddProduct(event) {
    showMdDialog(DialogAddNewProductController, 'module/dialog/dialog-add-new-product.html', event, null, false);
  }

  function DialogAddNewProductController(product, isEditMode) {
    var vm = this;
    vm.init = init;
    vm.cancelDialog = cancelDialog;
    vm.addOrUpdateProduct = addOrUpdateProduct;
    vm.deleteProduct = deleteProduct;
    vm.product = {
      id: -1,
      name: '',
      description: '',
      price: null
    };
    vm.isEditMode = false;
    function init() {
      vm.labelAddOrUpdate = 'Add';
      vm.isEditMode = isEditMode;
      if (product != null) {
        vm.product = angular.copy(product);
        vm.labelAddOrUpdate = 'Update';
      }

      if (vm.isEditMode) {
        vm.labelAddOrUpdate = 'Detail';
      }
    }

    function addOrUpdateProduct() {
      if (vm.product.id == -1) {
        adminService.addProduct(vm.product).then(function (result) {
          adminService.showToast($mdToast, 'Import product successful!');
          $mdDialog.cancel();
          $state.reload();
        });
      } else {
        adminService.updateProduct(vm.product.id, vm.product).then(function (result) {
          adminService.showToast($mdToast, 'Update product successful!');
          $mdDialog.cancel();
          $state.reload();
        });
      }
    }

    function deleteProduct() {
      adminService.deleteProduct(vm.product.id).then(function (result) {
        adminService.showToast($mdToast, 'Delete product successful!');
        $mdDialog.cancel();
        $state.reload();
      });
    }

    function cancelDialog() {
      $mdDialog.cancel();
    }
  }
});
bookSellingApp.controller('productTableController', function ($scope, $http, $state, $stateParams, $mdDialog, $mdToast, bookSellingService, $window) {
  var vm = this;
  vm.init = init;

  function init() {
    vm.body = 'Nội dung page - trang 2';
  }
});