window.addEventListener('DOMContentLoaded',function(){
const data = new XMLHttpRequest();
let response;
const ulEle = document.querySelector('.items');
let liEle = '';

data.open('Get', 'millonga.json', true);
data.send(null);
data.addEventListener('load',dataFun);
function dataFun(){
    response = JSON.parse(data.responseText);
    response.millonga.forEach(function(el,idx){
       const thumb = el.thumb;
       const url = el.url;
       const name = el.name;
       const location = el.location;
     
     liEle += "<li class='item item"+idx+"'>";
     liEle += "<div class='thumb'><a class='link link"+idx+"' href='"+url+"'><img src='"+thumb+"' alt='"+name+"'></a></div>";
     liEle += "<div class='summary'><h3>"+name+"</h3>";
     liEle += "<small>"+location+"</small></div></li>";
     
     ulEle.innerHTML = liEle;
                
                               
    })
}//datafun


let isDown = false;
let startX;
let scrollLeft;
const itemA = document.querySelectorAll('.link');
console.log(itemA)
itemA.forEach((el) => {
    console.log(el);
    el.addEventListener((e) => {
        console.log(e);
        e.preventDefault();
        });
});


ulEle.addEventListener('mousedown',(e) => {
isDown = true;
ulEle.classList.add('active');
startX = e.pageX - ulEle.offsetLeft;
scrollLeft= ulEle.scrollLeft;

});
ulEle.addEventListener('mouseleave',(e) => {
isDown = false;
ulEle.classList.remove('active');
});
ulEle.addEventListener('mouseup',(e) => {
    isDown = false;
    ulEle.classList.remove('active');
});
ulEle.addEventListener('mousemove',(e) => {
    
if(!isDown) return;
e.preventDefault();
const x = e.pageX - ulEle.offsetLeft;
const walk = (x - startX) *3;
console.log(x,walk)
ulEle.scrollLeft = scrollLeft-walk;

});



});//end