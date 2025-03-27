// DOM Elements
const userName = document.getElementById("userName");
const locationInput = document.getElementById("locationInput");
const currentLocationBtn = document.getElementById("currentLocationBtn");
const searchBtn = document.getElementById("searchBtn");
const filterBtns = document.querySelectorAll(".filter-btn");
const resultsContainer = document.getElementById("resultsContainer");
const resultsCount = document.getElementById("resultsCount");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");

// Mock data for nearby locations (in a real app, this would come from an API)
const mockLocations = {
  gyms: [
    {
      id: 1,
      name: "Elite Fitness Center",
      type: "Gym",
      address: "123 Main Street, Anytown",
      rating: 4.2,
      reviews: 86,
      distance: 0.8,
      image: "images/fitness-center.jpg",
      coordinates: { lat: 40.712776, lng: -74.005974 },
    },
    {
      id: 2,
      name: "PowerHouse Gym",
      type: "Gym",
      address: "456 Fitness Blvd, Anytown",
      rating: 4.5,
      reviews: 120,
      distance: 1.5,
      image: "images/fitness-center.jpg",
      coordinates: { lat: 40.714776, lng: -74.002974 },
    },
    {
      id: 3,
      name: "24/7 Fitness Club",
      type: "Gym",
      address: "789 Exercise Avenue, Anytown",
      rating: 3.9,
      reviews: 65,
      distance: 2.2,
      image: "images/fitness-center.jpg",
      coordinates: { lat: 40.710776, lng: -74.008974 },
    },
  ],
  parks: [
    {
      id: 4,
      name: "Central Park",
      type: "Park",
      address: "101 Park Avenue, Anytown",
      rating: 4.8,
      reviews: 124,
      distance: 1.2,
      image: "images/city-park.jpg",
      coordinates: { lat: 40.713776, lng: -74.003974 },
    },
    {
      id: 5,
      name: "Riverside Park",
      type: "Park",
      address: "202 River Road, Anytown",
      rating: 4.6,
      reviews: 98,
      distance: 1.8,
      image: "images/city-park.jpg",
      coordinates: { lat: 40.715776, lng: -74.007974 },
    },
  ],
  "healthy-food": [
    {
      id: 6,
      name: "Green Plate Café",
      type: "Healthy Food",
      address: "789 Healthy Blvd, Anytown",
      rating: 4.5,
      reviews: 92,
      distance: 1.5,
      image: "images/health-food.jpg",
      coordinates: { lat: 40.711776, lng: -74.006974 },
    },
    {
      id: 7,
      name: "Fresh & Fit Kitchen",
      type: "Healthy Food",
      address: "321 Organic Lane, Anytown",
      rating: 4.7,
      reviews: 108,
      distance: 2.0,
      image: "images/health-food.jpg",
      coordinates: { lat: 40.716776, lng: -74.001974 },
    },
  ],
  yoga: [
    {
      id: 8,
      name: "Zen Yoga Studio",
      type: "Yoga Studio",
      address: "555 Zen Way, Anytown",
      rating: 4.9,
      reviews: 76,
      distance: 1.7,
      image: "images/yoga-studio.jpg",
      coordinates: { lat: 40.717776, lng: -74.004974 },
    },
    {
      id: 9,
      name: "Mindful Yoga & Meditation",
      type: "Yoga Studio",
      address: "888 Calm Street, Anytown",
      rating: 4.6,
      reviews: 64,
      distance: 2.3,
      image: "images/yoga-studio.jpg",
      coordinates: { lat: 40.719776, lng: -74.009974 },
    },
  ],
};

// Global variables
let currentFilter = "gyms";
let currentPage = 1;
let itemsPerPage = 3;
let map;
let markers = [];
let userLocation = { lat: 40.712776, lng: -74.005974 }; // Default location (NYC)

// Initialize the nearby page
document.addEventListener("DOMContentLoaded", () => {
  // Set user name in profile menu
  setUserName();

  // Initialize event listeners
  initFilterButtons();
  initSearchButton();
  initLoadMoreButton();
});

// Set user name from localStorage
function setUserName() {
  const storedName = localStorage.getItem("userName") || "User";
  if (userName) {
    userName.textContent = storedName;
  }
}

// Initialize Google Map
function initMap() {
  // Create map centered on default location
  map = new google.maps.Map(document.getElementById("map"), {
    center: userLocation,
    zoom: 13,
    styles: getMapStyles(),
  });

  // Add user location marker
  addUserLocationMarker();

  // Load initial locations
  displayLocations(currentFilter, currentPage, true);
}

// Add marker for user's location
function addUserLocationMarker() {
  new google.maps.Marker({
    position: userLocation,
    map: map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: "#0088a0",
      fillOpacity: 1,
      strokeColor: "#ffffff",
      strokeWeight: 2,
    },
    title: "Your Location",
  });
}

// Get locations based on current filter
function getFilteredLocations() {
  return mockLocations[currentFilter] || [];
}

// Display locations on map and in list
function displayLocations(filter, page, resetMap = false) {
  currentFilter = filter;
  currentPage = page;

  const locations = getFilteredLocations();

  // Update results count
  if (resultsCount) {
    resultsCount.textContent = `Showing ${locations.length} ${filter} near you`;
  }

  // Clear existing markers if resetting map
  if (resetMap) {
    clearMapMarkers();
  }

  // Add markers to map
  locations.forEach((location) => {
    addLocationMarker(location);
  });

  // Center and zoom map to fit markers
  if (resetMap && markers.length > 0) {
    fitMapToMarkers();
  }

  // Calculate pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, locations.length);
  const paginatedLocations = locations.slice(startIndex, endIndex);

  // Update Load More button visibility
  if (loadMoreBtn) {
    loadMoreBtn.style.display = endIndex < locations.length ? "block" : "none";
  }

  // Render location cards
  renderLocationCards(paginatedLocations, page === 1);
}

// Render location cards in the results container
function renderLocationCards(locations, clearContainer = true) {
  if (!resultsContainer) return;

  // Clear container if loading first page
  if (clearContainer) {
    resultsContainer.innerHTML = "";
  }

  // Create DOM elements for each location
  locations.forEach((location) => {
    const card = document.createElement("div");
    card.className = "location-card";
    card.dataset.id = location.id;

    // Generate stars HTML
    const starsHTML = generateStars(location.rating);

    card.innerHTML = `
      <div class="location-img">
        <img src="${location.image}" alt="${location.name}">
      </div>
      <div class="location-info">
        <h3>${location.name}</h3>
        <p class="location-type"><span class="tag">${location.type}</span></p>
        <p class="location-address">${location.address}</p>
        <div class="location-details">
          <div class="rating">
            <span class="stars">${starsHTML}</span>
            <span class="rating-count">${location.rating.toFixed(1)} (${
      location.reviews
    } reviews)</span>
          </div>
          <p class="distance">${location.distance} miles away</p>
        </div>
      </div>
      <div class="location-actions">
        <button class="btn-secondary get-directions-btn" data-id="${
          location.id
        }">Get Directions</button>
        <button class="btn-secondary view-details-btn" data-id="${
          location.id
        }">View Details</button>
      </div>
    `;

    // Add event listeners for buttons
    const directionsBtn = card.querySelector(".get-directions-btn");
    const detailsBtn = card.querySelector(".view-details-btn");

    directionsBtn.addEventListener("click", () => getDirections(location));
    detailsBtn.addEventListener("click", () => viewLocationDetails(location));

    resultsContainer.appendChild(card);
  });

  // If no results, show message
  if (locations.length === 0 && clearContainer) {
    resultsContainer.innerHTML = `
      <div class="no-results">
        <p>No ${currentFilter.replace("-", " ")} found near this location.</p>
        <p>Try another filter or location.</p>
      </div>
    `;
  }
}

// Generate star rating HTML
function generateStars(rating) {
  let stars = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars += "★"; // Full star
    } else if (i === fullStars && hasHalfStar) {
      stars += "⭐"; // Half star (using different character for simplicity)
    } else {
      stars += "☆"; // Empty star
    }
  }

  return stars;
}

// Add location marker to map
function addLocationMarker(location) {
  const marker = new google.maps.Marker({
    position: location.coordinates,
    map: map,
    title: location.name,
    animation: google.maps.Animation.DROP,
  });

  // Create info window
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div class="map-info-window">
        <h3>${location.name}</h3>
        <p>${location.type}</p>
        <p>${location.distance} miles away</p>
        <p>Rating: ${location.rating.toFixed(1)}/5</p>
      </div>
    `,
  });

  // Add click event to marker
  marker.addListener("click", () => {
    // Close all other info windows
    markers.forEach((m) => m.infoWindow.close());

    // Open this info window
    infoWindow.open(map, marker);

    // Highlight the corresponding card
    highlightLocationCard(location.id);

    // Center map on marker
    map.panTo(marker.getPosition());
  });

  // Store info window with marker
  marker.infoWindow = infoWindow;

  // Add to markers array
  markers.push(marker);

  return marker;
}

// Clear all markers from map
function clearMapMarkers() {
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
}

// Fit map to show all markers
function fitMapToMarkers() {
  const bounds = new google.maps.LatLngBounds();

  // Add user location to bounds
  bounds.extend(userLocation);

  // Add all markers to bounds
  markers.forEach((marker) => {
    bounds.extend(marker.getPosition());
  });

  // Fit map to bounds
  map.fitBounds(bounds);

  // Don't zoom in too far on small bounds
  const listener = google.maps.event.addListener(map, "idle", () => {
    if (map.getZoom() > 16) map.setZoom(16);
    google.maps.event.removeListener(listener);
  });
}

// Highlight location card in results list
function highlightLocationCard(locationId) {
  // Remove highlight from all cards
  document.querySelectorAll(".location-card").forEach((card) => {
    card.classList.remove("highlight");
  });

  // Add highlight to selected card
  const card = document.querySelector(
    `.location-card[data-id="${locationId}"]`
  );
  if (card) {
    card.classList.add("highlight");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// Get directions to a location
function getDirections(location) {
  // In a real app, this would open Google Maps directions
  // For demo purposes, we'll just open a new window with a Google Maps link
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
  window.open(directionsUrl, "_blank");
}

// View location details
function viewLocationDetails(location) {
  // In a real app, this would show a modal with details or navigate to a details page
  // For demo purposes, we'll just show an alert
  alert(`
    ${location.name}
    Type: ${location.type}
    Address: ${location.address}
    Rating: ${location.rating.toFixed(1)}/5 (${location.reviews} reviews)
    Distance: ${location.distance} miles away
    
    In a complete app, this would display a detailed view with more information, photos, reviews, and amenities.
  `);
}

// Initialize filter buttons
function initFilterButtons() {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      // Get filter value from data attribute
      const filter = btn.dataset.filter;

      // Display locations with new filter
      displayLocations(filter, 1, true);
    });
  });
}

// Initialize search button
function initSearchButton() {
  if (searchBtn) {
    searchBtn.addEventListener("click", performSearch);
  }

  if (locationInput) {
    locationInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        performSearch();
      }
    });
  }

  if (currentLocationBtn) {
    currentLocationBtn.addEventListener("click", useCurrentLocation);
  }
}

// Perform search based on input location
function performSearch() {
  const query = locationInput.value.trim();

  if (!query) {
    alert("Please enter a location or use current location");
    return;
  }

  // In a real app, this would geocode the address and update the map
  // For demo purposes, we'll just use mock data
  alert(`Searching for ${currentFilter} near "${query}"...`);

  // Simulate search with currently selected filter
  displayLocations(currentFilter, 1, true);
}

// Use current location
function useCurrentLocation() {
  // In a real app, this would use the Geolocation API
  // For demo purposes, we'll just simulate it
  locationInput.value = "Current Location";

  // Show loading state
  currentLocationBtn.innerHTML = `<span class="location-icon">⏳</span>`;

  // Simulate geolocation delay
  setTimeout(() => {
    // Reset button
    currentLocationBtn.innerHTML = `<span class="location-icon">📍</span>`;

    // Update user location (simulated)
    userLocation = { lat: 40.712776, lng: -74.005974 };

    // Update map center
    if (map) {
      map.setCenter(userLocation);

      // Refresh locations
      displayLocations(currentFilter, 1, true);
    }
  }, 1000);
}

// Initialize Load More button
function initLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      // Increment current page
      currentPage++;

      // Display next page of locations
      displayLocations(currentFilter, currentPage, false);
    });
  }
}

// Get custom map styles for dark/light mode
function getMapStyles() {
  // Check if dark mode is active
  const isDarkMode = document.body.classList.contains("dark-mode");

  if (isDarkMode) {
    return [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ];
  }

  // Light mode styles (default with slight customization)
  return [
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#0088a0" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#e5f5e0" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#28a745" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#c9e9f0" }],
    },
  ];
}

// Window resize handler to fix map display issues
window.addEventListener("resize", () => {
  if (map) {
    google.maps.event.trigger(map, "resize");
  }
});

// The callback function for the Google Maps API
window.initMap = initMap;
