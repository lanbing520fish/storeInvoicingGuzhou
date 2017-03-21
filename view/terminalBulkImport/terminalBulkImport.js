angular
    .module('terminalBulkImportModule', ['ui.bootstrap'])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.showstores = true;
        $rootScope.wareStoreList = []; // 入库门店
        $rootScope.warehouseList = []; // 仓库列表
        $rootScope.detailsDocumentsList = []; //详情
        // $rootScope.bulkimportLlist = []; //批量导入单据列表
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

        // 门店查询接口
        httpMethod.saleSumByCond = function () {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/config/shop/q/loadShopById',
                method: 'POST',
                headers: httpConfig.requestHeader,
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
                defer.reject(data);
            }).error(function (data, status, headers, config) {
            });
            return defer.promise;
        };

        // 仓库列表查询
        httpMethod.loadInputInstCodeStorage = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/config/storage/q/loadInputInstCodeStorage',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
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
        // 串码批量入库接口
        httpMethod.saveBatchInstCode = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/stock/order/a/saveBatchInstCode',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
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
        // 批量导入历史列表查询接口
        httpMethod.qryBatchInstCode = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/stock/order/q/qryBatchInstCode',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
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

            // 门店查询接口
            Mock.mock(httpConfig.siteUrl + '/config/shop/q/loadShopById',{
                'rsphead': 's',
                'success': true,
                'code': null,
                'msg': null, 
                'error': null,
                'data|5': [
                            {
                                'retailShopId':'@id',
                                'retailShopName':'@cword(5)'
                            }
                        ],
            });

            // 仓库列表查询
            Mock.mock(httpConfig.siteUrl + '/config/storage/q/loadInputInstCodeStorage', {
                    'rsphead': 's',
                    'success': true,
                    'code': null,
                    'msg': null, 
                    'error': null,
                    'data|3': [
                                {
                                    'bizmanId':1,
                                    'parentStorageId':'@id',
                                    'parentStorageName':null,
                                    'remarks':"大楠子的仓库1",
                                    'retailShopId':2,
                                    'retailShopName':"@cword(6)",
                                    'statusCd':"1000",
                                    'statusName':null,
                                    'storageId':'@id',
                                    'storageName':'@cword(6)',
                                }
                            ]
            });

            // 串码批量入库接口
            Mock.mock(httpConfig.siteUrl + '/stock/order/a/saveBatchInstCode', {
                'rsphead': 's',
                'success': true,
                'code': null,
                'msg': null, 
                'error': null,
                'data': {
                        'totalSize':100,
                        'retailShopId':1,
                        'retailShopName':'123门店',
                        'storageId':2,
                        'storageName':'123仓库',
                        'staffId':123,
                        'staffName':'小王',
                        'createDt':'2017-01-02 16:44:55',
                        'resultList':[
                                        {
                                            'success':false,
                                            'instCode':'A100001',
                                            'terminalType':'XXX',
                                            'terminalTypeName':'XXX',
                                            'errorMsg':'入库失败'
                                        }
                                    ]
                }

            });

            // 批量导入历史列表查询接口
            Mock.mock(httpConfig.siteUrl + '/stock/order/q/qryBatchInstCode', {
                'rsphead': 's',
                'success': true,
                'code': null,
                'msg': null, 
                'error': null,
                'data':{
                    'total':50,
                    'list|5':[{
                                'orderId':'@id',
                                'retailShopId':'@id',
                                'retailShopName':'@cword(5)',
                                'storageId':'@id',
                                'storageName':'@cword(6)',
                                'staffId':'@id',
                                'staffName':'@cname',
                                'createDt':'@time'
                        }]
                    }
            });
        }
        return httpMethod;
    }])
    // 查询控制器
    .controller('conditionQuery', ['$scope', '$rootScope', '$timeout', 'httpMethod', '$log', function($scope, $rootScope, $timeout, httpMethod, $log) {

        // 进入页面的时候需要去session中先取到roleId，当roleId为3004为店长时，门店为不可选择，显示为当前店长的门店(使用session中的retailShopName、retailShopId),当roleId为3005、4001、5001，门店为可选状态，此时使用此接口
        $scope.session = {
            roleId: 3003, //3004 为店长
            retailShopName: '店长的入库门店',
            // retailShopId: '00003004'
        };

        $scope.documentsList = {
        };

        if($scope.session.roleId === 3004){
            $rootScope.showstores = true;
            $scope.documentsList.retailShopId = $scope.session.retailShopId;
            $scope.documentsList.retailShopName = $scope.session.retailShopName;
            
            httpMethod.loadInputInstCodeStorage($scope.documentsList.retailShopId).then(function(rsp) {
                $rootScope.warehouseList = rsp.data;
                $log.log('调用仓库列表查询接口成功.');
            }, function() {
                $log.log('调用仓库列表查询接口失败.');
            });

        }else{
            $rootScope.showstores = false;
            httpMethod.saleSumByCond().then(function(rsp) {
                $rootScope.wareStoreList = rsp.data;
                $log.log('调用门店查询接口成功.');
            }, function() {
                $log.log('调用门店查询接口失败.');
            });

            $scope.$watch('documentsList.retailShopItem', function(newValue){
                var param = {
                    retailShopId : newValue
                };
                httpMethod.loadInputInstCodeStorage(param).then(function(rsp) {
                    $rootScope.warehouseList = rsp.data;
                    $log.log('调用仓库列表查询接口成功.');
                }, function() {
                    $log.log('调用仓库列表查询接口失败.');
                });

            });
        };

        $scope.format = "yyyy年MM月";
        $scope.conditionQueryForm = {
            createStartDt: '', //制单日期开始
            createEndDt: '' //制单日期结束
        };

        // 时间控件
        $scope.startDateOptions = {
            formatYear: 'yy',
            maxDate: $scope.conditionQueryForm.endTime,
            startingDay: 1,
            showWeeks: false
        };
        $scope.endDateOptions = {
            formatYear: 'yy',
            minDate: $scope.conditionQueryForm.startTime,
            // maxDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };
        $scope.$watch('conditionQueryForm.createStartDt', function(newValue) {
            $scope.endDateOptions.minDate = newValue;
        });
        $scope.$watch('conditionQueryForm.createEndDt', function(newValue) {
            $scope.startDateOptions.maxDate = newValue;
        });

        $scope.startOpen = function() {
            $timeout(function() {
                $scope.startPopupOpened = true;
            });
        };
        $scope.endOpen = function() {
            $timeout(function() {
                $scope.endPopupOpened = true;
            });
        };
        $scope.startPopupOpened = false;
        $scope.endPopupOpened = false;

        //分页
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        $scope.bulkimportlistQuery = function(){
            var param = {
                retailShopId : $scope.documentsList.retailShopItem ? $scope.documentsList.retailShopItem : '',
                storageId : $scope.documentsList.retailPriceItem ? $scope.documentsList.retailPriceItem : '',
                startDt : $scope.conditionQueryForm.createStartDt ? $scope.conditionQueryForm.createStartDt : '',
                endDt : $scope.conditionQueryForm.createEndDt ? $scope.conditionQueryForm.createEndDt : '',
                orderId : $scope.documentsList.orderId ? $scope.documentsList.orderId : '',
                staffName : $scope.documentsList.staffName ? $scope.documentsList.staffName : '',
                curPage : $scope.currentPage ? $scope.currentPage : '',
                totalSize : $scope.totalNum ? $scope.totalNum : '0',
                pageSize : $scope.rowNumPerPage ? $scope.rowNumPerPage : '0',
            };
            httpMethod.qryBatchInstCode(param).then(function(rsp) {
                $rootScope.bulkimportLlist = rsp.data.list;
                $scope.totalNum = rsp.data.total;
                $log.log('调用仓库列表查询接口成功.');
            }, function() {
                $log.log('调用仓库列表查询接口失败.');
            });
        }

    }])
    .controller('resultCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {
        // 详情
        $scope.detailsDocuments = function (index, title) {
            $rootScope.detailsDocumentsList = $rootScope.bulkimportLlist[index];
            $rootScope.sysTitle = title;
            parent.angular.element(parent.$('#tabs')).scope().addTab('详情', '/view/bulkimportDetail/bulkimportDetail.html', 'detailsDocumentsList', JSON.stringify($rootScope.detailsDocumentsList));
            console.log($rootScope.detailsDocumentsList);
        }
    }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('pageChange', function() {
            $scope.currentPage = 1;
        });

        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $scope.bulkimportlistQuery($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
