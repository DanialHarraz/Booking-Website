// This file will be linked in admin-dashboard.html
if (localStorage.getItem("isAdminLoggedIn") !== "true") {
  window.location.href = "admin-login.html";
}
