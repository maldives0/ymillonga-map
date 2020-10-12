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
     
     liEle += "<li class='item item "+idx+" f_b'>";
     liEle += "<div class='con f_b'> <div class='leftsec'><div class='thumb'><a class='linkA link"+idx+"' href='"+url+"'><img src='"+thumb+"' alt='"+name+"'></a></div></div>";
     liEle += " <div class='rightsec'> <h4 class='f_b'>"+name+"<span class='far'>거리m</span></h4>";
     liEle += " <p class='address'>"+location+"</p></div> </div>";
     liEle += " <div class='appraisal'><span class='like'>371</span><span class='write'>39</span> </div></li>";
     
     
     ulEle.innerHTML = liEle;
                
                               
    })
}//datafun

//map


//drag

let isDown = false;
let startX;
let scrollLeft;
const itemA = document.querySelectorAll('.linkA');
console.log(itemA)
itemA.forEach((el) => {
   
    el.addEventListener((e) => {
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
//console.log({x,startX})
ulEle.scrollLeft = scrollLeft-walk;

});



});//end