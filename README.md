# 프로젝트명 : ymillonga map version

## URL: https://maliethy.github.io/ymillonga-map/

## 작품 소개

'오늘은 어디 밀롱가를 갈까?!'를 콘셉으로 Kakao Map API를 활용해 만든 장소검색 서비스입니다.밀롱가는 탱고라는 Social Dance를 추는 장소입니다. 서울에 있는 10곳의 밀롱가를 JSON형식의 데이터로 가져와 Kakao map에서 검색할 수 있는 반응형 사이트를 구현했습니다.

## 작업기간

2020.10.14 - 2020.10.27

## 작업 툴

html5, css3, sass, javascript, git, webpack

## 구현기능

밀롱가 이름으로 장소검색하고 결과값을 마커로 표시하고 지도 아래에는 목록으로 보여주기, geolocation으로 얻어온 사용자의 현위치 마커로 표시하기, 여러개 마커에 이벤트 등록하여 마커 이미지 변환/인포윈도우 표시하기, 지도확대 Level 바꾸기 등

## 프로젝트를 통해 배운 점

-   vanilla js를 더 깊게 공부하기 위한 side 프로젝트였습니다. 이 프로젝트를 통해 무엇보다 javascript의 실행 context를 파악하는 연습을 할 수 있었습니다. 사용자가 본인의 현 위치를 파악할 수 있도록 GeoLocation을 이용해서 얻어온 접속 위치를 검색한 결과 좌표와 함께 연결하는 과정에서 (1) json 데이터를 검색하는 함수, (2) map의 중심좌표를 이동시키고 마커를 표시하는 함수, (3) 마커에 여러 개의 Event를 등록하는 함수, 그리고 (4) 사용자의 현 위치를 파악해 좌표로 표시하는 총 4개의 함수를 서로 연결시켜야했기 때문입니다.
-   사용자가 검색한 결과를 input값으로 받아서 json data와 비교해보는 (1) 함수를 만들어보며 서버로 정보를 보내는 역할을 하는 Form 원리를 이해할 수 있었습니다. 또한 input창에 입력을 마치고 enter를 치면 input창에 커서가 focus되고 빈칸으로 바뀌도록 할 때 onChange() 함수와 input의 속성값을 이용하는 법을 익힐 수 있었습니다.
    (관련 블로그 글: https://maldives0.github.io/posts/onChange_match)
-   input값이 해당 json data에 있을 때 지도 아래 리스트 목록으로 넣어주면 해당 장소에 관한 정보를 보여주는 리스트를 drag할 수 있도록 하는 과정에서 mouseup event가 중복 발생하는 event-bubbling 문제가 발생했었습니다. 이를 해결하는 과정에서 이벤트 객체에 대해 확실히 이해하고 넘어갈 수 있었습니다.
    (관련 블로그 글: https://maldives0.github.io/posts/eventBubbling)
-   index와 map이라는 두 페이지에 각각 장소검색 기능과 드래그 기능을 적용하는 과정에서 각 페이지의 테그 명이 달라 페이지마다 함수를 따로 적용시키면서 코드량이 늘어나는 문제가 있었습니다. 이를 해결하기위해 module system을 도입해 중복되는 함수를 모듈로 쪼개어 webpack으로 bundling하였습니다.  
    (관련 블로그 글: https://maldives0.github.io/posts/module-bundling)
-   후에 calender API를 활용해 이번 달에 밀롱가가 열리는 날을 달력으로 한눈에 파악하고 오늘 열리는 밀롱가 목록을 리스트로 보여줌과 동시에 지도에 마커로 표시할 수 있도록 구현해볼 예정입니다.
