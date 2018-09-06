$(function(){
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	return response.data;
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

/*
	实现一个jQuery对象方法

	获取表单数据 返回对象格式的数据
*/

$.fn.serializeToJson = function () {
	// 结果对象
	var result = {};

	// 当前方法中的this是谁?
	// 谁调用我 我就是谁
	var formData = this.serializeArray();
	// 循环表单数据
	for (var i = 0; i < formData.length; i++) {
		// 将表单数据对应字段放在结果对象中
		result[formData[i].name] = formData[i].value;
	}

	// 将结果返回的函数外部
	return result;
};

/*
	获取地址栏中的参数
*/

function getParamsByUrl (param) {

	// ["id=1", "name=20"]
	var paramAry = location.search.substr(1).split('&');

	for (var i = 0; i < paramAry.length; i++) {
		// ["id", "1"]
		// ["name", "20"]
		var tmp = paramAry[i].split('=');
		// 如果当前循环项和参数项相同 将循环数组的第2值返回出去
		if (tmp[0] == param) {
			return tmp[1];
		}
	}

	// 如果用户想要的参数 地址栏中没有返回-1 返回在函数外面做判断
	return -1;
}