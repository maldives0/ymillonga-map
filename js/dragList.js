function dragList(moveX, listLen, idxList, item, listBox, ulEle) {
    listLen = item.length;
    let isDown = false;
    let startX;
    let endX;

    listBox.addEventListener('mousedown', (e) => {
        listBox.classList.add('active');
        isDown = true;
        startX = e.pageX;
    });
    listBox.addEventListener('mousemove', (e) => {
        endX = e.pageX;
        if (!isDown) return endX;
        e.preventDefault();
    });
    listBox.addEventListener('mouseleave', (e) => {
        isDown = false;
        listBox.classList.remove('active');
    });
    listBox.addEventListener('mouseup', (e) => {
        isDown = false;
        listBox.classList.remove('active');
        endPos();
    });
    function endPos() {
        if (startX > endX) {
            //next
            if (idxList < listLen - 1) idxList++;
        } else if (startX < endX) {
            //prev
            if (idxList != 0) idxList--;
        }
        setTimeout(function () { ulEle.style = "transform:translateX(" + (moveX * idxList) + "px);"; }, 100);
    };
}
export default dragList;