$(function (){
	/*
		1.在页面一上来的时候 获取一级分类的数据 并展示在页面中
		2.在点击一级分类的时候 获取二级分类数据 并展示在页面中

		当我们在页面中引入axios.js库时 在全局作用域下就多出了axios对象
				
			axios.get('url', {
				params: {
					id: 1
				}
			})
			.then(function (response) {

			});

			axios库在返回数据时 会将数据包裹在一个新的对象中 对象中的data属性才是我们需要的数据

	*/

	// 发送请求一级分类数据
	axios.get('/category/queryTopCategory')
		.then(function (response) {
			// 利用模板引擎拼接数据
			var html = template('categoryFirstTpl', response);
			// 将拼接好的数据显示在页面中
			$('#categoryFirstBox').html(html);
			// 默认让一级分类的第一个分类选中
			$('#categoryFirstBox a').eq(0).addClass('active');
			// 获取二级分类数据
			getSecondCategoryData (response.rows[0].id);
		});

	// 当一级分类被点击的时候
	$('#categoryFirstBox').on('tap', 'a', function () {
		// 点击哪一个一级分类 让哪一个一级分类选中
		$(this).addClass('active').siblings().removeClass('active');
		// 获取一级分类ID
		var id = $(this).attr('data-id');
		// 获取二级分类数据
		getSecondCategoryData (id)
	});
	
	// 获取二级分类数据
	function getSecondCategoryData (id) {
		// 发送请求二级分类的数据
		axios.get('/category/querySecondCategory', {
			params: {
				id: id
			}
		}).then(function (response) {
			var html = template('categorySecondTpl', response);
			$('#categorySecondBox').html(html);
		})
	}

});

/*
	axios为我们提供了拦截器的概念
		
		拦截器分为响应拦截器 和 请求拦截器

		拦截器可以让我们在发送请求之前或者拿到响应之前 对请求或者 响应进行处理

*/

