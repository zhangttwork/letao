$(function () {

	// 发送收货地址列表 请求
	axios.get('/address/queryAddress').then(function (response) {
		console.log(response);
		var html = template('addressTpl', {
			rows: response
		});
		$('#addressBox').html(html);
	});

	// 当删除按钮被点击的时候
	$('#addressBox').on('tap', '.deleteBtn', function () {

		var This = $(this);

		// 找要删除的数据的li标签
		var $li = This.parent().parent();

		mui.confirm('您确定要删除码?', function (msg) {

			// 如果用户点击的是确定按钮
			if (msg.index == 1) {
				// 执行删除操作
				var id = This.attr('data-id');
				
				// 发送删除请求
				axios.post('/address/deleteAddress', {id: id}).then(function (response) {
					// 如果删除成功
					if (response.success) {
						// 删除页面中包裹数据的li标签
						$li.remove();

					}else {
						mui.toast(response.message);
					}

				});

			} else {
				// 当前方法要求传递原生JS对象 而不是JQ对象!!!!
				mui.swipeoutClose($li[0]);
			}

		});

	});

});