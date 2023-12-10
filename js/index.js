function getYm() {
    let ym
    $.ajax({
        url: '../js/ym.json',
        type: 'get',
        success: function (res) {
            setCookie("ym",res.ym,60)
        }
    });
    
}

