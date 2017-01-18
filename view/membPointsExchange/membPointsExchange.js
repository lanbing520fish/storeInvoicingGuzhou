angular
    .module('staffModule', ['ui.bootstrap'])
    .controller('exchangeQuery', ['$scope', '$timeout', function($scope, $timeout) {
        // 兑换
        $scope.exchangePoints = function() {
            $scope.$emit('openDetailAccountsModal');
        };
    }])
    .controller('resultCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        // 兑换
        $scope.exchangePoints = function() {
            $scope.$emit('openDetailAccountsModal');
        };
        // var $ctrl = this;
        $scope.isHidden = true; // 更多查询条件列表是否隐藏
        $scope.isFoldBrand = true; // 品牌列表是否折叠
        $scope.isFoldModel = true; // 型号列表是否折叠

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
