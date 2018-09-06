$(function (){

	// 获取二级分类数据
	$.ajax({
		url: '/category/querySecondCategoryPaging',
		type: 'get',
		data: {
			page: 1,
			pageSize: 1000
		},
		success: function (response) {
			// 将二级分类数据展示在页面中
			var html = template('categorySecondTpl', response);
			$('#categorySecondBox').html(html);
		}
	});

	// 获取一级分类数据 并显示在下拉框中
	$.ajax({
		url: '/category/queryTopCategoryPaging',
		type: 'get',
		data: {
			page: 1,
			pageSize: 1000
		},
		success: function (response) {
			console.log(response);
			var html = template('categoryFirstTpl', response);
			$('#categoryFirstBox').html(html);
		}
	});


	// 品牌logo
	var brandLogo = '';

	// 实现文件上传
	$('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {
	    	// 获取图片上传地址
	    	brandLogo = data.result.picAddr;
	    	// 将图片地址显示在页面中
	    	$('#preview').attr('src', brandLogo);
	    }
	});


	// 当用户点击添加二级分类按钮的时候
	$('#addSecondCategoryBtn').on('click', function () {
		// 获取用户输入的品牌名称
		var brandName = $('#brandName').val();
		console.log(brandName);
		// 所属分类id
		// var categoryId = $('[name="categoryId"]').val();
		var categoryId = $('#categoryFirstBox').val();
        console.log(categoryId);
		var hot = 1;

		$.ajax({
			url: '/category/addSecondCategory',
			type: 'post',
			data: {
				// 当对象的属性和值变量名字相同时 可以简写
				brandName,
				categoryId,
				brandLogo,
				hot
			},
			success: function (response) {
				if (response.success) {
					location.reload()
				}else{
					alert(response.message);
				}
			}
		})


	});

})