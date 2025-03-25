document.addEventListener("DOMContentLoaded", () => {
  initProfileDropdown();
  initWorkoutSelection();
  setUserName();
  setupLogout();
});

// Set user name in navbar profile
function setUserName() {
  const userNameElement = document.getElementById("userName");
  // In a real application, you would fetch this from a user session or local storage
  const userName = localStorage.getItem("userName") || "User";
  userNameElement.textContent = userName;
}

// Profile dropdown functionality
function initProfileDropdown() {
  const profileMenuBtn = document.getElementById("profileMenuBtn");
  const profileDropdown = document.getElementById("profileDropdown");

  // Toggle dropdown on profile click
  profileMenuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleProfileDropdown();
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (
      profileDropdown.style.display === "flex" &&
      !profileMenuBtn.contains(e.target) &&
      !profileDropdown.contains(e.target)
    ) {
      hideProfileDropdown();
    }
  });

  // Prevent dropdown from closing when clicking inside it
  profileDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// Toggle profile dropdown
function toggleProfileDropdown() {
  const profileDropdown = document.getElementById("profileDropdown");
  const profileMenuBtn = document.getElementById("profileMenuBtn");

  // Check initial display style - it might be empty string on first click
  if (profileDropdown.style.display === "flex") {
    hideProfileDropdown();
  } else {
    showProfileDropdown();
  }
}

// Show profile dropdown
function showProfileDropdown() {
  const profileDropdown = document.getElementById("profileDropdown");
  const profileMenuBtn = document.getElementById("profileMenuBtn");

  profileDropdown.style.display = "flex";
  profileMenuBtn.classList.add("active");
}

// Hide profile dropdown
function hideProfileDropdown() {
  const profileDropdown = document.getElementById("profileDropdown");
  const profileMenuBtn = document.getElementById("profileMenuBtn");

  profileDropdown.style.display = "none";
  profileMenuBtn.classList.remove("active");
}

// Handle workout selection and display appropriate exercises
function initWorkoutSelection() {
  const workoutButtons = document.querySelectorAll(
    ".btn-secondary[data-workout]"
  );
  const workoutSection = document.getElementById("workout-section");
  const exerciseDetails = document.getElementById("exerciseDetails");
  const exerciseTypeTitle = document.getElementById("exerciseTypeTitle");
  const backToWorkoutsBtn = document.getElementById("backToWorkouts");

  // Show recommended tag for home workout by default
  // In a real app, this would be based on user profile and preferences
  document.getElementById("homeRecommended").style.display = "inline-block";

  // Handle workout selection
  workoutButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const workoutType = button.getAttribute("data-workout");

      // Hide workout section and show exercise details
      workoutSection.style.display = "none";
      exerciseDetails.style.display = "block";

      // Update exercise type title
      exerciseTypeTitle.textContent = `${
        workoutType.charAt(0).toUpperCase() + workoutType.slice(1)
      } Workout Exercises`;

      // Hide all exercise lists first
      document.querySelectorAll(".exercise-list").forEach((list) => {
        list.style.display = "none";
      });

      // Show selected workout exercises
      document.getElementById(`${workoutType}Exercises`).style.display = "flex";

      // Scroll to exercise details
      window.scrollTo({
        top: exerciseDetails.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });

  // Handle "Choose Another Workout" button
  backToWorkoutsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    exerciseDetails.style.display = "none";
    workoutSection.style.display = "block";

    // Scroll back to workout section
    window.scrollTo({
      top: workoutSection.offsetTop - 80,
      behavior: "smooth",
    });
  });
}

// Handle logout functionality
function setupLogout() {
  const logoutBtn = document.getElementById("logoutBtn");

  // Function to handle logout
  const handleLogout = (e) => {
    e.preventDefault();

    // Show a confirmation dialog
    if (confirm("Are you sure you want to logout?")) {
      // In a real app, this would clear session tokens
      localStorage.removeItem("userName");
      window.location.href = "index.html";
    }
  };

  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }
}
