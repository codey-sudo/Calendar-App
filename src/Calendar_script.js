let zIndexCounter = 1000; // Global counter to track the current z-index

// Function to handle expanding the day elements
function expandElement(dayElement) {
  // Increment z-index for the expanding element
  zIndexCounter += 1;
  dayElement.style.zIndex = zIndexCounter;

  // Add the expanded class to the clicked element
  dayElement.classList.add("expanded");

  // making addButton variable
  const addButton = dayElement.querySelector(".addButton");

  // Show the textarea when expanded
  const textArea = dayElement.querySelector(".note-area");
  // subtract the text in the div when expanded, showing only the textArea if there was a note added.
  const displayText = dayElement.querySelector(".display-text");
  // Hide the addButton
  addButton.style.display = "none";

  if (textArea) {
    textArea.style.display = "block"; // Make the textarea visible
    displayText.style.display = "none"; //hide div
  }

  // Show the Save button when expanded
  const saveButton = dayElement.querySelector(".save");
  if (saveButton) {
    saveButton.style.display = "block"; // Make the save button visible
  }
}

// Function to handle shrinking the day elements
function shrinkElement(dayElement) {
  // Remove the expanded class to shrink the element
  dayElement.classList.remove("expanded");

  // Get the textarea and the display text element
  const textArea = dayElement.querySelector(".note-area");
  displayText = dayElement.querySelector(".display-text");

  if (textArea) {
    let text = textArea.value.trim(); // Get the text from textarea

    if (text === "") {
      // If the textarea is empty, hide everything
      displayText.style.display = "none";
      textArea.style.display = "none";
    } else {
      // If there is text, show the plain text and hide the textarea
      displayText.textContent = text; // Display the text from the textarea
      displayText.style.display = "block";
      textArea.style.display = "none"; // Hide the textarea
    }
  }

  // Hide the Save button itself
  const saveButton = dayElement.querySelector(".save");
  if (saveButton) {
    saveButton.style.display = "none"; // Hide the save button
  }

  // Return the addButton to its original state (e.g., block or inline-block)
  const addButton = dayElement.querySelector(".addButton");
  if (addButton) {
    addButton.style.display = "inline-block"; // Make the addButton visible again
  }

  // Reset z-index back to 1 after shrinking
  setTimeout(() => {
    dayElement.style.zIndex = 1; // Reset z-index to 1
  }, 500); // Adjust this duration to match your shrinking animation time
}

// Function to add the save button click handler
function addSaveButtonEvent(dayElement) {
  const saveButton = dayElement.querySelector(".save");

  // Ensure the save button exists before adding the listener
  if (saveButton) {
    saveButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the card from collapsing when clicking save

      // Shrink the element when the Save button is clicked
      shrinkElement(dayElement);
    });
  }
}

// Initialize event listeners for all the day elements
document.querySelectorAll(".day").forEach((dayElement) => {
  // Add the click event listener to expand the day element
  dayElement.addEventListener("click", () => {
    // Collapse any other expanded elements before expanding a new one
    document.querySelectorAll(".day.expanded").forEach((expandedElement) => {
      if (expandedElement !== dayElement) {
        shrinkElement(expandedElement); // Shrink other expanded elements
      }
    });

    // Expand the clicked day element
    expandElement(dayElement);
  });

  // Add the save button event listener to shrink the element
  addSaveButtonEvent(dayElement);
});

// Using Day.js module
