document.addEventListener("DOMContentLoaded", function() {
  const palette = document.querySelector(".palette");
  const canvas = document.querySelector(".canvas");

  // Create draggable blocks
  const blocks = document.querySelectorAll(".block");
  blocks.forEach(block => {
    interact(block)
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true
          })
        ],
        autoScroll: true,
        listeners: {
          move: dragMoveListener
        }
      })
      .on("dragend", function(event) {
        const x = (parseFloat(event.target.getAttribute("data-x")) || 0) + event.dx;
        const y = (parseFloat(event.target.getAttribute("data-y")) || 0) + event.dy;

        event.target.style.transform = `translate(${x}px, ${y}px)`;
        event.target.setAttribute("data-x", x);
        event.target.setAttribute("data-y", y);

        // Add the block to the canvas
        const newBlock = event.target.cloneNode(true);
        newBlock.classList.add("draggable-block");
        canvas.appendChild(newBlock);

        // Make the new block draggable
        interact(newBlock)
          .draggable({
            inertia: true,
            modifiers: [
              interact.modifiers.restrictRect({
                restriction: "parent",
                endOnly: true
              })
            ],
            autoScroll: true,
            listeners: {
              move: dragMoveListener
            }
          });
      });
  });

  function dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }
});