

$(function () {
  $('#login').validate({
    // 配置规则
    rules: {
      username: {
        required: true,
        minlength: 5,
        maxlength: 10
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 12
      }
    },
    // 提示信息配置
    messages: {
      username: {
        required: '请填写用户信息',
        minlength: '最少 5 个字符',
        maxlength: '最多 10 个字符'
      },
      password: {
        required: '请填写密码',
        minlength: '最少 6 个字符',
        maxlength: '最多 12 个字符'
      }
    },
    // 表单提交事件
    submitHandler (form) {
      // 拿到用户填写的数据
      const info = $(form).serialize()
      // 发送请求到后端
      $.post('../server/login.php', info, null, 'json').then(res => {
        console.log(res)

        // 登录成功后的操作
        if (res.code === 0) {
          $('.login_error').removeClass('hide')
        } else if (res.code === 1) {
          setCookie('nickname', res.nickname)
          window.location.href = '../html/list.html'
        }
      })
    }
  })
})
