function getYm() {
    let ym
    $.ajax({
        url: '../js/ym.json',
        type: 'get',
        success: function (res) {
            window.localStorage.setItem("ym", res.ym)
        }
    });

}

function err(h, test) {
    let toastLiveExample = document.getElementById('liveToast')
    let toast = new bootstrap.Toast(toastLiveExample)
    if (h == 's') {
        document.getElementById('liveToast').className = 'toast align-items-center text-bg-primary border-0'
        document.getElementById('Err_p').innerHTML = test
        toast.show()
    } else {
        document.getElementById('liveToast').className = 'toast align-items-center text-bg-danger border-0'
        document.getElementById('Err_p').innerHTML = test
        toast.show()
    }

}

const queryReplace = (href, key, keyValue) => {
    if (href.indexOf(key) > -1) {
        let reg = new RegExp(`((?=${key}=).*?(?=&))|((?=${key}=).*)`)
        href = href.replace(reg, `${key}=${keyValue}`)
    } else {
        let join = href.indexOf('?') > -1 ? '&' : '?'
        href += `${join}${key}=${keyValue}`
    }
    return href
}

function Print(a) {
    console.log(a)
}