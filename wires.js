// wires.js
document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.querySelector(".canvas");
  const createWireBtn = document.querySelector(".create-wire-btn");
  let selectedInputPoint = null;
  let selectedOutputPoint = null;
  let inputPoints = [];
  let outputPoints = [];

  createWireBtn.addEventListener("click", () => {
    const blocks = document.querySelectorAll(".draggable-block");
    blocks.forEach((block) => {
      // Check if there's already an input triangle
      if (!block.querySelector(".input-triangle")) {
        // Create input point
        const inputPoint = document.createElement("div");
        inputPoint.classList.add("input-point");
        inputPoint.addEventListener("click", () => {
          selectedInputPoint = inputPoint;
          console.log("Selected input point");
        });
        block.appendChild(inputPoint);
        inputPoints.push(inputPoint);
      }
  
      // Check if there's already an output triangle
      if (!block.querySelector(".output-triangle")) {
        // Create output point
        const outputPoint = document.createElement("div");
        outputPoint.classList.add("output-point");
        outputPoint.addEventListener("click", () => {
          selectedOutputPoint = outputPoint;
          console.log("Selected output point");
        });
        block.appendChild(outputPoint);
        outputPoints.push(outputPoint);
      }
    });
  });

  // Add event listener to create a wire
  document.addEventListener("click", () => {
    if (selectedInputPoint && selectedOutputPoint) {
      const wire = document.createElement("div");
      wire.classList.add("wire");
      canvas.appendChild(wire);

      // Update the wire's size and position
      const inputRect = selectedInputPoint.getBoundingClientRect();
      const outputRect = selectedOutputPoint.getBoundingClientRect();
      const dx = outputRect.left + outputRect.width / 2 - (inputRect.left + inputRect.width / 2);
      const dy = outputRect.top + outputRect.height / 2 - (inputRect.top + inputRect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      wire.style.width = `${distance}px`;
      wire.style.left = `${inputRect.left + inputRect.width / 2 + window.scrollX}px`;
      wire.style.top = `${inputRect.top + inputRect.height / 2 + window.scrollY}px`;
      wire.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;

      // Create the input and output triangles
      const inputTriangle = document.createElement("div");
      inputTriangle.classList.add("input-triangle");
      inputTriangle.style.borderTopColor = "blue";
      selectedInputPoint.parentNode.appendChild(inputTriangle);

      const outputTriangle = document.createElement("div");
      outputTriangle.classList.add("output-triangle");
      outputTriangle.style.borderBottomColor = "red";
      selectedOutputPoint.parentNode.appendChild(outputTriangle);

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