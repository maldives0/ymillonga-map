window.addEventListener('DOMContentLoaded', function () {
    const data = new XMLHttpRequest();
    let response;
    const ulEle = document.querySelector('.items');

    let liEle = '';

    const form = document.querySelector('.searchbox form');
    const input = form.querySelector('input');
    let inputVal = '';
    let positions = []; // 여러개 마커의 위치


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


    function dataFun(e) {

        e.preventDefault();

        response = JSON.parse(data.responseText);

        ulEle.innerHTML = '';
        input.addEventListener('change', function (e) {
            inputVal = e.target.value;
            positions = [];

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





    //map




    function mapSearch() {
        const item = document.querySelectorAll('.item');
        const latChoice = document.querySelectorAll('#lat');
        const lngChoice = document.querySelectorAll('#lng');
        const enChoice = document.querySelectorAll('#en');
        const koChoice = document.querySelectorAll('#ko');
        const addressChoice = document.querySelectorAll('.address');



        let posChoice = [];
        function PosChoice(lat, lng, content) {
            this.lat = lat;
            this.lng = lng;
            this.content = content;
        };
        function Positions(content, latlng) {
            this.content = content;
            this.latlng = latlng;
        };
        for (let i = 0; i < latChoice.length; i++) {
            let latNum, lngNum = 0;
            latNum = Number(latChoice[i].textContent);
            lngNum = Number(lngChoice[i].textContent);
            posChoice.push(new PosChoice(latNum, lngNum, koChoice[i].textContent));

            let latlng = new kakao.maps.LatLng(posChoice[i].lat, posChoice[i].lng);
            positions.push(new Positions(posChoice[i].content, latlng));

        }





        let mapContainer = document.getElementById('map'), // 지도를 표시할 div 

            mapOption = {

                center: new kakao.maps.LatLng(posChoice[0].lat, posChoice[0].lng), // 지도의 중심좌표

                level: 5 // 지도의 확대 레벨
            };

        for (let i = 0; i < item.length; i++) {

            mapOption.center = new kakao.maps.LatLng(posChoice[i].lat, posChoice[i].lng);

        }

        let changeLevel = 0;
        let levelA = document.querySelectorAll('.level a');
        let ab;
        levelA.forEach(function (a) {
           
            a.addEventListener('click',
            function() {
               
               changeLevel = Number(this.getAttribute('id'));
              
               map.setLevel(changeLevel );
               displayLevel();
               
                  });

        });
        
    
    
     

        for (let i = 0; i < item.length; i++) {

            mapOption.center = new kakao.maps.LatLng(posChoice[i].lat, posChoice[i].lng)
        }
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(addressChoice[0].textContent, function (result, status) {

            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {



                var imageSrc = "https://cdn.icon-icons.com/icons2/1283/PNG/512/1497620001-jd22_85165.png";

                for (var i = 0; i < positions.length; i++) {

                    // 마커 이미지의 이미지 크기 입니다
                    var imageSize = new kakao.maps.Size(40, 55);

                    // 마커 이미지를 생성합니다    
                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: positions[i].latlng, // 마커를 표시할 위치
                        title: positions[i].content, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        image: markerImage, // 마커 이미지 
                        clickable: true,
                        zIndex: i
                    });


                    marker.normalImage = markerImage;

                    // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다



                    // 인포윈도우를 생성합니다
                    var infowindow = new kakao.maps.InfoWindow({
                        content: positions[i].content,
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
                            map.setCenter(positions[idx].latlng);
                            infowindow.open(map, this);
                            infowindow.setContent(positions[idx].content);
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

            }//if
        });
    }//mapsearch

    //list click




});//end