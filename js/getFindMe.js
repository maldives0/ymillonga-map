import markerEvent from './markerEvent';
function getFindMe(mapContainer, mapOption, map, PosChoice, posChoice) {
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

export default getFindMe;

