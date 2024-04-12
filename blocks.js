// blocks.js
document.addEventListener("DOMContentLoaded", function() {
  const palette = document.querySelector(".palette");
  const canvas = document.querySelector(".canvas");

  function addBlockToCanvas(event) {
    const newBlock = event.target.cloneNode(true);
    newBlock.classList.add("draggable-block");
    canvas.appendChild(newBlock);
    makeDraggable(newBlock);
  }

  // Add event listeners to palette blocks
  const paletteBlocks = document.querySelectorAll(".palette .block");
  paletteBlocks.forEach(block => {
    block.addEventListener("click", addBlockToCanvas);
  });
});