// navigation
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



// menu and cart system

document.addEventListener("DOMContentLoaded", function () {
  // Menu Data
  const menuData = {
    rice_Fiesta: [
      {
        id: 1,
        name: "Jollof Rice",
        description: "Toasted bread with tomatoes, garlic, and basil",
        price: 500.0,
        image: "./images/jollof-rice-chiken-plantain.jpg",
      },
      {
        id: 2,
        name: "Fried Rice",
        description: "Crispy fried squid with lemon aioli",
        price: 500.0,
        image: "./images/fried-rice.jpg",
      },
      {
        id: 3,
        name: "Native Rice",
        description: "Fresh mozzarella, tomatoes, and basil",
        price: 700.0,
        image: "./images/native-rice.jpg",
      },
      {
        id: 4,
        name: "Coconut Fried Rice",
        description: "8oz beef filet with mashed potatoes",
        price: 500.0,
        image: "./images/coconut-fried-rice.jpg",
      },
      {
        id: 5,
        name: "Rice and Stew",
        description: "8oz beef filet with mashed potatoes",
        price: 600.0,
        image: "./images/rice-and-stew.jpg",
      },
      {
        id: 6,
        name: "Oriental Rice",
        description: "8oz beef filet with mashed potatoes",
        price: 700.0,
        image: "./images/orientail-fried-rice.jpg",
      },
    ],
    beans: [
      {
        id: 7,
        name: "Ewagoyin",
        description: "8oz beef filet with mashed potatoes",
        price: 500.0,
        image: "./images/ewagoyin.jpg",
      },
      {
        id: 8,
        name: "Beans Porridge",
        description: "Atlantic salmon with lemon butter sauce",
        price: 400.0,
        image: "./images/beans-and-plantain.jpg",
      },
      {
        id: 9,
        name: "White Beans",
        description: "Breaded chicken with marinara and cheese",
        price: 200.0,
        image: "./images/whiite-beans.jpg",
      },
    ],
    soups: [
      {
        id: 10,
        name: "Egusi Soup",
        description: "Warm cake with molten center and ice cream",
        price: 500.0,
        image: "./images/egusi-soup.jpg",
      },
      {
        id: 11,
        name: "Vegitable Soup",
        description: "Classic Italian coffee dessert",
        price: 500.0,
        image: "./images/vegitable-soup.jpg",
      },
      {
        id: 12,
        name: "Okro Soup",
        description: "New York style with berry compote",
        price: 400.0,
        image: "./images/okro-soup.jpg",
      },
    ],
    swallow: [
      {
        id: 13,
        name: "Eba",
        description: "Warm cake with molten center and ice cream",
        price: 100.0,
        image: "./images/eba.jpg",
      },
      {
        id: 14,
        name: "Wheat",
        description: "Classic Italian coffee dessert",
        price: 100.0,
        image: "./images/wheat.png",
      },
      {
        id: 15,
        name: "Starch",
        description: "New York style with berry compote",
        price: 100.0,
        image: "./images/starch.jpg",
      },
    ],
    pastas: [
      {
        id: 16,
        name: "Jollof Spaghetti",
        description: "Glass of Cabernet Sauvignon",
        price: 400.0,
        image: "./images/jollof-spagetti.jpg",
      },
      {
        id: 17,
        name: "Alfredo",
        description: "Local IPA from our partners",
        price: 500.0,
        image: "./images/alfredo.jpg",
      },
      {
        id: 18,
        name: "Spaghetti Bolognese",
        description: "Seasonal cocktail with fresh ingredients",
        price: 500.0,
        image: "./images/spagetti-bolognese.jpg",
      },
      {
        id: 19,
        name: "Beefaroni",
        description: "Seasonal cocktail with fresh ingredients",
        price: 500.0,
        image: "./images/beefaroni.jpg",
      },
      {
        id: 20,
        name: "Macaroni Salad",
        description: "Seasonal cocktail with fresh ingredients",
        price: 500.0,
        image: "./images/macaroni-salad.jpg",
      },
    ],
    proteins: [
      {
        id: 21,
        name: "Peppered Chicken",
        description: "Glass of Cabernet Sauvignon",
        price: 200.0,
        image: "./images/chicken.jpg",
      },
      {
        id: 22,
        name: "Peppered Beef (2px)",
        description: "Local IPA from our partners",
        price: 200,
        image: "./images/beef.jpg",
      },
      {
        id: 23,
        name: "Egg",
        description: "Seasonal cocktail with fresh ingredients",
        price: 20.0,
        image: "./images/eggs.jpg",
      },
      {
        id: 24,
        name: "Grilled Fish",
        description: "Seasonal cocktail with fresh ingredients",
        price: 1000.0,
        image: "./images/grilled-fish.jpg",
      },
    ],
    sides: [
      {
        id: 25,
        name: "Moi-Moi",
        description: "Glass of Cabernet Sauvignon",
        price: 200.0,
        image: "./images/moimoi.jpg",
      },
      {
        id: 26,
        name: "Fried Plantain",
        description: "Local IPA from our partners",
        price: 200.0,
        image: "./images/fried-plantain.jpg",
      },
      {
        id: 27,
        name: "Puff-puff (8px)",
        description: "Seasonal cocktail with fresh ingredients",
        price: 200.0,
        image: "./images/cake.jpg",
      },
      {
        id: 28,
        name: "Egg-roll (1px)",
        description: "Seasonal cocktail with fresh ingredients",
        price: 150.0,
        image: "./images/egg-roll.jpg",
      },
    ],
    wraps: [
      {
        id: 29,
        name: "Beef shawarma",
        description: "Glass of Cabernet Sauvignon",
        price: 500.0,
        image: "./images/beef-shawama.jpg",
      },
      {
        id: 30,
        name: "Chicken Shawarma",
        description: "Local IPA from our partners",
        price: 400.0,
        image: "./images/chicken-shawama.jpg",
      },
      {
        id: 31,
        name: "Spring-roll (6px)",
        description: "Seasonal cocktail with fresh ingredients",
        price: 200.00,
        image: "./images/spring-roll.jpg",
      },
      {
        id: 32,
        name: "Samosa (5px)",
        description: "Seasonal cocktail with fresh ingredients",
        price: 200.00,
        image: "./images/spring-roll.jpg",
      },
    ],
  };

  // Cart State
  let cart = [];
  let swipers = {};

  // DOM Elements
  const elements = {
    menuContent: document.querySelector(".menu-content"),
    menuTabs: document.querySelectorAll(".menu-tab"),
    cartSidebar: document.querySelector(".cart-sidebar"),
    cartOverlay: document.querySelector(".cart-overlay"),
    cartItems: document.querySelector(".cart-items"),
    cartBtn: document.querySelector(".cart-btn"),
    cartCount: document.querySelector(".cart-count"),
    totalPrice: document.querySelector(".total-price"),
    checkoutModal: document.querySelector(".checkout-modal"),
    orderSummary: document.querySelector(".order-summary"),
    finalTotal: document.querySelector(".final-total"),
    closeCart: document.querySelector(".close-cart"),
    checkoutBtn: document.querySelector(".checkout-btn"),
    closeCheckout: document.querySelector(".close-checkout"),
    whatsappBtn: document.querySelector(".social-btn.whatsapp"),
    instagramBtn: document.querySelector(".social-btn.instagram"),
    messengerBtn: document.querySelector(".social-btn.messenger"),
  };

  // Initialize Menu
  function initMenu() {
    elements.menuContent.innerHTML = "";

    Object.keys(menuData).forEach((category) => {
      const categoryEl = document.createElement("div");
      categoryEl.className = `menu-category ${
        category === "rice_Fiesta" ? "active" : ""
      }`;
      categoryEl.id = category;

      const title = document.createElement("h2");
      title.className = "category-title";
      title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categoryEl.appendChild(title);

      const swiperEl = document.createElement("div");
      swiperEl.className = `swiper ${category}-swiper`;
      swiperEl.innerHTML = `
              <div class="swiper-wrapper"></div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
          `;

      const swiperWrapper = swiperEl.querySelector(".swiper-wrapper");
      menuData[category].forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
                  <div class="dish-card">
                      <img src="${item.image}" alt="${
          item.name
        }" class="dish-image">
                      <div class="dish-info">
                          <h3 class="dish-name">${item.name}</h3>
                          <p class="dish-desc">${item.description}</p>
                          <div class="dish-footer">
                              <span class="dish-price">₱${item.price.toFixed(
                                2
                              )}</span>
                              <button class="add-to-cart" data-id="${item.id}">
                                  <i class="fas fa-plus"></i> Add
                              </button>
                          </div>
                      </div>
                  </div>
              `;
        swiperWrapper.appendChild(slide);
      });

      categoryEl.appendChild(swiperEl);
      elements.menuContent.appendChild(categoryEl);

      swipers[category] = new Swiper(`.${category}-swiper`, {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: `.${category}-swiper .swiper-button-next`,
          prevEl: `.${category}-swiper .swiper-button-prev`,
        },
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    });

    // Add to cart event delegation
    document.addEventListener("click", function (e) {
      if (e.target.closest(".add-to-cart")) {
        const btn = e.target.closest(".add-to-cart");
        const id = parseInt(btn.getAttribute("data-id"));
        addToCart(id);
      }
    });
  }

  // Setup Category Tabs
  function setupCategoryTabs() {
    elements.menuTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        elements.menuTabs.forEach((t) => t.classList.remove("active"));

        // Add active class to clicked tab
        this.classList.add("active");

        // Get category from data attribute
        const category = this.getAttribute("data-category");

        // Hide all menu categories
        document.querySelectorAll(".menu-category").forEach((cat) => {
          cat.classList.remove("active");
        });

        // Show selected category
        document.getElementById(category).classList.add("active");
      });
    });
  }

  // Setup Social Media Checkout
  function setupSocialCheckout() {
    // WhatsApp Button
    document
      .querySelector(".social-btn.whatsapp")
      .addEventListener("click", function (e) {
        e.preventDefault();
        const orderMessage = generateOrderMessage();
        const isMobile =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          );

        if (isMobile) {
          const tempLink = document.createElement("a");
          tempLink.href = `whatsapp://send?phone=639198517845&text=${encodeURIComponent(
            orderMessage
          )}`;
          tempLink.target = "_blank";
          document.body.appendChild(tempLink);
          tempLink.click();
          document.body.removeChild(tempLink);

          setTimeout(() => {
            if (!document.hidden) {
              window.location.href = `https://api.whatsapp.com/send?phone=639198517845&text=${encodeURIComponent(
                orderMessage
              )}`;
            }
          }, 1000);
        } else {
          window.open(
            `https://web.whatsapp.com/send?phone=639198517845&text=${encodeURIComponent(
              orderMessage
            )}`,
            "_blank"
          );
        }
      });

    // Instagram Button
    document
      .querySelector(".social-btn.instagram")
      .addEventListener("click", function (e) {
        e.preventDefault();
        const orderMessage = generateOrderMessage();
        const isMobile =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          );

        if (isMobile) {
          // Try to open Instagram app directly
          window.location.href = `instagram://direct-msg?text=${encodeURIComponent(
            orderMessage
          )}`;

          // Fallback to web if app not installed
          setTimeout(() => {
            if (!document.hidden) {
              navigator.clipboard
                .writeText(orderMessage)
                .then(() => {
                  alert("Order copied! Please paste in Instagram");
                  window.location.href =
                    "https://www.instagram.com/direct/inbox/";
                })
                .catch(() => {
                  prompt("Please copy this order:", orderMessage);
                  window.location.href =
                    "https://www.instagram.com/direct/inbox/";
                });
            }
          }, 500);
        } else {
          navigator.clipboard
            .writeText(orderMessage)
            .then(() => {
              alert(
                "Order copied to clipboard! Please paste it in your Instagram message."
              );
              window.open("https://www.instagram.com/direct/new/", "_blank");
            })
            .catch(() => {
              prompt(
                "Please copy this order and paste it in Instagram:",
                orderMessage
              );
              window.open("https://www.instagram.com/direct/new/", "_blank");
            });
        }
      });

    // Messenger Button
    document
      .querySelector(".social-btn.messenger")
      .addEventListener("click", function (e) {
        e.preventDefault();
        const orderMessage = generateOrderMessage();
        const isMobile =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          );

        if (isMobile) {
          // Try to open Messenger app directly
          window.location.href = `fb-messenger://user-thread/{your-page-id}?text=${encodeURIComponent(
            orderMessage
          )}`;

          // Fallback to web if app not installed
          setTimeout(() => {
            if (!document.hidden) {
              window.location.href = `https://m.me/yourpageusername?text=${encodeURIComponent(
                orderMessage
              )}`;
            }
          }, 500);
        } else {
          window.open(
            `https://m.me/yourpageusername?text=${encodeURIComponent(
              orderMessage
            )}`,
            "_blank"
          );
        }
      });
  }

  // Generate Order Message
  function generateOrderMessage() {
    let message = `🍽️ Order From Annie's Food Empire 🍽️\n\n`;
    message += `📅 ${new Date().toLocaleString()}\n\n`;
    message += `📋 Order Details:\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x${item.quantity} - ₱${(
        item.price * item.quantity
      ).toFixed(2)}\n`;
    });

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.0;
    const total = subtotal + tax;

    message += `\n💵 Subtotal: ₱${subtotal.toFixed(2)}\n`;
    message += `🏷️ Tax (0%): ₱${tax.toFixed(2)}\n`;
    message += `💰 Total: ₱${total.toFixed(2)}\n\n`;
    message += `📛 Full Name:_____\n\n`;
    message += `🚚 Delivery Address:_____\n\n`;
    message += `☎️ Active Phone number:_____\n\n`;
    message += `📝 Special Instructions: \n\n`;
    message += `Thank you!`;

    return message;
  }

  // Cart Functions
  function addToCart(id) {
    let itemToAdd = null;
    for (const category in menuData) {
      const foundItem = menuData[category].find((item) => item.id === id);
      if (foundItem) {
        itemToAdd = foundItem;
        break;
      }
    }

    if (!itemToAdd) return;

    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...itemToAdd, quantity: 1 });
    }

    updateCart();
    toggleCart();
  }

  function updateCart() {
    updateCartCount();
    renderCartItems();
    updateCartTotal();
  }

  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    elements.cartCount.textContent = count;
    elements.cartBtn.classList.add("bounce");
    setTimeout(() => elements.cartBtn.classList.remove("bounce"), 500);
  }

  function renderCartItems() {
    elements.cartItems.innerHTML = "";

    if (cart.length === 0) {
      elements.cartItems.innerHTML =
        '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
      return;
    }

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}" class="cart-item-img">
              <div class="cart-item-details">
                  <h4 class="cart-item-name">${item.name}</h4>
                  <p class="cart-item-price">₱${item.price.toFixed(2)}</p>
                  <div class="cart-item-controls">
                      <button class="qty-btn decrease" data-id="${
                        item.id
                      }">-</button>
                      <input type="number" class="cart-item-qty" value="${
                        item.quantity
                      }" min="1" data-id="${item.id}">
                      <button class="qty-btn increase" data-id="${
                        item.id
                      }">+</button>
                      <button class="remove-item" data-id="${item.id}">
                          <i class="fas fa-trash"></i>
                      </button>
                  </div>
              </div>
          `;
      elements.cartItems.appendChild(cartItem);
    });

    // Add event listeners to cart controls
    document.querySelectorAll(".decrease").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = parseInt(this.getAttribute("data-id"));
        const item = cart.find((item) => item.id === id);
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cart = cart.filter((item) => item.id !== id);
        }
        updateCart();
      });
    });

    document.querySelectorAll(".increase").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = parseInt(this.getAttribute("data-id"));
        cart.find((item) => item.id === id).quantity++;
        updateCart();
      });
    });

    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = parseInt(this.getAttribute("data-id"));
        cart = cart.filter((item) => item.id !== id);
        updateCart();
      });
    });

    document.querySelectorAll(".cart-item-qty").forEach((input) => {
      input.addEventListener("change", function () {
        const id = parseInt(this.getAttribute("data-id"));
        const newQty = parseInt(this.value) || 1;
        const item = cart.find((item) => item.id === id);
        if (item) item.quantity = newQty;
        updateCart();
      });
    });
  }

  function updateCartTotal() {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    elements.totalPrice.textContent = `₱${total.toFixed(2)}`;
    elements.finalTotal.textContent = `₱${total.toFixed(2)}`;
  }

  // Toggle Functions
  function toggleCart() {
    elements.cartSidebar.classList.toggle("active");
    elements.cartOverlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  }

  function toggleCheckoutModal() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    elements.checkoutModal.classList.toggle("active");

    if (elements.checkoutModal.classList.contains("active")) {
      elements.orderSummary.innerHTML = "";
      cart.forEach((item) => {
        const orderItem = document.createElement("div");
        orderItem.className = "order-item";
        orderItem.innerHTML = `
                  <div>
                      <span class="order-item-name">${item.name}</span>
                      <span class="order-item-qty">x${item.quantity}</span>
                  </div>
                  <span class="order-item-price">₱${(
                    item.price * item.quantity
                  ).toFixed(2)}</span>
              `;
        elements.orderSummary.appendChild(orderItem);
      });
    }
  }

  // Initialize Everything
  function init() {
    initMenu();
    setupCategoryTabs();
    setupSocialCheckout();

    // Cart Button
    elements.cartBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleCart();
    });

    // Overlay Click
    elements.cartOverlay.addEventListener("click", function (e) {
      if (e.target === elements.cartOverlay) {
        toggleCart();
      }
    });

    // Close Cart Button
    elements.closeCart.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleCart();
    });

    // Checkout Button
    elements.checkoutBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleCheckoutModal();
    });

    // Close Checkout Modal
    elements.closeCheckout.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleCheckoutModal();
    });

    // Close modal when clicking outside
    elements.checkoutModal.addEventListener("click", function (e) {
      if (e.target === elements.checkoutModal) {
        toggleCheckoutModal();
      }
    });
  }

  // Start the application
  init();
});
