$(function () {
	// 获取用户通过地址栏传递过来的关键字
	var keyword = getParamsByUrl('keyword');
	// 如果用户没有写入关键字
	if (keyword == -1) {
		// 跳回搜索页面 要求用户输入关键字
		location.href = 'search.html';
	}

	// 当前页
	var page = 1;
	// 每一页显示多少条数据
	var pageSize = 2;

	// 默认是升序排列
	var price = 1;

	var This = null;

	mui.init({
	  pullRefresh : {
	    container: '#refresh',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
	    up : {
	      height:50,//可选.默认50.触发上拉加载拖动距离
	      auto:true,//可选,默认false.自动上拉加载一次
	      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
	      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
	      callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	    }
	  }
	});

	/*
		getData调用的时机
			1.页面一上来的时候 调用一次 获取初始化(第一页)数据
			2.触发上拉加载的时候调用
	*/

	function getData () {

		This = this;

		// 根据用户输入的关键字进行接口调用
		axios.get('/product/queryProduct', {
			params: {
				proName: keyword,
				page: page,
				pageSize: pageSize,
				price: price
			}
		}).then(function (response) {
			console.log(response)
			// 将搜索结果展示在页面中
			var html = template('productTpl', response);
			$('#productBox').append(html);

			// 如果页面*每一页显示条数大于了总条数
			// 当没有数据时 结束上拉加载
			if (page * pageSize > response.count) {
				// 结束当前这次上拉加载
				This.endPullupToRefresh(true);
			} else {
				// 结束当前这次上拉加载
				This.endPullupToRefresh(false);
				// 页码增加
				page++;
			}

		});
	}


	// 当用户点击价格排序的时候
	$('#priceSort').on('tap', function () {

		// 初始化页码
		page = 1;

		// 启用上拉加载
		mui('#refresh').pullRefresh().enablePullupToRefresh();

		// 价格排序字段
		price = price == 1 ? 2 : 1;

		axios.get('/product/queryProduct', {
			params: {
				proName: keyword,
				page: page,
				pageSize: pageSize,
				price: price
			}
		}).then(function (response) {
			console.log(response)
			// 将搜索结果展示在页面中
			var html = template('productTpl', response);
			$('#productBox').html(html);

			// 如果页面*每一页显示条数大于了总条数
			// 当没有数据时 结束上拉加载
			if (page * pageSize > response.count) {
				// 结束当前这次上拉加载
				// This.endPullupToRefresh(true);
			} else {
				// 结束当前这次上拉加载
				// This.endPullupToRefresh(false);
				// 页码增加
				page++;
			}

		});

	});


});