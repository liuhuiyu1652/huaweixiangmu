var mySwiper = new Swiper ('.swiper-container', {
  // direction: 'vertical', // 垂直切换选项
  loop: true, // 循环模式选项
  speed: 300,
  autoplay:{
    delay: 3000
  },
  
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },
  
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
  // 如果需要滚动条
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})  


$('form').on('click', function () {
  $('.searchinfor').addClass('hide')
})



const ul = document.querySelector('.searchdiv')
const inp = document.querySelector('.searchinp')
inp.addEventListener('input', function () {
  const value = this.value.trim()
  if (!value)return
  const script = document.createElement('script')
  const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
  script.src = url
  document.body.appendChild(script)
  script.remove()
})

function bindHtml(res) {
  if (!res.g) {
    ul.classList.remove('active')
    return
  }
  let str = ''
  for (let i = 0; i < res.g.length; i++) {
    str += `
      <li>${ res.g[i].q }</li>
    `
  }
  ul.innerHTML = str
  ul.classList.add('active')
}

const gotop = document.querySelector('.J_anchor')
window.onscroll = function () {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
}

gotop.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

$('.naverul').on('click', function () {
  window.location.href = '../html/list.html'
})