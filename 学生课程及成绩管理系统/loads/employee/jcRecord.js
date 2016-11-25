var app = angular.module("app.jcRecord",["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when("/jcRecord",{
        templateUrl:"loads/employee/jcRecord.html",
        controller:"jcRecordController"
    });
});
app.controller("jcRecordController",function($scope){
    $scope.jcRecord = {
        jcRecords_reword : $scope.$parent.jcRecordData.jcRecords.filter(function(item){
            return item.type == "reword";
        }),
        jcRecords_punishment : $scope.$parent.jcRecordData.jcRecords.filter(function(item){
            return item.type == "punishment";
        })
    };

});