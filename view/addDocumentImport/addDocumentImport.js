angular
    .module('addDocumentImportModule', ['ui.bootstrap', 'ui.uploader'])
    .run(['$rootScope', '$filter', function($rootScope, $filter) {
        $rootScope.stepNum = 0;
        $rootScope.retailShopId = '';
        $rootScope.dateNow = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
    }])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpConfig = {
                'siteUrl': 'http://127.0.0.1:28088',
                'requestHeader': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'isMock': true // 是否开启测试数据
            },
            httpMethod = {};

        // 仓库列表查询
        httpMethod.loadInputInstCodeStorage = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/config/storage/q/loadInputInstCodeStorage',
                method: 'POST',
                headers: httpConfig.requestHeader,
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

        // 串码批量入库接口
        httpMethod.saveBatchInstCode = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/stock/order/a/saveBatchInstCode',
                method: 'POST',
                headers: httpConfig.requestHeader,
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

        if (httpConfig.isMock) {
            // 仓库列表查询
            Mock.mock(httpConfig.siteUrl + '/config/storage/q/loadInputInstCodeStorage', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|4': [{
                    'storageId': '@id',
                    'storageName': '@cword(4)'
                }],
                'errors': null
            });
            // 上传成功
            Mock.mock(httpConfig.siteUrl + '/config/storage/q/uploadBatchInstCode', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'terminalList|4': [{
                    'instCode': '@id',
                    'terminalType': '@cword(4)'
                }],
                'errors': null
            });
            // 串码批量入库接口
            Mock.mock(httpConfig.siteUrl + '/stock/order/a/saveBatchInstCode', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'retailShopId': '@id',
                    'retailShopName': '@cword(4)',
                    'storageId': '@id',
                    'storageName': '@cword(4)',
                    'staffId': '@id',
                    'staffName': '@cword(4)',
                    'createDt': '',
                    'resultList|10': [{
                        'success': '',
                        'instCode': '@id', //终端串码
                        'terminalType': '@id', //终端机型编码
                        'terminalTypeName': '@cword(4)',
                        'errorMsg': '@cword(6)'
                    }]
                },
                'errors': null
            });
        }
        return httpMethod;
    }])
    .controller('addDocumentCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'uiUploader',function($scope, $rootScope, $log, httpMethod, uiUploader) {
        var param = {
            retailShopId: _.get($rootScope, 'retailShopId')
        };

        httpMethod.loadInputInstCodeStorage(param).then(function(rsp) {
            $log.log('获取仓库列表查询接口成功.');
            if (rsp.success) {
                $rootScope.storageList = rsp.data;
                $rootScope.storageDefault = rsp.data[0].storageId;
            } else {
                swal("OMG", rsp.msg || "获取仓库列表查询接口失败!", "error");
            }
        }, function() {
            $log.log('获取仓库列表查询接口失败.');
        });

        $scope.resp = null; //上传完毕接口返回的response信息；
        $scope.files = []; //上传的文件列表；
        $scope.isNotAllowUpload = true; //是否不允许上传；
        $scope.checkFiles = function() {
            var element = document.getElementById('hallImportInput');
            if (element) {
                element.addEventListener('change', function(e) {
                    $scope.resp = null;
                    $scope.files = uiUploader.removeAll();
                    $scope.isNotAllowUpload = true;
                    var files = e.target.files;
                    uiUploader.addFiles(files);
                    $scope.files = uiUploader.getFiles();
                    $scope.isNotAllowUpload = false;
                    $scope.$apply();
                });
            }
        };
        $scope.btn_upload = function() {
            uiUploader.startUpload({
                url: 'http://127.0.0.1:28088/config/storage/q/uploadBatchInstCode',
                concurrency: 1,
                onProgress: function(file) {
                    $log.info(file.name + '=' + file.humanSize);
                    $scope.$apply();
                },
                onCompleted: function(file, response) {
                    $scope.isNotAllowUpload = true;
                    $scope.resp = JSON.parse(response);
                    if ($scope.resp.success) {
                        var param = {
                            retailShopId: _.get($rootScope, 'retailShopId'),
                            storageId: _.get($rootScope, 'storageDefault'),
                            staffId: _.get($rootScope, 'staffId'),
                            createDt: _.get($rootScope, 'dateNow'),
                            terminalList: _.get($scope, 'resp.terminalList')
                        };
                        $scope.btn_import(param);              
                        $rootScope.stepNum = 1;
                    };
                }
            });
        }
        $scope.btn_import = function(param) {
            httpMethod.saveBatchInstCode(param).then(function(rsp) {
                $log.log('获取串码批量入库接口成功.');
                if (rsp.success) {
                    $rootScope.storageName = rsp.data.storageName;
                    $rootScope.imeiStorageList = rsp.data.resultList;
                    $scope.totalNum = $rootScope.imeiStorageList.length; // 总条数
                    $scope.currentPage = 1; // 当前页
                    $scope.rowNumPerPage = 30; // 每页显示行数
                    $scope.serialNubListChunk = _.chunk($rootScope.imeiStorageList, $scope.rowNumPerPage);
                    $scope.serialNubShow = $scope.serialNubListChunk[0]; // 当前页待显示列表
                    $scope.maxSize = 5; // 最大显示分页条数
                    $scope.pageChanged = function() {
                        $scope.serialNubShow = $scope.serialNubListChunk[$scope.currentPage - 1];
                    };      
                } else {
                    swal("OMG", rsp.msg || "获取串码批量入库接口失败!", "error");
                }
            }, function() {
                $log.log('获取串码批量入库接口失败.');
            });
        };
    }])


