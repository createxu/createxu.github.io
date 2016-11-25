var app = angular.module("app",[
   "ngRoute",
   "app.baseInfo",
   "app.jcRecord",
   "app.buyInfo",
   "app.material",
   "app.income",
   "app.revenue"
]);

app.controller("firstCtl",function($scope,$http){
   //数据声明
   $scope.memberManData = {};
   $scope.incomeData = {};
   $scope.foodData={};
   $scope.bmzcData = {};
   $scope.jcRecordData = {};
   $http.get("json/config.json").success(function(data){
      $scope.info = data;
      $scope.data.tabs = data.filter(function(item){
         return item.parent == 1;
      });
   });
   $scope.data = {};
   $scope.data.tabs = [];
   $scope.data.changeTabs = function(id){
      var ss = $scope.data.tabs = $scope.info.filter(function(item){
         return item.parent == id;
      });
   };
   //初始化界面
   window.open("#baseInfo","_self");
   //加载数据
   //获取员工信息
   $http.get("json/baseInfo.json").success(function(data){
      $scope.memberManData.baseInfo = data;
   });
   $http.get("json/income.json").success(function(data){
      $scope.incomeData.incomes = data;
   });
   $http.get("json/foods.json").success(function(data){
      $scope.foodData.foods=data;
   });
   $http.get("json/bmzc.json").success(function(data){
      $scope.bmzcData.bmzcs = data;
   });
   $http.get("json/jcRecord.json").success(function(data){
      $scope.jcRecordData.jcRecords = data;
   })
});