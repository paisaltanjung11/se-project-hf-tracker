// DOM Elements
const profileMenuBtn = document.getElementById("profileMenuBtn");
const profileDropdown = document.getElementById("profileDropdown");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeUserName = document.getElementById("welcomeUserName");
const userName = document.getElementById("userName");
const userBmi = document.getElementById("userBmi");
const bmiCategory = document.getElementById("bmiCategory");
const bmiValue = document.getElementById("bmiValue");
const bmiCategoryDetail = document.getElementById("bmiCategoryDetail");
const bmiIndicator = document.getElementById("bmiIndicator");
const bmiRecommendation = document.getElementById("bmiRecommendation");
const homeWorkout = document.getElementById("homeWorkout");
const outdoorWorkout = document.getElementById("outdoorWorkout");
const gymWorkout = document.getElementById("gymWorkout");
const homeRecommended = document.getElementById("homeRecommended");
const completedWorkouts = document.getElementById("completedWorkouts");
const bmiChart = document.getElementById("bmiChart");
const currentWeight = document.getElementById("currentWeight");
const monthlyWorkouts = document.getElementById("monthlyWorkouts");
const caloriesBurned = document.getElementById("caloriesBurned");

// Mock User Data (In a real app, this would come from an API/backend)
const userData = {
  id: 1,
  name: "John Doe",
  bmi: 25.7,
  weight: 78, // kg
  height: 174, // cm
  workoutPreference: null,
  completedWorkouts: 8,
  workoutHistory: [
    { date: "2023-05-01", type: "Home", calories: 250 },
    { date: "2023-05-03", type: "Home", calories: 300 },
    { date: "2023-05-07", type: "Outdoor", calories: 400 },
    { date: "2023-05-10", type: "Home", calories: 250 },
    { date: "2023-05-15", type: "Gym", calories: 500 },
    { date: "2023-05-18", type: "Outdoor", calories: 350 },
    { date: "2023-05-22", type: "Home", calories: 280 },
    { date: "2023-05-27", type: "Gym", calories: 520 },
  ],
  bmiHistory: [
    { date: "2023-04-01", value: 27.1 },
    { date: "2023-04-15", value: 26.5 },
    { date: "2023-05-01", value: 26.0 },
    { date: "2023-05-15", value: 25.7 },
  ],
};

// Initialize Dashboard
function initDashboard() {
  // Set user information
  welcomeUserName.textContent = userData.name;
  userName.textContent = userData.name;

  // Set BMI data
  userBmi.textContent = userData.bmi.toFixed(1);
  bmiValue.textContent = userData.bmi.toFixed(1);

  // Get BMI category and set UI elements
  const bmiStatus = getBmiCategory(userData.bmi);
  bmiCategory.textContent = bmiStatus.category;
  bmiCategoryDetail.innerHTML = `Your BMI is in the <span class="category-highlight" style="color: ${bmiStatus.color}">${bmiStatus.category}</span> range`;

  // Set BMI indicator position (percentage based on BMI value)
  const indicatorPosition = getBmiIndicatorPosition(userData.bmi);
  bmiIndicator.style.left = `${indicatorPosition}%`;

  // Set BMI recommendation
  bmiRecommendation.textContent = bmiStatus.recommendation;

  // Set workout recommendation
  setWorkoutRecommendation(userData.bmi);

  // Set stats
  completedWorkouts.textContent = userData.completedWorkouts;
  currentWeight.textContent = userData.weight;
  monthlyWorkouts.textContent = userData.workoutHistory.length;

  // Calculate total calories burned
  const totalCalories = userData.workoutHistory.reduce(
    (total, workout) => total + workout.calories,
    0
  );
  caloriesBurned.textContent = totalCalories.toLocaleString();

  // Initialize BMI history chart
  initBmiChart();

  // Initialize event listeners
  initEventListeners();
}

// Get BMI category and details
function getBmiCategory(bmi) {
  if (bmi < 18.5) {
    return {
      category: "Underweight",
      color: "var(--underweight-color)",
      recommendation:
        "Your BMI indicates you are underweight. Focus on increasing caloric intake with nutrient-dense foods and strength training to build muscle mass.",
    };
  } else if (bmi < 25) {
    return {
      category: "Normal",
      color: "var(--normal-color)",
      recommendation:
        "Your BMI is within a healthy range. Focus on maintaining balanced nutrition and regular exercise to keep it that way.",
    };
  } else if (bmi < 30) {
    return {
      category: "Overweight",
      color: "var(--overweight-color)",
      recommendation:
        "Your BMI indicates you are overweight. Focus on a balanced diet with a slight caloric deficit and regular cardiovascular exercise to achieve a healthier weight.",
    };
  } else {
    return {
      category: "Obese",
      color: "var(--obese-color)",
      recommendation:
        "Your BMI indicates obesity. It's recommended to consult with a healthcare professional for a personalized plan. Focus on gradual weight loss through sustainable diet changes and regular exercise.",
    };
  }
}

// Calculate BMI indicator position
function getBmiIndicatorPosition(bmi) {
  // Map BMI value to position across our 4 categories
  if (bmi < 18.5) {
    // Underweight (0-25%)
    return (bmi / 18.5) * 12.5 + 6.25; // Scale to 6.25-18.75% range (middle of first quarter)
  } else if (bmi < 25) {
    // Normal (25-50%)
    return ((bmi - 18.5) / 6.5) * 25 + 25; // Scale to 25-50% range
  } else if (bmi < 30) {
    // Overweight (50-75%)
    return ((bmi - 25) / 5) * 25 + 50; // Scale to 50-75% range
  } else {
    // Obese (75-100%)
    let position = ((bmi - 30) / 10) * 25 + 75; // Scale to 75-100% range
    return Math.min(position, 93); // Cap at 93% to keep within visible range
  }
}

// Set workout recommendation based on BMI
function setWorkoutRecommendation(bmi) {
  // Hide all "recommended" tags by default
  homeRecommended.style.display = "none";

  // Set recommendation based on BMI
  if (bmi >= 30) {
    // For obese, recommend home workouts to start
    homeRecommended.style.display = "block";
  } else if (bmi >= 25) {
    // For overweight, could recommend home or outdoor
    homeRecommended.style.display = "block";
  }
  // For normal or underweight, don't show any recommendation tag by default
  // You could add more tags to other workout types if needed
}

// Initialize BMI history chart
function initBmiChart() {
  if (!bmiChart) return;

  // Extract dates and values from BMI history
  const dates = userData.bmiHistory.map((entry) => {
    const date = new Date(entry.date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  const values = userData.bmiHistory.map((entry) => entry.value);

  // Create Chart.js chart
  new Chart(bmiChart, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "BMI",
          data: values,
          borderColor: "var(--secondary-color)",
          backgroundColor: "rgba(4, 166, 194, 0.1)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
          pointBackgroundColor: "var(--secondary-color)",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          suggestedMin: Math.min(...values) - 1,
          suggestedMax: Math.max(...values) + 1,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          title: {
            display: true,
            text: "BMI Value",
            color: "var(--text-light)",
            font: {
              size: 12,
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: "Date (Month/Day)",
            color: "var(--text-light)",
            font: {
              size: 12,
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "var(--primary-color)",
          titleColor: "var(--white)",
          bodyColor: "var(--white)",
          displayColors: false,
          callbacks: {
            label: function (context) {
              return `BMI: ${context.parsed.y.toFixed(1)}`;
            },
          },
        },
      },
    },
  });
}

// Initialize event listeners
function initEventListeners() {
  // Profile dropdown toggle
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

  // Logout button in dropdown
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  // Workout selection buttons
  const workoutButtons = document.querySelectorAll(
    ".workout-card .btn-secondary"
  );
  workoutButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const workoutType = this.parentElement.id;
      selectWorkout(workoutType);
    });
  });

  // Add active class to navigation links
  const navLinks = document.querySelectorAll(".nav-center a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

// Handle logout
function handleLogout(e) {
  e.preventDefault();

  // Show a confirmation dialog
  if (confirm("Are you sure you want to logout?")) {
    // In a real app, this would call a logout API endpoint
    // Redirect to index page
    window.location.href = "index.html";
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

// Handle workout selection
function selectWorkout(workoutType) {
  // In a real app, this would save the selection and redirect to workout details
  console.log(`Selected workout type: ${workoutType}`);

  // Here you would typically make an API call to save the selection
  // Then redirect to a specific workout details page
  // For this demo, we'll just show an alert
  alert(
    `You selected ${workoutType}. In a complete app, this would take you to specific workouts.`
  );
}

// Call init function when DOM is loaded
document.addEventListener("DOMContentLoaded", initDashboard);
