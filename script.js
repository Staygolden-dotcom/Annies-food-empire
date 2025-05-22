
// Scroll to section (optional)
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Allow other toggles
document.addEventListener("DOMContentLoaded", function () {
  const sidebarToggle = document.getElementById("sidebarToggle");
  const closeButton = document.getElementById("closeButton");
  const sidebar = document.getElementById("sidebar");

  // Toggle sidebar function
  function toggleSidebar() {
    sidebar.classList.toggle("active");
    // Optional: Add overlay when sidebar is open
    document.body.classList.toggle("sidebar-open");
  }

  // Open sidebar when hamburger is clicked
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleSidebar();
    });
  }

  // Close sidebar when close button is clicked
  if (closeButton) {
    closeButton.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleSidebar();
    });
  }

  // Close sidebar when clicking outside of it
  document.addEventListener("click", function (e) {
    if (
      sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) &&
      e.target !== sidebarToggle
    ) {
      toggleSidebar();
    }
  });

  // Close sidebar when a nav link is clicked (for mobile)
  const navLinks = document.querySelectorAll(".sidebar a"); // Select links inside sidebar
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth < 1024) {
        toggleSidebar();
      }
    });
  });

  // Close sidebar when window is resized to desktop size
  function checkWindowSize() {
    if (window.innerWidth >= 1024) {
      sidebar.classList.remove("active");
      document.body.classList.remove("sidebar-open");
    }
  }

  window.addEventListener("resize", checkWindowSize);
});

// Contact form submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message
    const notification = document.createElement("div");
    notification.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center";
    notification.innerHTML = `
        <i class="ri-checkbox-circle-line ri-lg mr-2"></i>
        Your message was sent successfully!
    `;
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Reset form
    this.reset();
});
