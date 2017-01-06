angular
    .module('staffModule', ['ui.bootstrap', 'ui.uploader'])
    .controller('resultCtrl', ['$scope', '$log', 'uiUploader', function($scope, $log, uiUploader) {
        // 删除单个file
        $scope.btn_remove = function(file) {
            $log.info('deleting=' + file);
            uiUploader.removeFile(file);
        };
        // 上传文件
        $scope.btn_upload = function() {
            $log.info('uploading...');
            uiUploader.startUpload({
                url: 'https://posttestserver.com/post.php',
                concurrency: 2,
                onProgress: function(file) {
                    $log.info(file.name + '=' + file.humanSize);
                    $scope.$apply();
                },
                onCompleted: function(file, response) {
                    $log.info(file + 'response' + response);
                }
            });
        };

        // 上传文件列表
        $scope.files = [];

        var element = document.getElementById('file1');
        element.addEventListener('change', function(e) {
            var files = e.target.files;
            uiUploader.addFiles(files);
            $scope.files = uiUploader.getFiles();
            $scope.$apply();
        });
    }])
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
