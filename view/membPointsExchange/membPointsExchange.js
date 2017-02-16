angular
    .module('staffModule', ['ui.bootstrap'])
    .run(['$rootScope', '$filter', function($rootScope, $filter) {
        var id = window.frameElement && window.frameElement.id || '',
            obj = parent.$('#' + id).attr('data');
        $rootScope.scoreAdjustType = obj ? JSON.parse(obj) : {};

        $rootScope.scoreAdjustType = {
            leaguerName: '莫伊',
            leaguerId: '11134444',
            levelName: '黄金会员',
            leaguerMobile: '18652020206',
            accountAmount:'1007'
        };
        $rootScope.exchangeGoodsForm = {};
        $rootScope.dateNow = $filter('date')(new Date(), 'yyyy-MM-dd');
    }])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpMethod = {},
            isMock = true;
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
            $rootScope.exchangeGoodsForm = $scope.goodsSmallList[index];
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
        $scope.isVisa = true; 
        $scope.isVisb = true; 
        $rootScope.useful = false; // 总条数
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
        //选中查询条件
        $scope.checked = function(item) {
            $scope.categoryType = item;
            $scope.isVisa = false;
        };
        $scope.checkedFor = function(startPoint,endPoint) {
            $scope.startPoint = startPoint;
            $scope.endPoint = endPoint;
            $scope.isVisb = false;
        };
        //删除查询条件
        $scope.btn_remove = function(index) {
            $scope.categoryName = '';
            $scope.isVisa = true;
        };
        $scope.btn_dele = function(index) {
            $scope.startPoint = '';
            $scope.endPoint = '';
            $scope.isVisb = true;
        };
        // 查询结果分页信息
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        $scope.goodsExchangeQuery = function(currentPage) {
            !currentPage && $scope.$broadcast('pageChange');
            var param = {
                endPoint: _.get($scope, 'endPoint'), //积分下限 
                offerName: _.get($rootScope, 'infomationForm.offerName'), //商品名称
                startPoint: _.get($scope, 'startPoint'), //积分上限
                statusCd: '', //商品状态
                categoryCd: _.get($scope, 'categoryType.categoryCd'), //商品类别
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
            $rootScope.exchangeGoodsForm = $scope.goodsList[index];
            $scope.$emit('openDetailAccountsModal');
        };  
    }])
    //积分兑换
    .controller('resultListCtrl', ['$scope', '$rootScope', 'httpMethod', '$log', function($scope, $rootScope, httpMethod, $log) {
        $scope.$on('submitQueryTypeModal', function(d, data) {
            $scope.scoreExchangeTypeFormSubmit(data);
        });
        $rootScope.$watch('exchangeGoodsForm.pointVaule', function(current, old, scope) {
            if(_.parseInt(scope.scoreAdjustType.accountAmount) > _.parseInt(scope.exchangeGoodsForm.pointVaule)){
                scope.lastPoint = (_.parseInt(scope.scoreAdjustType.accountAmount) || 0) - _.parseInt(scope.exchangeGoodsForm.pointVaule);
                scope.useful = false;
            }else{
                scope.lastPoint = 0;
                scope.useful = true;
            }
       
        });
        $scope.scoreExchangeTypeFormSubmit = function(data) {
            var param = {
                exchangeItem: _.get($rootScope, 'exchangeGoodsForm'),
                leaguerId: _.get($rootScope, 'scoreAdjustType.leaguerId'),
                pointsAccountId: _.get($rootScope, 'scoreAdjustType.pointsAccountId'),
                remark:_.get($rootScope, 'exchangeGoodsForm.remark')
            };
            // 积分兑换
            httpMethod.excahngeOffer(param).then(function(rsp) {
                $log.log('调用积分兑换接口成功.');
                if (rsp.success) {
                    swal({
                        title: '操作成功',
                        text: rsp.msg || '积分兑换成功!',
                        type: 'success',
                        confirmButtonText: '确定',
                        showLoaderOnConfirm: true
                    }, function() {
                        $rootScope.isRefresh = true;
                        if (!$rootScope.$$phase) {
                            $rootScope.$apply();
                        }
                    });
                } else {
                    swal('OMG', rsp.msg || '积分兑换失败!', 'error');
                }
            }, function() {
                swal('OMG', '调用积分兑换接口失败!', 'error');
            });    
        };
    }])
    // 弹出框
    .controller('addAdjustInModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;
        // 积分兑换
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
            $scope.$broadcast('submitQueryTypeModal', items);
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
            $scope.goodsExchangeQuery($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
