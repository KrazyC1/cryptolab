// Get all the blocks
var blocks = document.querySelectorAll('.block');

// Make the blocks draggable
blocks.forEach(function(block) {
  var initialX, initialY, currentX, currentY, xOffset = 0, yOffset = 0, active = false;

  block.addEventListener('mousedown', dragStart);
  block.addEventListener('mouseup', dragEnd);
  block.addEventListener('mousemove', drag);

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === block) {
      active = true;
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
  }

  function drag(e) {
    if (active) {
      e.preventDefault();

      if (e.type === 'mousemove') {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, block);
      }
    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }
});