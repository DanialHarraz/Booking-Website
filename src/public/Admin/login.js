document.getElementById("adminLoginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  // Temporary hardcoded admin account (replace later with backend)
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "12345";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    // Store login info in localStorage
    localStorage.setItem("isAdminLoggedIn", "true");
    window.location.href = "admin-dashboard.html";
  } else {
    errorMsg.textContent = "Invalid username or password.";
  }
});
