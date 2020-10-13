window.addEventListener('DOMContentLoaded',function(){


 


//data
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
     liEle += "<div class='thumb'><a class='linkA link"+idx+"' href='"+url+"'><img src='"+thumb+"' alt='"+name+"'></a></div>";
     liEle += "<div class='summary'><h3>"+name+"</h3>";
     liEle += "<small>"+location+"</small></div></li>";
     
     ulEle.innerHTML = liEle;
    
    });
    link();
}//datafun


 //a link question

 const itemA = document.querySelectorAll('.linkA');

  function link(){  
   console.log(itemA)  
         itemA.forEach((el) => {
          el.addEventListener((e) => {
            e.preventDefault();
         });
       
 });
 
};


  

//  


   //drag
   let isDown = false;
   let startX;
   let scrollLeft;
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