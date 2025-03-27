document.addEventListener("DOMContentLoaded", () => {
  initMealPlanSelection();
  setUserName();
});

// DOM Elements
const userName = document.getElementById("userName");
const mealPlanButtons = document.querySelectorAll(
  ".btn-secondary[data-meal-plan]"
);
const backToPlans = document.getElementById("backToPlans");
const mealPlanDetails = document.getElementById("mealPlanDetails");
const mealPlanTitle = document.getElementById("mealPlanTitle");
const balancedMealPlan = document.getElementById("balancedMealPlan");
const weightLossMealPlan = document.getElementById("weightLossMealPlan");
const muscleGainMealPlan = document.getElementById("muscleGainMealPlan");
const balancedRecommended = document.getElementById("balancedRecommended");

// Set user name from localStorage
function setUserName() {
  const storedName = localStorage.getItem("userName");
  if (storedName && userName) {
    userName.textContent = storedName;
  }
}

// Initialize meal plan selection
function initMealPlanSelection() {
  // Add click handlers to meal plan buttons
  mealPlanButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const mealPlanType = this.getAttribute("data-meal-plan");
      showMealPlan(mealPlanType);
    });
  });

  // Add click handler to "back to plans" button
  if (backToPlans) {
    backToPlans.addEventListener("click", function (e) {
      e.preventDefault();
      hideMealPlanDetails();
    });
  }

  // Initially hide meal plan details
  if (mealPlanDetails) {
    mealPlanDetails.style.display = "none";
  }
}

// Show selected meal plan
function showMealPlan(mealPlanType) {
  // Hide all meal plans first
  if (balancedMealPlan) balancedMealPlan.style.display = "none";
  if (weightLossMealPlan) weightLossMealPlan.style.display = "none";
  if (muscleGainMealPlan) muscleGainMealPlan.style.display = "none";

  // Update title and show the selected meal plan
  if (mealPlanType === "balanced") {
    if (mealPlanTitle) mealPlanTitle.textContent = "Balanced Diet Plan";
    if (balancedMealPlan) balancedMealPlan.style.display = "block";
  } else if (mealPlanType === "weightLoss") {
    if (mealPlanTitle) mealPlanTitle.textContent = "Weight Loss Diet Plan";
    if (weightLossMealPlan) weightLossMealPlan.style.display = "block";
  } else if (mealPlanType === "muscleGain") {
    if (mealPlanTitle) mealPlanTitle.textContent = "Muscle Gain Diet Plan";
    if (muscleGainMealPlan) muscleGainMealPlan.style.display = "block";
  }

  // Show meal plan details section
  if (mealPlanDetails) mealPlanDetails.style.display = "block";

  // Scroll to meal plan details
  window.scrollTo({
    top: mealPlanDetails.offsetTop - 100,
    behavior: "smooth",
  });
}

// Hide meal plan details
function hideMealPlanDetails() {
  if (mealPlanDetails) mealPlanDetails.style.display = "none";

  // Scroll back to meal plan categories
  const nutritionGuideSection = document.querySelector(
    ".nutrition-guide-section"
  );
  if (nutritionGuideSection) {
    window.scrollTo({
      top: nutritionGuideSection.offsetTop - 100,
      behavior: "smooth",
    });
  }
}
