var bookSellingApp = angular.module('bookSellingApp', ['ngMaterial', 'ngMessages', 'ui.router']); //ngRoute

bookSellingApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: './module/main/main.html',
      controller: 'mainController',
      controllerAs: 'vm'
    })
    .state('product-table', {
      url: 'product-table',
      templateUrl: './module/product-table/product-table.html',
      controller: 'productTableController',
      parent: 'main',
      controllerAs: 'vm'
    })
    .state('product-management', {
      url: 'product-management',
      templateUrl: './module/product-management/product-management.html',
      controller: 'productManagementController',
      parent: 'main',
      controllerAs: 'vm'
    });;
});

bookSellingApp.factory('bookSellingService', ['$http', function ($http) {
  var linkAPI = '';

  return {
    init: init,
    getProductList: getProductList,
    getProductListNoSinin: getProductListNoSinin,
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    login: login,
    register: register,
    showToast: showToast,
    showMdDialog: showMdDialog
  }

  function init() {
    return;
  }

  function getProductList() {
    return executeAjaxRequest('GET', '/api/products', null, function (result) {
      return result;
    });
  }

  function getProductListNoSinin() {
    return executeAjaxRequest('GET', '/api/products-no-signin', null, function (result) {
      return result;
    });
  }

  function addProduct(product) {
    return executeAjaxRequest('POST', '/api/products', product, function (result) {
      return result;
    });
  }

  function updateProduct(productId, product) {
    var url = '/api/products/' + productId;
    return executeAjaxRequest('PUT', url, product, function (result) {
      return result;
    });
  }

  function deleteProduct(productId) {
    var url = '/api/products/' + productId;
    return executeAjaxRequest('POST', url, null, function (result) {
      return result;
    });
  }

  function login(userInfoLogin) {
    var url = 'api/login';
    return executeAjaxRequest('POST', url, userInfoLogin, function (result) {
      return result;
    });
  }

  function register(userInfoRegister) {
    var url = 'api/register';
    return executeAjaxRequest('PUT', url, userInfoRegister, function (result) {
      return result;
    });
  }

  function executeAjaxRequest(type, url, data, callBackFunction) {
    return $.ajax({
      type: type,
      url: url,
      data: data != null ? JSON.stringify(data) : null,
      contentType: "application/json",
      success: function (data) {
        callBackFunction(data);
      }
    });
  }

  function showToast(mdToast, message) {
    mdToast.show(
      mdToast.simple()
        .textContent(message)
        .position('bottom right')
        .hideDelay(3000)
    );
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
}]);