```blocks.js: This file handles the addition of new blocks to the canvas. 
It listens for clicks on the palette blocks and adds a new draggable block to the canvas.```
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