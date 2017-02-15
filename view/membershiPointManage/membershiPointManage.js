angular
    .module('staffModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.offerTypeList = [{
            certificateType: 1,
            certificateTypeName: '身份证'
        }, {
            certificateType: 2,
            certificateTypeName: '护照'
        }, {
            certificateType: 3,
            certificateTypeName: '驾照'
        }]; // 卡类型列表
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

        // 积分调整
        httpMethod.changeLeaguerPoint = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/point/o/changeLeaguerPoint',
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
                    'pageNum|1-100': 1,
                    'pageSize|1-100': 5,
                    'size|1-100': 5,
                    'startRow|1-100': 1,
                    'endRow|1-100': 5,
                    'total|50-100': 37,
                    'pages|1-100': 8,
                    'list|10': [{
                        'certificateName': '@cword(4)',
                        'certificateNum': '@id', //证件号码
                        'certificateType|+1': ['身份证', '护照', '驾照'],
                        'createDt': '@date("yyyy-MM-dd HH:mm:ss")',
                        'leaguerBirthday': '',
                        'leaguerCardId': '@id',
                        'leaguerEmail': '@email',
                        'leaguerId': '@id',
                        'leaguerLabels': '@id,@id,@id',
                        'leaguerLabelsName': '@cword(4),@cword(4),@cword(4)',
                        'leaguerMobile|+1': ['13900213221', '18922125654', '15900389987'],
                        'leaguerName': "@cword(4)",
                        'leaguerSex|+1': ['1', '2'],
                        'leaguerSexName|+1': ['男', '女'],
                        'leaguerWechatAccount': '',
                        'levelId': '@id',
                        'levelName|+1': ['黄金会员', '铂金会员', '普通会员'],
                        'remarks': '@cword(10)',
                        'retailShopId': '@id',
                        'retailShopName': '@cword(10)',
                        'statusCd|+1': ['1', '2'],
                        'statusName': ['可用', '不可用'],
                        'totalConsumption': '',
                        'account': {
                            'accountAmount': '10',
                            'leaguerId': '@id',
                            'pointsAccountId': '@id',
                            'statusCd|+1': ['1', '2'],
                            'updateDt': '@date("yyyy-MM-dd HH:mm:ss")'
                        }
                    }]
                },
                'errors': null
            });

            // 调整积分
            Mock.mock('http://192.168.74.17:8088/point/o/changeLeaguerPoint', {
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
    // 证件类型转换对应的文本描述
    .filter('offerTypeFilter', function() {
        return function(stateValue) {
            switch (stateValue) {
                case '1':
                    return '身份证';
                    break;
                case '2':
                    return '护照';
                    break;
                case '3':
                    return '驾照';
                    break;
            }
        }
    })
    // 状态码转换对应的文本描述
    .filter('statusCdFilter', function() {
        return function(stateValue) {
            switch (stateValue) {
                case '1':
                    return '可用';
                    break;
                case '2':
                    return '不可用';
                    break;
            }
        }
    })
    .controller('queryTypeFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', '$timeout', function($scope, $rootScope, $log, httpMethod, $timeout) {
        // 查询结果分页信息
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        $scope.queryTypeForm = {
            // offerName: '',
            // offerType: '',
            // offerValue: '',
            // offerOperatorId: ''
        };
        $scope.queryTypeFormSubmit = function(currentPage) {
            !currentPage && $scope.$broadcast('pageChange');

            var param = {
                certificateNum: _.get($scope, 'queryTypeForm.certificateNum'),
                certificateType: _.get($scope, 'queryTypeForm.certificateType'),
                leaguerCardId: _.get($scope, 'queryTypeForm.leaguerCardId'),
                leaguerLabelIds: _.get($scope, 'queryTypeForm.leaguerLabelIds'),
                leaguerMobile: _.get($scope, 'queryTypeForm.leaguerMobile'),
                leaguerName: _.get($scope, 'queryTypeForm.leaguerName'),
                statusCd: _.get($scope, 'queryTypeForm.statusCd'),
                curPage: currentPage || $scope.currentPage, // 当前页
                pageSize: $scope.rowNumPerPage // 每页展示行数
            };
            httpMethod.queryLeaguer(param).then(function(rsp) {
                $log.log('调用会员信息列表查询接口成功.');
                if (rsp.success) {
                    $rootScope.queryTypeResultList = rsp.data.list;
                    $scope.totalNum = rsp.data.total;
                } else {
                    swal("OMG", rsp.msg || "调用会员信息列表查询接口失败!", "error");
                }
            }, function() {
                $log.log('调用会员信息列表查询接口失败.');
            });
        };

        $scope.$on('requery', function() {
            $scope.queryTypeFormSubmit();
        });

        $rootScope.$watch('isRefresh', function(current) {
            if (current) {
                $scope.queryTypeFormSubmit();
                $rootScope.isRefresh = false;
            }
        });
    }])
    .controller('resultCtrl', ['$scope', '$rootScope', 'httpMethod', '$timeout', function($scope, $rootScope, httpMethod, $timeout) {
        // 积分调整
        $scope.scoreAdjust = function(index) {
            $rootScope.scoreAdjustType = $rootScope.queryTypeResultList[index];
            $rootScope.acAccountAmount = $rootScope.scoreAdjustType.account.accountAmount;
            $scope.$emit('openDetailAccountsModal');
        };
        // 积分兑换
        $scope.scoreExchange = function(index) {
            // $rootScope.scoreAdjustType = $rootScope.queryTypeResultList[index];
            // parent.angular.element(parent.$('#tabs')).scope().addTab('积分兑换', '/storeInvoicingGuzhou/view/membPointsExchange/membPointsExchange.html', 'scoreAdjustType', JSON.stringify($rootScope.scoreAdjustType)); 
        };
        // 历史详情
        $scope.detailInfo = function(index) {
            // $rootScope.scoreAdjustType = $rootScope.queryTypeResultList[index];
            // parent.angular.element(parent.$('#tabs')).scope().addTab('历史详情', '/storeInvoicingGuzhou/view/detailMembPointHistory/detailMembPointHistory.html', 'scoreAdjustType', JSON.stringify($rootScope.scoreAdjustType));      
        };

    }])
    .controller('resultListCtrl', ['$scope', '$rootScope', 'httpMethod', '$log', function($scope, $rootScope, httpMethod, $log) {
        $scope.$on('submitQueryTypeModal', function(d, data) {
            $scope.scoreAdjustTypeFormSubmit(data);
        });

        $scope.$watch('infomationForm.pointChangeValue', function(current, old, scope) {
            $rootScope.acAccountAmount = (_.parseInt($scope.infomationForm.pointChangeValue) || 0) + _.parseInt($rootScope.scoreAdjustType.account.accountAmount);
        });

        $scope.scoreAdjustTypeFormSubmit = function(data) {
            var param = {
                pointsAccountId: _.get($scope, 'infomationForm.pointsAccountId'), //积分账户ID 
                leagureId: _.get($rootScope, 'scoreAdjustType.leagureId'), //会员ID
                pointChageTypeCd: _.get($scope, 'infomationForm.pointChageTypeCd'), //积分变更类型
                pointChangeValue: _.get($scope, 'infomationForm.pointChangeValue'), //积分变更值
                bcAccountAmount: _.get($scope, 'infomationForm.bcAccountAmount'), //积分变更前账户值
                acAccountAmount: _.get($rootScope, 'acAccountAmount'), //积分变更后账户值
                pointChangeDt: _.get($scope, 'infomationForm.pointChangeDt') //积分变更时间
            };
            param.bcAccountAmount = $rootScope.scoreAdjustType.account.accountAmount;

            // 调整积分
            httpMethod.changeLeaguerPoint(param).then(function(rsp) {
                $log.log('调用积分调整接口成功.');
                if (rsp.success) {
                    swal({
                        title: '操作成功',
                        text: rsp.msg || '积分调整成功!',
                        type: 'success',
                        confirmButtonText: '确定',
                        showLoaderOnConfirm: true
                    }, function() {
                        $rootScope.isRefresh = true;
                        // $rootScope.isVisible = true;
                        if (!$rootScope.$$phase) {
                            $rootScope.$apply();
                        }
                    });
                } else {
                    swal('OMG', rsp.msg || '积分调整失败!', 'error');
                }
            }, function() {
                swal('OMG', '调用积分调整接口失败!', 'error');
            });
        };
    }])
    // 弹出框
    .controller('addAdjustInModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;
        // 积分调整
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
    .controller('detailAccountsModalCtrl', function($uibModalInstance, $scope, $rootScope, items) {
        var $ctrl = this;
        $ctrl.ok = function() {
            $scope.$broadcast('submitQueryTypeModal', items);
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        setInterval(function() {
            var now = (new Date()).Format("yyyy-MM-dd");
            $('#current-time').text(now);
        }, 1000);
        Date.prototype.Format = function(fmt) { //author: meizz 
            var o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
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
            $scope.queryTypeFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
