angular
    .module('staffModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
        var id = window.frameElement && window.frameElement.id || '',
            obj = parent.$('#' + id).attr('data');
        $rootScope.scoreAdjustType = obj ? JSON.parse(obj) : {};
    }])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpMethod = {},
            isMock = true;
        // 查询会员信息列表
        httpMethod.queryLeaguer = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/leaguer/q/queryLeaguer',
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

        // 查询兑换商品
        httpMethod.qryOfferConfigs = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/point/q/qryOfferConfigs',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: 'param=' + encodeURI(JSON.stringify(param))
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

        // 商品类别
        httpMethod.loadNewCategory = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/config/offer/q/loadNewCategory',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: 'body=' + encodeURI(JSON.stringify(param))
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

        // 商品兑换
        httpMethod.excahngeOffer = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/point/o/excahngeOffer',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: 'body=' + encodeURI(JSON.stringify(param))
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
            // 查询会员信息列表
            Mock.mock('http://192.168.74.17:8088/leaguer/q/queryLeaguer', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'list|1': [{
                        'leaguerId': '@id',//会员卡号
                        'leaguerMobile|+1': ['13900213221', '18922125654', '15900389987'],//手机号
                        'leaguerName': "@cword(4)",//会员姓名
                        'levelName|+1': ['黄金会员', '铂金会员', '普通会员'],//会员等级
                        'account': {
                            'accountAmount': '10',//积分 
                        }
                    }]
                },
                'errors': null
            });
            // 查询兑换商品
            Mock.mock('http://192.168.74.17:8088/point/q/qryOfferConfigs', {
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
                    'list|10': [{
                        'pointVaule|1-3000': 100,//积分
                        'offer':{ //商品信息列表
                            'categoryName|+1':['数码配件','家居日用','厨房用具'],//商品类别
                            'offerQty|1-100':1, //商品数量
                            'offerName':'@cword(4)',//商品名称
                            'priceRetail':{ //商品价格对象
                                'retailPrice|1-1000':100 //销售价格
                            }
                        }
                    }]
                },
                'errors': null
            });

            // 商品类别
            Mock.mock('http://192.168.74.17:8088/config/offer/q/loadNewCategory', {
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
                    'list|10': [{
                        'categoryCd|+1':['1','2','3'],
                        'categoryName|+1':['数码配件','家居日用','厨房用具'] 
                    }]
                },
                'errors': null
            });
            // 商品兑换
            Mock.mock('http://192.168.74.17:8088/point/o/excahngeOffer', {
                'rsphead': 's',
                'success|1': true, //是否成功
                'code': null,
                'msg': '@cword(6)', //失败信息
                'data': '',
                'errors': null
            });
        }
        return httpMethod;
    }])

    // 会员信息
    .controller('detailOperateFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        var param = {
            certificateNum: _.get($rootScope, 'scoreAdjustType.certificateNum'),
            certificateType: _.get($rootScope, 'scoreAdjustType.certificateType'),
            leaguerCardId: _.get($rootScope, 'scoreAdjustType.leaguerCardId') 
        };
        // 调用会员信息列表查询
        httpMethod.queryLeaguer(param).then(function(rsp) {
            $scope.detailOperateForm = rsp.data.list;
            $log.log('调用会员信息列表查询接口成功.');
        }, function() {
            $log.log('调用会员信息列表查询接口成功.');
        });
    }])

    //积分兑换商品展示
    .controller('exchangeQuery', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        var param = {
            endPoint: '', //积分下限 
            offerName: '', //商品名称
            startPoint: '', //积分下限
            statusCd: '', //商品状态
            categoryCd: '', //商品类别
        };
        // 积分兑换商品查询
        httpMethod.qryOfferConfigs(param).then(function(rsp) {
            $log.log('调用积分兑换商品查询接口成功.');
            if (rsp.success) {
                $scope.goodsSmallList = _.slice(rsp.data.list,0,5);
                $scope.totalNum = rsp.data.total;
            } else {
                swal("OMG", rsp.msg || "调用积分兑换商品查询接口失败!", "error");
            }
        }, function() {
            $log.log('调用积分兑换商品查询接口失败.');
        });

        //商品兑换
        $scope.exchangePoints = function(index) {
            $rootScope.scoreAdjustType = $rootScope.goodsCategoryList[index];
            $scope.$emit('openDetailAccountsModal');
        };  
    }])

    //积分兑换商品
    .controller('exchangeResultList', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        // 获取商品类别列表
        httpMethod.loadNewCategory().then(function (rsp) {
            $log.log('调用获取权限类型接口成功.');
            $scope.goodsCategoryList = rsp.data.list;
        }, function () {
            $log.log('调用获取权限类型接口失败.');
        });

        $scope.isHidden = true; // 更多查询条件列表是否隐藏
        $scope.isFoldBrand = true; // 品牌列表是否折叠
        $scope.isFoldModel = true; // 型号列表是否折叠
        $scope.isVisb = true; 

        // 切换展示
        $scope.toggle = function(name) {
            switch (name) {
                case 'isHidden':
                    $scope.isHidden = !$scope.isHidden;
                    break;
                case 'isFoldBrand':
                    $scope.isFoldBrand = !$scope.isFoldBrand;
                    break;
                case 'isFoldModel':
                    $scope.isFoldModel = !$scope.isFoldModel;
                    break;
            }
        }
        //删除查询条件
        $scope.btn_remove = function(index) {
            $scope.files.splice(index,1)
        };
        // 查询结果分页信息
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        $scope.goodsExchangeQuery = function(currentPage) {
            !currentPage && $scope.$broadcast('pageChange');
            var param = {
                endPoint: _.get($scope, 'infomationForm.endPoint'), //积分下限 
                offerName: _.get($rootScope, 'infomationForm.offerName'), //商品名称
                startPoint: _.get($scope, 'infomationForm.startPoint'), //积分上限
                statusCd: _.get($scope, 'infomationForm.statusCd'), //商品状态
                categoryCd: _.get($scope, 'goodsCategoryList.categoryCd'), //商品类别
                curPage: currentPage || $scope.currentPage, // 当前页
                pageSize: $scope.rowNumPerPage // 每页展示行数
            };
            // 积分兑换商品查询
            httpMethod.qryOfferConfigs(param).then(function(rsp) {
                $log.log('调用积分兑换商品查询接口成功.');
                if (rsp.success) {
                    $scope.goodsList = rsp.data.list;
                    $scope.totalNum = rsp.data.total;
                } else {
                    swal("OMG", rsp.msg || "调用积分兑换商品查询接口失败!", "error");
                }
            }, function() {
                $log.log('调用积分兑换商品查询接口失败.');
            });
        };

        //商品兑换
        $scope.exchangePoints = function(index) {
            $rootScope.scoreAdjustType = $rootScope.goodsCategoryList[index];
            $scope.$emit('openDetailAccountsModal');
        };  
    }])

    // 弹出框
    .controller('addAdjustInModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;
        // // 积分兑换
        // $scope.$on('openDetailAccountsModal', function(d, data) {
        //     $ctrl.openDetailAccountsModal(data);
        // });
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
            $ctrl.isVisible = true;
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $ctrl.sure = function() {
            // $ctrl.isVisible = false;
            $uibModalInstance.close();
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
            $scope.goodsExchangeQuery($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
