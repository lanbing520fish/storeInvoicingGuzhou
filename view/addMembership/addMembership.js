angular
    .module('addStoreManageModule', ['ui.bootstrap'])
    .run(['$rootScope', '$filter', function($rootScope, $filter) {
        var id = window.frameElement && window.frameElement.id || '',
            obj = parent.$('#' + id).attr('data');
        $rootScope.membershipInfoType = obj ? JSON.parse(obj) : {};

        $rootScope.isModifiedOperateList = !obj ? true : false;

        $rootScope.levelTypeList = [{
            memberLevel: 1,
            memberLevelName: '普通会员'
        }, {
            memberLevel: 2,
            memberLevelName: '黄金会员'
        }, {
            memberLevel: 3,
            memberLevelName: '铂金会员'
        }, {
            memberLevel: 4,
            memberLevelName: '砖石会员'
        }]; // 会员等级列表
        $rootScope.sexTypeList = [{
            sex: '男'
        }, {
            sex: '女'
        }]; // 会员性别
        $rootScope.membershipInfoType = {
            identify:'1',
            memberLevelName:'2',
            sex:'男',
            memberMark:'汽车,风景'
        }
    }])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpMethod = {},
            isMock = true;
        // 证件类型查询
        httpMethod.qryIdentifyTyp = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/chain/config/common/q/qryIdentifyTyp',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
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

        // 新增会员信息
        httpMethod.addMembe = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/chain/staff/a/addMembe',
                method: 'POST',
                cache: false,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
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

        // 修改会员
        httpMethod.modifyMember = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/chain/staff/o/modifyMember',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
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
        
        // 会员标签查询
        httpMethod.qryMemberMark = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/chain/common/q/qryMemberMark',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
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
        if (isMock) {
            // 证件类型查询
            Mock.mock('http://192.168.74.17:8088/chain/config/common/q/qryIdentifyTyp', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|3': [{
                    'identifyType|+1':[1,2,3],
                    'identifyName|+1':['身份证','护照','驾照']
                }],
                'errors': null
            });
            // 新增会员信息
            Mock.mock('http://192.168.74.17:8088/chain/staff/a/addMembe', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': null,
                'errors': null
            });
            // 会员信息修改
            Mock.mock('http://192.168.74.17:8088/chain/staff/o/modifyMember', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': null,
                'errors': null
            });
            // 会员标签查询
            Mock.mock('http://192.168.74.17:8088/chain/common/q/qryMemberMark', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'pageNum|1-10': 1,
                    'pageSize|1-10': 5,
                    'size|1-10': 5,
                    'startRow|1-10': 1,
                    'endRow|1-10': 5,
                    'total|5-10': 3,
                    'pages|1-10': 8,
                    'infoList|10':[{
                        'markName':'@cword(2)',
                        'markDesc':'@cword(6)',
                        'markId':'@id'
                    }]
                },
                'errors': null
            });
        }
        return httpMethod;
    }])
    .controller('purchaseQueryCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        // 证件类型查询
        httpMethod.qryIdentifyTyp().then(function(rsp) {
            $log.log('调用证件类型查询接口成功.');
            if (rsp.success) {
                $scope.offerTypeList = rsp.data;
            } else {
                swal("OMG", rsp.msg || "调用证件类型查询接口失败!", "error");
            }
        }, function() {
            $log.log('调用证件类型查询接口失败.');
        });
        $scope.openStoreQueryType = function() {
            $scope.$emit('openStoreQueryTypeModal');
        };
        $scope.modifyOperateFormSubmit = function () {
            var param = {
                memberName: _.get($rootScope, 'membershipInfoType.memberName'), 
                identifyType: _.get($rootScope, 'membershipInfoType.identifyType'), 
                identifyNum: _.get($rootScope, 'membershipInfoType.identifyNum'),
                phoneNumber: _.get($rootScope, 'membershipInfoType.phoneNumber'), 
                memberLevel: _.get($rootScope, 'membershipInfoType.memberLevel'),
                memberNum: _.get($rootScope, 'membershipInfoType.memberNum'),
                sex: _.get($rootScope, 'membershipInfoType.sex'), 
                memberBirth: _.get($rootScope, 'membershipInfoType.memberBirth'),
                email: _.get($rootScope, 'membershipInfoType.email'), 
                wechat: _.get($rootScope, 'membershipInfoType.wechat'),
                memberMark: _.get($rootScope, 'membershipInfoType.memberMark'),
                remark: _.get($rootScope, 'membershipInfoType.remark')
            };
            if ($rootScope.isModifiedOperateList) {
                httpMethod.addMembe(param).then(function (rsp) {
                    $log.log('调用新增会员接口成功.');
                    if (rsp.data) {
                        swal({
                            title: '操作成功!',
                            text: '新建权限规格成功！',
                            type: 'success'
                        }, function () {
                            $timeout(function () {
                                parent.angular.element(parent.$('#tabs')).scope().removeTab();
                            });
                        });
                    } else {
                        swal("OMG", rsp.msg || "新建权限规格失败!", "error");
                    }
                })
            } else {
                httpMethod.modifyMember(param).then(function (rsp) {
                    $log.log('调用修改会员接口成功.');
                    if (rsp.data) {
                        swal({
                            title: '操作成功!',
                            text: '修改权限规格成功！',
                            type: 'success'
                        }, function () {
                            $timeout(function () {
                                parent.angular.element(parent.$('#tabs')).scope().removeTab();
                            });
                        });
                    } else {
                        swal("OMG", rsp.msg || "修改权限规格失败!", "error");
                    }
                })
            }
        };  
        $rootScope.$watch('membershipInfoType', function (current, old, scope) {
            if (scope.membershipInfoType.memberName || scope.membershipInfoType.identifyType || scope.membershipInfoType.memberNum) {
                scope.isForbid = false;
            } else {
                scope.isForbid = true;
            }
        }, true);
    }])
     //查询会员标签
    .controller('qryMemberMarkResult', ['$scope', '$rootScope', '$log', 'httpMethod',function($scope, $rootScope, $log, httpMethod) {
        // 查询结果分页信息
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        $scope.$on('pageChange', function() {
            $scope.currentPage = 1;
        });
        //会员标签查询
        httpMethod.qryMemberMark().then(function(rsp) {
            $log.log('调用会员信息查询接口成功.');
            if (rsp.success) {
                $scope.qryMemberMarkList = rsp.data.infoList;
                $scope.totalNum = rsp.data.total;
            } else {
                swal("OMG", rsp.msg || "调用会员信息查询接口失败!", "error");
            }
        }, function() {
            $log.log('调用会员信息查询接口失败.');
        }); 

        // 添加会员标签
        $rootScope.addMemberMark = [];
        $rootScope.addMemberMarkName = [];
        $scope.check = function (val) {
            $rootScope.addMemberMark.push(val);
            $rootScope.addMemberMarkName.push(val.markName);
        };
    }])
    // 弹出框
    .controller('addPurchaseModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;
        
        $scope.$on('openStoreQueryTypeModal', function(d, data) {
            $ctrl.openStoreQueryTypeModal(data);
        });
        $ctrl.openStoreQueryTypeModal = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'serial-number-title',
                ariaDescribedBy: 'serial-number-body',
                templateUrl: 'storeQueryTypeModal.html',
                controller: 'storeQueryTypeModalCtrl',
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
    .controller('storeQueryTypeModalCtrl', function($uibModalInstance, $rootScope, $scope, items) {
        var $ctrl = this;
        $ctrl.ok = function() {
            $scope.$broadcast('submitCardRange');
            $rootScope.memberMarkList = $rootScope.addMemberMark;
            $rootScope.membershipInfoType.memberMark = $rootScope.addMemberMarkName;
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
            !currentPage && $scope.$emit('pageChange');
            httpMethod.qryMemberMark().then(function(rsp) {
                $log.log('调用会员信息查询接口成功.');
                if (rsp.success) {
                    $scope.qryMemberMarkList = rsp.data.infoList;
                    $scope.totalNum = rsp.data.total;
                } else {
                    swal("OMG", rsp.msg || "调用会员信息查询接口失败!", "error");
                }
            }, function() {
                $log.log('调用会员信息查询接口失败.');
            }); 
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
