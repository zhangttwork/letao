$(function (){

	// 获取商品信息
	$.ajax({
		url: '/product/queryProductDetailList',
		type: 'get',
		data: {
			page:1,
			pageSize: 1000
		},
		success: function (response) {
 			// 将商品信息展示在页面中
 			var html = template('productTpl', response);
 			$('#productBox').html(html);
		}
	});

	// 获取品牌信息
	$.ajax({
		url: '/category/querySecondCategoryPaging',
		type: 'get',
		data: {
			page: 1,
			pageSize: 10000
		},
		success: function (response) {
			console.log(response);
			// 将数据展示在下拉框中
			var html = template('brandTpl', response);
			$('#brandBox').html(html);
		}
	});

	// 图片数组
	var pic = [];

	var imgBox = $('#imgBox');

	// 实现图片上传
	$('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {
	    	console.log(data.result);
	    	// 将当前上传的图片存储到数组中 以备使用
	    	pic.push(data.result);
	    	// 创建图片
	    	var img = document.createElement('img');
	    	img.src = data.result.picAddr;
	    	// 将图片追加到页面中
	    	imgBox.append(img);
	    }
	});

	// 当用户点击添加产品按钮的时候
	$('#addProduct').on('click', function () {
		// 获取表单数据
		var formData = $('#productForm').serializeToJson();
		// 将图片数组添加到参数对象中
		formData.pic = pic;
		// 默认让商品都是上架的
		formData.statu = 1;
		// 发送添加商品请求
		$.ajax({
			url: '/product/addProduct',
			type: 'post',
			data: formData,
			success: function (response) {
				if (response.success) {
					location.reload();
				}else {
					alert(response.message);
				}
			}
		})

	});

});