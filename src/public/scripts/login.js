document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("adminLoginForm"); 

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      window.alert("Please fill in both username and password.");
      return;
    }

    try {
      const response = await fetch("/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        window.alert(data.message || "Invalid username or password.");
        return;
      }

      // Save admin session
      localStorage.setItem("isAdminLoggedIn", "true");
      localStorage.setItem("userData", JSON.stringify(data.data || {}));
      localStorage.setItem("token", data.token || "");

      window.location.href = "/Admin/admin-dashboard.html";

    } catch (error) {
      console.error("Login error:", error);
      window.alert("Something went wrong. Please try again later.");
    }
  });
});
