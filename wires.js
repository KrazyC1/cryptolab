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
      const inputRect = selectedInputPoint.getBoundingClientRect();
      const outputRect = selectedOutputPoint.getBoundingClientRect();
      const dx = outputRect.left - inputRect.left;
      const dy = outputRect.top - inputRect.top;
      const distance = Math.sqrt(dx * dx + dy * dy);
      wire.style.width = `${distance}px`;
      wire.style.left = `${inputRect.left + window.pageXOffset}px`;
      wire.style.top = `${inputRect.top + window.pageYOffset}px`;
      wire.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;

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