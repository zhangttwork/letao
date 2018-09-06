## 乐淘电商

### 项目简介

移动web电商购物网站 + PC端电商管理后台

#### 功能模块

##### 移动端

| 模块     | 功能                         |
| -------- | ---------------------------- |
| 首页     | 静态展示                     |
| 分类     | 一级分类、二级分类           |
| 商品     | 搜索中心、商品列表、商品详情 |
| 购物车   | 购物车管理                   |
| 用户     | 登录、注册、账户管理         |
| 收货地址 | 收货地址管理                 |

##### PC端

| 模块     | 功能                       |
| -------- | -------------------------- |
| 登录     | 管理员登录                 |
| 用户管理 | 用户权限管理               |
| 分类管理 | 一级分类、二级分类管理     |
| 商品管理 | 商品录入、删除、修改、展示 |

#### 开发模式

前后端开发分离，前端请求后端提供的**接口**处理业务逻辑，后端只负责**数据**的提供。

<img src="media/开发方式.png"/>

#### 项目架构

| 系统分层 | 使用技术                                              |
| -------- | ----------------------------------------------------- |
| 数据层   | MYSQL                                                 |
| 服务层   | NodeJs(express)                                       |
| 前端展示 | Promise、Axios、zepto、art-template、Mui、fontAwesome |

#### 项目搭建

1. 开启phpstudy，目的是使用其中的mysql数据库
2. 创建数据库和乐淘项目需要的数据表（使用Navicat软件导入sql文件即可）
3. 在letao根目录下打开命令行窗口 执行npm start命令（在项目开发阶段不要关闭命令行工具）
   1. 目的是将后台接口运行起来，前端需要调用接口完成网站业务逻辑
4. 如果是32位系统，需要将node_modules目录删除，在项目根目录执行npm install 重新安装项目依赖
5. 项目连接数据库默认使用的root用户名root密码，如果以前修改过数据库默认用户名和密码需要项目配置中重新配置

#### 登录密码

| 前端         | 后端         |
| ------------ | ------------ |
| 账号：itcast | 账号：root   |
| 密码：111111 | 密码：123456 |

### 文件上传

```html
<script src="assets/jquery-fileupload/jquery.ui.widget.js"></script>
<script src="assets/jquery-fileupload/jquery.iframe-transport.js"></script>
<script src="assets/jquery-fileupload/jquery.fileupload.js"></script>
```

```html
<input type="file" id="fileUpload" data-url="/category/addSecondCategoryPic" name="file" accept="image/jpeg">
<!--
	data-url 接口地址
	accept 允许选择的图片类型
-->
```

```javascript
$('#fileUpload').fileupload({
    dataType: 'json',
    done: function (e, data) {}
});
```

