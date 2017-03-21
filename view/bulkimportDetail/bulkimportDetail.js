angular
    .module('bulkimportDetailModule', ['ui.bootstrap'])
    .run(['$rootScope', '$parse', '$log', function ($rootScope, $parse, $log) {
        var id = window.frameElement && window.frameElement.id || '',
                obj = parent.$('#' + id).attr('data');
        $rootScope.bulkimportDetailList = obj ? JSON.parse(obj) : {}; // 详情信息
        $rootScope.detailsList = [] //详情列表
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

        // 查看导入详情接口
        httpMethod.qryBatchInstCodeDetail = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/stock/order/q/qryBatchInstCodeDetail',
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

            // 查看导入详情接口
            Mock.mock(httpConfig.siteUrl + '/stock/order/q/qryBatchInstCodeDetail',{
                'rsphead': 's',
                'success': true,
                'code': null,
                'msg': null, 
                'error': null,
                'data': {
                    'totalSize':30,
                    'retailShopId':1,
                    'retailShopName': '@cword(5)',
                    'storageId':2,
                    'storageName': '@cword(5)',
                    'staffId': 123,
                    'staffName': '@cname',
                    'createDt': '@date',
                    'resultList|5':[
                                {
                                    'success|1':[false, true],
                                    'instCode':'@id',
                                    'terminalType':'@id',
                                    'terminalTypeName':'@cword(6)',
                                    'errorMsg|1':['入库失败', '入库成功']
                                }
                        ]
                }
            });


        }
        return httpMethod;
    }])
    .filter('issuccess', function() {
        return function(value){
            switch(value){
                case true:
                    return '是';
                    break;
                case false:
                    return '否';
                    break;
            }
        }
    })
    // 查询控制器
    .controller('conditionQuery', ['$scope', '$rootScope', '$timeout', 'httpMethod', '$log', function($scope, $rootScope, $timeout, httpMethod, $log) {

        //分页
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        $scope.bulkimportlistQuery = function(){
            httpMethod.qryBatchInstCodeDetail($rootScope.bulkimportDetailList.orderId).then(function(rsp) {
                $rootScope.detailsList = rsp.data;
                $scope.totalNum = rsp.data.totalSize;
                $log.log('调用查看导入详情接口成功.');
            }, function() {
                $log.log('调用查看导入详情接口失败.');
            });
        };
        $scope.bulkimportlistQuery();

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
