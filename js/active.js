import "core-js/stable";
import "regenerator-runtime/runtime";
import mapSearch from './mapSearch';
import { getFindMe } from './mapSearch';
import dragList from './dragList';

window.addEventListener('DOMContentLoaded', function () {
    const data = new XMLHttpRequest();
    const ulToday = document.querySelector('.today-list .items');
    const ulEle = document.querySelector('.listbox .items');
    let resToday, liToday = '', response;
    let idxList = 0;
    let listLen = 0;
    let liEle = '';
    const searchBox = document.querySelector('.searchbox')
    const form = searchBox.querySelector('form');
    const input = form.querySelector('input');
    let inputVal = '';
    let posChoice = [];

    data.open('Get', 'millonga.json', true);
    data.send(null);
    data.addEventListener('load', todayList);
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
    const findMeBtn = document.querySelector('#findMe');
    function todayList() {
        resToday = JSON.parse(data.responseText);
        ulToday.innerHTML = '';
        resToday.millonga.forEach(function (el, idx) {
            thumb = el.thumb;
            url = el.url;
            en = el.en;
            address = el.address;
            ko = el.ko;

            liToday += "<li class='item' id='" + idx + "'>";
            liToday += "<div class='thumb'><a class='thumbLink' id='" + idx + "' href='" + url + "'><img src='" + thumb + "' alt='" + en + "'></a></div>";
            liToday += "<div class='summary'><h3>" + en + "</h3>";
            liToday += "<small>" + address + "</small></div></li>";
            ulToday.innerHTML = liToday;
        });
        listLink();
        const listBox = document.querySelector('.data-wrap'),
            item = listBox.querySelectorAll('.item');
        dragList(-350, listLen, idxList, item, listBox, ulToday);//오늘의 밀롱가 드레그하기
    }//todaylist

    function listLink() {
        const itemLink = document.querySelectorAll('.today-list .thumbLink');
        itemLink.forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
            });
            el.addEventListener('dblclick', function (e) {
                location.href = this.href;
            });
        });
    };

    const nearBox = document.querySelector('.nearbox');
    const nH = nearBox.offsetTop;
    window.addEventListener('scroll', function () {
        if (nH - 400 <= window.scrollY) {
            searchBox.classList.add('active');
        } else {
            searchBox.classList.remove('active');
        }
    });

    function dataFun(e) {
        e.preventDefault();
        response = JSON.parse(data.responseText);
        ulEle.innerHTML = '';
        input.addEventListener('change', function (e) {
            inputVal = e.target.value;
            posChoice = [];
            getFindMe(e, posChoice);
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
                ulEle.innerHTML += liEle;
                input.value = '';
                input.focus();
            } else if (!a || !b) {
                input.value = '';
                input.focus();
            }
        });
        mapSearch(-350, listLen, idxList, posChoice, findMeBtn, ulEle);
    }

    const regionBtn = document.querySelector('.hereBtn');
    regionBtn.addEventListener('click', (function (posChoice) {
        return function (e) { getFindMe(e, posChoice) }
    })(posChoice), false);

});//end

