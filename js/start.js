
function getBrowser() { //判断浏览器是在android系统上还是在ios系统上

    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {

        window.location.href = "sj/index.html"; //移动端页面

    } else {

        window.location.href = "pc/index.html?tab=home"; //pc端页面

    }

}




window.onload = function () {

    $('#index_modal').modal({
        backdrop: 'static',
        keyboard: false
    });

    if (window.localStorage.getItem('user_id') != null) {
        //getBrowser()
    } else {
        $('#index_modal').modal('show')
    }
}
$("#gonew").on("click", function () {
    if (document.querySelectorAll("input")[4].value == document.querySelectorAll("input")[5].value) {
        $.ajax({
            url: window.localStorage.getItem('ym') + "user/newUser",
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                "user_name": document.querySelectorAll("input")[0].value,
                "user_pwd": document.querySelectorAll("input")[4].value,
                "real_name": document.querySelectorAll("input")[1].value,
                "user_email": document.querySelectorAll("input")[2].value,
                "user_phone": document.querySelectorAll("input")[3].value
            }),
            success: function (res) {
                //console.log(res);
                if (res.message == "success") {
                    err("s", "注册成功")
                    window.localStorage.setItem("user_id", res.user_id)
                    window.localStorage.setItem("user_pwd", res.user_pwd)
                    getBrowser()
                } else {
                    err("e", res.message)
                }
            }
        });
    } else {
        err("e", "两次密码不一致")
    }
})

$("#gologin").on("click", function () {
    if (document.querySelectorAll("input")[9].value == document.querySelectorAll("input")[10].value) {
        $.ajax({
            url: window.localStorage.getItem('ym') + "user/login",
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                "user_pwd": document.querySelectorAll("input")[9].value,
                "real_name": document.querySelectorAll("input")[6].value,
                "user_email": document.querySelectorAll("input")[7].value,
                "user_phone": document.querySelectorAll("input")[8].value
            }),
            success: function (res) {
                //console.log(res);
                if (res.message == "success") {
                    err("s", "登录成功！")
                    window.localStorage.setItem("user_id", res.user_id)
                    window.localStorage.setItem("user_pwd", res.user_pwd)
                    getBrowser()
                } else {
                    err("e", res.message)
                }
            }
        });
    } else {
        err("e", "两次密码不一致")
    }
    Print(JSON.stringify({
        "user_pwd": document.querySelectorAll("input")[9].value,
        "real_name": document.querySelectorAll("input")[6].value,
        "user_email": document.querySelectorAll("input")[7].value,
        "user_phone": document.querySelectorAll("input")[8].value
    }),)
})