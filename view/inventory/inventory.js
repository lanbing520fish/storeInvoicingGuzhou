angular
    .module('inventoryModule', ['ui.bootstrap'])
    .controller('conditionQuery', ['$scope', '$timeout', function($scope, $timeout) {
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

    }])
    .controller('resultCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        // 结算
        $scope.settleAccounts = function() {
            $scope.$emit('openSettleAccountsModal');
        };
        // 详情
        $scope.detailAccounts = function() {
            $scope.$emit('openDetailAccountsModal');
        };
    }])
    // 弹出框
    .controller('addAdjustInModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        // 结算
        $scope.$on('openSettleAccountsModal', function(d, data) {
            $ctrl.open(data);
        });

        // 详情
        $scope.$on('openDetailAccountsModal', function(d, data) {
            $ctrl.openDetailAccountsModal(data);
        });

        $ctrl.open = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'new-line-title',
                ariaDescribedBy: 'new-line-body1',
                templateUrl: 'settleAccounts.html',
                controller: 'settleAccountsCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return data;
                    }
                }
            });
        };

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
    .controller('settleAccountsCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;

        $ctrl.ok = function() {
            $scope.$broadcast('submitPowerListModal');
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('detailAccountsModalCtrl', function($uibModalInstance, $scope, items) {
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
            $scope.queryTypeFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
