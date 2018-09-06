$(function () {

	// 验证手机号的正则表达式
	var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

	var registerForm = $('#registerForm');

	// 当点击获取认证码按钮的时候
	$('#getCode').on('tap', function () {
		// 获取表单数据
		var formData = registerForm.serializeToJson();
		// 验证用户输入的手机号是否正确
		if (reg.test(formData.mobile) == false) {
			// 给出提示
			mui.toast('请输入正确的手机号码');
			// 阻止代码向下执行
			return;
		}

		// 发送验证码请求
		axios.get('/user/vCode').then(function (response) {
			// 将验证码输出到控制台
			console.log(response);
		});

	});

	// 当用户点击注册按钮的时候
	$('#registerBtn').on('tap', function () {
		// 获取表单数据
		var formData = registerForm.serializeToJson();

		// 验证用户输入的手机号是否正确
		if (reg.test(formData.mobile) == false) {
			// 给出提示
			mui.toast('请输入正确的手机号码');
			// 阻止代码向下执行
			return;
		}

		// 验证用户名
		if (formData.username.trim().length == 0) {
			mui.toast('请输入用户名');
			return;
		}
		// 验证密码
		if (formData.password.trim().length < 6) {
			mui.toast('请输入符合格式的密码')
			return;
		}
		// 验证密码
		if (formData.password.trim() != formData.confirmPass.trim()) {
			mui.toast('两次密码输入的不一致');
			return;
		}

		// 发送注册请求
		axios.post('/user/register', formData).then(function (response) {
			// 如果注册成功
			if (response.success) {
				mui.toast('注册成功,2s后跳转到登录页面');
				setTimeout(function () {
					location.href = 'login.html';
				}, 2000);
			} else {
				// 给出用户注册失败的信息
				mui.toast(response.message);
			}
		});
		
	});

})