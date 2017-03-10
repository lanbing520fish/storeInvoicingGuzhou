angular
    .module('salesmanManageModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.stepNum = 0; // 当前显示的step索引值（Number类型）
    }])
    .controller('salemanSetupCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        // 店员配置
        $scope.salesmanSetup = function(index) {
            $rootScope.stepNum = 1;
        };
        
    }])
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