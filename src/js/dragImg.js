// Перемещение изображения мышкой

var imgDrag = document.querySelector('.draggable');

imgDrag.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
        x: evt.clientX,
        y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      imgDrag.style.top = (imgDrag.offsetTop - shift.y) + 'px';
      imgDrag.style.left = (imgDrag.offsetLeft - shift.x) + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

// Перемещения изображения по наведению мышкой

  var tabGain = document.querySelector('.tab__item--gain img');

  tabGain.addEventListener('mousemove', function(ev) {
        var sizeParent = {
            width: ev.target.parentNode.clientWidth,
            height: ev.target.parentNode.clientHeight,
        }
        var sizeImg = {
            width: ev.target.clientWidth - sizeParent.width,
            height: ev.target.clientHeight - sizeParent.height,
        }

        if (ev.offsetX / sizeParent.width * sizeImg.width <= sizeImg.width && ev.offsetX / sizeParent.width <= 1) {
            ev.target.style.left = (-(ev.offsetX / sizeParent.width * sizeImg.width) + 'px');
        }
        if (ev.offsetY / sizeParent.height * sizeImg.height <= sizeImg.height) {
            ev.target.style.top = (-(ev.offsetY / sizeParent.height * sizeImg.height) + 'px');
        }
  });
