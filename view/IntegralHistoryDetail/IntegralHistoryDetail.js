angular
    .module('staffModule', ['ui.bootstrap'])
    .run(['$rootScope', function ($rootScope) {

        $rootScope.historyDetailList = {
            pointsAccountId: 1000000007,//积分账户id
        };
        // $rootScope.integralHistoryList = {};  //会员积分历史明细列表
        $rootScope.integralHistoryDetail = []; // 会员积分历史明细列表选择
        $rootScope.integralHistoryDetailList = []; // 会员积分历史明细选择列表的详情
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

        // 会员积分历史明细查询接口
        httpMethod.queryMemberPointByPage = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/point/q/queryMemberPointByPage',
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

        // 积分变换操作详情接口
        httpMethod.queryMemberPointDetailByPage = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/point/q/queryMemberPointDetailByPage',
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

            // 会员积分历史明细查询接口
            Mock.mock(httpConfig.siteUrl + '/point/q/queryMemberPointByPage', {
                'rsphead':'s',
                'success':true,
                'code':null,
                'msg':null,
                'data':{
                        'endRow': 1,
                        'firstPage': 1,
                        'hasNextPage': false,
                        'hasPreviousPage': false,
                        'isFirstPage': true,
                        'isLastPage': true,
                        'lastPage': 1,
                        'list|5': [{
                            'acAccountAmount|1-9999': 1,
                            'bcAccountAmount|1-9999': 1,
                            'leaguerName': '@cname',
                            'leaguerMobile': 18066666666,
                            'pointChangeDt|1': ['2017-01-01', '2022-02-02', '2030-03-03', '2014-04-04'],
                            'pointChangeItemId|000000000001-999999999999': 000000000001,
                            'pointChangeTypeCd|1': [1,2], //变更类型：1、增加，2、减少
                            'pointChangeVaule|1-999': 1,
                            'relaType|1': [1, 3], //积分变更单类型：3，积分兑换单 1，销售零售单
                            'retailShopId': 100000000237,
                            'retailShopName': '@cword(10)'

                        }],
                        'navigatePages': 8,
                        'navigatepageNums': Array[1],
                        'nextPage': 0,
                        'pageNum': 1,
                        'pageSize': 10,
                        'pages': 1,
                        'prePage': 0,
                        'size': 1,
                        'startRow': 1,
                        'success': true,
                        'total': 20,
                    }
            });

            // 积分变换操作详情接口
            Mock.mock(httpConfig.siteUrl + '/point/q/queryMemberPointDetailByPage', {

                'rsphead':'s',
                'success':true,
                'code':null,
                'msg':null,
                'data':{
                    'relaType|1': [1, 3],
                    'remarks': '积分兑换单',
                    'offerPointConfig': {        //销售零售单
                        'configId|000000000001-999999999999': 100000000001,
                        'createDt|1': ['2017-01-01', '2022-02-02', '2030-03-03', '2014-04-04'],
                        'offerId|000000000001-999999999999': 000000000001,
                        'pointVaule|1-9999': 1,
                        'retailShopId|000000000001-999999999999': 000000000001,
                        'retailShopName':'@cword(10)',
                        'staffName': '@cname',
                        'offer|5': {
                            'offerName': '@cword(6)',
                        }
                    },
                    'pointExchangeOrder':{        //积分兑换详情明细
                        'leaguerId|000000000001-999999999999': 100000000415,
                        'leaguerName': '@cname(3)',
                        'staffId|000000000001-999999999999': 150528000049,
                        'staffName': '@cname(2)',
                        'exchangeDt': '2016-04-08 11:54:04',
                        'remarks': '@cword(20)',
                        'exchangeOrderId|000000000001-999999999999': 100000000043,
                        'pointVaule': 1,
                        'exchangeItem|5':[{  //取里面的第1个值的名称
                                'instCode': null,
                                'offer': {
                                        'offerName': '@cword(6)',
                                    },
                                'offerId|000000000001-999999999999': 100000007450,
                            }],
                    }
                }
                
            });

        }
        return httpMethod;
    }])
    .filter('pointChangeCdType', function() {
        return function(value){
            switch (value) {
                case 1:
                    return '增加';
                    break;
                case 2:
                    return '减少';
                    break;
            }
        }
    })
    .filter('pointChangeType', function() {
        return function(value){
            switch (value) {
                case 1:
                    return '+';
                    break;
                case 2:
                    return '-';
                    break;
            }
        }
    })
    .controller('conditionQuery', ['$scope', '$rootScope', '$timeout', 'httpMethod', '$log', function($scope, $rootScope, $timeout, httpMethod, $log) {
        $scope.format = "yyyy年MM月";
        $scope.conditionQueryForm = {
            createStartDt: '', //起止日期开始
            createEndDt: '' //起止日期结束
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
            startingDay: 1,
            showWeeks: false
        };
        $scope.$watch('conditionQueryForm.startDate', function(newValue) {
            $scope.endDateOptions.minDate = newValue;
        });
        $scope.$watch('conditionQueryForm.endDate', function(newValue) {
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

        // 查询结果分页信息
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 5; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        $scope.integralHistoryQuerysubmit = function(){
            var param = {
                'curPage': $scope.currentPage,
                'endDate': $scope.conditionQueryForm.startDate ? $scope.conditionQueryForm.startDate : null,
                'pageSize': $scope.rowNumPerPage,
                'pointsAccountId': $rootScope.historyDetailList.pointsAccountId,
                'startDate': $scope.conditionQueryForm.endDate ? $scope.conditionQueryForm.endDate : null,
                'totalSize': $scope.totalNum,
            };
            httpMethod.queryMemberPointByPage(param).then(function(rsp){
                $rootScope.integralHistoryList = rsp.data.list;
                $scope.totalNum = rsp.data.total;
                $log.log('调用会员积分历史明细查询接口成功');
            }, function(){
                $log.log('调用会员积分历史明细查询接口失败');
            });
        };

    }])
    .controller('resultCtrl', ['$scope', '$rootScope', 'httpMethod', '$log', function($scope, $rootScope, httpMethod, $log) {
        // 详情
        $scope.detailPoints = function(index) {
            $rootScope.integralHistoryDetail = $rootScope.integralHistoryList[index];

            var param = {
                'pointChangeItemId': $rootScope.integralHistoryDetail.pointChangeItemId ? $rootScope.integralHistoryDetail.pointChangeItemId : null,
                'relaType': $rootScope.integralHistoryDetail.relaType ? $rootScope.integralHistoryDetail.relaType : null,
            };

            //积分变更单类型： 1，销售零售单 offerPointConfig 3，积分兑换单 pointExchangeOrder
            if(param.relaType === 1){
                $scope.$emit('openDetailSellModal');
            }else if(param.relaType === 3){
                $scope.$emit('openDetailExchangeModal');
            };

            httpMethod.queryMemberPointDetailByPage(param).then(function(rsp){
                $rootScope.integralHistoryDetailList = rsp.data;
                $log.log('调用积分变换操作详情接口成功');
            }, function(){
                $log.log('调用积分变换操作详情接口失败');
            });
        };
    }])

    // 弹出框
    .controller('addAdjustInModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;
        
        $scope.$on('openDetailSellModal', function(d, data) {
            $ctrl.openDetailSellModal(data);
        });
        $scope.$on('openDetailExchangeModal', function(d, data) {
            $ctrl.openDetailExchangeModal(data);
        });
        
        $ctrl.openDetailExchangeModal = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'serial-number-title',
                ariaDescribedBy: 'serial-number-body',
                templateUrl: 'detailExchangeModal.html',
                controller: 'detailExchangeModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return data;
                    }
                }
            });
        };
        $ctrl.openDetailSellModal = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'serial-number-title',
                ariaDescribedBy: 'serial-number-body',
                templateUrl: 'detailSellModal.html',
                controller: 'detailSellModalCtrl',
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
    .controller('detailExchangeModalCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;

        $ctrl.ok = function() {
            $scope.$broadcast('submitCardRange');
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('detailSellModalCtrl', function($uibModalInstance, $scope, items) {
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

        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $scope.integralHistoryQuerysubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
