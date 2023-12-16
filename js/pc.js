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
                ShowModal(res.btn, res.main, res.title)
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
                        document.getElementById("pep_email").innerText = res.main.Email
                        document.getElementById("pep_phone").innerText = res.main.Phone
                        document.getElementById("pep_userId").innerText = idd
                        document.getElementById("pep_userCreat").innerText = res.main.CreatedAt
                        document.getElementById("pep_namee").innerText = res.main.UserName
                        document.getElementById("pep_realName").innerText = res.main.RealName
                        document.getElementById("pep_emaill").innerText = res.main.Email
                        document.getElementById("pep_phonee").innerText = res.main.Phine
                        document.getElementById("pep_type").innerText = res.main.UserType
                    }, 1000);

                }
            });
        }
    });


}

function toTabImg(){
    $.ajax({
        url: './img.html',
        type: 'get',
        success: function (res) {
            document.getElementById('main').innerHTML = res
            $.ajax({
                url: window.localStorage.getItem('ym')+"allImg",
                type: 'post',
                success: function (res) {
                    setTimeout(function () {
                        for (var i=0; i<res.main.length; i++) {
                            let dd = `
                            <div class="card" style="width: 18rem;float: left;">
                            <img src="${window.localStorage.getItem('ym')}img?id=${res.main[i].id}" class="card-img-top" alt="">
                            <div class="card-body">
                
                                <p class="card-text">${res.main[i].introduce}</p>
                                <a href="#" class="btn btn-primary">查看</a>
                            </div>
                        </div>
                            `
                            //document.getElementById("img-body").innerHTML = document.getElementById("img-body").innerHTML + dd
                            $(dd).appendTo($("#img_body"))
                        }
                    }, 1000);
                    
                }
            });
        }
    });
}