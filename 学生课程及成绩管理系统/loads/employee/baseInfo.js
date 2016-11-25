var app = angular.module("app.baseInfo", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/baseInfo", {
        templateUrl: "loads/employee/baseInfo.html",
        controller: "baseInfoController"
    });
});
app.controller("baseInfoController", function ($scope, modalService) {
    $scope.baseInfo = {
        option: "",
        members: $scope.$parent.memberManData.baseInfo,
        modalTitle: "",
        criteria: {},//模板，用于筛选
        modal: {},   //用于接受筛选条件
        allSelectFlag:0,
        //给经理们加上特殊符号
        judge: function (position) {
            if (position == "经理" || position == "副经理") {
                return "glyphicon glyphicon-user margin";
            }
        },
        showAddPage: function () {
            $scope.newMember = {};
            $scope.newMember.gender = "男";
            this.option = "add";
            this.modalTitle = "添加学生信息";
            modalService.open("baseInfoModal");
        },
        addMember: function () {
            var newMember = $scope.newMember;
            newMember.id = this.members[this.members.length - 1].id + 1;
            newMember.joinDate = modalService.currentDate();
            this.members.push(newMember);
            modalService.close("baseInfoModal");
            $scope.newMember = null;
        },
        delMember: function () {
            var members = this.members;
            var length = members.length;
            var flag = 0;
            for (var k = 0; k < length; k++) {
                if (members[k].checked) {
                    flag++;
                }
            }
            if (flag == 0) {
                alert("请至少选择一条要删除的信息！");
                return 0;
            }
            if (window.confirm("确认删除？")) {
                for (var i = 0; i < length; i++) {
                    for (var j = 0; j < members.length; j++) {
                        if (members[j].checked == true) {
                            members.splice(j, 1);
                        }
                    }
                }
            }
        },
        showUpdPage: function (id, event) {
            $scope.newMember = this.members.filter(function (item) {
                return item.id == id;
            })[0];
            modalService.open("baseInfoModal");
            this.option = "upd";
            this.modalTitle = "修改" + $scope.newMember.name + "的信息";
            //阻止事件冒泡
            event.stopPropagation();
        },
        updMember: function () {
            console.log($scope.newMember);
            modalService.close("baseInfoModal");
        },
        searchMember: function () {
            this.criteria = {};
            if (this.modal.key && this.modal.val) {
                this.criteria[this.modal.key]
                    = this.modal.val;
            } else {
                this.criteria = {};
            }
        },
        //单击全选按钮
        allSelect : function(){
            if(!this.allSelectFlag) {
                this.members.forEach(function (item) {
                    item.checked = true;
                });
                this.allSelectFlag = 1;
            }else{
                this.members.forEach(function (item) {
                    item.checked = false;
                });
                this.allSelectFlag = 0;
            }
        }
    };
    //单击表格行选中复选框
    $scope.changeCheck = function (index) {
        var stus = $scope.baseInfo.members;
        for (var i = 0; i < stus.length; i++) {
            if (stus[i].id == index) {
                if (stus[i].checked == false || stus[i].checked == undefined) {
                    stus[i].checked = true;
                    return 0;
                } else {
                    stus[i].checked = false;
                    return 0;
                }
            }
        }
    };
});
app.factory("modalService", function () {
    return {
            open: function (id) {
            angular.element(document.getElementById(id)).modal("show");
        },
        close: function (id) {
            angular.element(document.getElementById(id)).modal("hide");
        },
        currentDate: function () {
            var date = new Date();
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        }
    }
});