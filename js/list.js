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



$(function () {
  let list = null

  const list_info = {
    cat_one: 'all',
    sort_method: '综合',
    sort_type: 'ASC',
    current: 1,
    pagesize: 20
  }

  // 1. 请求一级分类列表
  getCateOne()
  async function getCateOne() {
    // 1.2 发送请求
    const cat_one_list = await $.get('../server/getCateOne.php', null, null, 'json')
    console.log(cat_one_list)

    // 进行列表渲染
    let str = `<span data-type="all" class="active">全部</span>`

    cat_one_list.list.forEach(item => {
      str += `
        <span data-type="${item.cat_one_id}">${item.cat_one_id}</span>
      `
    })
    $('.cateOneBox > .right').html(str)
  }


  // 请求商品数据列表
  getGoodsList()
  async function getGoodsList() {
    const goodsList = await $.get('../server/getGoodsList.php', list_info, null, 'json')
    console.log(goodsList.list)
    list = goodsList.list

    // 渲染页面
    let str = ''
    goodsList.list.forEach(item => {
      str += `
      <div>
        <p>
          <img src="${item.goods_big_logo}" alt="">
        </p>
        <p data-id="${item.goods_id}" class="p1">${item.goods_name}</p>
        <p>💴${item.goods_price}起</p>
        <p>赠送积分</p>
        <p>
          <a href="javascript:;" class="btn btn-danger addCart" role="button" data-id="${item.goods_id}">加入购物车</a>
          <a href="../html/cart.html" class="btn btn-warning" role="button">去结算</a>
        </p>
      </div>
        `
        // <span> ID: ${item.goods_id}</span>
    })
    $('.clearfix').html(str)
  }

  // 请求回总页数, 回来渲染分页器
  getTotalPage()
  async function getTotalPage () {
    // 请求分页数据,
    const totalInfo = await $.get('../server/getTotalPage.php', list_info, null, 'json')
    console.log(totalInfo)

    $('.pagination').pagination({
      pageCount: totalInfo.total,
      current: 1, // 当前是第几页
      nextContent: '下一页', // 下一页按钮的文本
      coping: true,
      homePage: '首页', // 首页文本内容
      endPage: '末页', // 末页文本配置
      jump: true, // 是否显示跳转控件(input 和 button)
      jumpBtn: 'GO', // 跳转按钮的文本内容
      callback(index) {
        list_info.current = index.getCurrent()

        getGoodsList()
      }
    })
  }

  // 分类列表的点击事件
  $('.cateOneBox').on('click', 'span', function () {
    $(this).addClass('active').siblings().removeClass('active')

    // 拿到点击的哪一个
    const type = $(this).data('type')
    console.log(type)
    // 让当前页面回到第一页
    list_info.current = 1
    list_info.cat_one = type
    // 重新渲染分类信息和列表信息
    getGoodsList()
    getTotalPage()
  })
  
  // 排序方式的点击事件
  $('.sortBox').on('click', 'span', function () {
    const method = $(this).attr('data-method')
    const type = $(this).attr('data-type')

    $(this).addClass('active').siblings().removeClass('active')

    list_info.sort_method = method
    list_info.sort_type = type

    getGoodsList()
    getTotalPage()

    $(this)
      .attr('data-type', type === 'ASC' ? 'DESC' : 'ASC')
      .siblings()
      .attr('data-type', 'ASC')
  })

  // 点击跳转到详情页
  $('.clearfix').on('click', '.p1', function () {
    const id = $(this).data('id')
    setCookie('good_id', id)
    window.location.href = '../html/detail.html'
  })

  // 加入购物车
  $('.clearfix').on('click', '.addCart', function () {
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []
    const id = $(this).data('id')
    const flag = cart.some(item => item.goods_id == id)
    if (flag) {
      const cart_goods = cart.filter(item => item.goods_id == id)[0]
      cart_goods.cart_number = cart_goods.cart_number - 0 + 1
    } else {
      const info = list.filter(item => item.goods_id == id)[0]
      info.cart_number = 1
      cart.push(info)
    }

    window.localStorage.setItem('cart', JSON.stringify(cart))
  })


})


