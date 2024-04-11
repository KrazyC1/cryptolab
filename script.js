document.addEventListener("DOMContentLoaded", function() {
  const palette = document.querySelector(".palette");
  const canvas = document.querySelector(".canvas");
  const createWireBtn = document.querySelector(".create-wire-btn");
  let selectedInputPoint = null;
  let selectedOutputPoint = null;
  let inputPoints = [];
  let outputPoints = [];

  // Add event listeners to palette blocks
  const paletteBlocks = document.querySelectorAll(".palette .block");
  paletteBlocks.forEach(block => {
    block.addEventListener("click", addBlockToCanvas);
  });

  function addBlockToCanvas(event) {
    const newBlock = event.target.cloneNode(true);
    newBlock.classList.add("draggable-block");
    canvas.appendChild(newBlock);

    // Make the new block draggable
    interact(newBlock)
      .draggable({
        inertia: {
          resistance: 30, // Adjust this value to control the inertia
          minSpeed: 200, // Minimum speed required to start inertial movement
          endSpeed: 100 // Speed at which inertial movement will stop
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

  function dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }

  createWireBtn.addEventListener("click", () => {
    const blocks = document.querySelectorAll(".draggable-block");
    blocks.forEach((block) => {
      // Create input point
      const inputPoint = document.createElement("div");
      inputPoint.classList.add("input-point");
      inputPoint.addEventListener("click", () => {
        selectedInputPoint = inputPoint;
        console.log("Selected input point");
      });
      block.appendChild(inputPoint);
      inputPoints.push(inputPoint);

      // Create output point
      const outputPoint = document.createElement("div");
      outputPoint.classList.add("output-point");
      outputPoint.addEventListener("click", () => {
        selectedOutputPoint = outputPoint;
        console.log("Selected output point");
      });
      block.appendChild(outputPoint);
      outputPoints.push(outputPoint);
    });
  });

  // Add event listener to create a wire
  document.addEventListener("click", () => {
    if (selectedInputPoint && selectedOutputPoint) {
      const wire = document.createElement("div");
      wire.classList.add("wire");
      canvas.appendChild(wire);

      // Update the wire's size and position
      const dx = selectedOutputPoint.offsetLeft - selectedInputPoint.offsetLeft;
      const dy = selectedOutputPoint.offsetTop - selectedInputPoint.offsetTop;
      const distance = Math.sqrt(dx * dx + dy * dy);
      wire.style.width = `${distance}px`;
      wire.style.transform = `translate(${selectedInputPoint.offsetLeft}px, ${selectedInputPoint.offsetTop}px) rotate(${Math.atan2(dy, dx)}rad)`;

      // Hide the input and output points
      selectedInputPoint.style.display = "none";
      selectedOutputPoint.style.display = "none";
      inputPoints.forEach(point => (point.style.display = "none"));
      outputPoints.forEach(point => (point.style.display = "none"));

      selectedInputPoint = null;
      selectedOutputPoint = null;
    }
  });
});