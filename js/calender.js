document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialDate: '2020-08-01',
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
        start: '2020-08-01',
        end: '2020-08-29'
      },
      {
        groupId: 999,
        title: 'milonga',
        start: '2020-07-26T16:00:00'
      },
      {
        groupId: 999,
        title: 'milonga',
        start: '2020-07-28T16:00:00'
      },
      {
        title: 'milonga',
        start: '2020-07-20',
        end: '2020-08-29'
      },
      {
        title: 'milonga',
        start: '2020-07-22T10:30:00',
        end: '2020-08-25T12:30:00'
      },
      {
        title: 'milonga',
        start: '2020-08-29T12:00:00'
      },
      {
        title: 'milonga',
        start: '2020-07-01T14:30:00'
      },
      {
        title: 'milonga',
        start: '2020-08-03T17:30:00'
      },
      {
        title: 'milonga',
        start: '2020-08-02T20:00:00'
      },
      {
        title: 'milonga',
        start: '2020-08-08T07:00:00'
      },
      {
        title: 'milonga',
        start: '2020-08-01'
      }
    ]
  });

  calendar.render();

  var eTxt = document.querySelectorAll('.fc-daygrid-more-link');
  var eColor = ['#f19ec2','#cfa972','#7ecef4','#8f82bc','#5f52a0','#88abda'];
  var eArr = [];

  eTxt.forEach(function(s,idx){
    eArr.push(s.textContent);
    
  });

  function update(){
    eArr.forEach(function(s,idx){
        var eNum = eArr[idx].indexOf('+')+1;
      
        eNum = eArr[idx].substr(eNum,1);   
        console.log(eNum) 
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
