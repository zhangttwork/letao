$(function (){
	/*
		1.为登录按钮添加点击事件
		2.获取用户输入的用户名和密码
		3.对用户输入的内容进行验证
		4.发送登录请求
		5.根据接口中返回的数据确定是否登录成功
		6.如果登录成功 跳转到用户中心页面
		7.如果登录不成功 将失败原因提示给用户
	
			表单数据序列化 => 获取表单数据 并且将表单数据以 name=zhangsan&age=20

			$('form').serialize() => name=zhangsan&age=20

			$('form').serializeArray() => [{name:'username',value: 'zhangsan'}, {name:'password', vlaue: '111111'}]

			$('form').serializeToJson() => {username:'zhangsan', password: '111111'}


	*/

	// 当用户点击登录按钮的时候
	$('#loginBtn').on('tap', function () {
		// 获取表单数据
		var formData = $('#loginForm').serializeToJson();

		/*// 判断用户是否输入了用户名
		if (formData.username.trim().length == 0) {
			mui.toast('请输入用户名');
			return;
		}

		// 判断密码是否符合要求
		if (formData.password.trim().length < 6) {
			mui.toast('用户密码不能小于6位');
			return;
		}*/

		// post传递参数 第二个参数为对象 就是参数对象
		/*axios.post('/user/login', formData)
			.then(function (response) {
				if (response.success) {
					// 登录成功给出用户提示
					mui.toast('登录成功, 2s以后自动跳转到用户中心页面');
					// 2s之后跳转到用户中心界面
					setTimeout(function () {
						location.href = 'user.html';
					}, 2000);
				}else {
					mui.toast(response.message);
				}
			});*/
	
		// 表单验证
		validateLoginForm (formData)
			// 发送登录请求
			.then(requestLogin)
			// 处理登录结果
			.then(renderLogin)
			// 错误处理
			.catch(errorHandle)

	});


	// 表单验证
	function validateLoginForm (formData) {
		// 返回promise对象的目的就是想用then将多个函数串联起来
		return new Promise (function (resolve, reject) {
			// 判断用户是否输入了用户名
			if (formData.username.trim().length == 0) {
				reject('请输入用户名');
			}

			// 判断密码是否符合要求
			if (formData.password.trim().length < 6) {
				reject('用户密码不能小于6位');
			}
			resolve(formData);

		});
	}

	// 发送登录请求
	function requestLogin (formData) {
		return axios.post('/user/login', formData);
	}

	// 处理结果
	function renderLogin (response) {
		if (response.success) {
			// 登录成功给出用户提示
			mui.toast('登录成功, 2s以后自动跳转到用户中心页面');
			// 2s之后跳转到用户中心界面
			setTimeout(function () {
				location.href = 'user.html';
			}, 2000);
		}else {
			mui.toast(response.message);
		}
	}

	// 错误处理
	function errorHandle (error) {
		mui.toast(error);
	}
	

});
