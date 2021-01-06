window.addEventListener('DOMContentLoaded', function () {
    const data = new XMLHttpRequest();
    let response;
    const ulEle = document.querySelector('.items');
    let idxList = 0, idxMarker = 0;
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
            listLen = 0, idxList = 0;
            ulEle.style = "transform:translateX(0px);";
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
                liEle += "<div class='con f_b'> <div class='leftsec'><div class='thumb'><a href='" + url + "'><img src='" + thumb + "' alt='" + en + "'></a></div></div>";
                liEle += " <div class='rightsec'> <div class='f_b'><h4 class='f_b'>" + en + "</h4><p id='idx'></p><span id='lat'>" + lat + "</span><span id='lng'>" + lng + "</span></div><h6 id='ko'>" + ko + "</h6>";
                liEle += " <p class='address'>" + address + "</p></div> </div>";
                liEle += " <div class='appraisal'><span class='like'>371</span><span class='write'>39</span> </div></li>";
                ulEle.innerHTML += liEle;
                input.value = '';
                input.focus();
            }
            else if (!a || !b) {
                input.value = '';
                input.focus();
            }
        });//foreach
        mapSearch();
    }//datafun


    //drag
    function drag(item) {
        const listBox = document.querySelector('.listbox');
        listLen = item.length;
        let isDown = false;
        let startX;
        let endX;

        listBox.addEventListener('mousedown', (e) => {
            isDown = true;
            listBox.classList.add('active');
            startX = e.pageX - listBox.offsetLeft;
            scrollLeft = ulEle.scrollLeft;
        });

        listBox.addEventListener('mousemove', (e) => {
            endX = e.pageX - listBox.offsetLeft;
            if (!isDown) return endX;
            e.preventDefault();
        });

        listBox.addEventListener('mouseleave', (e) => {
            isDown = false;
            listBox.classList.remove('active');
        });

        item.forEach(function (el) {
            el.addEventListener('mouseup', (e) => {
                // console.log(e.currentTarget);
                isDown = false;
                listBox.classList.remove('active');
                endPos();
            });
        });

        function endPos() {
            if (startX > endX) {
                //next
                if (idxList < listLen - 1) idxList++;
            } else {
                //prev
                if (idxList != 0) idxList--;
            }
            setTimeout(function () { ulEle.style = "transform:translateX(" + (-420 * idxList) + "px);"; }, 100);
        };
    }//list drag

    //map
    function mapSearch() {
        const item = document.querySelectorAll('.item');
        drag(item);
        const latChoice = document.querySelectorAll('#lat');
        const lngChoice = document.querySelectorAll('#lng');
        // const enChoice = document.querySelectorAll('#en');
        const koChoice = document.querySelectorAll('#ko');
        const addressChoice = document.querySelectorAll('.address');
        const idxChoice = document.querySelectorAll('#idx');

        for (let i = 0; i < latChoice.length; i++) {
            (function (n) {
                idxChoice[n].append(n + 1);
            })(i);
            let latNum, lngNum = 0;
            latNum = Number(latChoice[i].textContent);
            lngNum = Number(lngChoice[i].textContent);
            posChoice.push(new PosChoice(latNum, lngNum, `${i + 1}. ` + koChoice[i].textContent));
        }

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(addressChoice[0].textContent, function (result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
                findMeBtn.addEventListener('click', getFindMe);
                markerEvent(posChoice);
            }//if
        });
    }//mapsearch

    //marker click
    let mapContainer, mapOption, map;
    function markerEvent(posChoice) {
        mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(posChoice[0].lat, posChoice[0].lng), // 지도의 중심좌표
                level: 5 // 지도의 확대 레벨
            };
        const levelA = document.querySelectorAll('.level a'),
            levelInfo = document.querySelector('#mapLevel');

        levelA.forEach(function (a, i) {
            a.addEventListener('click',
                function () {
                    let changeLevel = 2 * (i + 1);
                    map.setLevel(changeLevel);
                    levelInfo.innerHTML = `현재 지도 확대영역: ${this.textContent}`;
                });
        });

        map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        let markerImage, markerClick, infowindow, marker;
        const imageSrc = "img/map-marker-point.png",
            // 마커 이미지의 이미지 크기 입니다
            imageSize = new kakao.maps.Size(40, 55);
        // 마커 이미지를 생성합니다    
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        const imageClick = "img/map-marker-click.png", // 마커이미지의 주소입니다    
            clickSize = new kakao.maps.Size(34, 43), // 마커이미지의 크기입니다
            clickOption = { offset: new kakao.maps.Point(15, 55) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        markerClick = new kakao.maps.MarkerImage(imageClick, clickSize, clickOption);
        // 마커가 표시될 위치입니다
        let arrMarker = [];
        let selectedMarker = null; // 클릭한 마커를 담을 변수
        for (var i = 0; i < posChoice.length; i++) {
            // 마커를 생성합니다
            marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(posChoice[i].lat, posChoice[i].lng), // 마커를 표시할 위치
                title: posChoice[i].content, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage, // 마커 이미지 
                clickable: true,
                zIndex: i,
            });
            marker.normalImage = markerImage;
            // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
            // 인포윈도우를 생성합니다
            infowindow = new kakao.maps.InfoWindow({
                content: posChoice[i].content,
                // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            });
            // 마커가 지도 위에 표시되도록 설정합니다
            // 마커에 mouseover 이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'mouseover', function () {
                // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
                // 마커의 이미지를 오버 이미지로 변경합니다
                if (!selectedMarker || selectedMarker !== this) {
                    idxMarker = this.getZIndex();
                    this.setImage(markerClick);
                    infowindow.open(map, this);
                    infowindow.setContent('<div style="padding:5px;">' + posChoice[idxMarker].content + '</div>');
                }
            });
            // 마커에 mouseout 이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'mouseout', function () {
                // 클릭된 마커가 없고, mouseout된 마커가 클릭된 마커가 아니면
                // 마커의 이미지를 기본 이미지로 변경합니다
                if (!selectedMarker || selectedMarker !== this) {
                    this.setImage(markerImage);
                    infowindow.close();
                }
            });
            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function () {
                idxMarker = this.getZIndex();
                // 클릭된 마커가 없거나, 전 click 마커가 현 클릭된 마커가 아니면
                // 마커의 이미지를 클릭 이미지로 변경합니다
                if (!selectedMarker || selectedMarker !== this) {
                    // 클릭된 마커 객체가 null이 아니면
                    // 전에 클릭된 마커의 이미지를 기본 이미지로 변경하고
                    !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);
                    selectedMarker = this;
                    // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
                    infowindow.open(map, this);
                    infowindow.setContent(posChoice[idxMarker].content);
                    this.setImage(markerClick);
                    map.setCenter(new kakao.maps.LatLng(posChoice[idxMarker].lat, posChoice[idxMarker].lng));
                    //리스트 드래그 좌표 움직이기
                    setTimeout(function () { ulEle.style = "transform:translateX(" + (-420 * idxMarker) + "px);"; }, 100);
                    idxList = idxMarker;
                }
                else {
                    // 클릭된 마커가 있고, 전 click 마커가 현 클릭된 마커와 같다면
                    selectedMarker.setImage(selectedMarker.normalImage);
                    selectedMarker = null;
                    infowindow.close();
                }
            });//click
            arrMarker.push(marker);
        }//for

        const item = document.querySelectorAll('.item');
        item.forEach(function (b, c) {
            b.addEventListener('dblclick', function () {
                if (!selectedMarker || selectedMarker !== arrMarker[c]) {
                    // 클릭된 마커 객체가 null이 아니면
                    // 전에 클릭된 마커의 이미지를 기본 이미지로 변경하고
                    !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);
                    selectedMarker = arrMarker[c];
                    infowindow.open(map, arrMarker[c]);
                    infowindow.setContent(posChoice[c].content);
                    arrMarker[c].setImage(markerClick);
                    map.setCenter(new kakao.maps.LatLng(posChoice[c].lat, posChoice[c].lng));
                    setTimeout(function () { ulEle.style = "transform:translateX(" + (-420 * c) + "px);"; }, 100);
                    idxList = c;
                } else {
                    // 클릭된 마커가 있고, 전 click 마커가 현 클릭된 마커와 같다면
                    selectedMarker.setImage(selectedMarker.normalImage);
                    selectedMarker = null;
                    infowindow.close();
                }
            });
        });
    }//markerevent

    function getFindMe() {
        map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
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
                posChoice.push(new PosChoice(lat, lon, message));
                let arrContent = [], answer = [], posFilter = [];
                for (let j = 0; j < posChoice.length; j++) {
                    arrContent.push(posChoice[j].content);
                    answer = arrContent.filter((v, i) => {
                        return v !== arrContent[i + 1];
                    });
                    if (answer[j] === posChoice[j].content) {
                        posFilter.push(posChoice[j]);
                    }
                }
                markerEvent(posFilter);
                map.setCenter(locPosition);
            });
        } else { // HTML5의 GeoLocation을 사용할 수 없을 때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            locPosition = new kakao.maps.LatLng(posChoice[0].lat, posChoice[0].lng),
                message = 'geolocation을 사용할수 없어요..'
            map.setCenter(locPosition);
        }
    }
});//end


