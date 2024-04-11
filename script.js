const canvas = document.querySelector('.canvas');

let draggingBlock = null;
let isDragging = false;

canvas.addEventListener('dragover', dragOver);
canvas.addEventListener('drop', drop);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mouseup', mouseUp);

function dragStart(e) {
  const isBlockInSidebar = e.currentTarget.parentNode.classList.contains('sidebar');
  if (isBlockInSidebar) {
    e.dataTransfer.setData('text/plain', e.currentTarget.classList[1]);
    draggingBlock = e.currentTarget;
    e.currentTarget.classList.add('dragging');
  }
}

function dragEnd(e) {
  e.currentTarget.classList.remove('dragging');
  draggingBlock = null;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  if (e.dataTransfer.getData('text/plain')) {
    const blockClass = e.dataTransfer.getData('text/plain');
    const block = document.createElement('div');
    block.classList.add('block', blockClass);
    block.style.left = e.clientX - canvas.offsetLeft - 40 + 'px';
    block.style.top = e.clientY - canvas.offsetTop - 40 + 'px';
    block.setAttribute('draggable', 'true');
    block.addEventListener('dragstart', dragStart);
    block.addEventListener('dragend', dragEnd);
    canvas.appendChild(block);
  }
}

function mouseDown(e) {
  const block = e.target.closest('.block');
  if (block && block.parentNode === canvas) {
    draggingBlock = block;
    block.classList.add('dragging');
    block.style.zIndex = '999';
    isDragging = true;
  }
}

function mouseMove(e) {
  if (isDragging && draggingBlock) {
    draggingBlock.style.left = e.clientX - canvas.offsetLeft - 40 + 'px';
    draggingBlock.style.top = e.clientY - canvas.offsetTop - 40 + 'px';
  }
}

function mouseUp(e) {
  if (isDragging && draggingBlock) {
    draggingBlock.classList.remove('dragging');
    draggingBlock.style.zIndex = 'auto';
    draggingBlock = null;
    isDragging = false;
  }
}

document.querySelectorAll('.sidebar .block').forEach(block => {
  block.addEventListener('dragstart', dragStart);
  block.addEventListener('dragend', dragEnd);
});