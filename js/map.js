window.addEventListener('DOMContentLoaded', function () {
    const data = new XMLHttpRequest();
    let response;
    const ulEle = document.querySelector('.items');
    let liEle = '';

    const form = document.querySelector('.searchbox form');
     const input = form.querySelector('input'); 
    let inputVal = '';
     
   

  

    data.open('Get', 'millonga.json', true);
    data.send(null);
    data.addEventListener('load', dataFun);
    let thumb;
    let url;
    let en;
    let ko;
    let address;
    
    //searching
   
    form.addEventListener('submit',dataFun);
   
   
     function dataFun(e) {
    e.preventDefault();
        response = JSON.parse(data.responseText);
        
        ulEle.innerHTML = '';
        input.addEventListener('change',function(e){
            inputVal = e.target.value;
           
        });
       
       
     
        response.millonga.forEach(function (el, idx) {
            thumb = el.thumb;
            url = el.url;
            en = el.en;
            address = el.address;
            ko = el.ko;
           
          
            let a = en.match(inputVal);
            let b = ko.match(inputVal);
             console.log(a || b);
                               
                  if (a || b) {
                 
                    liEle = "<li class='item item" + idx + " f_b'>";
                    liEle += "<div class='con f_b'> <div class='leftsec'><div class='thumb'><a class='linkA link" + idx + "' href='" + url + "'><img src='" + thumb + "' alt='" + en + "'></a></div></div>";
                    liEle += " <div class='rightsec'> <div class='f_b'><h4 class='f_b'>" + en + "</h4><span>거리m</span></div><h6>" + ko + "</h6>";
                    liEle += " <p class='address'>" + address + "</p></div> </div>";
                    liEle += " <div class='appraisal'><span class='like'>371</span><span class='write'>39</span> </div></li>";
                    ulEle.innerHTML += liEle;
                   
                    input.value = '';
                    input.focus();  
                  }else if(!a || !b){
                    input.value = '';
                    input.focus();  
                  }
               
                 
                
                 
            });
           
               
       

    }//datafun
    

 








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
  




    //map
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function (result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {

            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        }
    });

});//end