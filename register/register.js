angular
    .module('registerModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.stepNum = 0; // 当前显示的step索引值（Number类型）
        $rootScope.goBack = function(num) { // 返回（num-1）
            $rootScope.stepNum = num - 1;
        };
        $rootScope.forward = function(num) { // 返回（num+1）
            $rootScope.stepNum = num + 1;
        };

        $rootScope.regionInfoList = []; // 地区列表
        $rootScope.storesInfoList = []; //定位门店信息列表
        $rootScope.parameterList = {}; //商户注册的参数
        $rootScope.checkedStoreList = []; //选中官方门店信息
        $rootScope.Checkpassword = false; //提示密码输入错误
        $rootScope.addClerkList = []; //添加的店员列表
        $rootScope.isaddProvider = false; //提示供应商输入信息

        $rootScope.showLocation = false;
        $rootScope.showLocationNext = false;
        $rootScope.ishasrole = false;
        $rootScope.isSupplier = false;
    }])

    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpConfig = {
                'siteUrl': 'http://192.168.16.120:8088',
                'requestHeader': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'isMock': true // 是否开启测试数据
            },
            httpMethod = {};

        // 地区查询
        httpMethod.qryCommonRegionInfo = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/terminal/q/qryCommonRegionInfo',
                method: 'GET',
                headers: httpConfig.requestHeader
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

        // 根据工号密码定位门店信息
        httpMethod.qrychannelInfoByBss = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/common/q/qrychannelInfoByBss',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: "param=" + JSON.stringify(param)
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

        // 添加确认接口（最后的完成按钮）
        httpMethod.confirmRegistered = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/common/o/confirmRegistered',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: "param=" + JSON.stringify(param)
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
            // 地区查询
            Mock.mock(httpConfig.siteUrl + '/chain/terminal/q/qryCommonRegionInfo', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|5': {
                    "resCode":"0000", //结果编码 0000代表成功 0001代表错误
                    "resMsg":"success", //结果描述 成功是success 错误的为错误原因 例如：查询结果为空
                    "areaList":[
                      {
                        'areaId': null,
                        'areaLevel': 2, //(地区等级，1：国家，2:省，3，市)
                        'childrenCommon':[ //[(下一级地区列表)
                        {
                            'areaId': null,
                            'areaLevel': 3,
                            'childrenCommon': null,
                            'commonRegionId': 17399, //(区域id)
                            'createDate': "2013-04-15 11:46:11",
                            'idPrefix': 73,
                            'regionCode': "8150300",
                            'regionDesc': "乌海市", //(区域详情)
                            'regionName': "乌海市", //(区域名称)
                            'upRegionId': 2, //(上一级commonRegionId)
                            'zipCode': "0473",
                            'zoneNumber': "17399",
                        },{
                            'areaId': null,
                            'areaLevel': 3,
                            'childrenCommon': null,
                            'commonRegionId': 17399, //(区域id)
                            'createDate': "2013-04-15 11:46:11",
                            'idPrefix': 73,
                            'regionCode': "8150301",
                            'regionDesc': "呼和浩特市", //(区域详情)
                            'regionName': "呼和浩特市", //(区域名称)
                            'upRegionId': 2, //(上一级commonRegionId)
                            'zipCode': "0473",
                            'zoneNumber': "17399",
                        }],
                        'commonRegionId': 2,
                        'createDate': "2013-04-15 11:46:11",
                        'idPrefix': 99,
                        'regionCode': "8150000",
                        'regionDesc': "内蒙古自治区",
                        'regionName': "内蒙古",
                        'upRegionId': null,
                        'zipCode': "0000",
                        'zoneNumber': "2",
                      }
                    ],
                },
                'errors': null,
            });

            // 根据工号密码定位门店信息
            Mock.mock(httpConfig.siteUrl + '/chain/common/q/qrychannelInfoByBss', {
                'rsphead':'s',
                'success':true,
                'code':null,
                'msg':null,
                'data':{
                    'resCode':'0000',//成功查询到是0000其他是0001
                    'resMsg':'success',//错误原因 成功是success 如果没有查询成功要弹出提示框提示此原因 例如：账号或密码不正确
                    'bssId':'A5da4d5f',//bss工号
                    'bizmanStaffName':'徐大发',//商户负责人名称 这个名字要带到我的设置里面的【我的姓名】
                    'operatorsId':'134545813',//经营主体ID
                    'channelList':[{     //门店list
                            'channelId':'5312641',//门店ID
                            'channelName':'鼓楼天翼广场1',//门店名称
                            'channelAddress':'南京市鼓楼区XXX大街XXX号',
                            'channelPhone':'025-1235124',    
                        },
                        {
                            'channelId':'5312642',//门店ID
                            'channelName':'鼓楼天翼广场2',//门店名称
                            'channelAddress':'南京市鼓楼区XXX大街XXX号',
                            'channelPhone':'025-1235124',
                        },
                        {
                            'channelId':'5312643',//门店ID
                            'channelName':'鼓楼天翼广场3',//门店名称
                            'channelAddress':'南京市鼓楼区XXX大街XXX号',
                            'channelPhone':'025-1235124',
                        }],
                },
                'errors':null
            });

            // 添加确认接口（最后的完成按钮）
            Mock.mock(httpConfig.siteUrl + '/chain/common/o/confirmRegistered', {
                'rsphead':'s',
                'success':true,
                'code':null,
                'msg':null,
                'data':{
                'resCode':'0000',//结果 正确为0000 错误是0001
                'resMsg':'success' //如果正确是success，错误是对应错误内容 例如：错误的手机号码位数
                },
                'errors':null,
            });
        }

        return httpMethod;
    }])
    // 角色权限转换文本
    .filter('roleListText', function () {
        return function (stateValue) {
            switch (stateValue) {
                case '1001':
                    return '店长';
                    break;
                case '1002':
                    return '收银员';
                    break;
                case '1003':
                    return '仓库管理员';
                    break;
                case '1004':
                    return '销售员';
                    break;
            }
        }
    })
    // 状态转换文本
    .filter('statusText', function () {
        return function (value) {
            switch (value) {
                case 1:
                    return '启用';
                    break;
                case 0:
                    return '停用';
                    break;
            }
        }
    })
    // 官方门店列表查询
    .controller('queryStoreCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {

        httpMethod.qryCommonRegionInfo().then(function(rsp) {
            $rootScope.regionInfoList = rsp.data.areaList;
            $log.log('获取地区列表成功.');
        }, function() {
            $log.log('获取地区列表失败.');
        });

        $scope.clHide = function() {
            $scope.visible = false;
        };

        $scope.isForbid = true;
        $scope.storeListForm = ({
            regionCode: '',//地区ID
            bssId: '',//bss工号
            password: '',//bss密码
        });

        // 城市选择
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
        };
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
                    $scope.storeListForm.regionCode = areaId;
                    $scope.cityName = areaName;
                    me.handleSubmitBtn(level);
                    break;
            }
        };
        $scope.handleSubmitBtn = function(level) {
            switch (level) {
                case 'province':
                    $scope.checkedAreaName = $scope.provinceName;
                    break;
                case 'city':
                    $scope.checkedAreaName = $scope.provinceName + ' ' + $scope.cityName;
                    $scope.visible = false;
                    break;
            }
        };

        $scope.locationFormSubmit = function () {
            if($scope.storeListForm.regionCode && $scope.storeListForm.bssId && $scope.storeListForm.password){
                $rootScope.showLocation = false;
                var param = {
                    regionCode: '',//地区ID
                    bssId: '',//bss工号
                    password: '',//bss密码
                };
                $scope.storeListForm.regionCode ? param.regionCode = $scope.storeListForm.regionCode : '';
                $scope.storeListForm.bssId ? param.bssId = $scope.storeListForm.bssId : '';
                $scope.storeListForm.password ? param.password = $scope.storeListForm.password : '';

                // 根据工号密码定位门店信息
                httpMethod.qrychannelInfoByBss(param).then(function (rsp) {
                    $log.log('调用定位门店信息接口成功.');
                    $rootScope.storesInfoList = rsp.data;
                }, function () {
                    $log.log('调用定位门店信息接口失败.');
                });
            }else{
                $rootScope.showLocation = true;
                return false;
            }
        };

    }])
    // 官方门店查询结果控制器
    .controller('queryStoreListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        // 选中索引
        $scope.selectStoreList = function (index) {
            $rootScope.checkedStoreList = $rootScope.storesInfoList.channelList[index];
        }
        $scope.selectStoreListFormSubmit = function (data) {
            if($rootScope.checkedStoreList.length != 0){
                $rootScope.showLocationNext = false;
                $rootScope.stepNum = 1;
                // 更新数据为选择的模块信息
                $rootScope.parameterList.bizmanStaffName = $rootScope.storesInfoList.bizmanStaffName;
                $rootScope.parameterList.operatorsId = $rootScope.storesInfoList.operatorsId;
                $rootScope.parameterList.channel = $rootScope.checkedStoreList;
            }else{
                $rootScope.showLocationNext = true;
                return false;
            }
        }
    }])
    // 设置信息控制器
    .controller('setInfoCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        $scope.MsgForm = ({
            myName: '',//注册人填写名称
            userId: '',//注册人的登陆账号
            password: '',//注册人的密码
            checkpassword: '',//确认密码
            phoneNumber: '',//注册人的电话号码
            roleList: '1001', //角色，店长为1001，收银员为1002，库管为1003，销售员为1004 商负责人1005
        });
        $scope.setBasicInfo = function (data) {
            if($scope.MsgForm.password === $scope.MsgForm.checkpassword && $scope.MsgForm.password && $scope.MsgForm.myName && $scope.MsgForm.userId && $scope.MsgForm.password && $scope.MsgForm.checkpassword && $scope.MsgForm.phoneNumber){
                $rootScope.Checkpassword = false;
            }else{
                $rootScope.Checkpassword = true;
            };

            if($rootScope.Checkpassword){
                return false;
            }else{
                $rootScope.stepNum = 2;
                // 更新数据为输入的信息
                $rootScope.parameterList.myName = $scope.MsgForm.myName;
                $rootScope.parameterList.userId = $scope.MsgForm.userId;
                $rootScope.parameterList.password = $scope.MsgForm.password;
                $rootScope.parameterList.checkpassword = $scope.MsgForm.checkpassword;
                $rootScope.parameterList.phoneNumber = $scope.MsgForm.phoneNumber;
                $rootScope.parameterList.roleList = $scope.MsgForm.roleList;
            }
        }

    }])
    // 添加店员控制器
    .controller('addClerkCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {

        $scope.addClerk = [];
        $scope.myStaffListForm = {
            staffName: '',//员工姓名
            userId: '',//员工登陆账号
            password: '',//员工登陆密码
            checkpassword: '',//确认员工登陆密码
            phoneNumber: '',//员工的电话号码
            role1: false,//店长
            role2: false,//收银员
            role3: false,//仓库管理员
            role4: false,//销售员
        };
        $scope.resetSubmit = function(){
            $scope.myStaffListForm = [];
        };
        $scope.addClerkSubmit = function () {
            if($scope.myStaffListForm.password === $scope.myStaffListForm.checkpassword && $scope.myStaffListForm.password){
                $rootScope.ishasrole = false;
            }else{
                $rootScope.ishasrole = true;
            };
            if($rootScope.ishasrole){
                return false;
            }else{
                $scope.addClerk = {};
                $scope.addClerk.roleList = [];

                $scope.addClerk.staffName = $scope.myStaffListForm.staffName;
                $scope.addClerk.userId = $scope.myStaffListForm.userId;
                $scope.addClerk.password = $scope.myStaffListForm.password;
                $scope.addClerk.checkpassword = $scope.myStaffListForm.checkpassword;
                $scope.addClerk.phoneNumber = $scope.myStaffListForm.phoneNumber;
                //TODO 优化写法，撇开业务ID
                $scope.myStaffListForm.role1 && $scope.addClerk.roleList.push('1001');
                $scope.myStaffListForm.role2 && $scope.addClerk.roleList.push('1002');
                $scope.myStaffListForm.role3 && $scope.addClerk.roleList.push('1003');
                $scope.myStaffListForm.role4 && $scope.addClerk.roleList.push('1004');

            };
            $rootScope.addClerkList.push($scope.addClerk);
        };
        //删除
        $scope.deleteRole = function (index) {
            $scope.addClerkList.splice(index, 1);
        };

        $scope.addClerkNextSubmit = function () {
            if($rootScope.addClerkList.length != 0){
                $rootScope.ishasrole = false;
                $rootScope.stepNum = 3;
                $rootScope.parameterList.myStaffList = [];
                $rootScope.parameterList.myStaffList.push($rootScope.addClerkList);
            }else{
                $rootScope.ishasrole = true;
                return false;
            }
        };

    }])
    // 添加供应商
    .controller('addProviderCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {

        $scope.addClerk = [];
        $scope.addProviderList = [];
        $scope.mySupplierList = {
            supplierName: '',//供货商名称
            supplierLinkMan: '',//供货商联系人
            linkManPhone: '',//联系人电话
            supplierPhone: '',//公司电话
            supplierFax: '',//公司传真
            status: '' //1为停用 0为启用
        };

        $scope.toggleStatus = function(status) {
            $scope.mySupplierList.status = status;
        };

        $scope.addProviderSubmit = function () {
            if( $scope.mySupplierList.supplierName && $scope.mySupplierList.status === 1 || $scope.mySupplierList.status === 0 ){
                $rootScope.isaddProvider = false;
                $scope.addProvider = {};
                $scope.addProvider.supplierName = $scope.mySupplierList.supplierName;
                $scope.addProvider.supplierLinkMan = $scope.mySupplierList.supplierLinkMan;
                $scope.addProvider.linkManPhone = $scope.mySupplierList.linkManPhone;
                $scope.addProvider.supplierPhone = $scope.mySupplierList.supplierPhone;
                $scope.addProvider.supplierFax = $scope.mySupplierList.supplierFax;
                $scope.addProvider.status = $scope.mySupplierList.status;
            }else{
                $rootScope.isaddProvider = true;
                return false;
            }

            $scope.addProviderList.push($scope.addProvider);
        };

        // 删除
        $scope.deleteProvider = function(index){
            $scope.addProviderList.splice(index, 1);
        };

        $scope.finishSubmit = function(){
            if($scope.addProviderList.length !=0 ){
                $rootScope.isSupplier = false;
                $rootScope.parameterList.mySupplierList = [];
                $rootScope.parameterList.mySupplierList.push($scope.addProviderList);

                httpMethod.confirmRegistered($rootScope.parameterList).then(function(rsp) {
                    $log.log(rsp.success);
                }, function() {
                    $log.log('失败.');
                });
            }else{
                $rootScope.isSupplier = true;
                return false;
            }
        };



    }])

