bookSellingApp.controller('productManagementController', function ($scope, $http, $state, $stateParams, $mdDialog, $mdToast, Upload, bookSellingService) {
  var vm = this;
  vm.init = init;
  vm.showDialogAddProduct = showDialogAddProduct;
  vm.showDetailProduct = showDetailProduct;
  vm.productList = [];
  function init() {
    vm.header = 'Header của page';
    vm.body = 'Nội dung page - trang 1';
    var tempProduct1 = new ProductTemplate();
    tempProduct1.cover = 'https://firebasestorage.googleapis.com/v0/b/luminous-inferno-3794.appspot.com/o/book-cover%2Fduong-dua-cua-nhung-giac-mo.jpg?alt=media&token=6d8585d5-7df0-4198-90dd-7bbdaeb6c174';
    tempProduct1.title = 'Đường Đua Của Những Giấc Mơ';
    tempProduct1.author = 'Wendelin Van Draanen';
    tempProduct1.description = 'Đây là cuốn sách khiến bạn sẽ tin rằng: Cuộc đời gập ghềnh đá sỏi ngoài kia chẳng có thể ngăn được bước chân bạn dù những cơn giông bão luôn lăm le muốn quật ngã bạn bất cứ lúc nào.'
    tempProduct1.price = 72000;

    var tempProduct2 = new ProductTemplate();
    tempProduct2.cover = 'https://firebasestorage.googleapis.com/v0/b/luminous-inferno-3794.appspot.com/o/book-cover%2Fcuu-thien-khuynh-ca.jpg?alt=media&token=a7f9f2f4-af69-4859-8188-1b8c45ce67ea';
    tempProduct2.title = 'Cửu Thiên Khuynh Ca';
    tempProduct2.author = 'Trúc Yến Tiểu Sinh';
    tempProduct2.description = 'Mãnh liệt nhất, đớn đau nhất, say đắm nhất phải là việc nàng mở từng lớp khóa trái tim mỏng manh để đặt vào đó cái tên Trọng Uyên.';
    tempProduct2.price = 103200;

    vm.productList.push(tempProduct1);
    vm.productList.push(tempProduct2);
  }

  function ProductTemplate() {
    return {
      id: -1,
      cover: '',
      title: '',
      author: '',
      description: '',
      price: null
    }
  }

  function showMdDialog(controller, templateUrl, event, param, isDetailMode) {
    $mdDialog.show({
      controller: controller,
      controllerAs: 'vm',
      templateUrl: templateUrl,
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: false,
      locals: {
        product: param,
        isDetailMode: isDetailMode
      }
    });
  }

  function showDialogAddProduct(event) {
    showMdDialog(DialogAddNewProductController, 'module/dialog/dialog-add-new-product.html', event, null, false);
  }

  function showDetailProduct(product) {
    showMdDialog(DialogAddNewProductController, 'module/dialog/dialog-add-new-product.html', event, product, true);
  }

  function DialogAddNewProductController(product, isDetailMode) {
    var vm = this;
    vm.init = init;
    vm.uploadImage = uploadImage;
    vm.unSelectImage = unSelectImage;
    vm.cancelDialog = cancelDialog;
    vm.addNewProduct = addNewProduct;
    vm.deleteProduct = deleteProduct;
    vm.updateProduct = updateProduct;
    vm.activateEditMode = activateEditMode;
    vm.product = new ProductTemplate();
    vm.isEditMode = false;
    vm.isDetailMode = false;
    vm.isAddMode = false;
    vm.isImagePicked = false;
    vm.isAlertImageNotPicked = false;
    var imageBookCover = null;

    var storageRef = firebase.storage().ref();

    function init() {
      vm.dialogLabel = 'Add';
      if (isDetailMode) {
        vm.isDetailMode = true
      } else {
        vm.isAddMode = true;
      }
      if (product != null) {
        vm.product = angular.copy(product);
      }
      if (vm.isDetailMode) {
        vm.dialogLabel = 'Detail';
      }
    }

    function uploadImage(file) {
      if (file != null) {
        imageBookCover = file;
        Upload.base64DataUrl(file).then(function (base64Urls) {
          vm.isImagePicked = true;
          vm.imageUpload = base64Urls;
          vm.isAlertImageNotPicked = false;
          // firebase.storage().ref('book-cover/' + file.name).putString(base64Urls, 'data_url').then(function (snapshot) {
          // });
        });
      }
    }

    function unSelectImage() {
      imageBookCover = null;
      vm.isImagePicked = false;
    }

    function activateEditMode() {
      vm.isEditMode = true;
      vm.isDetailMode = false;
      vm.isAddMode = false;
      vm.dialogLabel = 'Edit';
    }

    function addNewProduct(productForm) {
      productForm.$setSubmitted();
      if (isFormValid(productForm)) {

      }
      // if (vm.product.id == -1) {
      //   adminService.addProduct(vm.product).then(function (result) {
      //     adminService.showToast($mdToast, 'Import product successful!');
      //     $mdDialog.cancel();
      //     $state.reload();
      //   });
      // } else {
      //   adminService.updateProduct(vm.product.id, vm.product).then(function (result) {
      //     adminService.showToast($mdToast, 'Update product successful!');
      //     $mdDialog.cancel();
      //     $state.reload();
      //   });
      // }
    }

    function deleteProduct() {
      adminService.deleteProduct(vm.product.id).then(function (result) {
        adminService.showToast($mdToast, 'Delete product successful!');
        $mdDialog.cancel();
        $state.reload();
      });
    }

    function updateProduct(productForm) {
      productForm.$setSubmitted();
      if (isFormValid(productForm)) {

      }
    }

    function isFormValid(form) {
      if (imageBookCover == null) {
        vm.isAlertImageNotPicked = true;
        return false;
      }
      vm.isAlertImageNotPicked = false;
      return form.$valid;
    }

    function cancelDialog() {
      $mdDialog.cancel();
    }
  }
});