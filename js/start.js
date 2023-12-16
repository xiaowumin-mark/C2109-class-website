
function getBrowser() { //判断浏览器是在android系统上还是在ios系统上

    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {

        window.location.href = "sj/index.html"; //移动端页面

    } else {

        window.location.href = "pc/index.html"; //pc端页面

    }

}



function Print(a) {
    console.log(a)
}
window.onload = function () {

    $('#index_modal').modal({
        backdrop: 'static',
        keyboard: false
    });
    let UserName = getCookie("user_name")
    if (UserName != '') {

    } else {
        $('#index_modal').modal('show')



    }
}
$("#gonew").on("click", function () {
    if (document.querySelectorAll("input")[4].value == document.querySelectorAll("input")[5].value) {
        $.ajax({
            url: getCookie('ym') + "user/newUser",
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
                console.log(res);
                err("s", "注册成功")
            }
        });
    } else {
        err("e", "两次密码不一致")
    }
})

