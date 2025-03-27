// DOM Elements
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
const motivationText = document.getElementById("motivationText");
const welcomeMessage = document.getElementById("welcomeMessage");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const updateBmiBtn = document.getElementById("updateBmiBtn");
const confettiContainer = document.getElementById("confettiContainer");
const healthyEaterBadge = document.getElementById("healthyEaterBadge");
const workoutWarriorBadge = document.getElementById("workoutWarriorBadge");

// Array of motivational quotes
const motivationalQuotes = [
  "Your health is your greatest wealth. Keep moving forward!",
  "Small steps every day lead to big changes.",
  "Progress, not perfection—keep going!",
  "You are stronger than you think. Believe in yourself!",
  "Lock in your goals, commit to your progress!",
  "A promise to yourself starts with a single action. Are you in?",
  "Discipline defines destiny!",
  "Focus, follow through, finish!",
  "Lock in, stay consistent!",
];

// Get time-based greeting
function getTimeBasedGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

// Get random motivational quote
function getRandomMotivationalQuote() {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
}

// Mock User Data (In a real app, this would come from an API/backend)
const userData = {
  id: 1,
  name: "John Doe",
  bmi: 22.5,
  weight: 65, // kg
  height: 170, // cm
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
    { date: "2023-04-01", value: 25.4 },
    { date: "2023-04-05", value: 25.2 },
    { date: "2023-04-10", value: 25.0 },
    { date: "2023-04-15", value: 24.8 },
    { date: "2023-04-20", value: 24.5 },
    { date: "2023-04-25", value: 24.3 },
    { date: "2023-05-01", value: 24.0 },
    { date: "2023-05-05", value: 23.8 },
    { date: "2023-05-10", value: 23.5 },
    { date: "2023-05-15", value: 23.2 },
    { date: "2023-05-20", value: 23.0 },
    { date: "2023-05-25", value: 22.7 },
    { date: "2023-05-30", value: 22.5 },
  ],
  badges: {
    healthyEater: true,
    workoutWarrior: true,
  },
};

// Initialize Dashboard
function initDashboard() {
  // Set time-based greeting
  welcomeMessage.textContent = getTimeBasedGreeting();

  // Set random motivational quote
  motivationText.textContent = getRandomMotivationalQuote();

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
  if (completedWorkouts)
    completedWorkouts.textContent = userData.completedWorkouts;
  currentWeight.textContent = userData.weight;
  if (monthlyWorkouts)
    monthlyWorkouts.textContent = userData.workoutHistory.length;

  // Calculate total calories burned
  const totalCalories = userData.workoutHistory.reduce(
    (total, workout) => total + workout.calories,
    0
  );
  if (caloriesBurned)
    caloriesBurned.textContent = totalCalories.toLocaleString();

  // Initialize badges
  initBadges();

  // Initialize BMI history chart
  initBmiChart();

  // Initialize event listeners
  initEventListeners();

  // Dark mode is now handled by darkmode.js
}

// Initialize badges
function initBadges() {
  // Show or hide badges based on user data
  healthyEaterBadge.style.display = userData.badges.healthyEater
    ? "flex"
    : "none";
  workoutWarriorBadge.style.display = userData.badges.workoutWarrior
    ? "flex"
    : "none";
}

// Show Update BMI modal
function showUpdateBmiModal() {
  // Create modal dynamically
  const modal = document.createElement("div");
  modal.className = "bmi-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2>Update Your BMI</h2>
      <form id="bmiForm">
        <div class="form-group">
          <label for="weight">Weight (kg)</label>
          <input type="number" id="weight" value="${userData.weight}" min="30" max="300" step="0.1" required>
        </div>
        <div class="form-group">
          <label for="height">Height (cm)</label>
          <input type="number" id="height" value="${userData.height}" min="100" max="250" step="0.1" required>
        </div>
        <button type="submit" class="btn-primary">Calculate & Update</button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  // Add event listeners
  const closeBtn = modal.querySelector(".close-modal");
  const form = modal.querySelector("#bmiForm");

  closeBtn.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const weight = parseFloat(form.querySelector("#weight").value);
    const height = parseFloat(form.querySelector("#height").value);

    if (weight && height) {
      // Calculate new BMI
      const newBmi = calculateBmi(weight, height);

      // Check if BMI improved
      const previousBmi = userData.bmi;
      const previousCategory = getBmiCategory(previousBmi).category;
      const newCategory = getBmiCategory(newBmi).category;

      // Update user data
      userData.weight = weight;
      userData.height = height;
      userData.bmi = newBmi;

      // Add to BMI history
      const today = new Date();
      const dateStr = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      userData.bmiHistory.push({ date: dateStr, value: newBmi });

      // Update UI
      userBmi.textContent = newBmi.toFixed(1);
      bmiValue.textContent = newBmi.toFixed(1);
      currentWeight.textContent = weight;

      // Update category and recommendation
      const bmiStatus = getBmiCategory(newBmi);
      bmiCategory.textContent = bmiStatus.category;
      bmiCategoryDetail.innerHTML = `Your BMI is in the <span class="category-highlight" style="color: ${bmiStatus.color}">${bmiStatus.category}</span> range`;
      bmiRecommendation.textContent = bmiStatus.recommendation;

      // Update indicator position
      const indicatorPosition = getBmiIndicatorPosition(newBmi);
      bmiIndicator.style.left = `${indicatorPosition}%`;

      // Show confetti if BMI improved to a better category
      if (isBmiImproved(previousCategory, newCategory)) {
        showConfetti();
      }

      // Recreate chart
      initBmiChart();

      // Close modal
      document.body.removeChild(modal);
    }
  });

  // Close if clicked outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
}

// Calculate BMI
function calculateBmi(weight, height) {
  // BMI formula: weight(kg) / (height(m))²
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

// Check if BMI category improved
function isBmiImproved(previousCategory, newCategory) {
  const categories = ["Obese", "Overweight", "Normal", "Underweight"];

  // If moving from overweight/obese towards normal, that's an improvement
  if (
    previousCategory === "Obese" &&
    (newCategory === "Overweight" || newCategory === "Normal")
  ) {
    return true;
  }

  if (previousCategory === "Overweight" && newCategory === "Normal") {
    return true;
  }

  // If moving from underweight to normal, that's an improvement
  if (previousCategory === "Underweight" && newCategory === "Normal") {
    return true;
  }

  return false;
}

// Show confetti animation
function showConfetti() {
  // Create and animate 50 confetti pieces
  for (let i = 0; i < 50; i++) {
    createConfettiPiece();
  }
}

// Create a single confetti piece
function createConfettiPiece() {
  const colors = ["#fabd02", "#0088a0", "#04a6c2", "#28a745", "#ffc107"];
  const confetti = document.createElement("div");

  // Random confetti style
  confetti.className = "confetti-piece";
  confetti.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
  confetti.style.width = `${Math.random() * 10 + 5}px`;
  confetti.style.height = `${Math.random() * 10 + 5}px`;
  confetti.style.position = "absolute";
  confetti.style.top = "-10px";
  confetti.style.left = `${Math.random() * 100}%`;
  confetti.style.opacity = Math.random() + 0.5;
  confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

  // Add to container
  confettiContainer.appendChild(confetti);

  // Animate falling
  const animation = confetti.animate(
    [
      { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
      {
        transform: `translate(${Math.random() * 100 - 50}px, 100px) rotate(${
          Math.random() * 360
        }deg)`,
        opacity: 0,
      },
    ],
    {
      duration: Math.random() * 1000 + 1000,
      easing: "cubic-bezier(0, .9, .57, 1)",
      delay: Math.random() * 200,
    }
  );

  // Remove confetti after animation
  animation.onfinish = () => {
    confetti.remove();
  };
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

  // Get normal range boundaries for shading
  const normalRangeLower = 18.5;
  const normalRangeUpper = 24.9;

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
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "var(--secondary-color)",
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBorderWidth: 2,
          pointBorderColor: "white",
        },
        {
          label: "Normal Range (Lower)",
          data: Array(dates.length).fill(normalRangeLower),
          borderColor: "rgba(40, 167, 69, 0.5)",
          borderWidth: 1,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false,
        },
        {
          label: "Normal Range (Upper)",
          data: Array(dates.length).fill(normalRangeUpper),
          borderColor: "rgba(40, 167, 69, 0.5)",
          borderWidth: 1,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: "-1", // Fill between this dataset and the previous one
          backgroundColor: "rgba(40, 167, 69, 0.05)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          suggestedMin:
            Math.min(...values) - 1 > 17 ? Math.min(...values) - 1 : 17,
          suggestedMax:
            Math.max(...values) + 1 < 30 ? Math.max(...values) + 1 : 30,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          title: {
            display: true,
            text: "BMI Value",
            color: "var(--text-light)",
            font: {
              size: 12,
              weight: "bold",
            },
          },
          ticks: {
            callback: function (value) {
              return value.toFixed(1);
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
              weight: "bold",
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
            title: function (context) {
              return context[0].label;
            },
            label: function (context) {
              const bmi = context.parsed.y;
              let status = "";

              if (bmi < 18.5) status = "Underweight";
              else if (bmi < 25) status = "Normal";
              else if (bmi < 30) status = "Overweight";
              else status = "Obese";

              return [`BMI: ${bmi.toFixed(1)}`, `Status: ${status}`];
            },
          },
        },
      },
    },
  });
}

// Initialize event listeners
function initEventListeners() {
  // Theme toggle handled by darkmode.js

  // Update BMI button
  if (updateBmiBtn) {
    updateBmiBtn.addEventListener("click", showUpdateBmiModal);
  }

  // Document click event for closing modals etc
  document.addEventListener("click", function (e) {
    // Close modals or other UI elements if needed
  });

  // Window load event
  window.addEventListener("load", function () {
    // Any initialization that should happen after window load
  });
}

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", initDashboard);
