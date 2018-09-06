$(function () {
	// 当搜索按钮被点击的时候
	$('#searchBtn').on('tap', function () {
		// 获取用户输入的内容
		var keyword = $('#searchInp').val();
		// 如果用户没有输入内容 阻止代码向下执行 并给出输入内容的提示
		if (keyword.trim().length == 0) {
			mui.toast('请输入搜索关键字...');
			return;
		}
		// 将用户输入的关键字存储在本地 方便下次来到这个页面的时候显示搜索历史关键字
		
		// 从本地取出之前已经输入的历史关键字
		// 如果本地中没有搜索关键字 返回null
		var keywordAry = localStorage.getItem('keywordAry');

		// 如果本地中有历史关键字
		if (keywordAry) {

			// 将本地存储中的数组字符串转换为数组
			keywordAry = JSON.parse(keywordAry);

			// 将当前用户输入的关键字存储到内存数组中
			keywordAry.push(keyword);

			// 将数组重新存储到本地
			localStorage.setItem('keywordAry', JSON.stringify(keywordAry));

		} else {
			// 如果本地中没有历史关键字
			// 直接将本次输入的关键字存储在本地
			localStorage.setItem('keywordAry', JSON.stringify([keyword]));
		}

		// 跳转页面 并将用户输入的关键字传递到搜索结果页面
		location.href = 'search-list.html?keyword=' + keyword;
	});


	// 将搜索历史关键字在页面一上来的时候显示在页面中
	var keywordAry = localStorage.getItem('keywordAry');

	// 如果本地中存在历史搜索记录
	if (keywordAry) {
		// 将本地的历史搜索记录转换为数组对象
		keywordAry = JSON.parse(keywordAry);
		// 通过模板引擎将模板与数据进行拼接 返回拼接好的字符串
		var html = template('historyTpl', {
			rows: keywordAry
		});

		// 将拼接好的字符串显示在页面中
		$('#historyBox').html(html);
	}

});