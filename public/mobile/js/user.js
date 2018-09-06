$(function () {

	// 当退出按钮被点击的时候
	$('#logout').on('tap', function () {

		// 当用户点击确认获取取消的时候 会执行回调函数
		mui.confirm('您确定要退出登录吗?', function (result) {
			// 如果用户点击的是确认
			if (result.index == 1) {
				// 发送退出请求
				axios.get('/user/logout')
					.then(function (response) {
						// 如果退出成功 给出提示
						if (response.success) {
							mui.toast('退出登录成功,2s后跳转到首页');
							// 在2s钟后跳转到首页
							setTimeout(function () {
								location.href = 'index.html';
							}, 2000)
						}
					});
			}

		});
	});

	// 发送请求 请求个人信息
	axios.get('/user/queryUserMessage').then(function (response) {
		// 将模板与数据进行拼接
		var html = template('personalTpl', response);
		// 将拼接好的数据放置在页面中
		$('#personalBox').html(html);

	});

});