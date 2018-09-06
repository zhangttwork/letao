$(function (){

	/*
		在编辑收货地址的时候 由于模板是通过JS后追加到页面中的 所以在页面一上来的时候 获取元素是获取不到的

		解决办法

			1. 通过事件委托的形式添加事件
			2. 等到页面中有了这个元素以后 再取获取 就可以获取到了
	*/

	var cityPicker = new mui.PopPicker({layer:3});
	// 向三级联动弹出框中添加数据
    cityPicker.setData(cityData);
    // 选择触发三级联动弹出框的容器
	var editForm = $('#editForm');

	// 当用户点击showCityPickerButton按钮的时候
	editForm.on('tap', '#showCityPicker', function(event) {
		var This = $(this);
		// 让三级联动弹出框显示
		cityPicker.show(function(items) {
			// 当用户点击确定的时候 执行当前函数
			console.log( "你选择的城市是:" + (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text)
			// 将用户选择的信息添加到页面中
			This.val((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);
		});
	});
	
	// 获取地址栏中的ID参数
	var id = getParamsByUrl ('id');

	// 如果地址栏中有ID
	if (id != -1) {
		// 修改操作
		// 调用接口获取所有的收货地址
		// 循环所有的收货地址 匹配用户传递过来的id
		// 将匹配到的数据显示在页面中
		axios.get('/address/queryAddress').then(function (response) {

			// 查找当前需要修改的地址
			var result = response.find(function (item) {
				return item.id == id
			});

			// 将修改地址显示在页面中
			var html = template('modifyTpl', result);
			$('#editForm').html(html);
			// 修改页面标题
			$('#pageTitle').html('修改收货地址');

			// 三级联动
			// triggerPicker();
		});
	

	}else {
		// 添加操作
		// 三级联动
		// triggerPicker();
	}


	// 当收货地址编辑按钮被点击的时候
	$('#editBtn').on('tap', function () {
		// 获取表单数据
		var formData = $('#editForm').serializeToJson();

		// 验证用户是否输入收货人姓名
		if (formData.recipients.trim().length == 0) {
			mui.toast('请输入收货人姓名');
			return;
		}

		// 添加收货地址接口地址
		var url = '/address/addAddress';
		// 提示信息的文字
		var msg = '添加';

		if (id != -1) {
			// 修改操作
			url = '/address/updateAddress';
			// 将修改的ID添加到参数对象中
			formData.id = id;
			// 提示信息的文字
			msg = '修改'
		}

		axios.post(url, formData).then(function (response) {
			console.log(response);
			if (response.success) {
				mui.toast('收货地址'+ msg +'成功, 2s后跳转到收货地址页面');
				setTimeout(function () {
					location.href = 'address.html';
				}, 2000)
			}else {
				mui.toast(response.message);
			}
		});
		
		/*
			添加收货地址和修改收货地址使用的是同一个页面 那么问题来了 当跳转到这个页面时 如果区分当前时修改操作还是添加操作

			如果时修改操作 将要修改的收货地址的ID传到这个页面中

			如果有ID 就是修改 如果没有ID 就是添加
	 	*/
	});

	function triggerPicker () {
		var cityPicker = new mui.PopPicker({layer:3});
		// 向三级联动弹出框中添加数据
	    cityPicker.setData(cityData);
	    // 选择触发三级联动弹出框的容器
		var showCityPickerButton = document.getElementById('showCityPicker');
		// 当用户点击showCityPickerButton按钮的时候
		showCityPickerButton.addEventListener('tap', function(event) {
			// 让三级联动弹出框显示
			cityPicker.show(function(items) {
				// 当用户点击确定的时候 执行当前函数
				console.log( "你选择的城市是:" + (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text)
				// 将用户选择的信息添加到页面中
				showCityPickerButton.value = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
			});
		}, false);
	}


});