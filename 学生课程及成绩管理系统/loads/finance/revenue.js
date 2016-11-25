var app = angular.module("app.revenue",["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when("/revenue",{
        templateUrl:"loads/finance/revenue.html",
        controller:"revenueController"
    });
});
app.controller("revenueController",function($scope,$http,modalService){
	$scope.msg = "这是学分总成绩页面";
    //----------界面切换代码---------
    //----------初始化界面---------
    $scope.changeFlag = "loads/finance/gzzc.html";
	$scope.bmzcData = {
		modalTitle:"",
		option:"",
		newBmzc:null,
		bmzcs : $scope.$parent.bmzcData.bmzcs,
		//incomes:[],
		showAddModal:function(){
			this.option = "add";
			this.modalTitle = "请输入要增加的总学分信息";
			this.newBmzc = null;
			modalService.open("bmzcModal");
		},
		addBmzc:function(){
			var bmzc = new Bmzc(
				this.newBmzc.time,
				this.newBmzc.count,
				this.newBmzc.dept
			);
			this.bmzcs.push(bmzc);
			modalService.close("bmzcModal");
		},
		showUpdModal:function(){
			this.option = "upd";
			var bmzc = this.bmzcs.filter(function(item){
				return item.checked == true;
			})[0];
			if (bmzc)
			{
				this.newBmzc = bmzc;
				this.modalTitle = "修改"+bmzc.time+"的学分";
				modalService.open("bmzcModal");
			}else{
				alert("请选中要修改的总学分");
			}
		},
		updBmzc:function(){
			modalService.close("bmzcModal");
		},
		delBmzc:function(){
			var b1 = this.bmzcs.some(function(item){
				return item.checked == true;
			});
			if (b1)
			{
				if (window.confirm("确认删除吗？"))
				{
					$scope.$parent.bmzcData.bmzcs = this.bmzcs = this.bmzcs.filter(function(item){
						return item.checked != true;
					});
				}
			}else{
				alert("请选择要删除的学分");
			}
		},
		searchBmzc:function(){
			this.criteria = {};
			if (this.modal.key&&this.modal.val)
			{
				this.criteria[this.modal.key] = this.modal.val;
			}else{
				this.criteria = {};
			}
		},
		allSelectFlag : 0,
		allSelect : function(){
					if(!this.allSelectFlag) {
						this.bmzcs.forEach(function (item) {
							item.checked = true;
						});
						this.allSelectFlag = 1;
					}else{
						this.bmzcs.forEach(function (item) {
							item.checked = false;
						});
						this.allSelectFlag = 0;
					}
		}
	};
var id = $scope.$parent.bmzcData.bmzcs.length;
function Bmzc(time,count,dept){
	this.id = ++id;
	this.time = time;
	this.count = count;
	this.dept = dept;
}
	$scope.changeCheck = function (index) {
        var bmzcs = $scope.bmzcData.bmzcs;
        for (var i = 0; i < bmzcs.length; i++) {
            if (bmzcs[i].id == index) {
                if (bmzcs[i].checked == false || bmzcs[i].checked == undefined) {
                    bmzcs[i].checked = true;
                    return 0;
                } else {
                    bmzcs[i].checked = false;
                    return 0;
                }
            }
        }
    };
	$scope.gzzcData = {
		gzzcs:$scope.$parent.memberManData.baseInfo,
		newGzzc:null,
		modalTitle:"",
		judge: function (position) {
            if (position == "经理" || position == "副经理") {
                return "glyphicon glyphicon-user margin";
            }
        },
		showChangeSalary:function(){
			var gzzc = this.gzzcs.filter(function(item){
				return item.checked == true;
			})[0];
			if(gzzc){
				this.newGzzc = gzzc; //用于显示
				$scope.salary = {
					upSalary:0,
				}
				this.modalTitle = "修改"+gzzc.position+""+gzzc.name+"的学分"
				modalService.open("gzzcModal");
			}else{
				alert("请选中要修改的学生成绩学分");
			}
		},
		changeSalary:function(id){
			this.gzzcs.forEach(function(item){
				//找到要调整学分的对象
				if(item.id == id){
					//学分调整
					item.salary += $scope.salary.upSalary;
				}
			});
			modalService.close("gzzcModal");
		},
		searchGzzc:function(){
			this.criteria = {};
			if (this.modal.key&&this.modal.val)
			{
				this.criteria[this.modal.key] = this.modal.val;
			}else{
				this.criteria = {};
			}
		},
		allSelectFlag : 0,
		allSelect : function(){
					if(!this.allSelectFlag) {
						this.gzzcs.forEach(function (item) {
							item.checked = true;
						});
						this.allSelectFlag = 1;
					}else{
						this.gzzcs.forEach(function (item) {
							item.checked = false;
						});
						this.allSelectFlag = 0;
					}
		}
	};
	$scope.changeChecked = function (index) {
        var gzzcs = $scope.gzzcData.gzzcs;
        for (var i = 0; i < gzzcs.length; i++) {
            if (gzzcs[i].id == index) {
                if (gzzcs[i].checked == false || gzzcs[i].checked == undefined) {
                    gzzcs[i].checked = true;
                    return 0;
                } else {
                    gzzcs[i].checked = false;
                    return 0;
                }
            }
        }
    };	
});
