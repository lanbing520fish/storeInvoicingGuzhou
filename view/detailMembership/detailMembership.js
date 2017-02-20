angular
    .module('addStoreManageModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.isMock = true; //是否开启测试数据
    }])
    .filter('certificateTypeFilter', function() {
        return function(relaType) {
            switch (relaType) {
                case 0:
                    return '全部';
                case 1:
                    return '身份证';
                    break;
                case 2:
                    return '护照';
                    break;
                case 3:
                    return '驾照';
                    break;
            }
        }
    })
    .controller('detailMembershipInfoCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        var id = window.frameElement && window.frameElement.id || '',
            obj = parent.$('#' + id).attr('data');

        if($rootScope.isMock){
            obj = '{"retailShopName":"开劳能六备家提队","leaguerName":"Nancy Martinez","leaguerId":"62000020011008704X","leaguerMobile":"13845677655","certificateType":1,"certificateNum":"140000197107291913","levelId":"530000201003015457","levelName":"Jose Hall","statusCd":"1","statusName":"不可用","leaguerLabels":"45000019830829398X","leaguerLabelsName":"Jennifer Robinson","createDt":"1983-02-15","totalConsumption":1255,"leaguerSexName":"男","leaguerBirthday":"2001-11-26","leaguerEmail":"a.jjdenmtwy@xlqvxutmmq.zw","leaguerWechat":"ndswqtjf","remarks":"从选低一产战","account":{"accountAmount":126,"pointsAccountId":"630000199101214656"},"$$hashKey":"object:42"}';
        }
        
        $scope.detailMembershipInfo = obj ? JSON.parse(obj) : {};

        $scope.showPointsDetail = function(pointsAccountId){
            if(!parent.angular.element(parent.$('#tabs')).scope()) return;
            parent.angular.element(parent.$('#tabs')).scope().addTab('会员积分历史明细', 'detailMembPointHistory', 'pointsAccountId', pointsAccountId);
        }
    }]);
