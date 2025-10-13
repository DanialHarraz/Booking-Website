document.addEventListener("DOMContentLoaded", async () => {
  const bookingsBody = document.getElementById("bookingsBody");
  const filterStatus = document.getElementById("filterStatus");
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "admin-login.html";
  });

  async function fetchBookings(status = "all") {
    bookingsBody.innerHTML = `<tr><td colspan="11" class="loading">Loading bookings...</td></tr>`;

    try {
      const res = await fetch("http://localhost:5000/api/bookings/get");
      const data = await res.json();

      let bookings = data.data || data; // ✅ fixed key name

      if (status !== "all") {
        bookings = bookings.filter(b => b.status === status);
      }

      if (!bookings || bookings.length === 0) {
        bookingsBody.innerHTML = `<tr><td colspan="11" class="loading">No bookings found.</td></tr>`;
        return;
      }

      bookingsBody.innerHTML = bookings.map(b => `
        <tr>
          <td>${b.id}</td>
          <td>${b.fullName}</td>
          <td>${b.phone}</td>
          <td>${b.bookingType}</td>
          <td>${b.date || "-"}</td>
          <td>${b.pickup || "-"}</td>
          <td>${b.destination || "-"}</td>
          <td>${b.passengers || "-"}</td>
          <td>${b.paymentMethod || "-"}</td>
          <td class="status ${b.status}">${b.status}</td>
          <td>
            <button class="btn-action" onclick="viewBooking(${b.id})">View</button>
          </td>
        </tr>
      `).join("");
    } catch (err) {
      console.error(err);
      bookingsBody.innerHTML = `<tr><td colspan="11" class="loading">Error loading bookings.</td></tr>`;
    }
  }

  filterStatus.addEventListener("change", e => {
    fetchBookings(e.target.value);
  });

  fetchBookings();
});

function viewBooking(id) {
  window.location.href = `view-booking.html?id=${id}`;
}
