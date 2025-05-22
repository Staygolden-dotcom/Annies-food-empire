// DOM Elements
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");
const showSignup = document.getElementById("show-signup");
const showLogin = document.getElementById("show-login");

// Switch between login/signup forms
loginTab.addEventListener("click", () => {
  loginForm.style.display = "block";
  signupForm.style.display = "none";
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
});

signupTab.addEventListener("click", () => {
  signupForm.style.display = "block";
  loginForm.style.display = "none";
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
});

showSignup.addEventListener("click", (e) => {
  e.preventDefault();
  signupTab.click();
});

showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  loginTab.click();
});

// Form submissions
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "menu.html";
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
});

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const phone = document.getElementById("signup-phone").value;

  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone }),
    });

    if (response.ok) {
      alert("Account created successfully! Please login.");
      loginTab.click();
    } else {
      const error = await response.json();
      alert(error.message || "Signup failed");
    }
  } catch (error) {
    console.error("Signup error:", error);
  }
});

// Check if user is logged in on page load
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")) {
    window.location.href = "menu.html";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const closeButton = document.getElementById("closeButton");
  const sidebar = document.getElementById("sidebar");
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
  sidebarToggle.addEventListener("click", openSidebar);
  closeButton.addEventListener("click", closeSidebar);
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
