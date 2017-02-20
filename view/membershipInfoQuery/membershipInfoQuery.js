angular
    .module('checkModule', ['ui.bootstrap'])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpConfig = {
                'siteUrl': 'http://192.168.16.84:8088',
                'requestHeader': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'isMock': true // 是否开启测试数据
            },
            httpMethod = {};

        // 查询会员信息列表
        httpMethod.queryLeaguerList = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/leaguer/q/queryLeaguerList',
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

        // 会员状态获取
        httpMethod.loadOfferCategory = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/common/q/loadOfferCategory',
                method: 'POST',
                headers: httpConfig.requestHeader
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

        // 会员标签获取
        httpMethod.queryLeaguerLabels = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/leaguer/q/queryLeaguerLabels',
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

        // 证件类型查询
        httpMethod.qryIdentifyType = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/config/common/q/qryIdentifyType',
                method: 'POST',
                headers: httpConfig.requestHeader
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

            // 证件类型模拟数据
            Mock.mock(httpConfig.siteUrl + '/chain/config/common/q/qryIdentifyType', {
                'rsphead':'s',
                'success': true, //是否成功
                'code': null,
                'msg': '',
                'data|5': [{
                    'identifyType': '@id',
                    'identifyName': '@name'
                }],
                'errors': null
            });

            // 会员状态模拟数据
            Mock.mock(httpConfig.siteUrl + '/chain/common/q/loadOfferCategory', {
                'rsphead':'s',
                'success': true, //是否成功
                'code': null,
                'msg': '',
                'data': [{
                    'statusCd': '1',
                    'statusName': '生效' 
                },{
                    'statusCd': '2',
                    'statusName': '无效' 
                }],
                'errors': null
            });

            // 会员标签模拟数据
            Mock.mock(httpConfig.siteUrl + '/leaguer/q/queryLeaguerLabels', {
                'rsphead':'s',
                'success': true, //是否成功
                'code': null,
                'msg': '',
                'data': {
                    'total':30,
                    'list|10':[{
                        'leaguerLabelCd':'@id',
                        'leaguerLabelsName':'@name',
                        'leaguerLabelDetail':'@word'
                    }]
                },
                'errors': null
            });

            // 会员信息模拟数据
            Mock.mock(httpConfig.siteUrl + '/leaguer/q/queryLeaguerList', {
                'rsphead':'s',
                'success': true, //是否成功
                'code': null,
                'msg': '',
                'data': {
                    'total':30,
                    'list|10': [
                        {
                            'retailShopName':'@cword(8)',
                            'leaguerName':'@name',
                            'leaguerId':'@id',
                            'leaguerMobile':'13845677655',
                            'certificateType|1':[0,1,2,3],
                            'certificateNum':'@id',
                            'levelId':'@id',
                            'levelName':'@name',
                            'statusCd|1':['0','1','2'],
                            'statusName|1':['可用','不可用'],
                            'leaguerLabels':'@id',
                            'leaguerLabelsName':'@name',
                            'createDt':'@date',
                            'totalConsumption|1000-10000':1000,
                            'leaguerSexName|1':['男','女'],
                            'leaguerBirthday':'@date',
                            'leaguerEmail':'@email',
                            'leaguerWechat':'@word',
                            'remarks':'@cword(6)',
                            'account':{
                                'accountAmount|100-1000':100,
                                'pointsAccountId':'@id'
                            }

                        }
                    ]
                },
                'errors': null
            });
        }

        return httpMethod;
    }])
    .filter('certificateTypeFilter', function() {
        return function(relaType) {
            switch (relaType) {
                case 0:
                    return '全部';
                case 1:
                    return '身份证';
                    break;
                case 2:
                    return '护照';
                    break;
                case 3:
                    return '驾照';
                    break;
            }
        }
    })
    .controller('membershipInfoCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', '$uibModal', function($scope, $rootScope, $log, httpMethod, $uibModal) {
        var $ctrl = this,
            modalInstance,
            scope = $rootScope.$new();
            
        $ctrl.animationsEnabled = true;

        //获取所有证件类型
        httpMethod.qryIdentifyType().then(function(rsp) {
            $scope.identifyTypesList = rsp.data;
        });

        //获取会员状态
        httpMethod.loadOfferCategory().then(function(rsp) {
            $scope.statusList = rsp.data;
        });

        //分页
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        scope.requirePaging = true; // 是否需要分页
        scope.currentPage = 1; // 当前页
        scope.rowNumPerPage = 10; // 每页显示行数
        scope.labelTotalNum = 0; // 总条数

        
        //获取会员信息
        $scope.queryMemberInfo = function(currentPage) {
            var param = {
                certificateNum: $scope.certificateNum || '',
                certificateType: $scope.identifyType || '',
                leaguerCardId: $scope.leaguerCardId || '',
                leaguerLabelIds: $scope.leaguerLabelIds.join(',') || '',
                leaguerMobile: $scope.leaguerMobile || '',
                leaguerName: $scope.leaguerName || '',
                statusCd: $scope.statusCd || '',
                curPage: currentPage || 1,
                pageSize: 10
            };

            httpMethod.queryLeaguerList(param).then(function(rsp) {
                $scope.queryLeaguerListData = rsp.data.list;
                $scope.totalNum = rsp.data.total;
                $log.log('获取查询数据接口响应成功.');
            }, function() {
                $log.log('获取查询数据接口响应失败.');
            });
        }

        //选择会员标签
        $rootScope.selectLeaguerLabel = function(currentPage) {
            httpMethod.queryLeaguerLabels({
                curPage: currentPage || 1,
                pageSize: 10
            }).then(function(rsp) {
                scope.labelsData = rsp.data.list;
                scope.labelTotalNum = rsp.data.total;

                if(!modalInstance || modalInstance.closed.$$state.status === 1){
                    modalInstance = $uibModal.open({
                        animation: $ctrl.animationsEnabled,
                        ariaLabelledBy: 'serial-number-title1',
                        ariaDescribedBy: 'serial-number-body',
                        templateUrl: 'selectLeaguerLabel.html',
                        controller: 'selectLeaguerLabelModalCtrl',
                        controllerAs: '$ctrl',
                        size: 'lg',
                        scope:scope
                    });
                }
            });
        };
        
        $rootScope.$on('labelModalSure', function(event, ids, names){
            $scope.leaguerLabelNames = names;
            $scope.leaguerLabelIds = ids;
        });

        $scope.$on('pageChange', function(event, data) {
            $scope.queryMemberInfo(data);
        });

        $scope.showPointsDetail = function(item){
            if(!parent.angular.element(parent.$('#tabs')).scope()) return;
            parent.angular.element(parent.$('#tabs')).scope().addTab('会员积分历史明细', 'detailMembPointHistory', 'pointsAccountId', item.account.pointsAccountId);
        }

        $scope.showDetail = function(item){
            if(!parent.angular.element(parent.$('#tabs')).scope()) return;
            parent.angular.element(parent.$('#tabs')).scope().addTab('会员信息详情', 'detailMembership', 'detailMembershipInfo', JSON.stringify(item));
        }
    }])
    .controller('selectLeaguerLabelModalCtrl', function($scope, $rootScope, $uibModalInstance) {
        var $ctrl = this;
        $scope.selectedLabelIds = [];
        $scope.selectedLabelNames = [];
        //$scope.labelTotalNum = 30;
        $scope.$on('labelpageChange', function(event, data) {
            $rootScope.selectLeaguerLabel(data);
        });

        //点击复选框
        $scope.clickLabel = function(event, id, name){
            //选中
            if(event.target.checked && $scope.selectedLabelIds.indexOf(id) === -1){
                $scope.selectedLabelIds.push(id);
                $scope.selectedLabelNames.push(name);
            }

            //没选中
            if(!event.target.checked && $scope.selectedLabelIds.indexOf(id) !== -1){
                $scope.selectedLabelIds.splice($scope.selectedLabelIds.indexOf(id), 1);
                $scope.selectedLabelNames.splice($scope.selectedLabelNames.indexOf(name), 1);
            }
        }

        $ctrl.ok = function() {

            $scope.$emit('labelModalSure', $scope.selectedLabelIds, $scope.selectedLabelNames);
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    // 分页控制器
    .controller('labelPaginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
            $scope.$emit('labelpageChange', $scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
            $scope.$emit('pageChange', $scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
