angular
    .module('staffModule', ['ui.bootstrap'])
    .controller('resultCtrl', ['$scope', function($scope) {

    }])
    // 城市
    .controller('cityCheckCtrl', ['$scope', function($scope) {
        $scope.citys = [{
            areaId: '009',
            areaName: '江苏省',
            children: [{
                areaId: '025',
                areaName: '南京市',
            }, {
                areaId: '026',
                areaName: '常州市',
            }]
        }, {
            areaId: '009',
            areaName: '安徽省',
            children: [{
                areaId: '0551',
                areaName: '合肥市',
            }]
        }];

        $scope.visible = false;
        $scope.key = 1;
        $scope.provinceIndex = '';
        $scope.cityIndex = '';
        $scope.areaId = '';
        $scope.provinceName = '';
        $scope.cityName = '';
        $scope.checkedAreaName = '';

        $scope.cityCheck = function() {
            $scope.visible = !$scope.visible;
        }
        $scope.clHide = function() {
            $scope.visible = false;
        }
        $scope.handleSelectCity = function(level, index, areaId, areaName) {
            var me = this;
            switch (level) {
                case 'province':
                    $scope.key = 2;
                    $scope.provinceIndex = index;
                    $scope.provinceName = areaName;
                    break;
                case 'city':
                    $scope.cityIndex = index;
                    $scope.areaId = areaId;
                    $scope.cityName = areaName;
                    me.handleSubmitBtn(level);
                    break;
            }
        };
        $scope.handleSubmitBtn = function(level) {
            var me = this;
            switch (level) {
                case 'province':
                    $scope.checkedAreaName = $scope.provinceName;
                    break;
                case 'city':
                    $scope.checkedAreaName = $scope.provinceName + ' ' + $scope.cityName;
                    $scope.visible = false;
                    break;
            }
        }
    }])