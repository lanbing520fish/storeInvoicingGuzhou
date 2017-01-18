angular
    .module('staffModule', ['ui.bootstrap'])
    .controller('conditionQuery', ['$scope', '$timeout', function($scope, $timeout) {
        
    }])
    .controller('resultCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        // 积分调整
        $scope.scoreAdjust = function() {
            $scope.$emit('openDetailAccountsModal');
        };
    }])
    .controller('resultListCtrl', ['$scope', function($scope) {
        $scope.hstep = 1;
        $scope.options = {
            hstep: [1, 2, 3],
        };
        $scope.ismeridian = true;
        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
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
            $scope.queryTypeFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
