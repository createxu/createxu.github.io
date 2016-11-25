var app = angular.module("app.income",["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when("/income",{
        templateUrl:"loads/finance/income.html",
        controller:"incomeController"
    });
	$routeProvider.when("/revenue",{
        templateUrl:"loads/finance/revenue.html",
        controller:"incomeController"
    });
});
app.controller("incomeController",function($scope,$http,modalService){
	$scope.incomeData = {
		modalTitle:"",
		option:"",
		newInc:null,
		incomes : $scope.$parent.incomeData.incomes,
		//incomes:[],
		optionValue:null,
		changValue : function(event){
			alert(1);
			console.log(event);
		},
		showAddModal:function(){
			this.option = "add";
			this.modalTitle = "请输入要增加的学分信息";
			this.newInc = null;
			modalService.open("incomeModal");
		},
		addIncome:function(){
			//alert(1);
			var income = new Income(
				this.newInc.name,
				this.newInc.time,
				this.newInc.dept,
				this.newInc.count
			);
			this.incomes.push(income);
			modalService.close("incomeModal");
		},
		showUpdModal:function(){
			this.option = "upd";
			var income = this.incomes.filter(function(item){
				return item.checked == true;
			})[0];
			if (income)
			{
				this.newInc = income;
				this.modalTitle = "修改"+income.name+"的单科成绩";
				modalService.open("incomeModal");
			}else{
				alert("请选中要修改的学分");
			}
		},
		updIncome:function(){
			modalService.close("incomeModal");
		},
		delInc:function(){
			var b1 = this.incomes.some(function(item){
				return item.checked == true;
			});
			if (b1)
			{
				if (window.confirm("确认删除吗？"))
				{
					$scope.$parent.incomeData.incomes = this.incomes = this.incomes.filter(function(item){
						return item.checked != true;
					});
				}
			}else{
				alert("请选择要删除的学分成绩");
			}
		},
		searchInc:function(){
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
						this.incomes.forEach(function (item) {
							item.checked = true;
						});
						this.allSelectFlag = 1;
					}else{
						this.incomes.forEach(function (item) {
							item.checked = false;
						});
						this.allSelectFlag = 0;
					}
		}
	};
	$scope.allChecked = function(){
		$("table");
   };
	$scope.changeCheck = function (index) {
        var incomes = $scope.incomeData.incomes;
        for (var i = 0; i < incomes.length; i++) {
            if (incomes[i].id == index) {
                if (incomes[i].checked == false || incomes[i].checked == undefined) {
                    incomes[i].checked = true;
                    return 0;
                } else {
                    incomes[i].checked = false;
                    return 0;
                }
            }
        }
    };
var id = $scope.incomeData.incomes.length;
function Income(name,time,dept,count){
	this.id = ++id;
	this.name  = name;
	this.time = time;
 	this.dept = dept;
	this.count = count;
}
});
