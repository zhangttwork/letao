$(function (){

	var page = 1;
	var pageSize = 2;
	var totalPage = 0;

	// 总页数 => Math.ceil(数据总条数 / 每一页显示的条数)

	// 发送请求一级分类数据并展示在页面中
	getData ();

	// 当上一页按钮被点击的时候
	$('#prev').on('click', function () {

		page--;

		if (page < 1) {
			page = 1;
			alert('已经是第一页了');
			return;
		}

		getData();

	});

	// 当下一页按钮被点击的时候
	$('#next').on('click', function () {

		page++;

		if (page > totalPage) {
			page = totalPage;
			alert('已经是最后一页了');
			return;
		}

		getData ();

	});

	// 请求数据
	function getData () {
		$.ajax({
			url: '/category/queryTopCategoryPaging',
			type: 'get',
			data: {
				page: page,
				pageSize: pageSize
			},
			success: function (response) {
				console.log(response);
				var html = template('categoryFirstTpl', response);
				$('#categoryFirstBox').html(html);
				// 计算总页数
				totalPage = Math.ceil(response.total / pageSize);
			}
		});
	}

	// 当用户点击添加一级分类按钮的时候
	$('#addCategoryFirst').on('click', function () {
		// 获取用户输入的分类名称
		var categoryName = $('#categoryName').val();
		// 验证用户是否输入了分类名称
		if (categoryName.trim().length == 0) {
			alert('请输入一级分类名称');
			return;
		}

		$.ajax({
			url: '/category/addTopCategory',
			type: 'post',
			data: {
				categoryName: categoryName
			},
			success: function (response) {
				if (response.success) {
					location.reload();
				}else {
					alert(response.message);
				}
			}
		});

	});

});