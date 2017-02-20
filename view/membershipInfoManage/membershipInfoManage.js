angular
    .module('checkModule', ['ui.bootstrap'])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpMethod = {},
            isMock = true;
        // 会员信息查询
        httpMethod.memberClose = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/chain/staff/q/memberClose',
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
        // 状态查询
        httpMethod.loadOfferCategory = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/chain/common/q/loadOfferCategory',
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

        //会员信息注销
        httpMethod.deleteMember = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/chain/staff/o/deleteMember',
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
            // 会员信息查询
            Mock.mock('http://192.168.74.17:8088/chain/staff/q/memberClose', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'pageNum|1-100': 1,
                    'pageSize|1-100': 5,
                    'size|1-100': 5,
                    'startRow|1-100': 1,
                    'endRow|1-100': 5,
                    'total|50-100': 37,
                    'pages|1-100': 8,
                    'infoList|10':[{ 
                        'retailShopName': '@cword(4)', //门店名称
                        'retailShopId': '@id', //门店ID
                        'memberName': '@cword(4)', //会员名称
                        'memberNum': '@id', //会员卡号
                        'identifyType|+1':[1,2,3], //证件类型
                        'identifyTypeName|+1': ['身份证','护照','驾照'],
                        'identifyNumber':'@id', //证件号码
                        'phoneNumber|+1':['19283928398','18345769087','15030230987'],
                        'memberLevel|+1':[1,2,3,4],//会员等级
                        'memberLevelName|+1':['普通会员','黄金会员','铂金会员','砖石会员'],//会员等级名称
                        'statusCd|+1':['1000','1001'],//状态
                        'statusCdName|+1':['生效','无效'],//状态名称
                        'memberMark|+1':['音乐,体育','体育'],//标签列表
                        'createDate':'@date("yyyy-MM-dd")'
                    }] 
                },
                'errors': null
            });
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
            // 状态查询
            Mock.mock('http://192.168.74.17:8088/chain/common/q/loadOfferCategory', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|2': [{
                    'statusCd|+1':['1000','1001'],
                    'statusName|+1':['生效','无效']
                }],
                'errors': null
            });
            // 会员信息注销
            Mock.mock('http://192.168.74.17:8088/chain/staff/o/deleteMember', {
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
    .controller('conditionQuery', ['$scope', '$rootScope', '$log', 'httpMethod',function($scope, $rootScope, $log, httpMethod) {
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
        // 状态类型查询
        httpMethod.loadOfferCategory().then(function(rsp) {
            $log.log('调用状态类型查询接口成功.');
            if (rsp.success) {
                $scope.statusTypeList = rsp.data;
            } else {
                swal("OMG", rsp.msg || "调用状态类型查询接口失败!", "error");
            }
        }, function() {
            $log.log('调用状态类型查询接口失败.');
        });

        // 查询结果分页信息
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        $scope.conditionQuerySubmit = function(currentPage) {
            !currentPage && $scope.$broadcast('pageChange');
            var param = {
                identifyType: _.get($scope, 'offerTypeList.identifyType'), //证件类型 
                identifyNum: _.get($scope, 'conditionQueryForm.identifyNum'), //证件号码
                memberNum: _.get($scope, 'conditionQueryForm.identifyNum'), //会员卡号
                memberName: _.get($scope, 'conditionQueryForm.memberName'), //会员姓名
                phoneNumber:_.get($scope, 'conditionQueryForm.phoneNumber'),//手机号码
                statusCd:_.get($scope, 'statusTypeList.statusCd'),
                memberMark:_.get($rootScope, 'memberMarkList'),
                curPage: currentPage || $scope.currentPage, // 当前页
                pageSize: $scope.rowNumPerPage // 每页展示行数
            };
            // 会员信息查询
            httpMethod.memberClose(param).then(function(rsp) {
                $log.log('调用会员信息查询接口成功.');
                if (rsp.success) {
                    $rootScope.queryTypeResultList = rsp.data.infoList;
                    $scope.totalNum = rsp.data.total;
                } else {
                    swal("OMG", rsp.msg || "调用会员信息查询接口失败!", "error");
                }
            }, function() {
                $log.log('调用会员信息查询接口失败.');
            });
        };
        //选择会员标签
        $scope.openStoreQueryType = function() {
            $scope.$emit('openStoreQueryTypeModal');
        };
        
    }])  
    .controller('queryResultCtrl', ['$scope', '$rootScope', '$log', 'httpMethod',function($scope, $rootScope, $log, httpMethod) {
        //新增
        $scope.addMembership = function(item) {
            // parent.angular.element(parent.$('#tabs')).scope().addTab('item', '/storeInvoicingGuzhou/view/membPointsExchange/membPointsExchange.html'); 
        };
        //修改  
        $scope.deleteMembership = function(index) {
            // $rootScope.membershipInfoType = $rootScope.queryTypeResultList[index];
            // parent.angular.element(parent.$('#tabs')).scope().addTab('item', '/storeInvoicingGuzhou/view/membPointsExchange/membPointsExchange.html', 'membershipInfoType', JSON.stringify($rootScope.membershipInfoType)); 
        };
        // 注销
        $scope.deleteMembership = function (index) {
            $rootScope.membershipInfoType = $rootScope.queryTypeResultList[index];
            var param = {
                memberName: _.get($rootScope, 'membershipInfoType.memberName'), //会员姓名 
                phoneNumber: _.get($rootScope, 'membershipInfoType.phoneNumber'), //手机号码
                memberNum: _.get($rootScope, 'membershipInfoType.memberNum'), //会员卡号
            };
            swal({
                title: "注销会员",
                text: "您确定要把会员姓名为" + param.memberName + "注销吗？",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: "确定",
                confirmButtonColor: "#ffaa00",
                cancelButtonText: "取消",
                showLoaderOnConfirm: true
            }, function () {
                httpMethod.deleteMember(param).then(function (rsp) {
                    $log.log('调用注销会员接口成功.');
                    if (rsp.data) {
                        swal({
                            title: "操作成功",
                            text: "注销会员成功!",
                            type: "success",
                            confirmButtonText: "确定",
                            confirmButtonColor: "#ffaa00"
                        }, function () {
                            $scope.$emit('requery');
                        });
                    } else {
                        swal("OMG", "注销会员失败!", "error");
                    }
                }, function () {
                    swal("OMG", "调用注销会员接口失败!", "error");
                });
            });
        }
        
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
        //选择会员标签
        $scope.$on('openStoreQueryTypeModal', function(d, data) {
            $ctrl.openStoreQueryTypeModal(data);
        });
        $ctrl.openStoreQueryTypeModal = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'serial-number-title1',
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
    .controller('storeQueryTypeModalCtrl', function($uibModalInstance, $scope, $rootScope, items) {
        var $ctrl = this;
        $ctrl.ok = function() {
            $scope.$broadcast('submitCardRange');
            $rootScope.memberMarkList = $rootScope.addMemberMark;
            $rootScope.memberMark = $rootScope.addMemberMarkName;
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
            $scope.conditionQuerySubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
        
        $scope.pageChanged2 = function(currentPage) {
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
