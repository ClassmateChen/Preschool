$(function () {
    // 登录注册显示隐藏切换
    $('.link_reg').on('click', function () {
        $('.loginBox').hide()
        $('.regBox').show()
    })
    $('.link_login').on('click', function () {
        $('.loginBox').show()
        $('.regBox').hide()
    })

    // 注册区域Ajas和js样式
    $('.regForm').on('submit', function (e) {
        // 阻止表单的提交和页面的跳转
        e.preventDefault()
        // 注册区域两次密码进行确认
        var regForm_passwords = ($('.regPassword').val() === $('.regPasswords').val());
        // 注册区域post所需要的data数据 
        var data = {
            username: $('.regName').val(),
            password: $('.regPassword').val()
        }
        // 密码的正则表达式
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
        var regPassword = $('.regPassword').val()

        if (reg.test(regPassword) != true) {
            alert('密码至少包含 数字和英文,长度6-20')
        } else if (regForm_passwords != true) {
            alert('两次密码不符请重新输入')
        } else {
            $.post('/api/reguser', data, function (res) {
                if (res.status != 0) {
                    alert(res.message)
                    console.log(res);
                } else {
                    $('.link_login').click()
                }
                // 注册区域用户名跳转复制给登录区域
                $('.loginName').val($('.regName').val())
            }
            )
        }
    })

    // 登录区域Ajas和js样式
    $('.loginForm').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.post('/api/login', data, function (res) {
            if (res.status != 0) {
                alert('输入内容有误')
                console.log(res);
            } else {
                localStorage.setItem('token', res.token)
                location.href = "../index.html"
            }
        })
    })
})