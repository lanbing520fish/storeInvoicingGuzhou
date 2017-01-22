 angular
        .module('app',[])
        .controller('controlName', ['$scope', '$http', function($scope, $http) {
          $scope.reader = new FileReader();  //創建一個FileReader接口
          $scope.form = {   //用於綁定提交內容，圖片或其他數據
            image:{},
          };
          $scope.thumb = {};   //用於存放圖片的base64
          $scope.thumb_default = {  //用於循環默認的‘加號'添加圖片的框
            1111:{}
          };
 
      $scope.img_upload = function(files) {    //單次提交圖片的函數
        $scope.guid = (new Date()).valueOf();  //通過時間戳創建一個隨機數，作為鍵名使用
        $scope.reader.readAsDataURL(files[0]);
         //FileReader的方法，把圖片轉成base64
        $scope.reader.onload = function(ev) {
          $scope.$apply(function(){
            $scope.thumb[$scope.guid] = {
              imgSrc : ev.target.result, //接收base64
            }
          });
        };
     
        var data = new FormData();   //以下為像後臺提交圖片數據
        data.append('image', files[0]);
        data.append('guid',$scope.guid);
        $http({
          method: 'post',
          url: '/comm/test-upload.php?action=success',
          data:data,
          headers: {'Content-Type': undefined},
          transformRequest: angular.identity
        }).success(function(data) {
          if (data.result_code == 'SUCCESS') {
            $scope.form.image[data.guid] = data.result_value;
            $scope.thumb[data.guid].status = 'SUCCESS';
            console.log($scope.form)
          }
          if(data.result_code == 'FAIL'){
            console.log(data)
          }
        })
    };
 
  $scope.img_del = function(key) {  //刪除，刪除的時候thumb和form裡面的圖片數據都要刪除，避免提交不必要的
    var guidArr = [];
    for(var p in $scope.thumb){
      guidArr.push(p);
    }
    delete $scope.thumb[guidArr[key]];
    delete $scope.form.image[guidArr[key]];
  };
  $scope.submit_form = function(){  //圖片選擇完畢後的提交，這個提交並沒有提交前面的圖片數據，隻是提交用戶操作完畢後，到底要上傳哪些，通過提交鍵名或者鏈接，後臺來判斷最終用戶的選擇,整個思路也是如此
    $http({
      method: 'post',
      url: '/comm/test.php',
      data:$scope.form,
    }).success(function(data) {
      console.log(data);  
    })
  };
}]);
