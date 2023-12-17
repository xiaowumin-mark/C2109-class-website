window.onload = function () {

    $('#myModal').modal({
        backdrop: 'static',
        keyboard: false
    });
    $.ajax({
        url: '../modal.json',
        type: 'get',
        success: function (res) {
            if (res.v) {
                //ShowModal(res.btn, res.main, res.title)
            }
        }
    });
}


function toTabPep() {
    $.ajax({
        url: './pep.html',
        type: 'get',
        success: function (res) {
            document.getElementById('main').innerHTML = res
            $.ajax({
                url: window.localStorage.getItem('ym') + "user/userInfo",
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "user_id": window.localStorage.getItem('user_id'),
                    "user_pwd": window.localStorage.getItem('user_pwd'),
                }),
                success: function (res) {
                    let idd = String(res.main.ID)
                    setTimeout(function () {
                        document.getElementById("pep_name").innerText = res.main.UserName
                        document.getElementById("pep_email").innerText = "邮箱 " + res.main.Email
                        document.getElementById("pep_phone").innerText = "手机 " + res.main.Phone
                        document.getElementById("pep_userId").innerText = idd
                        document.getElementById("pep_userCreat").innerText = res.main.CreatedAt
                        document.getElementById("pep_namee").innerText = res.main.UserName
                        document.getElementById("pep_realName").innerText = res.main.RealName
                        document.getElementById("pep_emaill").innerText = res.main.Email
                        document.getElementById("pep_phonee").innerText = res.main.Phone
                        document.getElementById("pep_type").innerText = res.main.UserType
                    }, 1000);

                }
            });
        }
    });


}

function toTabImg() {
    $.ajax({
        url: './img.html',
        type: 'get',
        success: function (res) {
            document.getElementById('main').innerHTML = res
            $.ajax({
                url: window.localStorage.getItem('ym') + "allImg",
                type: 'post',
                success: function (res) {
                    Print(res)
                    setTimeout(function () {
                        for (var i = res.main.length - 1; i >= 0; i--) {
                            let dd = `
                            <div class="card" style="width: 30%;float: left;">
                            <img style="height: 250px;" src="${window.localStorage.getItem('ym')}img?id=${res.main[i].id}&h=250" class="card-img-top" alt="">
                            <div class="card-body">
                                <p class="card-text">上传者: ${res.main[i].up_user.name}</p>
                                <p class="card-text">${res.main[i].introduce}</p>
                                <a onclick="window.open('${window.localStorage.getItem('ym')}img?id=${res.main[i].id}')" href="#" class="btn btn-primary">查看</a>
                            </div>
                        </div>
                            `
                            //document.getElementById("img-body").innerHTML = document.getElementById("img-body").innerHTML + dd
                            $(dd).appendTo($("#img_body"))
                        }
                    }, 1000);

                },
                error: function () {
                    err('e', "服务器网络错误！")
                }
            });
        }
    });
}

function changepic() {
    //console.log(obj.files[0]);//这里可以获取上传文件的name
    let obj = document.getElementById("formFileMultiple")
    let formData = new FormData();

    for (var i = obj.files.length - 1; i >= 0; i--) {
        let file = obj.files[i];
        Print(file)
        formData.append("files", file)
        var newsrc = getObjectURL(obj.files[i]);
        let old = document.getElementById('upImgImg').innerHTML
        document.getElementById('upImgImg').innerHTML = old + `<tr>
        <td><img id="imgyl" style="height:100px;" src="${newsrc}" class="img-thumbnail" alt=""></td>
        <td><div class="form-floating">
        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
        <label for="floatingTextarea">介绍</label>
      </div></td>
        <td><div class="form-check form-switch form-check-reverse">
        <input id="is_star" class="form-check-input" type="checkbox" >
        <label  class="form-check-label">是否为精选照片</label>
      </div></td>
    </tr>`;
        //Print(newsrc)
    }
    formData.append("user_id", window.localStorage.getItem("user_id"));
    $.ajax({
        type: "post",
        url: window.localStorage.getItem("ym")+"uploadImg",
        data: formData,//上一步的FormData
        cache: false,//不缓存数据
        processData: false,//不转换数据
        contentType: false,
        dataType: "json",
        success: function (data) {
            Print(data);
            for (let i = 0; i < data.main.length; i++){
                document.querySelectorAll("#imgyl")[i].alt = data.main[i]
            }
            
        }
    })
}

//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null;
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

$("#upIMG").on("click", function(){
    let goToimg = new Array()
    for (var i = 0; i <document.querySelectorAll("#floatingTextarea").length; i++) {
        Print(document.querySelectorAll("#floatingTextarea")[i].value )
        goToimg[i]={
            "push_id":document.querySelectorAll("#imgyl")[i].alt,
            "intorduce":document.querySelectorAll("#floatingTextarea")[i].value,
            "is_star":document.querySelectorAll("#is_star")[i].checked
        }
    }
    Print(goToimg)
    $.ajax({
        url: window.localStorage.getItem('ym') + "toImg",
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            "main":goToimg
        }),
        success: function (res) {
            err("s","上传成功！")
            document.getElementById("formFileMultiple").value = ""
            $("#upImgImg").empty()
            $("exampleModal").modal("hide")
        }
    });
})