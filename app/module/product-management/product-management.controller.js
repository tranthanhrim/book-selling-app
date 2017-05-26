bookSellingApp.controller('productManagementController', function ($scope, $http, $state, $stateParams, $mdDialog, $mdToast, Upload, bookSellingService) {
  var vm = this;
  vm.init = init;
  vm.showDialogAddProduct = showDialogAddProduct;
  vm.productList = [];
  function init() {
    vm.header = 'Header của page';
    vm.body = 'Nội dung page - trang 1';
  }

  function ProductTemplate() {
    return {
      id: -1,
      title: '',
      author: '',
      description: '',
      price: null
    }
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
    vm.uploadImage = uploadImage;
    vm.unSelectImage = unSelectImage;
    vm.cancelDialog = cancelDialog;
    vm.addOrUpdateProduct = addOrUpdateProduct;
    vm.deleteProduct = deleteProduct;
    vm.product = new ProductTemplate();
    vm.isEditMode = false;
    vm.isImagePicked = false;
    var imageBookCover = null;

    var storageRef = firebase.storage().ref();

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

    function uploadImage(file) {
      if (file != null) {
        imageBookCover = file;
        Upload.base64DataUrl(file).then(function (base64Urls) {
          vm.isImagePicked = true;
          vm.imageUpload = base64Urls;
          // firebase.storage().ref('book-cover/' + file.name).putString(base64Urls, 'data_url').then(function (snapshot) {
          // });
        });
      }
    }

    function unSelectImage() {
      imageBookCover = null;
      vm.isImagePicked = false;
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