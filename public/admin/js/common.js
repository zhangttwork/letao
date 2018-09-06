$(function(){

	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});

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