document.addEventListener("DOMContentLoaded", () => {
  initProfileDropdown();
  initMealPlanSelection();
  setUserName();
  setupLogout();
});

// DOM Elements
const profileMenuBtn = document.getElementById("profileMenuBtn");
const profileDropdown = document.getElementById("profileDropdown");
const logoutBtn = document.getElementById("logoutBtn");
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

// Initialize the nutrition page
function initNutritionPage() {
  // Set user name from localStorage (if available)
  setUserName();

  // Initialize dropdown and meal selection
  initProfileDropdown();
  initMealPlanSelection();

  // Setup logout handlers
  setupLogout();
}

// Set user name from localStorage
function setUserName() {
  const storedName = localStorage.getItem("userName");
  if (storedName && userName) {
    userName.textContent = storedName;
  }
}

// Initialize profile dropdown
function initProfileDropdown() {
  if (profileMenuBtn) {
    profileMenuBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleProfileDropdown();
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (
      profileDropdown &&
      !profileDropdown.contains(e.target) &&
      profileMenuBtn &&
      !profileMenuBtn.contains(e.target) &&
      getComputedStyle(profileDropdown).display !== "none"
    ) {
      hideProfileDropdown();
    }
  });

  // Prevent dropdown from closing when clicking inside it
  if (profileDropdown) {
    profileDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
}

// Toggle profile dropdown
function toggleProfileDropdown() {
  // Check initial display style using getComputedStyle
  if (getComputedStyle(profileDropdown).display === "flex") {
    hideProfileDropdown();
  } else {
    showProfileDropdown();
  }
}

// Show profile dropdown
function showProfileDropdown() {
  profileDropdown.style.display = "flex";
  profileMenuBtn.classList.add("active");
}

// Hide profile dropdown
function hideProfileDropdown() {
  profileDropdown.style.display = "none";
  profileMenuBtn.classList.remove("active");
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

// Setup logout functionality
function setupLogout() {
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }
}

// Handle logout
function handleLogout(e) {
  e.preventDefault();

  // Show a confirmation dialog
  if (confirm("Are you sure you want to logout?")) {
    // In a real app, this would call a logout API endpoint
    // Clear user data from localStorage
    localStorage.removeItem("userName");

    // Redirect to index page
    window.location.href = "index.html";
  }
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", initNutritionPage);
