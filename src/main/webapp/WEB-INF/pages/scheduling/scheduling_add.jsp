<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/layouts/cms/default.jsp"%>
<!DOCTYPE HTML>
<html>
<head>
    <title>创建日程安排信息</title>

    <link rel="stylesheet" href="${ctxsta}/common/jquery/css/chosen.css" />
    <link href="${ctxsta}/select2/select2.css" rel="stylesheet" type="text/css"/>
    <script src="${ctxsta}/common/bootstrapvalidator/js/bootstrapValidator.min.js"></script>
    <script src="${ctxsta}/common/layui/layDate/laydate/laydate.js"></script>
    <script src="${ctxsta}/select2/select2.js" type="text/javascript"></script>


    <style type="text/css">
        .no_line {
            padding: 10px;
            word-break:keep-all;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
        }
        .red_must {
            padding: 2px;
            color: red;
        }

         .layui-laydate-content>.layui-laydate-list {
           padding-bottom: 0px;
           overflow: hidden;
         }
        .layui-laydate-content>.layui-laydate-list>li{
            width:50%
        }

        .merge-box .scrollbox .merge-list {
            padding-bottom: 5px;
        }


    </style>
</head>

<body >
<div class="ibox-content">
    <form id="form" class="form-horizontal"  data-method="post">
        <input type="hidden" id="id" name="classInfo.id" value="${classInfo.id}">
        <div class="form-group m-t">
            <label class="col-sm-2 control-label">日期<span
                    class="red_must">*</span></label>
            <div class="col-sm-8">
                <input class="form-control" name="day" placeholder="请选择日期"
                       id="day" type="text">
            </div>
        </div>
        <div class="hr-line-dashed"></div>

        <div class="form-group m-t">
            <label class="col-sm-2 control-label">时间段<span
                    class="red_must">*</span></label>
            <div class="col-sm-8">
                <input type="text" class="form-control" id="time" name="time"
                       placeholder="请输入时间段" value="00:00 - 00:00">
            </div>
        </div>
        <div class="hr-line-dashed"></div>

        <div class="form-group m-t">
            <label class="col-sm-2 control-label">课程</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" id="schContent" name="schContent"
                       placeholder="请输入课程">
            </div>
        </div>
        <div class="hr-line-dashed"></div>

        <div class="form-group m-t">
            <label class="col-sm-2 control-label">授课形式</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" id="teachingForm" name="teachingForm"
                       placeholder="请输入授课形式">
            </div>
        </div>
        <div class="hr-line-dashed"></div>

        <div class="form-group m-t">
            <label class="col-sm-2 control-label">教师所属中心</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" id="teacherDep" name="teacherDep"
                       placeholder="请输入教师所属中心">
            </div>
        </div>
        <div class="hr-line-dashed"></div>
        <div class="form-group m-t">
            <label class="col-sm-2 control-label">教师</label>
            <div class="col-sm-3">
                <%--<select class="form-control" name="trainingSubject.tsId" >
                    <c:forEach items="${ts}" var="ts">
                        <option value="${ts.tsId}" >${ts.tsName}</option>
                    </c:forEach>
                </select>--%>
                <input type="text" class="form-control" id="teacher" name="teacher"
                       placeholder="请输入教师姓名" >
            </div>
            <div class="col-sm-5">
                <select id="selTeacher" name="tiName"  style="width:350px; border-color:#E0E0E0" data-placeholder="请选择教师！" onchange="selectOnchange(this)" multiple class="chosen-select chosen-rtl"  >
                    <c:forEach items="${teacherInfoList}" var="ti">
                        <option value="${ti.tiName}" >${ti.tiName}</option>
                    </c:forEach>
                </select>

            </div>
        </div>
        <div class="hr-line-dashed"></div>
        <div class="form-group m-t">
            <label class="col-sm-2 control-label">教室</label>
            <div class="col-sm-3">
                <input type="hidden" id="sName" name="sName">
                <%--<input value="${campus.schoolName}" class="form-control" name="shoolName" type="text" readonly="readonly">--%>
                <select id="campus" name="schoolName"  class="form-control" onchange="selectSubmit3();" >
                    <option value=""> --请选择--</option>
                    <c:forEach items="${campusList}" var="cl">
                        <option value="${cl.schoolName}" >${cl.schoolName}</option>
                    </c:forEach>
                </select>
            </div>
            <div class="col-sm-5">
                <select id="classroom" name="classroom"  style="width:350px; border-color:#E0E0E0" data-placeholder="请选择教室！"  multiple class="chosen-select chosen-rtl"  >

                </select>

            </div>
        </div>
       <%-- <div class="hr-line-dashed"></div>
        <div class="form-group m-t">
            <label class="col-sm-2 control-label">是否评测<span
                    class="red_must">*</span></label>
            <div class="checkbox checkbox-info checkbox-circle col-sm-3">
                <input id="evaluate" value="1" name="evaluate" class="styled"
                       type="radio" checked> <label for="evaluate"> 是
            </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input id="evaluate2"
                                                                value="0" name="evaluate" class="styled" type="radio">
                <label for="evaluate2"> 否 </label>
            </div>
        </div>--%>
        <div class="hr-line-dashed"></div>
        <div class="form-group m-t">
            <label class="control-label col-sm-2" title="">
                <span class="required hide" aria-required="true">*</span> 联系人：<i class="fa icon-question hide"></i></label>
            <div class="col-sm-8">
                <select style="width: 555px;height: 35px;border-color:#E0E0E0;" id="userId" name="userId">
                    <c:forEach items="${ sysUserList}" var="user">
                        <option <c:if test="${user.userId eq classInfo.userId}">selected</c:if> value="${user.userId}">${user.userName}</option>
                    </c:forEach>
                </select>
            </div>
        </div>
    </form>
</div>
<script>
    $(function(){
        $('#userId').select2();
    });

    function selectOnchange(sel) {
        chose_get_value('#selTeacher');
        console.log(chose_get_value('#selTeacher'));
        var value1 = chose_get_value('#selTeacher');
        console.log(value1)
        document.getElementById('teacher').value = value1;
    };

    //select value获取
    function chose_get_value(select){
        return $(select).val();
    }
    //select text获取，多选时请注意
    function chose_get_text(select) {
        return $(select + " option:selected").text();
    }


    var date = new Date(); //创建时间对象
    var year = date.getFullYear(); //获取年
    var month = date.getMonth()+1;//获取月
    var day = date.getDate(); //获取当日
    var time = year+"-"+month+"-"+day; //组合时间
    laydate.render({
        elem: '#day',
        type: 'date', //默认，可不填
        //min:time,
        //max:'${stopTime}',
        value:new Date(),
        btns: ['confirm']

    });
    laydate.render({
        elem: '#time',
        type: 'time', //默认，可不填
        format: 'HH:mm',
        range: true,
        btns: [ 'confirm']
    })
    //根据选择校区加载校区所有教室
    function selectSubmit3() {
        /*var value = obj.options[obj.selectedIndex].text;*/
        var sName = $('#campus option:selected').val();
        $('#sName').val("");
        $('#sName').val(sName);
        var newSname = sName;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: {
                newSname: newSname
            },
            url: ctx + '/scheduling/getClassName.action',
            success: function (result) {
                $("#classroom").empty();
                for (var i = 0; i < result.length; i++) {
                    var option = $("<option>").text(result[i].className).val(result[i].className)
                    $("#classroom").append(option);
                    $("#classroom").trigger("liszt:updated");
                }
            }
        })
    }


    var config = {

        '.chosen-select': {},

        '.chosen-select-deselect': {allow_single_deselect: true},

        '.chosen-select-no-single': {disable_search_threshold: 10},

        '.chosen-select-no-results': {no_results_text: 'Oops, nothing found!'},

        '.chosen-select-width': {width: "95%"}

    }

    for (var selector in config) {

        $(selector).chosen(config[selector]);

    }
</script>
</body>
</html>
