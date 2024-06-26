/*draganddrop.js: This file handles the drag and drop functionality of the blocks using the
 interact.js library. It defines a dragMoveListener function that updates the position of the
  dragged element and calls the updateWires function.*/
document.addEventListener("DOMContentLoaded", function() {
  function dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);

    // Call updateWires function
    updateWires();
  }

  function makeDraggable(element) {
    interact(element)
      .draggable({
        inertia: {
          resistance: 30,
          minSpeed: 200,
          endSpeed: 100
        },
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
  }

  window.makeDraggable = makeDraggable;
});