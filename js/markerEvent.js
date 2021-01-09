
function markerEvent(posChoice, mapContainer, mapOption, map, idxList) {
    let idxMarker = 0
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
    const ulEle = document.querySelector('.items');
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
}

export default markerEvent;