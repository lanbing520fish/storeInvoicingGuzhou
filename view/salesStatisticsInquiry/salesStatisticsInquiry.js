angular
    .module('salesStatisticsInquiryModule', ['ui.bootstrap'])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.orderStatList = []; // 销售订单统计信息
        $rootScope.orderDetailsList = []; // 销售订单详细信息
    }])
    .factory('httpMethod', ['$http', '$q', function ($http, $q) {
        var httpConfig = {
                'siteUrl': 'http://192.168.16.84:8088',
                'requestHeader': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'isMock': true // 是否开启测试数据
            },
            httpMethod = {};

        // 查看销售订单统计信息接口
        httpMethod.saleSumByCond = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/retail/order/q/saleSumByCond',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 查看销售订单详细信息接口
        httpMethod.qrySaleStatistic = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/retail/order/q/qrySaleStatistic',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        if (httpConfig.isMock) {

            // 查看销售订单详细信息接口
            Mock.mock(httpConfig.siteUrl + '/chain/retail/order/q/qrySaleStatistic', {
                'endRow': 1,
                'firstPage': 1,
                'hasNextPage': false,
                'hasPreviousPage': false,
                'isFirstPage': true,
                'isLastPage': true,
                'lastPage': 1,
                'list|5': [{
                    'appType': null,
                    'billStaff': "付洋",
                    'bizmanId': 1,
                    'bizmanName': "贵州通信",
                    'createDt': "2017-02-08",
                    'custCardId': null,
                    'custName': "殷楠",
                    'custPhone': null,
                    'itemList|2': [{
                        'acctNbr': null,
                        'amount': 4999,
                        'costPrice': 123,
                        'damaged': null,
                        'damagedFlag': false,
                        'instCode': "20170208:01",
                        'instList': [{
                            'instCode': "20170208:01",
                            'offerId': 100000000018,
                            'retailItemId': 1000000000000204,
                            'retailItemInstId': 1000000000000205,
                        }],
                        'manageType': null,
                        'offerCode': "112905100019",
                        'offerId': 100000000018,
                        'offerModelName': "华为-1215",
                        'offerName': "魅蓝手机就是蓝",
                        'offerQty': 1,
                        'price': 4999,
                        'relaItemId': null,
                        'remarks': null,
                        'retailItemId': 1000000000000204,
                        'retailOrderId': "1201702081100000000203",
                        'saleTypeCd': 1,
                        'saleTypeName': "裸机销售",
                        'state': "A",
                        'stateName': null,
                        'ticketAmount': null,
                        'ticketCode': null,
                    }],
                    'lName': null,
                    'lvlName': null,
                    'orderNum': null,
                    'orderType|1': [1, 2, 3],
                    'orderTypeName': null,
                    'paymentList': [{
                        'amount': 4999,
                        'billId': 100000000206,
                        'operationType': "1",
                        'paymentDate': "2017-02-08",
                        'paymentId': 100000000207,
                        'paymentMethodCd|1': [1,2,3],
                        'posBanksSnum': null,
                        'posDeviceCd': null,
                        'posDeviceName': null,
                        'statusCd': "2",
                    }],
                    'paymentNumber': null,
                    'phone': null,
                    'relaOrderId': null,
                    'relaType': null,
                    'relaedList': null,
                    'remarks': null,
                    'retailOrderId': "1201702081100000000203",
                    'retailShopId': 2,
                    'retailShopName': "初始化渠道",
                    'retailStaff': 170119000001,
                    'retailStaffName': "付洋",
                    'retailStaffs': [{
                        'addFlag': null,
                        'areaId': null,
                        'bizman': null,
                        'bizmanId': 1,
                        'bizmanName': null,
                        'bss': null,
                        'channelId': null,
                        'crmStaffId': null,
                        'isTeleComRshop': null,
                        'linkNbr': null,
                        'parentBizman': null,
                        'password': null,
                        'remarks': null,
                        'retailShopAddr': null,
                        'retailShopCode': null,
                        'retailShopId': 2,
                        'retailShopName': null,
                        'retailShopType': null,
                        'roleId': null,
                        'roleName': null,
                        'roles': null,
                        'rolesInfo': Array[0],
                        'salesStaff': null,
                        'staffCode': "100000000007",
                        'staffId': 100000000007,
                        'staffName': "殷楠",
                        'statusCd': "1001",
                        'statusName': null,
                        'systemUser': null,
                        'systemUserCode': null,
                        'systemUserCodeJpqd': null,
                        'version': "2017-01-20",
                    }],
                    'staffId': 170119000001,
                    'staffName': "付洋",
                    'statusCd': "P",
                    'statusDt': "2017-02-08",
                    'statusName': null,
                    'totalAmount': 4999,
                }],
                'navigatePages': 8,
                'navigatepageNums': Array[1],
                'nextPage': 0,
                'pageNum': 1,
                'pageSize': 10,
                'pages': 1,
                'prePage': 0,
                'size': 1,
                'startRow': 1,
                'success': true,
                'total': 10,
            });

            // 查看销售订单统计信息接口
            Mock.mock(httpConfig.siteUrl + '/chain/retail/order/q/saleSumByCond', {
                'endRow': 1,
                'firstPage': 1,
                'hasNextPage': false,
                'hasPreviousPage': false,
                'isFirstPage': true,
                'isLastPage': true,
                'lastPage': 1,
                'list': [{
                    'billStaffId': 170119000001,
                    'endDt': "2017-02-08",
                    'retailShopId': 2,
                    'rssLst': null,
                    'startDt': "2017-01-22",
                    'success': true,
                    'sumList': [{
                        'sumList': null,
                        'payAmount': 4999,
                        'payCd|1': [1,2,3],
                        'payName': null,
                        'retailOrderId': null,
                    }],
                    'todoCount': 0,
                    'totalAmount': 4999,
                }],
                'navigatePages': 8,
                'navigatepageNums': Array[1],
                'nextPage': 0,
                'pageNum': 1,
                'pageSize': 10,
                'pages': 1,
                'prePage': 0,
                'size': 1,
                'startRow': 1,
                'success': true,
                'total': 10,
            });
        }

        return httpMethod;
    }])
    //付款方式：1，现金 2，POS机 3，抵用卷
    .filter('paymentMethodCdType', function() {
        return function(cdValue) {
            switch (cdValue) {
                case 1:
                    return '现金';
                    break;
                case 2:
                    return 'POS机';
                    break;
                case 3:
                    return '抵用卷';
                    break;
            }
        }
    })
    //订单类型：1，零售销售 2，零售退货 3，零售换货
    .filter('orderType', function() {
        return function(value) {
            switch (value) {
                case 1:
                    return '零售销售';
                    break;
                case 2:
                    return '零售退货';
                    break;
                case 3:
                    return '零售换货';
                    break;
            }
        }
    })

    .controller('salesStatisticsInquiryQuery', ['$scope', '$rootScope', '$timeout','httpMethod', '$log', function($scope, $rootScope, $timeout, httpMethod, $log) {

        $scope.querySalesForm = {
            createStartDt: '', //制单日期开始
            createEndDt: '', //制单日期结束
        };

        // 时间控件
        $scope.startDateOptions = {
            formatYear: 'yy',
            maxDate: $scope.querySalesForm.createEndDt,
            startingDay: 1
        };
        $scope.endDateOptions = {
            formatYear: 'yy',
            minDate: $scope.querySalesForm.createStartDt,
            // maxDate: new Date(),
            startingDay: 1
        };

        $scope.$watch('querySalesForm.createStartDt', function(newValue) {
            $scope.endDateOptions.minDate = newValue;
        });
        $scope.$watch('querySalesForm.createEndDt', function(newValue) {
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

        // 查询结果分页信息
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 5; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        //查询
        $scope.querySaleSumByCondSubmit = function(){
            var data = {
                billFlag: true,
                billStaffId: 170119000001,
                billStaffName: "付洋",
                retailShopId: 2,
                retailShopName: "初始化渠道",
                shopType: "1",
            };
            httpMethod.qrySaleStatistic(data).then(function (rsp) {
                $rootScope.orderDetailsList = rsp.list;
                $scope.totalNum = rsp.total;
                $log.log('调用查看销售订单详细信息接口成功.');
            }, function () {
                $log.log('调用查看销售订单详细信息接口失败.');
            });
        };


        $scope.queryFormSubmit = function(){
            var param = {
                startDt: $scope.querySalesForm.createStartDt ? moment($scope.querySalesForm.createStartDt).format("YYYY-MM-DD hh:mm:ss") : '', //开始时间
                endDt: $scope.querySalesForm.createEndDt ? moment($scope.querySalesForm.createEndDt).format("YYYY-MM-DD hh:mm:ss") : '', //结束时间

                billFlag: true, // 是否需要收银信息
                billStaffId: 170119000001, //查询员工id
                billStaffName: "付洋", //员工姓名
                curPage: 1, //当前分页
                dateTruncFlag: false, //是否截取日期
                pageSize: $scope.rowNumPerPage, // 每页展示行数
                retailShopId: 2, //查询的门店id
                retailShopName: "初始化渠道", //查询的门店名称
                shopType: "1" //查询的门店类型
            };
            httpMethod.saleSumByCond(param).then(function (rsp) {
                $rootScope.orderStatList = rsp.list;
                $log.log('查看销售订单统计信息成功.');
            }, function () {
                $log.log('查看销售订单统计信息失败.');
            });
            $scope.querySaleSumByCondSubmit();
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
            $scope.querySaleSumByCondSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
