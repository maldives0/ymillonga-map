window.addEventListener('DOMContentLoaded', function () {
    const data = new XMLHttpRequest();
    let response;
    const ulEle = document.querySelector('.items');
    let liEle = '';

    data.open('Get', 'millonga.json', true);
    data.send(null);
    data.addEventListener('load', dataFun);
    function dataFun() {
        response = JSON.parse(data.responseText);
        response.millonga.forEach(function (el, idx) {
            const thumb = el.thumb;
            const url = el.url;
            const name = el.name;
            const location = el.location;

            liEle += "<li class='item item" + idx + " f_b'>";
            liEle += "<div class='con f_b'> <div class='leftsec'><div class='thumb'><a class='linkA link" + idx + "' href='" + url + "'><img src='" + thumb + "' alt='" + name + "'></a></div></div>";
            liEle += " <div class='rightsec'> <h4 class='f_b'>" + name + "<span class='far'>거리m</span></h4>";
            liEle += " <p class='address'>" + location + "</p></div> </div>";
            liEle += " <div class='appraisal'><span class='like'>371</span><span class='write'>39</span> </div></li>";


            ulEle.innerHTML = liEle;


        });
        listDrag();
        link();
    }//datafun




    //a Link

    function link() {
        const itemA = document.querySelectorAll('.linkA');
        const aLen = itemA.length;
        for (let i = 0; i < aLen; i++) {

            itemA[i].addEventListener('click', function (e) {
                e.preventDefault();
            });

        }


    }

    //drag
    function listDrag() {
        const list = ulEle.querySelectorAll('.item');
        const listBox = document.querySelector('.listbox');
        const listLen = list.length;
        idx = 0;

        let isDown = false;
        let startX;
        let endX;
        let scrollLeft;

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

           

            const walk = (endX - startX);

            ulEle.scrollLeft = scrollLeft - walk;

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

        function endPos(){  if (startX > endX) {
            //next
            if (idx != listLen - 1)  idx++;
        } else {
            //prev
            if (idx != 0)  idx--;
        }
      
       ulEle.style = "transform:translateX("+(-470 * idx)+"px);";
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