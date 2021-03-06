/**
 * 多选框插件
 */
$(document).ready(function() {
	$('input').iCheck({
		checkboxClass : 'icheckbox_flat-green',
		radioClass : 'iradio_flat-green'
	});
});

/**
 * 表单验证
 */
$(function() {
	$('#form').bootstrapValidator({
		container : 'tooltip',
		message : 'This value is not valid',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			'sjareaId' : {
				message : '学校名称验证失败',
				validators : {
					notEmpty : {
						message : '学校名称不能为空'
					}
				}
			},
			'schoolName' : {
				message : '学校名称验证失败',
				validators : {
					notEmpty : {
						message : '学校名称不能为空'
					}
				}
			},
			'campusName' : {
				message : '校区名称验证失败',
				validators : {
					notEmpty : {
						message : '校区名称不能为空'
					}
				}
			},
			'departmentName' : {
				message : '院系名称验证失败',
				validators : {
					notEmpty : {
						message : '院系名称不能为空'
					}
				}
			},
			'areaName' : {
				message : '部门名称验证失败',
				validators : {
					notEmpty : {
						message : '部门名称不能为空'
					}
				}
			},
			'areaType' : {
				message : '排序验证失败',
				validators : {
					notEmpty : {
						message : '排序不能为空'
					},
					regexp: {
		                regexp: /^[0-9]*$/,
		                message: '排序只能为数字'			
                        }
				}
			},
			'sjareaId' : {
				message : '排序验证失败',
				validators : {
					notEmpty : {
						message : '排序不能为空'
					},
					regexp: {
		                regexp: /^[0-9]*$/,
		                message: '排序只能为数字'			
                        }
				}
			},
			'sort' : {
				message : '排序验证失败',
				validators : {
					notEmpty : {
						message : '排序不能为空'
					},
					regexp: {
		                regexp: /^[0-9]*$/,
		                message: '排序只能为数字'			
                        }
				}
			},
		}
	})
		.on('success.form.bv', function(e) {
			// Prevent form submission
			e.preventDefault();

			// Get the form instance
			var $form = $(e.target);

			// Get the BootstrapValidator instance
			var bv = $form.data('bootstrapValidator');

			var method = $('#form').attr('data-method');
			// Use Ajax to submit form data
			if (method == 'put') {
				$.ajax({
					data : $form.serialize(),
					dataType : 'json',
					type : 'put',
					url : $form.attr('action'),
					success : function(result) {
						if (result.code == 1) {
							parent.layer.msg("更新成功!", {
								shade : 0.3,
								time : 1500
							}, function() {
								window.parent.location.reload(); // 刷新父页面
							});
						} else {
							layer.msg(result.message, {
								icon : 2,
								time : 1000
							});
						}
					}
				})
			} else if (method == 'post') {
				$.ajax({
					data : $form.serialize(),
					dataType : 'json',
					type : 'post',
					url : $form.attr('action'),
					success : function(result) {
						if (result.code == 1) {
							parent.layer.msg("创建成功!", {
								shade : 0.3,
								time : 1500
							}, function() {
								window.parent.location.reload(); // 刷新父页面
							});
						} else {
							layer.msg(result.message, {
								icon : 2,
								time : 1000
							});
						}
					}
				})
			}
		});
})