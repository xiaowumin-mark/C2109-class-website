window.onload = function () {
    let tab = ["home", "about", "tz", "img", "ts"]
    for (i = 0; i < tab.length; i++) {
        if (getUrlParams('tab') == tab[i]) {
            console.log(tab[i])
        }
    }

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
