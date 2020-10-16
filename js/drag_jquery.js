$(function(){
    let idx = 0;
    const listLen = $('.item').length;
    let pos = {start:0, end:0};
    
    $('.items').draggable({
        axis: 'x',
        start:dragStart,
        drag:dragMove,
        stop:dragStop
    });
    
    function dragStart(e){
        pos.start = e.pageX;
    }
    
    function dragMove(e){
        pos.end = e.pageX;
    }
    
    function dragStop(e){
    
        if(pos.start > pos.end){
            //next
            if(idx != listLen-1) idx++;
        }else{
            //prev
            if(idx != 0) idx--;
        }
    
        $(this).animate({
            left: -450 *idx
        });
    
    }
    
    });//end