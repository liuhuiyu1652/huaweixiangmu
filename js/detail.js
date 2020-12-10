$('.register').on('click', function () {
  window.location.href = '../html/login.html'
})

$('.loginli').on('click', function () {
  window.location.href = '../html/register.html'
})

$('.quantity').on('click', function () {
  window.location.href = '../html/cart.html'
})


$(function () {
  // 查看 cookie 中的信息
  // 判断用户信息面板中显示那一条
  const nickname = getCookie('nickname')
  // 根据 nickname 中的信息进行判断
  if (nickname) {
    $('.off').addClass('hide')
    $('.on').removeClass('hide').text(`欢迎您: ${nickname}`)
  } else {
    $('.off').removeClass('hide')
    $('.on').addClass('hide')
  }
})


$('form').on('click', function () {
  $('.searchinfor').addClass('hide')
})

$(function () {

  // 0. 提前准备一个变量拿出来商品信息
  let info = null

  // 1. 拿到 cookie 中的 goods_id 属性
  const id = getCookie('good_id')

  // 2. 根据 id 信息去请求商品数据
  getGoodsInfo()
  async function getGoodsInfo() {
    const goodsInfo = await $.get('../server/getGoodsInfo.php', { goods_id: id }, null, 'json')

    // 3. 进行页面的渲染
    bindHtml(goodsInfo.info)

    // 给提前准备好的变量进行赋值
    info = goodsInfo.info
  }

  function bindHtml(info) {
    console.log(info)


    $('.enlargeBox').html(`
    
      <div class="show">
        <img src="${info.goods_big_logo}" alt="">
        <div class="mask"></div>
      </div>


      <div class="list">
        <p class="active">
        <img src="${info.goods_small_logo}" show="${info.goods_small_logo}" enlarge="${info.goods_small_logo}" alt="">
        </p>
      </div>

      <div class="enlarge" style="background-image:url(${info.goods_big_logo});"></div>
    `
    )

    new Enlarge('.enlargeBox')



    $('.goodsInfo').html(`
    <p class="desc">${info.goods_name}</p>
    <div class="btn-group size">
        <button type="button" class="btn btn-default">S</button>
        <button type="button" class="btn btn-default">M</button>
        <button type="button" class="btn btn-default">L</button>
        <button type="button" class="btn btn-default">XL</button>
      </div>
    <p class="price">
      ￥ <span class="text-danger">${info.goods_price}</span>
    </p>
    <div class="num">
      <button class="subNum">-</button>
      <input type="text" value="1" class="cartNum">
      <button class="addNum">+</button>
    </div>
    <div>
      <button class="btn btn-success addCart">加入购物车</button>
      <button class="btn btn-warning continue"><a href="../html/list.html" style="text-decoration: none; color:#fff">继续去购物</a></button>
    </div>
  `)



    // 4. 加入购物车的操作
    $('.goodsInfo').on('click', '.addCart', function () {
      // 4-2. 拿到 localStorage 里面有没有数组
      // 如果你没有这个数组, 那么我就定义一个空数组
      // 如果你有, 我就用你的
      const cart = JSON.parse(window.localStorage.getItem('cart')) || []

      // 4-3. 判断一下 cart 数组里面有没有这个数据
      // 问题: 当前是哪一条数据 ? id
      // 如果 cart 里面有某一条数据和我的 id 一样
      // 表示我不需要添加内容了, 而是 ++
      // 如果 cart 里面没有某一条数据, 那么我要把当前这条数据 push 进去
      // 当前这一条数据是哪一条 ? info 存储进去
      // 如何判断 cart 中有没有 id 一样的数据
      // some 方法
      const flag = cart.some(item => item.goods_id === id)
      // 如果没有, 那么我就 push 进去
      if (flag) {
        // cart 里面 id 一样的这一条里面的 cart_number ++
        // 4-4. 如果有这个数据拿到这个信息
        // filter 方法返回的是一个数组
        const cart_goods = cart.filter(item => item.goods_id === id)[0]
        cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
      } else {
        info.cart_number = 1
        // 表示没有
        cart.push(info)
      }

      // 4-5. 添加完毕还要存储到 localStorage 里面
      window.localStorage.setItem('cart', JSON.stringify(cart))
    })





    // 5. ++ -- 的事件
    $('.goodsInfo')
      .on('click', '.subNum', function () {
        // 拿到 input 的 value 值
        let num = $('.cartNum').val() - 0
        // 进行判断, 如果当前是 1, 那么什么都不做
        if (num === 1) return
        // 否则就进行 -- 操作, 然后在设置回去
        $('.cartNum').val(num - 1)
      })
      .on('click', '.addNum', function () {
        // 拿到 input 的 value 值
        let num = $('.cartNum').val() - 0
        // 否则就进行 -- 操作, 然后在设置回去
        $('.cartNum').val(num + 1)
      })


  }
})



