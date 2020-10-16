window.addEventListener('DOMContentLoaded', function () {
    var data = new XMLHttpRequest();
    var response;
    var gallEle = document.querySelector('.gallery');
    var srEle = document.querySelector('input[name=sj]');
    var figEle = '';
    var srBtn = document.querySelector('button');

    data.open('Get', 'jsonData.json', true);
    data.send(null);

    data.addEventListener('load', dataFun);
    // data를 모두 가져온 후에 함수 dataFun 실행

    srBtn.addEventListener('click', dataFun);

    function dataFun() {

        response = JSON.parse(data.responseText);
        //console.log(response.gallery);   
        gallEle.innerHTML = '';

        response.gallery.forEach(function (el, idx) {
            console.log(el);
           if (srEle.value.match(el.sj)) {
            //데이테값.match('찾을 값') 찾을 값을 기준으로 데이터값에서 같은 값이 있는지 검색한다                 
            //if (el.sj.match(srEle.value)) {
                
           // if (srEle.value.indexOf(el.sj) != -1 || srEle.value == '') {

                figEle = "<figure>"
                figEle += "<img src='" + el.src + "' alt=''>"
                figEle += "<figcaption>" + el.sj + "</figcaption>"
                figEle += "</figure>"
                gallEle.innerHTML += figEle;
            }

        });
    };
});

// {
//     gallery:[
//         ['이미지주소,이미지이름']
//         {src:'이미지주소',sj:'이미지제목'}
//     ]
// }
// 배열 안에 배열
// gallery[0]// ['이미지주소,이미지이름']
// gallery[0][0]//이미지주소

// 배열 안에 객체
// gallery[1]// {src:'이미지주소',sj:'이미지제목'}
// gallery[1].src//이미지주소(객체의 속성 이름(gallery)의 key(.src)값을 넣어주면 된다)