angular
    .module('staffModule', ['ui.bootstrap'])
    .controller('conditionQuery', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.conditionQueryForm = {
            createStartDt: '', //制单日期开始
            createEndDt: '', //制单日期结束
        };
    }])
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
