angular
    .module('staffModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope){
        $rootScope.pointsAccountId = window.frameElement && window.frameElement.id || '';
    }])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpConfig = {
                'siteUrl': 'http://192.168.16.84:8088',
                'requestHeader': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'isMock': true // 是否开启测试数据
            },
            httpMethod = {};

        // 查询积分历史明细
        httpMethod.queryPointList = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/point/q/queryPointChangeItemByPage',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 查询积分详情
        httpMethod.queryPointDetail = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/point/q/queryPointCitemRelaById',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        if (httpConfig.isMock) {

            // 历史积分列表模拟数据
            Mock.mock(httpConfig.siteUrl + '/point/q/queryPointChangeItemByPage', {
                'success': true, //是否成功
                'total': 30,
                'list|10': [{
                    'leaguerName': '@name',
                    'leaguerMobile': '18901598787',
                    'bcAccountAmount|100-1000': 100,
                    'acAccountAmount|100-1000': 100,
                    'pointChangeVaule|10-100': 10,
                    'pointChangeTypeCd|1': ['1', '2'],
                    'pointChangeDt': '@date',
                    'pointChangeItemId': '@id',
                    'relaType|1': ['1', '2', '3']
                }],
                'errors': null
            });

            // 积分详情模拟数据
            Mock.mock(httpConfig.siteUrl + '/point/q/queryPointCitemRelaById', {
                'rsphead':'s',
                'success': true, //是否成功
                'code': null,
                'msg': '',
                'data': {
                    'relaType|1': ['1', '2', '3'],
                    'remarks': '@word',
                    'offerPointConfig': {
                        'pointVaule|10-100':10,
                        'createDt':'@date',
                        'configId': '@id',
                        'configDetail':'@cword(6)',
                        'offer':{
                            'offerName':'@cword(6)'
                        }
                    }
                },
                'errors': null
            });
        }

        return httpMethod;
    }])
    .filter('pointChangeTypeCdFilter', function() {
        return function(value, pointChangeTypeCd) {
            switch (pointChangeTypeCd) {
                case '1':
                    return '+' + value;
                    break;
                case '2':
                    return '-' + value;
                    break;
            }
        }
    })
    .filter('relaTypeFilter', function() {
        return function(relaType) {
            switch (relaType) {
                case '1':
                    return '消费加分';
                    break;
                case '2':
                    return '积分调整';
                    break;
                case '3':
                    return '积分兑换';
                    break;
            }
        }
    })
    .filter('configIdFilter', function() {
        return function(relaType) {
            switch (relaType) {
                case '1':
                    return '关联销售单号：';
                    break;
                case '2':
                    return '调整单号：';
                    break;
                case '3':
                    return '兑换单号：';
                    break;
            }
        }
    })
    .filter('configDetailTitleFilter', function() {
        return function(relaType) {
            switch (relaType) {
                case '1':
                    return '';
                    break;
                case '2':
                    return '调整说明：';
                    break;
                case '3':
                    return '兑换商品名称：';
                    break;
            }
        }
    })
    .filter('configDetailContentFilter', function() {
        return function(input, relaType, offerName) {
            switch (relaType) {
                case '1':
                    return '';
                    break;
                case '2':
                    return input;
                    break;
                case '3':
                    return offerName;
                    break;
            }
        }
    })
    .controller('detailMembPointHistoryCtrl', ['$scope', '$rootScope', '$timeout', '$log', 'httpMethod', '$uibModal', function($scope, $rootScope, $timeout, $log, httpMethod, $uibModal) {
        var $ctrl = this,
            modalInstance;

        $ctrl.animationsEnabled = true;

        $scope.conditionQueryForm = {
            startDate: '', //起止日期开始
            endDate: '' //起止日期结束
        };

        // 时间控件
        $scope.startDateOptions = {
            formatYear: 'yy',
            maxDate: $scope.conditionQueryForm.endDate,
            startingDay: 1,
            showWeeks: false
        };
        $scope.endDateOptions = {
            formatYear: 'yy',
            minDate: $scope.conditionQueryForm.startDate,
            // maxDate: new Date(),
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

        //分页
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        $scope.queryFormSubmit = function(currentPage) {
            var param = {
                pointsAccountId: $rootScope.pointsAccountId,
                startDate: $scope.conditionQueryForm.startDate ? moment($scope.conditionQueryForm.startDate).format('YYYY-MM-DD') : '', //开始时间
                endDate: $scope.conditionQueryForm.endDate ? moment($scope.conditionQueryForm.endDate).format('YYYY-MM-DD') : '', //结束时间
                curPage: currentPage || 1,
                pageSize: 10,
                totalSize: $scope.totalNum
            };

            httpMethod.queryPointList(param).then(function(rsp) {
                $scope.pointListData = rsp.list;
                $scope.totalNum = rsp.total;
                $log.log('获取查询数据接口响应成功.');
            }, function() {
                $log.log('获取查询数据接口响应失败.');
            });
        };

        $scope.$on('pageChange', function(event, data) {
            $scope.queryFormSubmit(data);
        });

        $scope.detailPoints = function(item) {

            httpMethod.queryPointDetail({
                pointChangeItemId: item.pointChangeItemId,
                relaType: item.relaType
            }).then(function(rsp) {
                var data = rsp.data;
                data.leaguerName = item.leaguerName;
                data.leaguerMobile = item.leaguerMobile;
                data.pointChangeTypeCd = item.pointChangeTypeCd;

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
                $log.log('获取查询详情数据接口响应成功.');
            }, function() {
                $log.log('获取查询详情数据接口响应失败.');
            });
        };

        $ctrl.toggleAnimation = function() {
            $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
        };
    }])
    .controller('detailAccountsModalCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;
        $ctrl.pointInfo = items;
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
        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
            $scope.$emit('pageChange', $scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])
