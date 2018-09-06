$(function (){
	// 发送请求获取前台用户注册信息
	$.ajax({
		url: '/user/queryUser',
		type: 'get',
		data: {
			page: 1,
			pageSize: 1000
		},
		success: function (response) {
			// 通过模板引擎将用户信息展示在页面中
			console.log(response);
			var html = template('userTpl', response);
			$('#userBox').html(html);
		}
	});

	// 当更新用户状态按钮被点击的时候
	$('#userBox').on('click', '.editBtn', function () {
		// 获取当前用户的ID 因为更改用户信息 需要指定更改用户信息的ID
		var id = $(this).attr('data-id');
		// 用户目前的状态
		var isDelete = $(this).attr('data-isdelete');
		// 发送更改请求
		$.ajax({
			url: '/user/updateUser',
			type: 'post',
			data: {
				id: id,
				// 反转当前用户的状态 启用 <=> 禁用
				isDelete: isDelete == 1 ? 0 : 1
			},
			success: function (response) {
				// 如果更新成功 直接刷新页面
				if (response.success) {
					location.reload();
				}else {
					// 如果失败 弹出失败信息
					alert(response.message);
				}
			}
		})

	});
})