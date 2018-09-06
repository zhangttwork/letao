var xhr = new XMLHttpRequest();
	
// false 代表同步
xhr.open('get', '/user/queryUserMessage' , false);

xhr.onreadystatechange = function () {
	if (xhr.readyState == 4 && xhr.status == 200) {
		var result = JSON.parse(xhr.responseText);
		if (result.error == 400) {
			location.href = 'login.html';
		}
	}
}

xhr.send();

// http请求 在请求的过程中只能传递字符串