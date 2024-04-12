// updateWires.js
document.addEventListener("DOMContentLoaded", function() {
      function updateWires() {
        const wires = document.querySelectorAll(".wire");
        wires.forEach((wire) => {
          const inputTriangle = wire.parentNode.querySelector(".input-triangle");
          const outputTriangle = wire.parentNode.querySelector(".output-triangle");
    
          if (inputTriangle && outputTriangle) {
            const inputRect = inputTriangle.parentNode.getBoundingClientRect();
            const outputRect = outputTriangle.parentNode.getBoundingClientRect();
            const dx = outputRect.left + outputRect.width / 2 - (inputRect.left + inputRect.width / 2);
            const dy = outputRect.top + outputRect.height / 2 - (inputRect.top + inputRect.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            wire.style.width = `${distance}px`;
            wire.style.left = `${inputRect.left + inputRect.width / 2 + window.scrollX}px`;
            wire.style.top = `${inputRect.top + inputRect.height / 2 + window.scrollY}px`;
            wire.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
          }
        });
      }
    
      window.updateWires = updateWires;
    });