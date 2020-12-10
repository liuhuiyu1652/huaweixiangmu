$(function () {
  $('#register').validate({
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
      },
      nickname: {
        required: true,
        minlength: 2,
        maxlength: 7
      }
    },
    // 提示信息配置
    messages: {
      username: {
        required: '请填写账号',
        minlength: '最少 5 个字符',
        maxlength: '最多 10 个字符'
      },
      password: {
        required: '请填写密码',
        minlength: '最少 6 个字符',
        maxlength: '最多 12 个字符'
      },
      nickname: {
        required: '请填写用户名',
        minlength: '最少 2 个字符',
        maxlength: '最多 7 个字符'
      }
    },
    //表单提交事件
    submitHandler (form) {
      const info = $(form).serialize()
      // 发送请求到后端
      $.post('../server/register.php', info, null, 'json').then(res => {
        console.log(res)
       
        // window.location.href = '../html/login.html'
        if (res.bool === 'true') {
          window.location.href = '../html/login.html'
        } else if (res.bool === 'false') {
          alert('登陆失败')
        }
      })
    }
  })
})