// DOM Elements
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const bmiForm = document.getElementById("bmiForm");
const popupOverlay = document.getElementById("popupOverlay");
const bmiPopup = document.getElementById("bmiPopup");
const popupResult = document.getElementById("popupResult");

// Input validation
function validateInput(value, min, max) {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
}

// Calculate BMI and determine category
function calculateBMI() {
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  // Input validation
  if (!validateInput(height, 50, 300)) {
    alert("Please enter a valid height between 50cm and 300cm");
    heightInput.focus();
    return;
  }

  if (!validateInput(weight, 20, 500)) {
    alert("Please enter a valid weight between 20kg and 500kg");
    weightInput.focus();
    return;
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const roundedBMI = bmi.toFixed(1);

  let category = "";
  let advice = "";
  let categoryColor = "";

  // Determine BMI category and advice
  if (bmi < 18.5) {
    category = "Underweight";
    advice =
      "You may need to gain weight in a healthy way. Consider consulting a healthcare professional for personalized guidance.";
    categoryColor = "#3498db";
  } else if (bmi >= 18.5 && bmi < 25) {
    category = "Healthy Weight";
    advice =
      "Great job! Keep maintaining a balanced diet and staying active to support your overall well-being.";
    categoryColor = "#2ecc71";
  } else if (bmi >= 25 && bmi < 30) {
    category = "Overweight";
    advice =
      "Incorporate regular physical activity and a nutritious diet to help maintain a healthy weight.";
    categoryColor = "#f1c40f";
  } else if (bmi >= 30 && bmi < 35) {
    category = "Obese";
    advice =
      "Consider making lifestyle adjustments and seeking guidance from a healthcare provider for a healthier approach to weight management.";
    categoryColor = "#e67e22";
  } else {
    category = "Extremely Obese";
    advice =
      "It's important to consult a healthcare professional to discuss safe and effective weight management strategies.";
    categoryColor = "#e74c3c";
  }

  // Display result
  popupResult.innerHTML = `
    <div class="bmi-value" style="color: ${categoryColor}">
      ${roundedBMI}
    </div>
    <div class="bmi-category" style="color: ${categoryColor}">
      ${category}
    </div>
    <p class="bmi-advice">
      ${advice}
    </p>
  `;

  showPopup();
}

// Show popup
function showPopup() {
  popupOverlay.style.display = "block";
  bmiPopup.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Close popup
function closePopup() {
  popupOverlay.style.display = "none";
  bmiPopup.style.display = "none";
  document.body.style.overflow = ""; // Restore scrolling
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Handle form submission
  bmiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    calculateBMI();
  });

  // Close popup when clicking outside
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });

  // Close popup with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popupOverlay.style.display === "block") {
      closePopup();
    }
  });

  // Prevent non-numeric input
  const numericInputs = [heightInput, weightInput];
  numericInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
    });
  });
});
