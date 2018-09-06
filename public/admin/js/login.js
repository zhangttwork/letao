$(function (){
	/*
		1.为登录按钮添加点击事件
		2.获取用户输入的用户名和密码
		3.校验用户名和密码格式
		4.发送登录请求
		5.处理登录结果
	*/

	/*
		button按钮被包裹在FORM标签内 没有写Type属性 默认能够触发表单提交
	*/

	// 当登录按钮被点击的时候
	$('#loginBtn').on('click', function () {
		// 获取表单数
		var formData = $('#loginForm').serializeToJson()

		// 验证用户输入的用户名是否为空
		if (formData.username.trim().length == 0) {

			alert('请输入用户名');

			return;

		}

		// 验证密码是否符合规范
		if (formData.password.trim().length < 6) {

			alert('密码不能小于6位');

			return;

		}

		// jQuery内部会查看响应信息 如果服务器端指定了响应内容的格式 application/json
		// jQuery会自动将返回结果转换为json对象
		$.ajax({
			type: 'post',
			url: '/employee/employeeLogin',
			data: formData,
			success: function (response) {
				if (response.success) {
					location.href = "user.html";
				}else {
					alert(response.message);
				}
 			}
		});
	});


});