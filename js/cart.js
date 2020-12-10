$('.register').on('click', function () {
  window.location.href = '../html/login.html'
})

$('.loginli').on('click', function () {
  window.location.href = '../html/register.html'
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



$(function () {
  const nickname = getCookie('nickname')
  if(!nickname) return window.location.href = '../html/login.html'
  const cart = JSON.parse(window.localStorage.getItem('cart')) || []
  console.log(cart)
  console.log(cart.length)
  if (!cart.length) {
    $('.open').addClass('hide')
    $('.close').removeClass('hide')
    return
  }
  $('.close').addClass('hide')
  $('.open').removeClass('hide')
  bindHtml()
  function bindHtml() {
    const selectAll = cart.every(item => item.is_select === '1')
    let total = 0
    let totalMoney = 0
    cart.forEach(item => {
      if (item.is_select === '1') {
        total += item.cart_number - 0
        totalMoney += item.cart_number * item.goods_price
      }
    })
    let str = `
        <div class="panel panel-info">
        <p class="selectAll">
          <input type="checkbox" ${ selectAll ? 'checked' : '' } class="inp">
          <span class="spaninp">全选</span>
          <span>商品</span>
          <span>单价</span>
          <span>数量</span>
          <span>小计</span>
          <span>操作</span>
        </p>
      </div>
      <div class="panel-body">
        <ul class="goodsList">
    `

    cart.forEach(item => {
      str += `
        <li>
            <div class="select">
              <input data-id="${ item.goods_id }" type="checkbox" ${ item.is_select === '0' ? '' : 'checked' }>
            </div>
            <div class="goodsImg">
              <img src="${ item.goods_small_logo }">
            </div>
            <div class="goodsDesc">
              <p>${ item.goods_name }</p>
            </div>
            <div class="price">
              ￥<span class="text-danger">${ item.goods_price }</span>
            </div>
            <div class="count">
              <button class="subNum" data-id="${ item.goods_id }">-</button>
              <input type="text" value="${ item.cart_number }">
              <button class="addNum" data-id="${ item.goods_id }">+</button>
            </div>
            <div class="xiaoji">
              小计: ￥<span class="text-danger">${ (item.goods_price * item.cart_number).toFixed(2) }</span>
            </div>
            <div class="operate push-button">
              <button class="btn btn-danger del" data-id="${ item.goods_id }">删除</button>
            </div>
          </li>
      `
    })
    str += `
      </ul>
      </div>

      <div class="row buyInfo">
        <p class="col-sm-2 buyNum">
          购买总数量: <span class="text-danger cartNum">${ total }</span> 件商品
        </p>
        <p class="col-sm-3 buyMoney">
          购买总价格: <span class="text-danger total">${ totalMoney.toFixed(2) }</span> 元
        </p>
        <p class="col-sm-4 operate">
          <button class="btn btn-success" ${ totalMoney === 0 ? 'disabled' : '' }>立即付款</button>
          <button class="btn btn-danger empty">清空购物车</button>
          <button class="btn btn-primary"><a href="../html/list.html" style="color:#fff">继续购物</button>
        </p>
      </div>
    `

    $('.open').html(str)
  }

  // 给每个按钮添加点击事件
  $('.open').on('click', '.select > input', function () {
    const type = this.checked
    const id = $(this).data('id')
    const info = cart.filter(item => item.goods_id == id)[0]
    info.is_select = type ? '1' : '0'
    bindHtml()
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  // ++
  $('.open').on('click', '.addNum', function () {
    const id = $(this).data('id')
    const info = cart.filter(item => item.goods_id == id)[0]
    info.cart_number = info.cart_number - 0 + 1
    bindHtml()
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  // --
  $('.open').on('click', '.subNum', function () {
    const id = $(this).data('id')
    const info = cart.filter(item => item.goods_id == id)[0]
    if(info.cart_number === 1) return
    info.cart_number = info.cart_number - 0 - 1
    bindHtml()
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  // remove
  $('.open').on('click', '.del', function () {
    const id = $(this).data('id')
    for(let i = 0; i < cart.length; i++) {
      if(cart[i].goods_id == id) {
        cart.splice(i, 1)
        break
      }
    }
    
    bindHtml()
    window.localStorage.setItem('cart', JSON.stringify(cart))
    if(!cart.length) return window.location.reload()
  })

  // 全选
  $('.open').on('click', '.selectAll > input', function () {
    let type = this.checked
    if (type) {
      cart.map(item => item.is_select = '1')
    } else {
      cart.map(item => item.is_select = '0')
    }
    bindHtml()
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  // 清空购物车
  $('.open').on('click', '.empty', function () {
    cart.splice(0, cart.length)
    // $('.goodsList > li').each((index, item) => console.log(item))
    // window.localStorage.removeItem(cart)
    bindHtml()
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })
})

