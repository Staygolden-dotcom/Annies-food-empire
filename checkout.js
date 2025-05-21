document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const closeButton = document.getElementById("closeButton");
  const sidebar = document.getElementById("sidebar");
  const cartToggle = document.getElementById("cartToggle");
  const cartPreview = document.getElementById("cartPreview");
  const closeCart = document.getElementById("closeCart");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const closeCheckout = document.getElementById("closeCheckout");
  const checkoutItems = document.getElementById("checkoutItems");
  const checkoutTotal = document.getElementById("checkoutTotal");
  const checkoutForm = document.getElementById("checkoutForm");
  let cart = [];
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      navLinks.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
      if (window.innerWidth < 1024) {
        closeSidebar();
      }
    });
  });
  function checkWindowSize() {
    if (window.innerWidth >= 1024) {
      closeSidebar();
    }
  }
  window.addEventListener("resize", checkWindowSize);
  function openSidebar() {
    sidebar.classList.add("active");
  }
  function closeSidebar() {
    sidebar.classList.remove("active");
  }
  function toggleCart() {
    cartPreview.classList.toggle("translate-x-full");
  }
  function updateCart() {
    cartItems.innerHTML = "";
    checkoutItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      // Cart preview item
      const cartItem = document.createElement("div");
      cartItem.className = "flex items-center justify-between";
      cartItem.innerHTML = `
              <div class="flex items-center flex-1">
                  <div class="flex-1">
                      <h4 class="font-medium">${item.name}</h4>
                      <div class="text-sm text-gray-500">₱${item.price.toFixed(
                        2
                      )} × ${item.quantity}</div>
                  </div>
              </div>
              <div class="flex items-center gap-2">
                  <button class="decrease-quantity w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary" data-index="${index}">
                      <i class="ri-subtract-line"></i>
                  </button>
                  <span class="w-8 text-center">${item.quantity}</span>
                  <button class="increase-quantity w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary" data-index="${index}">
                      <i class="ri-add-line"></i>
                  </button>
                  <button class="remove-item w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-500" data-index="${index}">
                      <i class="ri-delete-bin-line"></i>
                  </button>
              </div>
          `;
      cartItems.appendChild(cartItem);
      // Checkout item
      const checkoutItem = document.createElement("div");
      checkoutItem.className = "flex justify-between items-center";
      checkoutItem.innerHTML = `
              <div>
                  <h4 class="font-medium">${item.name}</h4>
                  <div class="text-sm text-gray-500">₱${item.price.toFixed(
                    2
                  )} × ${item.quantity}</div>
              </div>
              <div class="font-medium">₱${(item.price * item.quantity).toFixed(
                2
              )}</div>
          `;
      checkoutItems.appendChild(checkoutItem);
    });
    cartTotal.textContent = `₱${total.toFixed(2)}`;
    checkoutTotal.textContent = `₱${total.toFixed(2)}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    // Toggle checkout button state
    checkoutBtn.disabled = cart.length === 0;
    checkoutBtn.classList.toggle("opacity-50", cart.length === 0);
    checkoutBtn.classList.toggle("cursor-not-allowed", cart.length === 0);
  }
  // Add to cart functionality
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);

      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id,
          name,
          price,
          quantity: 1,
        });
      }

      updateCart();
      cartPreview.classList.remove("translate-x-full");
    });
  });
  // Cart quantity controls
  cartItems.addEventListener("click", (e) => {
    const target = e.target.closest("button");
    if (!target) return;
    const index = parseInt(target.dataset.index);
    if (target.classList.contains("increase-quantity")) {
      cart[index].quantity += 1;
    } else if (target.classList.contains("decrease-quantity")) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      }
    } else if (target.classList.contains("remove-item")) {
      cart.splice(index, 1);
    }
    updateCart();
  });
  // Checkout form submission
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(checkoutForm);
    const orderData = {
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      customer: {
        name: formData.get("fullName"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        address: formData.get("address"),
      },
      paymentMethod: formData.get("paymentMethod"),
    };
    // Here you would typically send the order to your backend
    console.log("Order placed:", orderData);
    // Clear cart and close modal
    cart = [];
    updateCart();
    checkoutModal.classList.add("hidden");
    // Show success message
    const successMessage = document.createElement("div");
    successMessage.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50";
    successMessage.innerHTML = `
          <div class="flex items-center">
              <i class="ri-checkbox-circle-line ri-lg mr-2"></i>
              Order placed successfully!
          </div>
      `;
    document.body.appendChild(successMessage);
    // Remove success message after 3 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  });
  // Event Listeners
  sidebarToggle.addEventListener("click", openSidebar);
  closeButton.addEventListener("click", closeSidebar);
  cartToggle.addEventListener("click", toggleCart);
  closeCart.addEventListener("click", toggleCart);

  checkoutBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      checkoutModal.classList.remove("hidden");
      checkoutModal.classList.add("flex");
      cartPreview.classList.add("translate-x-full");
    }
  });
  closeCheckout.addEventListener("click", () => {
    checkoutModal.classList.add("hidden");
    checkoutModal.classList.remove("flex");
  });
  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === checkoutModal) {
      checkoutModal.classList.add("hidden");
      checkoutModal.classList.remove("flex");
    }
  });
});


// Simple form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Show confirmation message
  const confirmationMsg = document.getElementById('confirmationMsg');
  confirmationMsg.style.display = 'flex';
  
  // Hide after 5 seconds
  setTimeout(() => {
    confirmationMsg.style.display = 'none';
  }, 5000);
  
  // Reset form
  this.reset();
});



document.addEventListener("DOMContentLoaded", function () {
  // Initialize all swipe containers
  const swipeContainers = document.querySelectorAll(".swipe-container");

  swipeContainers.forEach((container) => {
    let startX, startY;
    let scrollLeft;
    let isDown = false;
    let isScrollingHorizontally = false;

    // Touch events
    container.addEventListener(
      "touchstart",
      (e) => {
        const touch = e.touches[0];
        startX = touch.pageX - container.offsetLeft;
        startY = touch.pageY - container.offsetTop;
        scrollLeft = container.scrollLeft;
        isDown = true;
        isScrollingHorizontally = false;
        container.style.scrollBehavior = "auto";
      },
      { passive: false }
    );

    container.addEventListener(
      "touchmove",
      (e) => {
        if (!isDown) return;

        const touch = e.touches[0];
        const x = touch.pageX - container.offsetLeft;
        const y = touch.pageY - container.offsetTop;

        // Calculate movement in both directions
        const xDiff = Math.abs(x - startX);
        const yDiff = Math.abs(y - startY);

        // Determine scroll direction after initial movement
        if (!isScrollingHorizontally && xDiff < 10 && yDiff < 10) {
          return; // Ignore tiny movements
        }

        if (!isScrollingHorizontally) {
          // Decide if we're scrolling horizontally or vertically
          isScrollingHorizontally = xDiff > yDiff;
        }

        if (isScrollingHorizontally) {
          // Horizontal scrolling - handle the swipe
          e.preventDefault();
          const walk = (x - startX) * 2;
          container.scrollLeft = scrollLeft - walk;
        } else {
          // Vertical scrolling - let the page handle it
          return;
        }
      },
      { passive: false }
    );

    container.addEventListener("touchend", () => {
      isDown = false;
      isScrollingHorizontally = false;
      container.style.scrollBehavior = "smooth";
    });

    // Mouse events for desktop testing
    container.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      startY = e.pageY - container.offsetTop;
      scrollLeft = container.scrollLeft;
      isScrollingHorizontally = false;
      container.style.scrollBehavior = "auto";
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDown) return;

      const x = e.pageX - container.offsetLeft;
      const y = e.pageY - container.offsetTop;
      const xDiff = Math.abs(x - startX);
      const yDiff = Math.abs(y - startY);

      if (!isScrollingHorizontally && xDiff < 5 && yDiff < 5) {
        return;
      }

      if (!isScrollingHorizontally) {
        isScrollingHorizontally = xDiff > yDiff;
      }

      if (isScrollingHorizontally) {
        e.preventDefault();
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
      }
    });

    container.addEventListener("mouseup", () => {
      isDown = false;
      isScrollingHorizontally = false;
      container.style.scrollBehavior = "smooth";
    });

    container.addEventListener("mouseleave", () => {
      isDown = false;
      isScrollingHorizontally = false;
    });

    // Navigation arrows functionality
    const prevBtn = container.parentElement.querySelector(".swipe-prev");
    const nextBtn = container.parentElement.querySelector(".swipe-next");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        container.scrollBy({
          left: -300,
          behavior: "smooth",
        });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        container.scrollBy({
          left: 300,
          behavior: "smooth",
        });
      });
    }
  });
});
