var path = $("#contextPath").val();
$().ready(function() {
	/**注册验证**/
	$("#form").validate({
		rules: {
			loginAccount:{ 
				required:true,
				remote: {
	                url:  path + "/sysuser/getUserNameCount.action",
	                type: "post",
	                dataType: "json",
	                data: {
	                	loginAccount: function () {
	                        return $("#loginAccount").val();
	                    }
	                },
	                dataFilter: function (data) {　　　
	                	　//判断控制器返回的内容
	                	data = jQuery.parseJSON(data);
	                    return data.success;
	                }
	            }
			},
			loginPass: {
				required: true,
				minlength: 5,
				maxlength:20
			},
			rloginPass: {
				equalTo: "#loginPass"
			},
            email:{
                email:true
            },
            userType: "required",
            role: "required",
            sjAera: "required",
            userName: "required",
			userEmail: {
				required: true,
				email: true,
				remote: {
	                url: path + "/sysuser/getEMailCount.action",
	                type: "post",
	                dataType: "json",
	                data: {
	                	email: function () {
	                        return $("#register_email").val();
	                    }
	                },
	                dataFilter: function (data) {　　　　//判断控制器返回的内容
	                	data = jQuery.parseJSON(data);
	                    return data.success;
	                }
	                }
	            },
		/*	telephone : {
				required : true,
				minlength : 11,
			}*/
		},
		messages: {
			loginAccount:{  
				required: "请输入姓名",
                remote: "用户名已存在"
            },
			loginPass: {
				required: "请输入密码",
				minlength: jQuery.format("密码不能小于{0}个字 符"),
				maxlength: jQuery.format("密码不能大于{0}个字 符"),
			},
			rloginPass: {
				required: "请输入确认密码",
				equalTo: "两次密码不一样"
			},
			/*telephone : {
				required : "请输入手机号",
				minlength : "确认手机不能小于11个字符",
			},*/
            userType: "请选择具体类型",
            sjAera: "请选择部门",
            role: "请选择级别（权限）",
            userName: "请输入真实姓名",
			email:"输入正确格式邮箱"
		},

			submitHandler:function(form){
            $.ajax({
        		dataType : "json",
        		url : path + "/sysuser/add.action",  
        		type : "post", 
        		data : $("#form").serialize(), 
        		success : function(data) {
        			$.alert(data.message);
        			if(data.success){
        				window.parent.location.reload();
        			}
        		},
        		error : function (e){
        			var d = e.responseJSON;
        			if(d){
        				$.alert(d.message);
        			}
        		}
        	});
            return false; //阻止form提交
		}
	});
});

//项目根目录
var path = $("#contextPath").val();
function selectSubmit() {
	 var sjAeraId = $('#sjAera option:selected').val();
	 $('#areaId').val("");
	 $('#areaId').val(sjAeraId);
	 var sjId = sjAeraId;
	 //console.log(path +'/department/getAreaIdBySjId.action');
		$.ajax({
			type : 'POST',
			dataType : 'json',
			 data:{ 
				 sjId:sjId
                   	},
			url : path +'/department/getAreaIdBySjId.action',
			success : function(result) {
				console.log(result);
				$("#xjAera").empty();
				for(var i=0;i<result.length;i++) {
				var option = $("<option>").text(result[i].areaName).val(result[i].areaId)
				$("#xjAera").append(option);
				}
			}
		})
	}

function selectSubmit2() {
	 var xjAeraId = $('#xjAera option:selected').val();
	 $('#areaId').val("");
	 $('#areaId').val(xjAeraId);
	}

	//根据类型选择具体类型
function selectSubmit3() {
    var selUserType = $('#userType1 option:selected').val();
    $('#userType1').val("");
    $('#userType1').val(selUserType);
    var sjName = selUserType;
    //console.log(path +'/department/getAreaIdBySjId.action');
    $.ajax({
        type : 'POST',
        dataType : 'json',
        data:{
            sjName:sjName
        },
        url : path +'/basicParameters/getNextType.action',
        success : function(result) {
            console.log(result);
                $("#userTypeDet").empty();
                for(var i=0;i<result.length;i++) {
                    var option = $("<option>").text(result[i]).val(result[i])
                    $("#userTypeDet").append(option);
                }
        }
    })
}




