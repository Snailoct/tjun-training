//项目根目录
var path = $("#contextPath").val();
$(document).ready(function () {
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();
});
var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#teach_dining_face_record').bootstrapTable({
            url: 'find.action',  //请求后台的URL（*）
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
            showColumns: true,                  	//是否显示所有的列
            showRefresh: true,                  	//是否显示刷新按钮
            minimumCountColumns: 2,             	//最少允许的列数
            clickToSelect: true,                	//是否启用点击选中行
            //height: 500,                        	//行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                   //每一行的唯一标识，一般为主键列
            showToggle:true,                    	//是否显示详细视图和列表视图的切换按钮
            cardView: false,                    	//是否显示详细视图
            detailView: false,                  		//是否显示父子表
            showExport: true,  //是否显示导出按钮
            //exportDataType : "selected", //basic'导出当前页, 'all'导出全部, 'selected'导出选中项.
            buttonsAlign:"right",  //按钮位置
            //exportTypes:['excel','xlsx'],  //导出文件类型
            exportTypes:['excel'],
            Icons:'glyphicon-export',
            exportOptions:{
                ignoreColumn: [0,1],  //忽略某一列的索引
                fileName: '数据导出',  //文件名称设置
                worksheetName: 'sheet1',  //表格工作区名称
                tableName: '区域及教室资源',
                excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
                /*onMsoNumberFormat: DoOnMsoNumberFormat  */
            },
            columns: [
                {title: '日期', field: 'day', sortable: true},
                {title: '星期', field: 'day',formatter : function(value, row, index) {
                        var d=new Date(value)
                    var weekday=new Array(7)
                        weekday[0]="星期天"
                        weekday[1]="星期一"
                        weekday[2]="星期二"
                        weekday[3]="星期三"
                        weekday[4]="星期四"
                        weekday[5]="星期五"
                        weekday[6]="星期六"
                        return weekday[d.getDay()];
                    }},
                {title: '早餐', field: 'breakfast',formatter : function(value, row, index) {
                        if (value == '1') {
                            return "<span class='label label-primary'>就餐</span>";
                        }
                        if (value == '2') {
                            return "<span class='label label-warning'>未就餐</span>";
                        }
                        return "";
                    }},{title: '中餐', field: 'lunch',formatter : function(value, row, index) {
                        if (value == '1') {
                            return "<span class='label label-primary'>就餐</span>";
                        }
                        if (value == '2') {
                            return "<span class='label label-warning'>未就餐</span>";
                        }
                        return "";
                    }},{title: '晚餐', field: 'dinner',formatter : function(value, row, index) {
                        if (value == '1') {
                            return "<span class='label label-primary'>就餐</span>";
                        }
                        if (value == '2') {
                            return "<span class='label label-warning'>未就餐</span>";
                        }
                        return "";
                    }}],
            showExport: true,                     //是否显示导出
            exportDataType: "basic",              //basic', 'all', 'selected'.
            //exportTypes: ['excel', 'xlsx'],     //导出类型
            //exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
            exportOptions: {
                ignoreColumn: [0, 0],            //忽略某一列的索引
                fileName: '人脸识别教师就餐列表详情',              //文件名称设置
                worksheetName: 'Sheet1',          //表格工作区名称
                tableName: '人脸识别教师就餐列表详情',
                excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
                //onMsoNumberFormat: DoOnMsoNumberFormat
            }
            //导出excel表格设置<<<<<<<<<<<<<<<<
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit,   //页面大小
            pageNumber: params.pageNumber, //页码
            sortName: params.sort,	//排序列名
            sortOrder: params.order,	//排序方式
            searchText: params.search,//搜索框参数
            teacherId:$("#teacherId").val(),
            classId:$("#classId").val(),
        };
        return temp;
    };
    return oTableInit;
};

function search() {
    $("#teach_dining_face_record").bootstrapTable('refresh');
    $('#teach_dining_face_record').bootstrapTable('selectPage', 1);
}
