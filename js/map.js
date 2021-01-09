import "core-js/stable";
import "regenerator-runtime/runtime";
import mapSearch from './mapSearch';
import { getFindMe } from './mapSearch';

window.addEventListener('DOMContentLoaded', function () {
    const data = new XMLHttpRequest();
    let response;
    const ulEle = document.querySelector('.listbox .items');
    let idxList = 0;
    let listLen = 0;
    let liEle = '';
    const form = document.querySelector('.searchbox form');
    const input = form.querySelector('input');
    let inputVal = '';
    let posChoice = [];

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
                liEle += " <div class='appraisal'><span class='like'>371</span><span class='write'>39</span> </div></li>";
                ulEle.innerHTML += liEle;
                input.value = '';
                input.focus();
            } else if (!a || !b) {
                input.value = '';
                input.focus();
            }
        });
        mapSearch(-420, listLen, idxList, posChoice, findMeBtn, ulEle);
    }
});//end


