angular
    .module('inventoryModule', ['ui.bootstrap'])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.inventoryQueryList = {
            retailShopId: 120412542, //所属门店ID
            retailShopName: '中国电信@平庄镇北街区营业厅', //所属门店名称
            staffId: '123123' //员工Id
        };
        $rootScope.storeList = [];  //仓库信息列表
        $rootScope.goodsTypeList = []; //商品类别列表
        // $rootScope.orderDetailsList = {}; //库存统计明细
        $rootScope.goodsDetailQuery = {}; //商品明细信息
        $rootScope.goodsDetailInfoList = {}; //商品明细信息
    }])
    .factory('httpMethod', ['$http', '$q', function ($http, $q) {
        var httpConfig = {
                'siteUrl': 'http://192.168.16.84:8088',
                'requestHeader': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'isMock': true // 是否开启测试数据
            },
            httpMethod = {};

        // 仓库查询接口
        httpMethod.loadStorage = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/config/storage/q/loadStorage',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: $.param(param)
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 商品类别查询接口
        httpMethod.loadOfferCategory = function () {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/common/q/loadOfferCategory',
                method: 'POST',
                headers: httpConfig.requestHeader,
                // data: $.param(param)
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 库存统计分页查询接口
        httpMethod.qryStockAndWorth = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/stock/q/qryStockAndWorth',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: $.param(param)
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 明细分页查询接口
        httpMethod.qryStockAndWorthDetail = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/stock/q/qryStockAndWorthDetail',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: $.param(param)
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        if (httpConfig.isMock) {

            // 仓库查询接口
            Mock.mock(httpConfig.siteUrl + '/chain/config/storage/q/loadStorage', {
                'rsphead': 's',
                'success': true,
                'code': null,
                'msg': null, 
                'error': null,
                'data':[{
                    "storageId":100000000009,
                    "storageName":"江苏仓库",
                    "retailShopId":2,
                    "retailShopName":"初始化渠道",
                    "parentStorageId":100000000008,
                    "parentStorageName":null,
                    "bizmanId":1,
                    "statusCd":"1000",
                    "statusName":null,
                    "remarks":"大楠子的仓库1"
                },{
                    "storageId":100000000009,
                    "storageName":"安徽仓库",
                    "retailShopId":2,
                    "retailShopName":"初始化渠道",
                    "parentStorageId":100000000008,
                    "parentStorageName":null,
                    "bizmanId":1,
                    "statusCd":"1000",
                    "statusName":null,
                    "remarks":"大楠子的仓库2"
                },{
                    "storageId":100000000009,
                    "storageName":"北京仓库",
                    "retailShopId":2,
                    "retailShopName":"初始化渠道",
                    "parentStorageId":100000000008,
                    "parentStorageName":null,
                    "bizmanId":1,
                    "statusCd":"1000",
                    "statusName":null,
                    "remarks":"大楠子的仓库3"
                }]
            });

            // 商品类别查询接口
            Mock.mock(httpConfig.siteUrl + '/chain/common/q/loadOfferCategory', {
                'rsphead': 's',
                'success': true,
                'code': null,
                'msg': null, 
                'error': null,
                'data': [{
                        'id':1,
                        'name':'手机'
                    },{
                        'id':2,
                        'name':'配件'
                    },{
                        'id':3,
                        'name':'其他'
                    }
                ]
            });

            // 库存统计分页查询接口
            Mock.mock(httpConfig.siteUrl + '/chain/stock/q/qryStockAndWorth', {
                'rsphead': 's',
                'success': true,
                'code': null,
                'msg': null, 
                'error': null,
                'data': {
                    'totalSize': 15, 
                    'currentPage': 2,
                    'infoList|5':[{
                        'retailShopName|1':['门店名称1', '门店名称2', '门店名称3'],
                        'retailShopId': '@id',
                        'storageName|1':['江苏仓库','安徽仓库','北京仓库'],
                        'storageId': '1324123',
                        'categoryName|1':['手机','配件','其他'],
                        'categoryId': 1,
                        'inventory|1-9999':1,
                        'amount|1-9999999':1
                    }]
                }
            });

            // 明细分页查询接口
            Mock.mock(httpConfig.siteUrl + '/chain/stock/q/qryStockAndWorthDetail', {
                'rsphead': 's',
                'success': true,
                'code': null,
                'msg': null,
                'error': null,
                'data': {
                    'totalSize': 300, 
                    'currentPage': 5,
                    'retailShopName':'XXXX',
                    'storageName':'XX',
                    'categoryName':'手机',
                    'inventory':235,
                    'amount':'123123.13',
                    'infoList|5':[{
                        'offerName':'华为P5高配版',
                        'categoryName':'手机',
                        'offerCode':'DFDa58422',
                        'offerBrand':'华为',
                        'offerModel':'华为P5',
                        'inventory':123,
                        'warning|1':[0,1,2],
                        'cost':'600.00',
                        'price':'999.00',
                    }]
                }
            });

        }
        return httpMethod;
    }])
    //预警 0、正常 1、过高 2、过低
    .filter('warningType', function() {
        return function(value) {
            switch (value) {
                case 0:
                    return '正常';
                    break;
                case 1:
                    return '过高';
                    break;
                case 2:
                    return '过低';
                    break;
            }
        }
    })
    // 查询控制器
    .controller('inventoryQueryCtrl', ['$scope', '$rootScope', '$timeout','httpMethod', '$log', function($scope, $rootScope, $timeout, httpMethod, $log) {

        // 查询仓库信息
        httpMethod.loadStorage($rootScope.inventoryQueryList.retailShopId).then(function (rsp) {
            $rootScope.storeList = rsp.data;
            $log.log('调用仓库查询接口成功.');
        }, function () {
            $log.log('调用仓库查询接口失败.');
        });

        // 查询商品类别
        httpMethod.loadOfferCategory().then(function (rsp) {
            $rootScope.goodsTypeList = rsp.data;
            $log.log('调用商品类别查询接口成功.');
        }, function () {
            $log.log('调用商品类别查询接口失败.');
        });

        // 查询结果分页信息
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 5; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        //查询
        $scope.queryInventorySubmit = function(){
            var param = {
                'storageId': $scope.inventoryQueryList.storageId ? $scope.inventoryQueryList.storageId : 0, //仓库ID不选为0
                'categoryId': $scope.inventoryQueryList.supplierId ? $scope.inventoryQueryList.supplierId : 0, //商品类型ID不选为0
                'retailShopId': $scope.inventoryQueryList.retailShopId ? $scope.inventoryQueryList.retailShopId : null, // 门店Id
                'staffId': $rootScope.inventoryQueryList.staffId, //员工ID
                'qryPage': $scope.currentPage, //要查询的页，如果是第一次点击则为1
                'pageNum': $scope.rowNumPerPage, //每页条数
            };
            httpMethod.qryStockAndWorth(param).then(function (rsp) {
                $rootScope.orderDetailsList = rsp.data.infoList;
                $scope.totalNum = rsp.data.totalSize;
                $log.log('调用库存统计分页查询接口成功.');
            }, function () {
                $log.log('调用库存统计分页查询接口失败.');
            });
        };

    }])
    // 查询结果控制器
    .controller('resultCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {
        // 商品明细
        $scope.goodsDetail = function(index) {
            $rootScope.goodsDetailQuery = $rootScope.orderDetailsList[index];
            $scope.$emit('openDetailAccountsModal');
        };
    }])
    // 商品明细控制器
    .controller('goodsDetailQueryCtrl', ['$scope', '$rootScope', 'httpMethod', '$log', function($scope, $rootScope, httpMethod, $log) {

        // 查询结果分页信息
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 5; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        //查询
        $scope.goodsDetailQuerySubmit = function(){
            var param = {
                'storageId': $rootScope.goodsDetailQuery.storageId ? $rootScope.goodsDetailQuery.storageId : null, //仓库ID
                'categoryId': $rootScope.goodsDetailQuery.categoryId ? $rootScope.goodsDetailQuery.categoryId : null, 
                'retailShopId': $rootScope.goodsDetailQuery.retailShopId ? $rootScope.goodsDetailQuery.retailShopId : null,
                'staffId': $rootScope.inventoryQueryList.staffId, 
                'qryPage': $scope.currentPage, //要查询的页，如果是第一次点击则为1
                'pageNum': $scope.rowNumPerPage, //每页条数
            };
            httpMethod.qryStockAndWorthDetail(param).then(function (rsp) {
                $rootScope.goodsDetailInfoList = rsp.data.infoList;
                $scope.totalNum = rsp.data.totalSize;
                $log.log('调用明细分页查询接口成功.');
            }, function () {
                $log.log('调用明细分页查询接口失败.');
            });
        };
        $scope.goodsDetailQuerySubmit();
    }])
    // 弹出框
    .controller('addAdjustInModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
            $ctrl.animationsEnabled = true;

        // 商品明细
        $scope.$on('openDetailAccountsModal', function(d, data) {
            $ctrl.openDetailAccountsModal(data);
        });

        $ctrl.openDetailAccountsModal = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'serial-number-title',
                ariaDescribedBy: 'serial-number-body',
                templateUrl: 'detailAccountsModal.html',
                controller: 'detailAccountsModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return data;
                    }
                }
            });
        };

        $ctrl.toggleAnimation = function() {
            $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
        };
    })
    .controller('detailAccountsModalCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;

        $ctrl.ok = function() {
            $scope.$broadcast('submitCardRange');
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('pageChange', function() {
            $scope.currentPage = 1;
        });

        $scope.maxSize = 8;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $scope.queryInventorySubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])
    .controller('detailPaginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('pageChange', function() {
            $scope.currentPage = 1;
        });

        $scope.maxSize = 3;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $scope.goodsDetailQuerySubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
