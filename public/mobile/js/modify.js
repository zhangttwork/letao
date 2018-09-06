$(function () {
	// 当获取认证码按钮被点击的时候
	$('#getCode').on('tap', function () {
		// 请求认证码
		axios.get('/user/vCodeForUpdatePassword').then(function (response) {
			// 输出认证码
			console.log(response)
		});
	});

	// 当修改密码按钮被点击的时候
	$('#modifyBtn').on('tap', function () {
		// 获取表单数据
		var formData = $('#modifyForm').serializeToJson();

		axios.post('/user/updatePassword', formData).then(function (response) {

			if (response.success) {
				mui.toast('修改密码成功, 2s后跳转到登录页面');
				setTimeout(function () {
					location.href = 'login.html'
				}, 2000)
			} else {
				mui.toast(response.message);
			} 

		});

	});
});