window.addEventListener('DOMContentLoaded', function () {
    const data = new XMLHttpRequest();
    let response;
    const ulEle = document.querySelector('.items');

    let liEle = '';

    const form = document.querySelector('.searchbox form');
    const input = form.querySelector('input');
    let inputVal = '';
    let posChoice = [];
  
   
    function PosChoice(lat, lng, content) {
        this.lat = lat;
        this.lng = lng;
        this.content = content;
    };
    


    data.open('Get', 'millonga.json', true);
    data.send(null);
    data.addEventListener('load', dataFun);
    let thumb;
    let url;
    let en;
    let ko;
    let address;
    let lat;
    let lng;
    //searching

    form.addEventListener('submit', dataFun);
    const findMeBtn = form.querySelector('#findMe');

    function dataFun(e) {

        e.preventDefault();

        response = JSON.parse(data.responseText);

        ulEle.innerHTML = '';
        input.addEventListener('change', function (e) {
            inputVal = e.target.value;
            posChoice = [];
          
            getFindMe();
            
        });

        response.millonga.forEach(function (el, idx) {
            thumb = el.thumb;
            url = el.url;
            en = el.en;
            address = el.address;
            ko = el.ko;
            lat = el.lat;
            lng = el.lng;



            let a = en.match(inputVal);
            let b = ko.match(inputVal);


            if (a || b) {

                liEle = "<li class='item f_b' id='" + idx + "'>";
                liEle += "<div class='con f_b'> <div class='leftsec'><div class='thumb'><a class='linkA link" + idx + "' href='" + url + "'><img src='" + thumb + "' alt='" + en + "'></a></div></div>";
                liEle += " <div class='rightsec'> <div class='f_b'><h4 class='f_b'>" + en + "</h4><span id='lat'>" + lat + "</span><span id='lng'>" + lng + "</span></div><h6 id='ko'>" + ko + "</h6>";
                liEle += " <p class='address'>" + address + "</p></div> </div>";
                liEle += " <div class='appraisal'><span class='like'>371</span><span class='write'>39</span> </div></li>";
                ulEle.innerHTML += liEle;
                input.value = '';
                input.focus();



            } else if (!a || !b) {

                input.value = '';
                input.focus();
            }


        });//foreach

        mapSearch();

    }//datafun



    //drag
    (() => {
        const item = document.querySelectorAll('.item');
        const listBox = document.querySelector('.listbox');
        const listLen = item.length;
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
            setTimeout(function () { ulEle.style = "transform:translateX(" + (-420 * idx) + "px);"; }, 100);

        };

    })();//list drag


   
    

    let mapContainer,  mapOption, map;
    //map

    function mapSearch() {
       
       
   
        const item = document.querySelectorAll('.item');
        const latChoice = document.querySelectorAll('#lat');
        const lngChoice = document.querySelectorAll('#lng');
        const enChoice = document.querySelectorAll('#en');
        const koChoice = document.querySelectorAll('#ko');
        const addressChoice = document.querySelectorAll('.address');
       

        
        for (let i = 0; i < latChoice.length; i++) {
            let latNum, lngNum = 0;
            latNum = Number(latChoice[i].textContent);
            lngNum = Number(lngChoice[i].textContent);
            posChoice.push(new PosChoice(latNum, lngNum, koChoice[i].textContent));
          
        }

      
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(addressChoice[0].textContent, function (result, status) {

            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
               
                markerEvent(posChoice);
               
                findMeBtn.addEventListener('click', getFindMe);

            }//if
        });


    }//mapsearch

    //marker click

    function markerEvent(posChoice) {

      console.log(posChoice.length);
         mapContainer = document.getElementById('map'), // 지도를 표시할 div 

            mapOption = {

                center: new kakao.maps.LatLng(posChoice[0].lat, posChoice[0].lng), // 지도의 중심좌표

                level: 5 // 지도의 확대 레벨
            };

        // for (let i = 0; i < posChoice.length; i++) {

        //     mapOption.center = new kakao.maps.LatLng(posChoice[i].lat, posChoice[i].lng);

        // }


     
         map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
       

        var imageSrc = "https://cdn.icon-icons.com/icons2/1283/PNG/512/1497620001-jd22_85165.png";
 
      
        for (var i = 0; i < posChoice.length; i++) {
         
           
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(40, 55);

            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(posChoice[i].lat, posChoice[i].lng), // 마커를 표시할 위치
                title: posChoice[i].content, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage, // 마커 이미지 
                clickable: true,
                zIndex: i
            });
 //console.log(i,marker.mc );

            marker.normalImage = markerImage;

            // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다



            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: posChoice[i].content,
                // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            });

           
            var imageClick = 'https://cdn.icon-icons.com/icons2/317/PNG/512/map-marker-icon_34392.png', // 마커이미지의 주소입니다    
                clickSize = new kakao.maps.Size(34, 43); // 마커이미지의 크기입니다
            //  clickOption = { offset: new kakao.maps.Point(30, 40) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

            // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
            var markerClick = new kakao.maps.MarkerImage(imageClick, clickSize,);
            // 마커가 표시될 위치입니다



            // 마커가 지도 위에 표시되도록 설정합니다
            selectedMarker = null; // 클릭한 마커를 담을 변수

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function () {
                // 마커 위에 인포윈도우를 표시합니다


                let idx = this.getZIndex();
                // 클릭된 마커가 없거나, 전 click 마커가 현 클릭된 마커가 아니면
                // 마커의 이미지를 클릭 이미지로 변경합니다


                if (!selectedMarker || selectedMarker !== this) {

                    // 클릭된 마커 객체가 null이 아니면
                    // 전에 클릭된 마커의 이미지를 기본 이미지로 변경하고

                    !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage)
                        ;


                    // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
                    map.setCenter(new kakao.maps.LatLng(posChoice[idx].lat, posChoice[idx].lng));
                    infowindow.open(map, this);
                    infowindow.setContent(posChoice[idx].content);
                    this.setImage(markerClick);
                    selectedMarker = this;

                }

                else {
                    // 클릭된 마커가 있고, 전 click 마커가 현 클릭된 마커와 같다면
                    selectedMarker.setImage(selectedMarker.normalImage);
                    selectedMarker = null;
                    infowindow.close();

                }
                // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다

               

            });


        }
      
      
    }//markerevent

    function getFindMe() {
       
        // 
         map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
            let levelA = document.querySelectorAll('.level a');

            levelA.forEach(function (a, i) {
    
                a.addEventListener('click',
                    function () {
    
                        let changeLevel = 2 * (i + 1);
                        map.setLevel(changeLevel);
    
    
                    });
    
            });
    
            let locPosition, message;
      
           
        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
        if (navigator.geolocation) {

            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
                
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도

                locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

                // 마커와 인포윈도우를 표시합니다
               
            posChoice.push(new PosChoice(lat,lon,message));
          let arrContent = [], answer=[], posFilter=[];
        
      
     
            for(let j=0; j<posChoice.length;j++){
                arrContent.push( posChoice[j].content);
                   
                 answer =   arrContent.filter((v,i) => {
                  
                   return v !== arrContent[i+1];
               });
            
             if( answer[j] === posChoice[j].content ){
            
                posFilter.push(posChoice[j]);
            
             }
               
            }
         
             markerEvent(posFilter);
           map.setCenter(locPosition);
          

            });

        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

            locPosition = new kakao.maps.LatLng(posChoice[0].lat, posChoice[0].lng),
                message = 'geolocation을 사용할수 없어요..'

                map.setCenter(locPosition);

        }

        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        function displayMarker(locPosition, message) {
           
            // //마커를 생성합니다
            // var marker = new kakao.maps.Marker({
            //     map: map,
            //     position: locPosition
            // });
           
            // var iwContent = message, // 인포윈도우에 표시할 내용
            //     iwRemoveable = true;

            // // 인포윈도우를 생성합니다
            // var infowindow = new kakao.maps.InfoWindow({
            //     content: iwContent,
            //     removable: iwRemoveable
            // });

            // // 인포윈도우를 마커위에 표시합니다 
            // infowindow.open(map, marker);

            // 지도 중심좌표를 접속위치로 변경합니다
          
           
        }
       
    }
  

});//end


