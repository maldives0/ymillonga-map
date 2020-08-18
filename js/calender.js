document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialDate: '2020-08-12',
    editable: true,
    selectable: true,
    businessHours: true,
    dayMaxEvents: true, // allow "more" link when too many events
    events: [
      {
        title: 'milonga',
        start: '2020-08-01'
      },
      {
        title: 'milonga',
        start: '2020-08-07',
        end: '2020-08-10'
      },
      {
        groupId: 999,
        title: 'milonga',
        start: '2020-08-09T16:00:00'
      },
      {
        groupId: 999,
        title: 'milonga',
        start: '2020-08-16T16:00:00'
      },
      {
        title: 'milonga',
        start: '2020-08-11',
        end: '2020-08-13'
      },
      {
        title: 'milonga',
        start: '2020-08-12T10:30:00',
        end: '2020-08-12T12:30:00'
      },
      {
        title: 'milonga',
        start: '2020-08-12T12:00:00'
      },
      {
        title: 'milonga',
        start: '2020-08-12T14:30:00'
      },
      {
        title: 'milonga',
        start: '2020-08-12T17:30:00'
      },
      {
        title: 'milonga',
        start: '2020-08-12T20:00:00'
      },
      {
        title: 'milonga',
        start: '2020-08-13T07:00:00'
      },
      {
        title: 'milonga',
               start: '2020-08-28'
      }
    ]
  });

  calendar.render();

  var eTxt = document.querySelectorAll('.fc-daygrid-more-link');
  var eColor = ['#cce198','#89c997','#7ecef4','#8f82bc','#f19ec2','#f19149'];
  var eArr = [];

  eTxt.forEach(function(s,idx){
    eArr.push(s.textContent);
  });

  function update(){
    eArr.forEach(function(s,idx){
        var eNum = eArr[idx].indexOf('+')+1;
        eNum = eArr[idx].substr(eNum,1);    
        var c;
        switch(eNum){
          case '1': c = eColor[0];break;
          case '2': c = eColor[1];break;
          case '3': c = eColor[2];break;
          case '4': c = eColor[3];break;
          case '5': c = eColor[4];break;
          case '6': c = eColor[5];
        }

        var eTag = document.createElement('em');
        eTag.append(eNum);
        eTxt[idx].innerHTML='';
        eTxt[idx].append(eTag);
        eTxt[idx].children[0].style="background:"+c;
    });
    
    eTxt.forEach(function(s){
      s.addEventListener('click',update);
    });
    window.addEventListener('click',update);


  }
  update();










});
