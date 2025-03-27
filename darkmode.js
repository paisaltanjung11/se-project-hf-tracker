// Dark Mode Handler - Shared across all pages
(function () {
  // Get theme toggle button if it exists
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  // Toggle dark mode function
  function toggleDarkMode() {
    if (document.body.classList.contains("dark-mode")) {
      // Switch to light mode
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
      if (themeToggleBtn && themeToggleBtn.querySelector(".theme-icon")) {
        themeToggleBtn.querySelector(".theme-icon").textContent = "🌙";
      }
    } else {
      // Switch to dark mode
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
      if (themeToggleBtn && themeToggleBtn.querySelector(".theme-icon")) {
        themeToggleBtn.querySelector(".theme-icon").textContent = "☀️";
      }
    }
  }

  // Check and apply theme preference
  function applyThemePreference() {
    // Check if user has set a preference before
    if (localStorage.getItem("darkMode") === null) {
      // Set default to light mode
      localStorage.setItem("darkMode", "disabled");
    }

    const isDarkMode = localStorage.getItem("darkMode") === "enabled";
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      if (themeToggleBtn && themeToggleBtn.querySelector(".theme-icon")) {
        themeToggleBtn.querySelector(".theme-icon").textContent = "☀️";
      }
    } else {
      document.body.classList.remove("dark-mode");
      if (themeToggleBtn && themeToggleBtn.querySelector(".theme-icon")) {
        themeToggleBtn.querySelector(".theme-icon").textContent = "🌙";
      }
    }
  }

  // Apply theme as early as possible
  applyThemePreference();

  // Add event listener to toggle button if it exists
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleDarkMode);
  }

  // Make functions available globally
  window.toggleDarkMode = toggleDarkMode;
  window.applyThemePreference = applyThemePreference;
})();
