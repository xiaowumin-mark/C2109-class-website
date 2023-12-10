const body=document.querySelector('body')
const sidebar=body.querySelector('nav')
const toggle=body.querySelector('.toggle')
const searchBtn=body.querySelector('.search-box')
const modeSwitch=body.querySelector('.toggle-switch')
const modeText=body.querySelector('.mode-text')


toggle.addEventListener('click',()=>{
    sidebar.classList.toggle('close')
})
searchBtn.addEventListener('click',()=>{
    sidebar.classList.remove('close')
})
modeSwitch.addEventListener('click',()=>{
    body.classList.toggle('dark');
    if(body.classList.contains('dark')){
        modeText.innerText="浅色模式"
        setCookie("page_mode","true",60)
    }else{
        modeText.innerText="暗黑模式"
        setCookie("page_mode","false",60)
    }
})

window.onload = function(){
    if (getCookie("page_mode") != "false"){
        body.classList.toggle('dark')
    }
}