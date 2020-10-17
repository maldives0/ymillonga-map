window.addEventListener('DOMContentLoaded', function () {
    const data = new XMLHttpRequest();
    let response;
    const ulEle = document.querySelector('.items');
    let liEle = '';

    const form = document.querySelector('.searchbox form');
     const input = form.querySelector('input'); 
    let inputVal = '';
     
    const item = document.querySelectorAll('.item');
        const enChoice = document.querySelectorAll('#en');
        const koChoice = document.querySelectorAll('#ko');
        const addressChoice = document.querySelectorAll('#address');
      console.log(enChoice.textContent)

  

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
                        liEle += " <div class='rightsec'> <div class='f_b'><h4 class='f_b'>" + en + "</h4><span id='location'>"+lat+","+lng+"</span></div><h6 id='ko'>" + ko + "</h6>";
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
           
               
        listDrag();

    }//datafun
    

 








    //drag
    function listDrag() {
        const list = ulEle.querySelectorAll('.item');
        const listBox = document.querySelector('.listbox');
        const listLen = list.length;
        listBox.style = "transform:translateX(0px);";
        idx = 0;

        let isDown = false;
        let startX;
        let endX;
       

        listBox.addEventListener('mousedown', (e) => {
            isDown = true;
            listBox.classList.add('active');
            startX = e.pageX - ulEle.offsetLeft;
            scrollLeft = ulEle.scrollLeft;

        });

        listBox.addEventListener('mousemove', (e) => {
            endX = e.pageX - ulEle.offsetLeft;

            if (!isDown) return endX;
            e.preventDefault();


        });

        listBox.addEventListener('mouseleave', (e) => {
           
            isDown = false;
            listBox.classList.remove('active');

        });
 
        listBox.addEventListener('mouseup', (e) => {
           
          console.log(e);
         
         
            isDown = false;

            listBox.classList.remove('active');
            endPos();
           
          
        });
       
        function endPos() {
            if (startX > endX) {
                //next
                
                if (idx != listLen - 1) idx++;
            } else {
                //prev
                if (idx != 0) idx--;
            }
            setTimeout(function () { ulEle.style = "transform:translateX(" + (-450 * idx) + "px);"; }, 100);
         
        };
      
    }//list drag




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