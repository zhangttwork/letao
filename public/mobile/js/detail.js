$(function (){

	// 获取商品ID
	var id = getParamsByUrl('id');

	// 发送 商品详情请求
	axios.get('/product/queryProductDetail', {
		params: {
			id: id
		}
	}).then(function (response) {
		
		// 通过模板引擎将商品展示到页面中
		var html = template('detailTpl', response);
		$('#detailBox').html(html);

		// 在轮播图结构完全出现在页面中以后 再去调用轮播图插件
		var gallery = mui('.mui-slider');
		gallery.slider();

		kucun = $('#kucun').html();

	});

	/*
		1.选择尺码
			1. 通过事件委托的方式为span添加事件
			2. 通过样式的方式向用户展示了当前尺码确实是选中了
			3. 获取到用户选择的尺码 存储在变量当中 以备使用

		2.选择商品数量
		3.当用户点击加入购物车按钮的时候 调用接口将商品加入购物车
			1.为加入购物车按钮添加点击事件
			2.判断用户是否选择了尺码以及数量
			3.调接口 实现功能
	*/

	// 商品尺码
	var size = 0;
	// 商品数量
	var num = 1;

	// 获取库存数量
	var kucun = 0;

	// 当用户选择尺码的时候
	$('#detailBox').on('tap', '.detail-size span', function () {
		// 通过样式的方式向用户展示了当前尺码确实是选中了
		$(this).addClass('active').siblings().removeClass('active');
		// 获取到用户选择的尺码 存储在变量当中 以备使用
		size = $(this).html();
	});

	// 当减少产品数量按钮被点击的时候
	$('#detailBox').on('tap', '.reduce', function () {
		
		num = $('#num').val(); // "1"

		if (num <= 1) {
			return;
		}

		$('#num').val(num - 1);

	});

	// 当用户在文本框中输入内容的时候
	$('#detailBox').on('change', '#num', function () {

		// 获取到用户输入的内容 并且将内容存储在了临时变量中
		var tmpNum = parseInt($(this).val());

		// 如果用户输入的数量小于1 不合法 让数量等于1
		if (tmpNum < 1) {
			num = 1;
		// 如果用户输入的数量大于了库存的数量 等于库存的数量
		}else if (tmpNum > parseInt(kucun)) {
			num = kucun;
		}else {
			// 用户输入多少就是多少
			num = tmpNum;
		}

		// 将判断过后的数量 重新显示在页面中
		$(this).val(num);

	});


	// 当增加产品数量按钮被点击的时候
	$('#detailBox').on('tap', '.plus', function () {
		// 通过JS去HTML页面中获取内容 无论内容看起来像什么 它都是字符串
		num = parseInt($('#num').val()); // "1"

		// num 是数值 kucun是字符串
		// >= 在比较的时候 会发生隐式类型转换 先将kucun转换为数值 再进行比较
		if (num >= kucun) {
			return;
		}

		$('#num').val(num + 1);
	});

	// 当用户点击购物车按钮的时候
	$('#addCart').on('tap', function () {

		// 判断用户是否选择了尺码
		if (size == 0) {
			mui.toast('请选择尺码');
			return;
		}

		// 发送添加购物车请求
		axios.post('/cart/addCart', {
			productId: id,
			num: num,
			size: size
		}).then(function (response) {
			console.log(response);
			if (response.success) {
				mui.toast('添加购物车成功');
			}else {
				mui.toast(response.message);
			}
		});

	});


});