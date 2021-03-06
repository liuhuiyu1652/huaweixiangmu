# 华为项目

### 首页

1. 进入首页头部有划入显示的二级菜单

2. 右侧 input 框带有搜索引擎

3. 下方有左右切换的轮播图

4. 轮播图下方的标签带有吸顶效果

5. 首页底部的 `返回顶部` 标签带有回到顶部的效果

   ​	

### 登录注册

1. 点击首页上方标签进入列表页
2. 在列表最顶端带有`登录 ` 、`注册`按钮
3. 点击注册按钮将跳转到注册页面
4. 填写`用户名` `账号` `密码` 点击注册, 注册成功, 将直接跳转到登陆页面
5. 输入`账号` `密码` 完成登录, 跳转到列表页
6. 在列表页头部将显示用户名

### 例表页

1. 在列表页头部带有一级分类和两种排序方式的渲染
2. 主体部分是渲染页面, 可通过点击分类列表来切换主体部分的渲染数据
3. 可通过点击下方的 `加入购物车` 将商品数据添加到 `Local Storage` 中来达到跨页面传递数据的效果
4. 点击 `去结算` 将直接跳转到购物车页面, 或者点击页面顶部最右侧的的 `购物车` 来进入购物🚗
5. 在底部带有分页器, 可通过点击或者输入具体页数来切换页面

### 详情页

1. 点击列表页每一个的商品的简介部分文字来进入详情页
2. 详情页是通过点击列表页的商品, 来获取每个商品的具体 id 信息, 来进行渲染页面
3. 左侧的图片带有放大镜效果, 将鼠标划入将触发放大镜效果
4. 右侧是一个渲染部分
5. 可通过点击 `+` `-` 符号来调整具体的商品数量, 然后点击加入购物车, 同列表页的原理一样, 将商品数据添加到 `Local Storage` 中来达到跨页面传递数据的效果
6. 点击继续徐购物将跳转页面到列表页

### 购物车

1. 在列表页点击每个商品的 `去结算` 和头部最右侧的 `购物车` , 或者点击详情页头部最右侧的购物者, 都可进入购物者
2. 购物车中的数据是通过拿到存储在 `Local Storage` 中的数据, 来进行页面渲染
3. 在购物车的商品的左侧带有勾选按钮, 可通过点击勾选按钮来选择是否购买此商品, 点击 `全选按钮` 可改变下方所有商品的选中状态
4. 点击 `+` `-` 符号, 可在购物车中来改变购买商品的数量
5. 点击商品右侧的 `删除` 按钮, 可以删除本条商品数据
6. 在购物车底部的`购买总数量` 和 `购买总价格` 是通过商品是否被选中发生改变, 
7. 点击购物车底部的 `清空购物者` 可一次性清空购物车中的所有数据
8. 点击 `继续购物` 将跳转止列表页
