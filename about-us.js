document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".slider-container");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");

  if (!sliderContainer || slides.length === 0) {
    console.error("Slider elements not found");
    return;
  }

  let currentSlide = 0;
  let isAnimating = false;

  // Initialize slides
  slides.forEach((slide, index) => {
    if (index === 0) {
      slide.classList.add("active");
    } else {
      slide.classList.add("next");
    }
  });

  function updateSlider(direction, targetIndex) {
    if (isAnimating) return;
    isAnimating = true;

    const currentSlideElement = slides[currentSlide];
    const nextSlideElement = slides[targetIndex];

    // Remove all position classes first
    slides.forEach((slide) => {
      slide.classList.remove("active", "prev", "next");
    });

    // Set initial positions
    if (direction === "next") {
      nextSlideElement.classList.add("next");
      currentSlideElement.classList.add("active");
    } else {
      nextSlideElement.classList.add("prev");
      currentSlideElement.classList.add("active");
    }

    // Force reflow
    void nextSlideElement.offsetWidth;

    // Trigger animation
    requestAnimationFrame(() => {
      if (direction === "next") {
        currentSlideElement.classList.replace("active", "prev");
      } else {
        currentSlideElement.classList.replace("active", "next");
      }
      nextSlideElement.classList.replace(
        direction === "next" ? "next" : "prev",
        "active"
      );

      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === targetIndex);
      });
    });

    // Clean up after transition
    const onTransitionEnd = () => {
      currentSlide = targetIndex;
      isAnimating = false;
      nextSlideElement.removeEventListener("transitionend", onTransitionEnd);
    };

    nextSlideElement.addEventListener("transitionend", onTransitionEnd);
  }

  // Event Listeners
  prevBtn.addEventListener("click", () => {
    const targetIndex = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    updateSlider("prev", targetIndex);
  });

  nextBtn.addEventListener("click", () => {
    const targetIndex = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    updateSlider("next", targetIndex);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (index === currentSlide || isAnimating) return;
      const direction = index > currentSlide ? "next" : "prev";
      updateSlider(direction, index);
    });
  });

  // Handle keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (isAnimating) return;

    if (e.key === "ArrowLeft") {
      const targetIndex =
        currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
      updateSlider("prev", targetIndex);
    } else if (e.key === "ArrowRight") {
      const targetIndex =
        currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
      updateSlider("next", targetIndex);
    }
  });
});
