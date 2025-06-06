

// Navigation 
document.addEventListener("DOMContentLoaded", () => {
  class Navigation {
    constructor() {
      this.selectors = {
        hamburger: ".hamburger",
        mobileMenu: ".mobile-menu-overlay",
        closeButton: ".close-menu-btn",
        navLinks: ".mobile-nav-link",
        overlay: ".overlay",
      };

      this.state = {
        isMenuOpen: false,
      };

      this.init();
    }

    init() {
      this.cacheDomElements();
      this.createOverlay();
      this.setupEventListeners();
    }

    cacheDomElements() {
      this.dom = {};
      for (const [key, value] of Object.entries(this.selectors)) {
        this.dom[key] = document.querySelector(value);
      }
      this.dom.navLinks = document.querySelectorAll(this.selectors.navLinks);
    }

    createOverlay() {
      this.overlay = document.createElement("div");
      this.overlay.className = "overlay";
      document.body.appendChild(this.overlay);
    }

    setupEventListeners() {
      // Toggle menu
      this.dom.hamburger.addEventListener("click", this.toggleMenu.bind(this));
      this.dom.closeButton.addEventListener(
        "click",
        this.toggleMenu.bind(this)
      );
      this.overlay.addEventListener("click", this.toggleMenu.bind(this));

      // Close menu when clicking nav links
      this.dom.navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          if (!link.classList.contains("has-dropdown")) {
            this.closeMenu();
          }
        });
      });

      // Handle keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.state.isMenuOpen) {
          this.closeMenu();
        }
      });

      // Scroll effects
      window.addEventListener("scroll", this.handleScroll.bind(this));
    }

    toggleMenu() {
      if (this.state.isMenuOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    }

    openMenu() {
      this.dom.hamburger.classList.add("active");
      this.dom.mobileMenu.classList.add("active");
      this.overlay.classList.add("active");
      document.body.classList.add("no-scroll");
      this.dom.hamburger.setAttribute("aria-expanded", "true");
      this.state.isMenuOpen = true;

      // Trap focus inside menu when open
      this.trapFocus(this.dom.mobileMenu);
    }

    closeMenu() {
      this.dom.hamburger.classList.remove("active");
      this.dom.mobileMenu.classList.remove("active");
      this.overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
      this.dom.hamburger.setAttribute("aria-expanded", "false");
      this.state.isMenuOpen = false;
    }

    handleScroll() {
      const header = document.querySelector(".header");
      header.style.boxShadow =
        window.scrollY > 50
          ? "0 4px 12px rgba(0, 0, 0, 0.1)"
          : "0 2px 10px rgba(0, 0, 0, 0.1)";
    }

    trapFocus(element) {
      const focusableElements = element.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (firstFocusable) {
        firstFocusable.focus();
      }

      element.addEventListener("keydown", (e) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      });
    }
  }

  // Initialize navigation
  new Navigation();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });
});

// Navigation ends



// special

document.addEventListener("DOMContentLoaded", function () {
  // Sample special dishes data
  const specialDishes = [
    {
      name: "Jollof Rice",
      description:
        "Flavorful Jollof rice cooked in  rich sauce with spices.",
      price: "₱500.00",
      image: "./images/jollof-rice-chiken-plantain.jpg",
      badge: "Chef's Pick",
    },
    {
      name: "Egusi Soup",
      description:
        "Traditional Egusi soup made with leafy vegetables, and assorted meats.",
      price: "₱500.00",
      image: "./images/egusi-soup.jpg",
      badge: "Signature",
    },
    {
      name: "Jollof Spaghetti",
      description:
        "A creative twist on classic Jollof, using spaghetti cooked in delicious  sauce.",
      price: "₱400.00",
      image: "./images/jollof-spagetti.jpg",
      badge: "Popular",
    },
    {
      name: "Chicken Shawarma",
      description:
        "Marinated chicken wrapped in pita bread with rich sauce, and vegetables.",
      price: "₱400.00",
      image: "./images/chicken-shawarma.jpg",
      badge: "Wrap",
    },
    {
      name: "Puff-Puff and Oreo crumps",
      description:
        "Sweet fried dough served with crushed Oreo cookies for a delightful dessert.",
      price: "₱200.00 (6px)",
      image: "./images/cake.jpg",
      badge: "Sweet",
    },
  ];

  const dishesContainer = document.getElementById("dishesContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dishesWrapper = document.querySelector(".dishes-wrapper");

  // Function to create dish cards
  function createDishCards() {
    dishesContainer.innerHTML = "";

    specialDishes.forEach((dish) => {
      const dishCard = document.createElement("div");
      dishCard.className = "dish-card";

      dishCard.innerHTML = `
        <span class="dish-badge">${dish.badge}</span>
        <img src="${dish.image}" alt="${dish.name}" class="dish-image">
        <div class="dish-info">
          <h3 class="dish-name">${dish.name}</h3>
          <p class="dish-description">${dish.description}</p>
          <p class="dish-price">${dish.price}</p>
        </div>
      `;

      dishesContainer.appendChild(dishCard);
    });
  }

  // Initialize dish cards
  createDishCards();

  // Check screen size and setup navigation accordingly
  function checkScreenSize() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Mobile behavior - hide buttons
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";

      // Ensure container is scrollable
      dishesContainer.style.overflowX = "auto";
      dishesContainer.style.scrollSnapType = "x mandatory";

      // Add snap points to each dish card
      document.querySelectorAll(".dish-card").forEach((card) => {
        card.style.scrollSnapAlign = "start";
      });
    } else {
      // Desktop behavior - show buttons
      prevBtn.style.display = "flex";
      nextBtn.style.display = "flex";

      // Make container unscrollable (buttons will handle navigation)
      dishesContainer.style.overflowX = "hidden";
    }
  }

  // Navigation functions
  function scrollDishes(amount) {
    dishesContainer.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  }

  // Event listeners for desktop navigation
  prevBtn.addEventListener("click", () => scrollDishes(-1400));
  nextBtn.addEventListener("click", () => scrollDishes(1400));

  // Touch support for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;

  dishesContainer.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  dishesContainer.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left - scroll right
      scrollDishes(300);
    }
    if (touchEndX > touchStartX + 50) {
      // Swipe right - scroll left
      scrollDishes(-300);
    }
  }

  // Initial check
  checkScreenSize();

  // Re-check on window resize
  window.addEventListener("resize", checkScreenSize);
});



// review

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".slider-track");
  const dots = document.querySelectorAll(".slider-dot");
  const cards = document.querySelectorAll(".review-card");
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 50; // Minimum swipe distance to trigger slide change

  // Set initial position
  updateSlider();

  // Auto-rotate every 5 seconds
  let sliderInterval = setInterval(nextSlide, 5000);

  // Dot navigation
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      currentIndex = parseInt(this.getAttribute("data-index"));
      updateSlider();
      resetInterval();
    });
  });

  // Touch event listeners for mobile swipe
  track.addEventListener("touchstart", handleTouchStart, { passive: true });
  track.addEventListener("touchend", handleTouchEnd, { passive: true });

  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(sliderInterval); // Pause auto-rotation during interaction
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    resetInterval(); // Resume auto-rotation after interaction
  }

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > swipeThreshold) {
      // Swipe right - go to previous slide
      prevSlide();
    } else if (swipeDistance < -swipeThreshold) {
      // Swipe left - go to next slide
      nextSlide();
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlider();
  }

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function resetInterval() {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(nextSlide, 5000);
  }

  // Pause on hover (for desktop)
  const slider = document.querySelector(".reviews-slider");
  slider.addEventListener("mouseenter", () => clearInterval(sliderInterval));
  slider.addEventListener("mouseleave", resetInterval);
});
