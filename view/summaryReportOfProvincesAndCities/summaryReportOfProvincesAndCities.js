angular
    .module('staffModule', ['ui.bootstrap'])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpConfig = {
                'siteUrl': 'http://ip:port/chain',
                'requestHeader': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'isMock': true // 是否开启测试数据
            },
            httpMethod = {};

        //地区信息查询接口
        httpMethod.qryCommonRegionInfo = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/terminal/q/qryCommonRegionInfo',
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

        //渠道类型获取接口
        httpMethod.loadChannelType = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/report/q/loadChannelType',
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

        //自有厅级别获取获取接口
        httpMethod.loadMyHall = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/report/q/loadMyHall',
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

        //专营店星级获取接口
        httpMethod.loadBoutiqueStar = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/report/q/loadBoutiqueStar',
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

        //商品品牌查询接口
        httpMethod.qryBrands = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/config/basic/q/qryBrands',
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

        //商品型号查询接口
        httpMethod.qryModels = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/config/basic/q/qryModels',
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
            //地区信息查询接口
            Mock.mock(httpConfig.siteUrl + '/terminal/q/qryCommonRegionInfo', {
                'data|5': [{
                    'areaId': null,
                    'areaLevel': 2,
                    'childrenCommon|8':[{
                        'areaId': null,
                        'areaLevel': 3,
                        'childrenCommon': null,
                        'commonRegionId': '@id',
                        'createDate': '2013-04-15 11:46:11',
                        'idPrefix': 73,
                        'regionCode': '8150300',
                        'regionDesc': '',
                        'regionName': '@city',
                        'upRegionId': 2,
                        'zipCode': '0473',
                        'zoneNumber': '17399'
                    }],
                    'commonRegionId': '@id',
                    'createDate': '2013-04-15 11:46:11',
                    'idPrefix': 99,
                    'regionCode': '8150000',
                    'regionDesc': '',
                    'regionName': '@province',
                    'upRegionId': null,
                    'zipCode': '0000',
                    'zoneNumber': '2'
                }]
            });

            //渠道类型获取接口
            Mock.mock(httpConfig.siteUrl + '/report/q/loadChannelType', {
                'data': [{
                    'channelTypeId':'1101',
                    'channelTypeName': '自有厅'
                },{
                    'channelTypeId': '1102',
                    'channelTypeName': '专营店'
                },{
                    'channelTypeId': '1103',
                    'channelTypeName': '连锁厅'
                },{
                    'channelTypeId': '1104',
                    'channelTypeName': '独立店'
                },{
                    'channelTypeId': '1105',
                    'channelTypeName': '便利店'
                }]
            });

            //自有厅级别获取获取接口
            Mock.mock(httpConfig.siteUrl + '/report/q/loadMyHall', {
                'data': [{
                    'hallLevelId': '10',
                    'hallLevelName': '一级店'
                },{
                    'hallLevelId': '20',
                    'hallLevelName': '二级店'
                },{
                    'hallLevelId': '30',
                    'hallLevelName': '三级店'
                },{
                    'hallLevelId': '40',
                    'hallLevelName': '四级店'
                },{
                    'hallLevelId': '50',
                    'hallLevelName': '五级店'
                },{
                    'hallLevelId': '100',
                    'hallLevelName': '待审批'
                }]
            });

            //专营店星级获取接口
            Mock.mock(httpConfig.siteUrl + '/report/q/loadBoutiqueStar', {
                'data': [{
                    'boutiqueStarId': '10',
                    'boutiqueStarName': '0星级'
                },{
                    'boutiqueStarId': '11',
                    'boutiqueStarName': '1星级'
                },{
                    'boutiqueStarId': '12',
                    'boutiqueStarName': '2星级'
                },{
                    'boutiqueStarId': '13',
                    'boutiqueStarName': '3星级'
                },{
                    'boutiqueStarId': '14',
                    'boutiqueStarName': '4星级'
                },{
                    'boutiqueStarId': '15',
                    'boutiqueStarName': '5星级'
                },{
                    'boutiqueStarId': '20',
                    'boutiqueStarName': '待审批'
                }]
            });

            //商品品牌查询接口
            Mock.mock(httpConfig.siteUrl + '/config/basic/q/qryBrands', {
                'data':{
                    'endRow': 1,
                    'firstPage': 1,
                    'hasNextPage': false,
                    'hasPreviousPage': false,
                    'isFirstPage': true,
                    'isLastPage': true,
                    'lastPage': 1,
                    'list|100':[{
                        'bizmanId': null,
                        'brandCd|1': ['a', 'b', 'c', 'd'],
                        'brandName': '@cword(4)',
                        'categoryCd': '@id',
                        'codeRegex': null,
                        'firstLetter|1': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                        'seq': 111
                    }],
                    'navigatePages': 8,
                    'navigatepageNums': Array[1],
                    'nextPage': 0,
                    'pageNum': 1,
                    'pageSize': 20,
                    'pages': 1,
                    'prePage': 0,
                    'size': 1,
                    'startRow': 1,
                    'total': 1
                }
            });

            //商品型号查询接口
            Mock.mock(httpConfig.siteUrl + '/config/basic/q/qryModels', {
                'data': {
                    'endRow': 1,
                    'firstPage': 1,
                    'hasNextPage': false,
                    'hasPreviousPage': false,
                    'isFirstPage': true,
                    'isLastPage': true,
                    'lastPage': 1,
                    'list|50':[{
                        'bizmanId': null,
                        'brandCd|1': ['a', 'b', 'c', 'd'],
                        'brandName':' ',
                        'categoryCd': 1,
                        'categoryName': '手机',
                        'codeRegex': null,
                        'mergeSerId': null,
                        'modelCd': '@id',
                        'modelName': '@cword(5)',
                        'seq': null,
                        'source': '3',
                        'sourceName': '私有商品',
                        'unifyOfferModelId': null,
                    }],
                    'navigatePages': 8,
                    'navigatepageNums': Array[1],
                    'nextPage': 0,
                    'pageNum': 1,
                    'pageSize': 20,
                    'pages': 1,
                    'prePage': 0,
                    'size': 1,
                    'startRow': 1,
                    'total': 1
                }
            });

        }
        return httpMethod;
    }])
    .controller('combinationQuery', ['$scope', '$timeout', '$log', 'httpMethod', function($scope, $timeout, $log, httpMethod) {

        $scope.billDate = '';

        $scope.monthList = [{
            monthNub: '01'
        },{
            monthNub: '02'
        },{
            monthNub: '03'
        },{
            monthNub: '04'
        },{
            monthNub: '05'
        },{
            monthNub: '06'
        },{
            monthNub: '07'
        },{
            monthNub: '08'
        },{
            monthNub: '09'
        },{
            monthNub: '10'
        },{
            monthNub: '11'
        },{
            monthNub: '12'
        }]

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

        //渠道类型选择
        $scope.channelType = false;
        $scope.channelTypeCheck = function(){
            $scope.channelType = !$scope.channelType;
        };
        $scope.channelTypeHide = function() {
            $scope.channelType = false;
        };

        $scope.checkedChannelList = [];
        $scope.shelve = [];
        httpMethod.loadChannelType().then(function(data) {
            $scope.loadChannelList = data.data;
            $log.log('调用渠道类型获取接口成功!')
        });

        $scope.checkChannel = function(item, index){
            if(!$scope.shelve[index]){
                $scope.checkedChannelList.push(item);
            };
        };

        $scope.delchannelType = function(item, index){
            $scope.delchannel = item;
            $scope.loadChannelList.map(function(item, index){
                if(item.channelTypeId == $scope.delchannel.channelTypeId){
                    $scope.shelve[index] = false;
                };
            });
            $scope.checkedChannelList.splice(index,1);
        };

        $scope.channelTypeConfirm = function(){
            $scope.checkedChannelType = '';
            $scope.channelType = false;
            if($scope.checkedChannelList.length){
                $scope.checkedChannelList.map(function(item){
                    $scope.checkedChannelType += item.channelTypeName + ' ';
                });
            }
        };

        //自有厅级别选择
        $scope.showLevel = false;
        $scope.ownHallLevelCheck = function(){
            $scope.showLevel = !$scope.showLevel;
        };
        $scope.ownHallLevelHide = function() {
            $scope.showLevel = false;
        };
        $scope.checkedOwnHallLevelList = [];
        $scope.levelShelve = [];
        httpMethod.loadMyHall().then(function(data) {
            $scope.loadMyHallList = data.data;
            $log.log('调用自有厅级别获取获取接口成功!')
        });

        $scope.checkOwnHallLevel = function(item, index){
            if(!$scope.levelShelve[index]){
                $scope.checkedOwnHallLevelList.push(item);
            };
        };

        $scope.delOwnHallLevel = function(item, index){
            $scope.delOwnHall = item;
            $scope.loadMyHallList.map(function(item, index){
                if(item.hallLevelId == $scope.delOwnHall.hallLevelId){
                    $scope.levelShelve[index] = false;
                };
            });
            $scope.checkedOwnHallLevelList.splice(index,1);
        };

        $scope.ownHallLevelConfirm = function(){
            $scope.checkedOwnHallLevel = '';
            $scope.showLevel = false;
            if($scope.checkedOwnHallLevelList.length){
                $scope.checkedOwnHallLevelList.map(function(item){
                    $scope.checkedOwnHallLevel += item.hallLevelName + ' ';
                });
            };
        };

        //专营店星级选择
        $scope.showStar = false;
        $scope.storeStarCheck = function(){
            $scope.showStar = !$scope.showStar;
        };
        $scope.storeStarHide = function() {
            $scope.showStar = false;
        };
        $scope.checkedStoreStarList = [];
        $scope.starShelve = [];
        httpMethod.loadBoutiqueStar().then(function(data) {
            $scope.loadBoutiqueStarList = data.data;
            $log.log('调用专营店星级获取接口成功!')
        });
        $scope.checkStoreStar = function(item, index){
            if(!$scope.starShelve[index]){
                $scope.checkedStoreStarList.push(item);
            };
        };
        $scope.delStoreStar = function(item, index){
            $scope.delStar = item;
            $scope.loadBoutiqueStarList.map(function(item, index){
                if(item.boutiqueStarId == $scope.delStar.boutiqueStarId){
                    $scope.starShelve[index] = false;
                };
            });
            $scope.checkedStoreStarList.splice(index,1);
        };
        $scope.storeStarConfirm = function(){
            $scope.checkedStoreStar = '';
            $scope.showStar = false;
            if($scope.checkedStoreStarList.length){
                $scope.checkedStoreStarList.map(function(item){
                    $scope.checkedStoreStar += item.boutiqueStarName + ' ';
                });
            };
        };

        //品牌选择
        $scope.currentPage = 1;
        $scope.rowNumPerPage = 10;
        $scope.totalNum = 0;
        var brandParam = {
            'categoryCd': 1,
            'curPage': $scope.currentPage,
            'pageSize': $scope.rowNumPerPage,
            'totalSize': $scope.totalNum
        };
        httpMethod.qryBrands(brandParam).then(function(data){
            $scope.brandList = data.data.list;
            $scope.checkedIndex = 0;
            $log.log('调用商品品牌查询接口成功!')
        });

        $scope.brandLetterList = ['所有品牌', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        $scope.brandAll = true;
        $scope.brandShelve = [];
        $scope.checkedBrandList = [];
        $scope.brandType = false;
        $scope.brandChoice = function(){
            $scope.brandType = !$scope.brandType;
        };
        $scope.brandChoiceHide = function() {
            $scope.brandType = false;
        };
        $scope.brandLetterChecked = function(item, index){
            $scope.checkedIndex = index;
            if(item == '所有品牌'){
                $scope.brandAll = true;
            }else{
                $scope.brandAll = false;
                $scope.brandFirstLetter = item;
            };
        };
        $scope.checkBrand = function(item, index){
            if(!$scope.brandShelve[index]){
                $scope.checkedBrandList.push(item);
            };
        };
        $scope.delBrand = function(item, index){
            $scope.delBrandItem = item;
            $scope.brandList.map(function(item, index){
                if(item.brandCd == $scope.delBrandItem.brandCd){
                    $scope.brandShelve[index] = false;
                };
            });
            $scope.checkedBrandList.splice(index,1);
        };
        $scope.brandChoiceConfirm = function(){
            $scope.brandIdList = [];
            $scope.categoryCdList = [];
            $scope.checkedBrandName = '';
            $scope.brandType = false;
            if($scope.checkedBrandList.length){
                $scope.checkedBrandList.map(function(item){
                    $scope.checkedBrandName += item.brandName + ' ';
                });
                $scope.modelCheckedBrandList = _.cloneDeep($scope.checkedBrandList);
                $log.log($scope.modelCheckedBrandList);
                $scope.modelCheckedBrandList.map(function(item,index){
                    var param = {
                        'brandId': item.brandCd
                    };
                    var cdParam = {
                        'categoryCd': item.categoryCd
                    };
                    $scope.brandIdList.push(param);
                    $scope.categoryCdList.push(cdParam);
                });
                $scope.qryModelsSubmit();
            };

        };

        //机型选择
        $scope.modelsList = [];
        $scope.modelshow = [];
        $scope.qryModelsSubmit = function(){
            var modelParam = {
                'brandId': $scope.brandIdList,
                'categoryCd': $scope.categoryCdList,
                'curPage': $scope.currentPage,
                'pageSize': $scope.rowNumPerPage,
                'totalSize': $scope.totalNum
            };
            httpMethod.qryModels(modelParam).then(function(data){
                $scope.modelsList = data.data.list;

                $scope.modelsList.map(function(item, index){
                    $scope.modelshow.push(true);
                });

                $log.log('调用商品型号查询接口成功!');
            });
        };
        $scope.modelLetterList = ['所有机型', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        $scope.modelType = false;
        $scope.checkedModelIndex = 0;
        $scope.modelShelve = [];
        $scope.checkModelList = [];
        $scope.modelChoice = function(){
            $scope.modelType = !$scope.modelType;
        };
        $scope.modelChoiceHide = function() {
            $scope.modelType = false;
        };

        $scope.modelLetterChecked = function(item, index){
            $scope.checkedModelIndex = index;
        };

        $scope.checkModel = function(item, index){
            if(!$scope.modelShelve[index]){
                $scope.checkModelList.push(item);
            };
        };

        $scope.delModel = function(item, index){
            $scope.delModelItem = item;
            $scope.modelsList.map(function(item, index){
                if(item.modelCd == $scope.delModelItem.modelCd){
                    $scope.modelShelve[index] = false;
                };
            });
            $scope.checkModelList.splice(index,1);
        };

        $scope.brandScreen = function(item){
            $scope.brandScreenItem = item;
            $scope.modelsList.map(function(item, index){
                if($scope.brandScreenItem.brandCd == item.brandCd){
                    $scope.modelshow[index] = true;
                }else{
                    $scope.modelshow[index] = false;
                };
            });
        };


    }])
    // 城市
    .controller('cityCheckCtrl', ['$scope', '$log', 'httpMethod', function($scope, $log, httpMethod) {

        var param = {
            'commonRegionId': ''
        };
        httpMethod.qryCommonRegionInfo(param).then(function(data) {
            $scope.regionList = data.data;
            $log.log('调用地区信息查询接口成功!')
        });

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
    .controller('resultCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        
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
