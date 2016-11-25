var app = angular.module("app.buyInfo", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/buyInfo", {
        templateUrl: "loads/purchase/buyInfo.html",
        controller: "buyInfoController"
    });
});
app.controller("buyInfoController", function ($scope, $http, modalService) {
    $scope.msg = "这是课程信息页面";
    $scope.foodData = {
        foods: $scope.$parent.foodData.foods,
        option: "",
        modalTitle: "",
        newFood: null,
        criteria: {},
        modal: {},
        //添加食物打开模态框
        showAddUpd: function () {
            this.option = "add";
            this.modalTitle = "添加课程信息";
            this.newFood = null;
            modalService.open("foodModal");
        },
        //添加食物
        addFood: function () {
            var fo = new Food(
                $scope.foodData.newFood.type,
                $scope.foodData.newFood.save,
                $scope.foodData.newFood.spend,
                $scope.foodData.newFood.place,
                $scope.foodData.newFood.much,
                $scope.foodData.newFood.time,
                $scope.foodData.newFood.personName
            );
            this.foods.push(fo);
            this.foods[this.foods.length - 2].days = null;//只给最新添加元素显示最新添加标识
            modalService.close("foodModal");
        },
        //删除食物
        delFood: function () {
            var fo = this.foods.some(function (item) {
                return item.checked == true;
            });
            if (fo) {
                if (window.confirm("确认删除?")) {
                    $scope.$parent.foodData.foods = this.foods =
                        this.foods.filter(function (item) {
                            return item.checked != true;
                        });
                }
                this.foods[this.foods.length - 1].days = "最新";//删除最新添加元素后，将上一元素设置为最新添加
            } else {
                alert("没有选中要删除的食物列表");
            }
        },
        //全选操作(当用户事先选中一个时，也可以实现多选)
        allCheckedFlag: 0,
        allChecked: function () {
            if (!this.allCheckedFlag) {
                this.foods.forEach(function (item) {
                    item.checked = true;
                });
                this.allCheckedFlag = 1;
            } else {
                this.foods.forEach(function (item) {
                    item.checked = false;
                });
                this.allCheckedFlag = 0;
            }
        },
        //修改操作(显示模态框)
        changeFood: function (id) {
            this.option = "upd";

            var fo = this.foods.filter(function (item) {
                return item.id == id;
            })[0];
            this.modalTitle = "修改" + fo.type + "信息";
            $scope.foodData.newFood = fo;
            modalService.open("foodModal");
        },
        //修改时提交，直接关闭模态框
        changeUpd: function () {
            modalService.close("foodModal");
        },
        //搜索食物
        searchFood: function () {
            this.criteria = {};
            if (this.modal.key && this.modal.val) {
                this.criteria[this.modal.key] = this.modal.val;
            } else {
                this.criteria = {};
            }
        },
        //表单验证
        getErrorMsg: function (error) {
            if (error) {
                var demo = error.$error;
                if (demo.required) {
                    return "请输入内容"
                } else if (demo.number) {
                    return "请输入正确的金额数字"
                }
            }
        }
    };
});
//创建添加食物的构造函数
var beginId = 1005;
function Food(type, save, spend, place, much, time, personName, sheng) {
    this.id = ++beginId;
    this.type = type;
    this.save = save;
    this.spend = spend;
    this.place = place;
    this.much = much;
    this.time = time;
    this.personName = personName;
    this.days = "最新";
    this.used = 0;
    this.sheng = much;
}