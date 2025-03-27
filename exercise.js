document.addEventListener("DOMContentLoaded", () => {
  initWorkoutSelection();
  setUserName();
});

// Set user name in navbar profile
function setUserName() {
  const userNameElement = document.getElementById("userName");
  // In a real application, you would fetch this from a user session or local storage
  const userName = localStorage.getItem("userName") || "User";
  userNameElement.textContent = userName;
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
