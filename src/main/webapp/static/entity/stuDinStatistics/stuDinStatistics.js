//项目根目录
var path = $("#contextPath").val();
$(function () {
    initStu();
});
var initStu = function () {
    //初始化Table
    var oTable = new stuTableInit();
    oTable.Init();
};
var stuTableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#stuDingTable').bootstrapTable({
            url: 'findTable.action',  //请求后台的URL（*）
            method: 'get',                       	//请求方式（*）
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",						//数据类型
            toolbar: '#toolbar',                 	//工具按钮用哪个容器
            striped: true,                      	//是否显示行间隔色
            cache: false,                       	//是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   	//是否显示分页（*）
            sortable: true,                    	    //是否启用排序
            sortOrder: "asc",                   	//排序方式
            queryParamsType: 'limit',
            queryParams: oTableInit.queryParams, 	//传递参数（*）
            sidePagination: "server",           	//分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       	//初始化加载第一页，默认第一页
            pageSize: 10,                       	    //每页的记录行数（*）
            pageList: [10, 20, 50],        	//可供选择的每页的行数（*）
            // search: true,                       	//是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            // strictSearch: true,					    //启用全匹配搜索，否则为模糊搜索
            // searchOnEnterKey: false,				//按回车触发搜索方法，否则自动触发搜索方法
            showColumns: false,                  	//是否显示所有的列
            showRefresh: true,                  	//是否显示刷新按钮
            minimumCountColumns: 2,             	//最少允许的列数
            clickToSelect: true,                	//是否启用点击选中行
            //height: 500,                        	//行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                   //每一行的唯一标识，一般为主键列
            showToggle:true,                    	//是否显示详细视图和列表视图的切换按钮
            cardView: false,                    	//是否显示详细视图
            detailView: false,                  		//是否显示父子表
            showExport: true,  //是否显示导出按钮
            exportDataType : "basic", //basic'导出当前页, 'all'导出全部, 'selected'导出选中项.
            buttonsAlign:"right",  //按钮位置
            exportTypes:['excel'],//导出文件类型
            Icons:'glyphicon-export',
            exportOptions:{
                // ignoreColumn: [0,0],  //忽略某一列的索引
                fileName: '数据导出',  //文件名称设置
                worksheetName: 'sheet1',  //表格工作区名称
                tableName: '学员就餐统计',
                excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
                /*onMsoNumberFormat: DoOnMsoNumberFormat  */
            },
            columns: [
                // {checkbox: true},
                [
                {title: '就餐地点', field: 'sdrlVO.diningPlace',valign:"middle",align:"center",rowspan: 2},
                {title: "早餐",valign:"middle",align:"center",colspan: 3,rowspan: 1},
                {title: "中餐",valign:"middle",align:"center",colspan: 3,rowspan: 1},
                {title: "晚餐",valign:"middle",align:"center",colspan: 3,rowspan: 1},
                {title: '实到合计金额', field: 'sdrlVO.rDinner', valign:"middle",align:"center",rowspan: 2,formatter:function(value, row){
                        var temp = (row.sdrlVO.rBreakfast)*(row.eatStandard0)+(row.sdrlVO.rLunch)*(row.eatStandard1)+(row.sdrlVO.rDinner)*(row.eatStandard2);
                        return temp;
                    }},
                    {title: '应到合计金额', field: 'sdrlVO.rDinner',valign:"middle",align:"center",rowspan: 2,formatter:function(value, row){
                            var temp = (row.sdrlVO.dBreakfast)*(row.eatStandard0)+(row.sdrlVO.dLunch)*(row.eatStandard1)+(row.sdrlVO.dDinner)*(row.eatStandard2);
                            return temp;
                        }},
                    {title: '就餐率%', field: 'sdrlVO.rDinner',valign:"middle",align:"center",rowspan: 2,formatter:function(value, row){
                        var t = (row.sdrlVO.dBreakfast)+(row.sdrlVO.dLunch)+(row.sdrlVO.dDinner);
                        if(t == 0){
                            return "0.00";
                        }else {
                            var temp = (((row.sdrlVO.rBreakfast) + (row.sdrlVO.rLunch) + (row.sdrlVO.rDinner)) / ((row.sdrlVO.dBreakfast) + (row.sdrlVO.dLunch) + (row.sdrlVO.dDinner)));
                            var temps = (Number(temp) * Number(100)).toFixed(2);
                            return temps;
                        }
                        }}],[
                {title: '应到人次', field: 'sdrlVO.dBreakfast',valign:"middle",align:"center",formatter:function(value, row){
                        if(value == null){
                            return 0;
                        }else {
                            return value;
                        }
                    }},
                {title: '实到人次', field: 'sdrlVO.rBreakfast',valign:"middle",align:"center",formatter:function(value, row){
                    if(value == null){
                        return 0;
                        }else {
                        return value;
                    }
                    }},
                {title: '实到金额', field: 'sdrlVO.rBreakfast',valign:"middle",align:"center",formatter:function(value, row){
                        var temp = (row.sdrlVO.rBreakfast)*(row.eatStandard0);
                        return temp;
                    }},
                {title: '应到人次', field: 'sdrlVO.dLunch',valign:"middle",align:"center",formatter:function(value, row){
                        if(value == null){
                            return 0;
                        }else {
                            return value;
                        }
                    }},
                {title: '实到人次', field: 'sdrlVO.rLunch',valign:"middle",align:"center",formatter:function(value, row){
                        if(value == null){
                            return 0;
                        }else {
                            return value;
                        }
                    }},
                {title: '实到金额', field: 'sdrlVO.rLunch',valign:"middle",align:"center",formatter:function(value, row){
                        var temp = (row.sdrlVO.rLunch)*(row.eatStandard1);
                        return temp;
                    }},
                {title: '应到人次', field: 'sdrlVO.dDinner',valign:"middle",align:"center",formatter:function(value, row){
                        if(value == null){
                            return 0;
                        }else {
                            return value;
                        }
                    }},
                {title: '实到人次', field: 'sdrlVO.rDinner',valign:"middle",align:"center",formatter:function(value, row){
                        if(value == null){
                            return 0;
                        }else {
                            return value;
                        }
                    }},
                {title: '实到金额', field: 'sdrlVO.rDinner',valign:"middle",align:"center",formatter:function(value, row){
                        var temp = (row.sdrlVO.rDinner)*(row.eatStandard2);
                        return temp;
                    }}
                    ]
                ],//自定义方法，添加详情按钮
            // 注册加载子表的事件。注意下这里的三个参数！
            onExpandRow : function(index, row, $detail) {
                oInit.InitSubTable(index, row, $detail);
            }
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit,   //页面大小
            pageNumber: params.pageNumber, //页码
            startStopTime:$("#startStopTime").val()
        };
        return temp;
    };
    return oTableInit;
};
