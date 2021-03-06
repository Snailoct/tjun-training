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
        $('#table_teach_dining').bootstrapTable({
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
            pageList:[10, 20, 50],      	//可供选择的每页的行数（*）
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
                {checkbox: true},
                {title: '日期', field: 'day', sortable: false},
                {title: '星期', field: 'day',formatter : function(value, row, index) {
                    if(value==null){
                        return null ;
                    }else {
                        var d = new Date(value)
                        var weekday = new Array(7)
                        weekday[0] = "星期天"
                        weekday[1] = "星期一"
                        weekday[2] = "星期二"
                        weekday[3] = "星期三"
                        weekday[4] = "星期四"
                        weekday[5] = "星期五"
                        weekday[6] = "星期六"
                        return weekday[d.getDay()];
                    }
                    }},
                {title: '早餐', field: 'breakfast',formatter : function(value, row, index) {
                        if (value == '1') {
                            return "<span class='label label-primary'>就餐</span>";
                        }
                        if (value == '2') {
                            return "<span class='label label-warning'>不就餐</span>";
                        }
                        return "";
                    }},
                {title: '中餐', field: 'lunch',formatter : function(value, row, index) {
                        if (value == '1') {
                            return "<span class='label label-primary'>就餐</span>";
                        }
                        if (value == '2') {
                            return "<span class='label label-warning'>不就餐</span>";
                        }
                        return "";
                    }},{title: '晚餐', field: 'dinner',formatter : function(value, row, index) {
                        if (value == '1') {
                            return "<span class='label label-primary'>就餐</span>";
                        }
                        if (value == '2') {
                            return "<span class='label label-warning'>不就餐</span>";
                        }
                        return "";
                    }}],
            /*onLoadSuccess: function (data) {
                /!*alert(data.rows);*!/
                renderSwitch();
            },*/
            showExport:true,                     //是否显示导出
            exportDataType: "basic",              //basic', 'all', 'selected'.
            exportTypes: ['excel'],     //导出类型
            //exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
            exportOptions: {
                ignoreColumn: [0, 0],            //忽略某一列的索引
                fileName: '教师就餐安排',              //文件名称设置
                worksheetName: 'Sheet1',          //表格工作区名称
                tableName: '教师就餐安排',
                excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
                //onMsoNumberFormat: DoOnMsoNumberFormat
            }
            //导出excel表格设置<<<<<<<<<<<<<<<<
        });
    };
    Date.prototype.Format = function(format){
        var o = {
            "M+" : this.getMonth()+1, //month 
            "d+" : this.getDate(), //day 
            "h+" : this.getHours(), //hour 
            "m+" : this.getMinutes(), //minute 
            "s+" : this.getSeconds(), //second 
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter 
            "S" : this.getMilliseconds() //millisecond 
        }
        if(/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
        }
        return format;
    }


    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit,   //页面大小
            pageNumber: params.pageNumber, //页码
            sortName: params.sort,	//排序列名
            sortOrder: params.order,	//排序方式
            searchText: params.search,//搜索框参数
            number:$("#number").val(),
            time:$("#time").val()
        };
        return temp;
    };
    return oTableInit;
};

function search() {
    $("#table_teach_dining").bootstrapTable('refresh');
    $('#table_teach_dining').bootstrapTable('selectPage', 1);
}

//删除
function teachDining_delete() {
    var rows = $('#table_teach_dining').bootstrapTable("getSelections")
    var ids = "";
    if (rows.length == 0) {
        layer.alert('请至少选择一条数据！', {
            icon: 5,
            title: "提示"
        });
    } else {
        for (var i = 0; i < rows.length; i++) {
            ids += rows[i].id.toString() + ","
            day = rows[i].day;
        }
        ;
        layer.confirm('确认要删除吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: {
                    ids: ids
                },
                url: path + '/teachDin/delete1.action',
                success: function (result) {
                    if (result.code == 1) {
                        layer.msg('删除成功!', {
                            icon: 1,
                            time: 1000
                        }, function () {
                            window.location.reload(); // 刷新父页面
                        });
                    } else {
                        layer.alert(result.message, {
                            icon: 2
                        });
                    }
                }
            })
        });
    }
}


//修改
function teachDining_edit() {
    var rows = $('#table_teach_dining').bootstrapTable("getSelections")
    var value;
    if (rows.length == 0) {
        layer.alert('请选择一条数据！', {
            icon : 5,
            title : "提示"
        });
    } else if (rows.length > 1) {
        layer.alert('只能选择一条数据编辑！', {
            icon : 5,
            title : "提示"
        });
    } else {
        for (var i = 0; i < rows.length; i++) {
                layer.open({
                    id: 'LAY_layuipro', // 设定一个id，防止重复弹出
                    type: 2,
                    title: '编辑数据',
                    skin: 'layui-layer-molv', // 样式类名
                    area: ['900px', '700px'],
                    shade: 0,
                    maxmin: true,
                    content: 'update1.action?id=' + rows[0].id,
                    btn: ['保存', '取消'] // 只是为了演示
                    ,
                    yes: function (index, layero) {

                        var inputForm = $(window.frames["layui-layer-iframe" + index].document).contents().find("#form2");
                        yanzheng(inputForm);
                        inputForm.bootstrapValidator('validate');
                        var flag = inputForm.data('bootstrapValidator').isValid();
                        if (flag) {
                            inputForm.ajaxSubmit({
                                url: 'saveTeachDining.action',
                                type: 'post',
                                dataType: 'json',
                                success: function (result) {
                                    if (result.code == 1) {
                                        parent.layer.msg("更新成功!", {
                                            shade: 0.3,
                                            time: 1500
                                        }, function () {
                                            window.location.reload(); // 刷新父页面
                                        });
                                    } else {
                                        layer.msg(result.message, {
                                            icon: 2,
                                            time: 1000
                                        });
                                    }
                                }
                            });
                        }
                    },
                    btn2: function () {
                        layer.closeAll();
                    },
                    success: function (layero) {
                        layer.setTop(layero); // 重点2
                    }
                });
            }
        }


}

//添加就餐安排
function creatTeacherDining(id,number){
    var time = $("#time").val()
    layer.open({
        id: 'LAY_layuipro', //设定一个id，防止重复弹出
        type : 2,
        title : '添加就餐安排',
        skin: 'layui-layer-molv', //样式类名
        area : [ '900px', '700px' ],
        shade : 0,
        maxmin : true,
        content :  'create.action?id='+id+'&number='+number+'&time='+time,
        btn : [ '保存', '取消' ] //只是为了演示
        ,
        yes : function(index,layero) {
            var inputForm = $(window.frames["layui-layer-iframe" + index].document).contents().find("#form1");
            // var schoolName = $(window.frames["layui-layer-iframe" + index].document).contents().find("#schoolName");
            // var nameValue = schoolName.val();
            // if (nameValue == null || nameValue == undefined || nameValue == '') {
            //     var type = $(window.frames["layui-layer-iframe" + index].document).contents().find("#type").find("option:selected").data("type");
            //     schoolName.prop("value", type);
            // }
            //进行表单验证
            yanzheng(inputForm);
            inputForm.bootstrapValidator('validate');
            var flag = inputForm.data('bootstrapValidator').isValid();
            if(flag) {
                inputForm.ajaxSubmit({
                    url:  'savee.action',
                    type: 'post',
                    dataType: 'json',
                    success: function (result) {
                        if (result.code == 1) {
                            parent.layer.msg("添加成功!", {
                                shade: 0.3,
                                time: 1500
                            }, function () {
                                window.location.reload(); // 刷新父页面
                            });
                        } else {
                            layer.msg(result.message, {
                                icon: 2,
                                time: 1000
                            });
                        }
                    }
                });
            }
        },
        btn2 : function() {
            layer.closeAll();
        },
        success : function(layero) {
            layer.setTop(layero); //重点2
        }
    });
}


//初始化就餐安排
function init(){
    var id = $("#classId").val()
    var number = $("#number").val()
    var time = $("#time").val()

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: {
            },
            url: path + '/teachDin/init.action?id='+id+'&number='+number+'&time='+time,
            success: function (result) {
                if (result.code == 1) {
                    layer.msg('初始化成功!', {
                        icon: 1,
                        time: 1000
                    }, function () {
                        window.location.reload(); // 刷新父页面
                    });
                } else {
                    layer.msg('该班级培训已结束，不能进行初始化！', {
                        icon: 2,
                        time: 2000
                    });
                }
            }
        })
}

//清空就餐安排
function empty() {
    var number = $("#number").val()
    var time = $("#time").val()
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {},
        url: path + '/teachDin/empty.action?number='+number+'&time='+time,
        success: function (result) {
            if (result.code == 1) {
                layer.msg('清空成功!', {
                    icon: 1,
                    time: 1000
                }, function () {
                    window.location.reload(); // 刷新父页面
                });
            } else {
                layer.alert(result.message, {
                    icon: 2
                });
            }
        }
    })
}

//表单验证
function yanzheng(id){

    $(id).bootstrapValidator({
        /*container : 'tooltip',*/
        /* live: 'enabled',*/
        enabled: true,
        message : 'This value is not valid',
        feedbackIcons : {
            valid : 'glyphicon glyphicon-ok',
            invalid : 'glyphicon glyphicon-remove',
            validating : 'glyphicon glyphicon-refresh'
        },
        fields : {
            'schoolName' : {
                validators : {
                    notEmpty : {
                        message : '校区名称不能为空'
                    }
                }
            },
        }
    })
}


